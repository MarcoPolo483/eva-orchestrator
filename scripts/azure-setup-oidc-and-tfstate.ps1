Param(
  [string]$ConfigPath = "azure/azure.config.json"
)

function Require-Cli($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    throw "$name CLI is required. Install it and re-run."
  }
}

Require-Cli az

# Load config
if (-not (Test-Path $ConfigPath)) { throw "Config file not found: $ConfigPath" }
$config = Get-Content $ConfigPath -Raw | ConvertFrom-Json

$SubscriptionId = $config.subscriptionId
if (-not $SubscriptionId) { throw "subscriptionId is required in $ConfigPath" }

# Login and set subscription
Write-Host "Logging into Azure..." -ForegroundColor Cyan
az account show 1>$null 2>$null
if ($LASTEXITCODE -ne 0) { az login | Out-Null }
az account set --subscription $SubscriptionId | Out-Null

# Resolve tenantId
$tenantId = $config.tenantId
if (-not $tenantId) {
  $tenantId = (az account show --subscription $SubscriptionId --query tenantId -o tsv).Trim()
}
Write-Host "Tenant: $tenantId ; Subscription: $SubscriptionId" -ForegroundColor Green

# Ensure tfstate backend
$rg = $config.tfstate.resourceGroup
$sa = $config.tfstate.storageAccount
$container = $config.tfstate.container
$location = $config.location

if (-not $rg -or -not $sa -or -not $container) { throw "tfstate.resourceGroup, storageAccount, container are required." }

Write-Host "Ensuring RG '$rg' in $location ..." -ForegroundColor Cyan
az group create -n $rg -l $location 1>$null

Write-Host "Ensuring Storage Account '$sa' ..." -ForegroundColor Cyan
az storage account show -g $rg -n $sa 1>$null 2>$null
if ($LASTEXITCODE -ne 0) {
  az storage account create -g $rg -n $sa -l $location --sku Standard_LRS --encryption-services blob | Out-Null
}

Write-Host "Ensuring container '$container' ..." -ForegroundColor Cyan
# use Azure AD auth
az storage container show --name $container --account-name $sa 1>$null 2>$null
if ($LASTEXITCODE -ne 0) {
  az storage container create --name $container --account-name $sa | Out-Null
}

# Create or get Entra App (Service Principal) for OIDC
$appName = $config.appDisplayName
if (-not $appName) { $appName = "eva-gha-oidc-app" }

Write-Host "Ensuring Entra application '$appName' ..." -ForegroundColor Cyan
$appId = (az ad app list --display-name $appName --query "[0].appId" -o tsv).Trim()
if (-not $appId) {
  $appId = (az ad app create --display-name $appName --query appId -o tsv).Trim()
}
$spId = (az ad sp show --id $appId --query id -o tsv) 2>$null
if ($LASTEXITCODE -ne 0 -or -not $spId) {
  $spId = (az ad sp create --id $appId --query id -o tsv).Trim()
}

# Role assignments
Write-Host "Assigning 'Contributor' at subscription scope to the SP..." -ForegroundColor Cyan
$subScope = "/subscriptions/$SubscriptionId"
az role assignment create --assignee-object-id $spId --assignee-principal-type ServicePrincipal --role "Contributor" --scope $subScope 1>$null 2>$null

Write-Host "Assigning 'Storage Blob Data Contributor' on state account..." -ForegroundColor Cyan
$saId = (az storage account show -g $rg -n $sa --query id -o tsv)
az role assignment create --assignee-object-id $spId --assignee-principal-type ServicePrincipal --role "Storage Blob Data Contributor" --scope $saId 1>$null 2>$null

# Federated credentials for each repo/branch
$owner = $config.owner
$repos = $config.repos
$branch = $config.branch
if (-not $owner -or -not $repos -or $repos.Count -eq 0) { throw "owner and repos[] required in config." }
if (-not $branch) { $branch = "main" }

$issuer = "https://token.actions.githubusercontent.com"
foreach ($repo in $repos) {
  $subject = "repo:${owner}/${repo}:ref:refs/heads/${branch}"
  Write-Host "Ensuring federated credential for $subject ..." -ForegroundColor Cyan

  # Try idempotent create (delete-on-conflict approach, then create)
  $fcName = "${owner}-${repo}-${branch}" -replace '/', '-'
  az ad app federated-credential delete --id $appId --federated-credential-id $fcName 1>$null 2>$null
  
  # Create JSON properly for PowerShell - save to temp file
  $tempJson = [System.IO.Path]::GetTempFileName()
  $fcParams = @{
    name        = $fcName
    issuer      = $issuer
    subject     = $subject
    description = "GHA OIDC for $owner/$repo@$branch"
    audiences   = @("api://AzureADTokenExchange")
  }
  $fcParams | ConvertTo-Json -Depth 10 | Set-Content -Path $tempJson -Encoding UTF8
  
  az ad app federated-credential create --id $appId --parameters "@$tempJson" | Out-Null
  Remove-Item $tempJson -Force
}

# Set GitHub repo secrets (if gh CLI available)
$ghAvailable = $null -ne (Get-Command gh -ErrorAction SilentlyContinue)
if ($ghAvailable) {
  foreach ($repo in $repos) {
    Write-Host "Setting GitHub secrets in $owner/$repo ..." -ForegroundColor Cyan
    gh secret set AZURE_TENANT_ID --repo "$owner/$repo" --body $tenantId
    gh secret set AZURE_SUBSCRIPTION_ID --repo "$owner/$repo" --body $SubscriptionId
    gh secret set AZURE_CLIENT_ID --repo "$owner/$repo" --body $appId
  }
}
else {
  Write-Host "gh CLI not found. Set these secrets in each repo ($owner/<repo>):" -ForegroundColor Yellow
  Write-Host "  AZURE_TENANT_ID = $tenantId"
  Write-Host "  AZURE_SUBSCRIPTION_ID = $SubscriptionId"
  Write-Host "  AZURE_CLIENT_ID = $appId"
}

Write-Host "`nOutputs:" -ForegroundColor Green
Write-Host "  AZURE_TENANT_ID       = $tenantId"
Write-Host "  AZURE_SUBSCRIPTION_ID = $SubscriptionId"
Write-Host "  AZURE_CLIENT_ID       = $appId"
Write-Host "  TFSTATE_RG            = $rg"
Write-Host "  TFSTATE_SA            = $sa"
Write-Host "  TFSTATE_CONTAINER     = $container"
Write-Host "`nDone." -ForegroundColor Green