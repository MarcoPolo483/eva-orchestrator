# Siebel Agent

Autonomous agent that imports Siebel export artifacts into the repository.

## Purpose

This agent:
- Picks up local Siebel export artifacts from a configured directory
- Commits them into the repository under `siebel-artifacts/YYYYMMDD-HHMMSS/`
- Pushes the changes to the repository
- Emits a signed JSON report in `reports/agents/` describing what happened

## Usage

### Running Locally

```bash
export SIEBEL_ARTIFACTS_PATH=/path/to/siebel/exports
export GIT_COMMIT_NAME="Siebel Agent"
export GIT_COMMIT_EMAIL="siebel-agent@example.com"

node agents/siebel-agent/run.mjs
```

### Running in GitHub Actions

The agent can be scheduled to run automatically via GitHub Actions. See `.github/workflows/siebel-import.yml` for the configuration.

## Required Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SIEBEL_ARTIFACTS_PATH` | **Yes** | Path to local Siebel export directory containing artifacts to import |
| `GIT_COMMIT_NAME` | No | Git committer name (defaults to "Siebel Agent") |
| `GIT_COMMIT_EMAIL` | No | Git committer email (defaults to "siebel-agent@noreply.github.com") |

## Safe Defaults

- **Commit Name**: "Siebel Agent"
- **Commit Email**: "siebel-agent@noreply.github.com"
- **Target Directory**: `siebel-artifacts/YYYYMMDD-HHMMSS/` (timestamp-based)

## Operational Notes

### Local Execution

1. Ensure the `SIEBEL_ARTIFACTS_PATH` directory exists and contains your export files
2. The agent preserves the directory structure from the source path
3. All files are copied into a timestamped subdirectory under `siebel-artifacts/`
4. A git commit is created automatically with the configured credentials
5. A JSON report is generated in `reports/agents/siebel-import-YYYYMMDD-HHMMSS.json`

### GitHub Actions Execution

When running in Actions:
- The workflow should be configured with appropriate permissions (`contents: write`)
- Git credentials are configured automatically from the Actions environment
- Reports are committed back to the repository in the same run

### Report Format

The JSON report includes:
- Timestamp of the import
- Source path (sanitized)
- Destination path in the repository
- Number of files copied
- Commit SHA
- Success/failure status
- Any error messages

### Security Considerations

- The agent does not validate or sanitize file contents
- Ensure source directories do not contain sensitive credentials or secrets
- Review artifacts before running in production environments
- Consider adding `.gitignore` rules for sensitive file patterns

## Troubleshooting

**Error: SIEBEL_ARTIFACTS_PATH not set**
- Set the `SIEBEL_ARTIFACTS_PATH` environment variable before running

**Error: Source directory does not exist**
- Verify the path in `SIEBEL_ARTIFACTS_PATH` is correct and accessible

**Error: No files found to import**
- Check that the source directory contains files
- Verify directory permissions

**Git commit fails**
- Ensure git is configured with valid credentials
- Check repository permissions if running in CI/CD
