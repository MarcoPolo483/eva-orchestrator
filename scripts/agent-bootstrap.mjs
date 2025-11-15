#!/usr/bin/env node
/**
 * Generate an onboarding summary for an EVA role/agent.
 *
 * Usage examples:
 *   node scripts/agent-bootstrap.mjs --role qa-master --output comment.md
 *   node scripts/agent-bootstrap.mjs --role scrum-master --issue 4 --retro docs/sprint-history/2025-11-dry-run-04/retro.md
 */

import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    if (key === 'dry-run') {
      args.dryRun = true;
      continue;
    }
    const value = argv[i + 1];
    if (value === undefined || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase())] = value;
    i += 1;
  }
  return args;
}

function titleCase(role) {
  return role
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function loadMarkdownSection(raw, heading) {
  const pattern = new RegExp(`^##\\s+${heading}\\s*$`, 'mi');
  const match = raw.match(pattern);
  if (!match) return [];
  const startIndex = raw.indexOf(match[0]) + match[0].length;
  const rest = raw.slice(startIndex);
  const nextHeading = rest.search(/^##\s+/m);
  const sectionText = nextHeading === -1 ? rest : rest.slice(0, nextHeading);
  return sectionText
    .trim()
    .split(/\r?\n/)
    .map(line => line.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const env = process.env;

  const role = args.role || env.AGENT_ROLE;
  if (!role) {
    throw new Error('Specify a role via --role or AGENT_ROLE');
  }

  const repoRoot = process.cwd();
  const runbookRel = args.runbook || `docs/sprint-kit/runbooks/${role}.md`;
  const runbookPath = path.resolve(repoRoot, runbookRel);
  if (!fs.existsSync(runbookPath)) {
    throw new Error(`Runbook not found: ${runbookRel}`);
  }

  const teamChecklistPath = args.teamChecklist || 'docs/sprint-kit/team-operating-checklist.md';
  const retroPath = args.retro || env.RETRO_PATH || env.ACTIVE_RETRO_FILE || '';
  const issue = args.issue || env.AGENT_BOOTSTRAP_ISSUE || '';

  const raw = fs.readFileSync(runbookPath, 'utf8');
  const missionLines = loadMarkdownSection(raw, 'Mission');
  const responsibilityLines = loadMarkdownSection(raw, 'Responsibilities');
  const cadenceLines = loadMarkdownSection(raw, 'Cadence Checklist');

  const repoSlug = env.GITHUB_REPOSITORY || '';
  const server = env.GITHUB_SERVER_URL || 'https://github.com';
  const mainBranch = env.DEFAULT_BRANCH || 'main';

  const runbookHref = repoSlug
    ? `${server}/${repoSlug}/blob/${mainBranch}/${runbookRel.replace(/\\/g, '/')}`
    : runbookRel;
  const checklistHref = repoSlug
    ? `${server}/${repoSlug}/blob/${mainBranch}/${teamChecklistPath.replace(/\\/g, '/')}`
    : teamChecklistPath;

  const lines = [];
  lines.push(`### Agent Bootstrap – ${titleCase(role)}`);
  lines.push('');
  lines.push(`**Runbook:** [${titleCase(role)}](${runbookHref})`);
  lines.push(`**Team Operating Checklist:** [Shared expectations](${checklistHref})`);
  if (issue) {
    lines.push(`**Communication Hub:** issue #${issue}`);
  }
  if (retroPath) {
    lines.push(`**Active retro:** ${retroPath}`);
  }
  lines.push('');

  if (missionLines.length) {
    lines.push('**Mission Focus**');
    missionLines.forEach(line => lines.push(`- ${line}`));
    lines.push('');
  }

  if (responsibilityLines.length) {
    lines.push('**Key Responsibilities**');
    responsibilityLines.forEach(line => lines.push(`- ${line}`));
    lines.push('');
  }

  lines.push('**Operational Checklist**');
  if (cadenceLines.length) {
    cadenceLines.forEach(line => lines.push(`- ${line}`));
  }
  lines.push('- Follow the shared operating checklist for communication, retro capture, and governance signals.');
  lines.push('');

  lines.push('_Generated automatically via scripts/agent-bootstrap.mjs_');

  const output = lines.join('\n');
  if (args.output) {
    fs.writeFileSync(path.resolve(repoRoot, args.output), output, 'utf8');
  } else {
    process.stdout.write(output);
  }
}

try {
  main();
} catch (error) {
  console.error(`agent-bootstrap: ${error.message}`);
  process.exit(1);
}
