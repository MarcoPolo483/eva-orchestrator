#!/usr/bin/env node
/**
 * Siebel Agent - Autonomous import of Siebel artifacts
 * 
 * Reads SIEBEL_ARTIFACTS_PATH environment variable and imports all files
 * into the repository under siebel-artifacts/YYYYMMDD-HHMMSS/
 * 
 * Emits a signed JSON report in reports/agents/
 */

import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, dirname } from 'node:path';

/**
 * Format timestamp as YYYYMMDD-HHMMSS
 */
function formatTimestamp(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

/**
 * Recursively copy directory structure
 */
function copyDirectory(source, target, stats = { filesCount: 0, totalSize: 0 }) {
  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }

  const entries = readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(source, entry.name);
    const targetPath = join(target, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath, stats);
    } else if (entry.isFile()) {
      copyFileSync(sourcePath, targetPath);
      const stat = statSync(sourcePath);
      stats.filesCount++;
      stats.totalSize += stat.size;
    }
  }

  return stats;
}

/**
 * Get git repository root
 */
function getRepoRoot() {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('Error: Not in a git repository');
    process.exit(1);
  }
}

/**
 * Generate SHA256 signature for report
 */
function signReport(report) {
  const content = JSON.stringify(report, null, 2);
  const hash = createHash('sha256').update(content).digest('hex');
  return hash;
}

/**
 * Main execution
 */
function main() {
  const startTime = new Date();
  const timestamp = formatTimestamp(startTime);

  // Check required environment variables
  const artifactsPath = process.env.SIEBEL_ARTIFACTS_PATH;
  if (!artifactsPath) {
    console.error('Error: SIEBEL_ARTIFACTS_PATH environment variable is not set');
    console.error('Usage: SIEBEL_ARTIFACTS_PATH=/path/to/exports node agents/siebel-agent/run.mjs');
    process.exit(1);
  }

  // Verify source directory exists
  if (!existsSync(artifactsPath)) {
    console.error(`Error: Source directory does not exist: ${artifactsPath}`);
    process.exit(1);
  }

  const sourceStat = statSync(artifactsPath);
  if (!sourceStat.isDirectory()) {
    console.error(`Error: SIEBEL_ARTIFACTS_PATH is not a directory: ${artifactsPath}`);
    process.exit(1);
  }

  // Get git configuration
  const gitName = process.env.GIT_COMMIT_NAME || 'Siebel Agent';
  const gitEmail = process.env.GIT_COMMIT_EMAIL || 'siebel-agent@noreply.github.com';

  console.log('🚀 Siebel Agent starting...');
  console.log(`   Source: ${artifactsPath}`);
  console.log(`   Timestamp: ${timestamp}`);

  // Get repository root
  const repoRoot = getRepoRoot();
  const targetDir = join(repoRoot, 'siebel-artifacts', timestamp);

  console.log(`   Target: ${targetDir}`);

  // Copy files
  console.log('\n📦 Copying artifacts...');
  let copyStats;
  try {
    copyStats = copyDirectory(artifactsPath, targetDir);
    console.log(`   ✓ Copied ${copyStats.filesCount} files (${(copyStats.totalSize / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error(`Error copying files: ${error.message}`);
    process.exit(1);
  }

  if (copyStats.filesCount === 0) {
    console.error('Error: No files found to import');
    process.exit(1);
  }

  // Configure git
  try {
    execSync(`git config user.name "${gitName}"`, { cwd: repoRoot, stdio: 'pipe' });
    execSync(`git config user.email "${gitEmail}"`, { cwd: repoRoot, stdio: 'pipe' });
  } catch (error) {
    console.error(`Warning: Could not configure git user: ${error.message}`);
  }

  // Git add
  console.log('\n📝 Committing changes...');
  try {
    const relativeTarget = relative(repoRoot, targetDir);
    execSync(`git add "${relativeTarget}"`, { cwd: repoRoot, stdio: 'pipe' });
  } catch (error) {
    console.error(`Error adding files to git: ${error.message}`);
    process.exit(1);
  }

  // Git commit
  let commitSha = null;
  const commitMessage = `siebel: import artifacts ${timestamp}`;
  try {
    execSync(`git commit -m "${commitMessage}"`, { cwd: repoRoot, stdio: 'pipe' });
    commitSha = execSync('git rev-parse HEAD', { cwd: repoRoot, encoding: 'utf8' }).trim();
    console.log(`   ✓ Committed as ${commitSha.substring(0, 7)}`);
  } catch (error) {
    console.error(`Error committing changes: ${error.message}`);
    process.exit(1);
  }

  // Generate report
  console.log('\n📊 Generating report...');
  const report = {
    report_metadata: {
      generated_date: startTime.toISOString(),
      generated_by: 'siebel-agent',
      type: 'siebel-import',
      version: '1.0.0'
    },
    import_details: {
      timestamp: timestamp,
      source_path_hash: createHash('sha256').update(artifactsPath).digest('hex'),
      target_path: `siebel-artifacts/${timestamp}`,
      files_imported: copyStats.filesCount,
      total_size_bytes: copyStats.totalSize,
      commit_sha: commitSha,
      commit_message: commitMessage
    },
    git_config: {
      committer_name: gitName,
      committer_email: gitEmail
    },
    status: 'success'
  };

  // Sign the report
  const signature = signReport(report);
  report.signature = signature;

  // Write report
  const reportPath = join(repoRoot, 'reports', 'agents', `siebel-import-${timestamp}.json`);
  const reportDir = dirname(reportPath);
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }

  try {
    writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`   ✓ Report saved: ${relative(repoRoot, reportPath)}`);
    console.log(`   ✓ Signature: ${signature.substring(0, 16)}...`);
  } catch (error) {
    console.error(`Error writing report: ${error.message}`);
    process.exit(1);
  }

  // Add and commit the report
  try {
    const relativeReportPath = relative(repoRoot, reportPath);
    execSync(`git add "${relativeReportPath}"`, { cwd: repoRoot, stdio: 'pipe' });
    execSync(`git commit -m "siebel: add import report ${timestamp}"`, { cwd: repoRoot, stdio: 'pipe' });
    const reportCommitSha = execSync('git rev-parse HEAD', { cwd: repoRoot, encoding: 'utf8' }).trim();
    console.log(`   ✓ Report committed as ${reportCommitSha.substring(0, 7)}`);
  } catch (error) {
    console.error(`Error committing report: ${error.message}`);
    process.exit(1);
  }

  console.log('\n✅ Siebel import completed successfully!');
  console.log(`   Files: ${copyStats.filesCount}`);
  console.log(`   Size: ${(copyStats.totalSize / 1024).toFixed(2)} KB`);
  console.log(`   Commit: ${commitSha?.substring(0, 7)}`);
}

// Run the agent
try {
  main();
} catch (error) {
  console.error(`\n❌ Fatal error: ${error.message}`);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
}
