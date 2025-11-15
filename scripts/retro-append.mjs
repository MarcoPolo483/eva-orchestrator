#!/usr/bin/env node
/**
 * Append a retro note to a sprint retrospective markdown file.
 *
 * Parameters (CLI arguments):
 *   --retro <path>      Path to retro markdown file (relative or absolute). Required.
 *   --section <name>    Section heading to update (defaults to "What Went Well").
 *   --entry <text>      Retro feedback text. Required.
 *   --author <name>     Optional author label to include.
 *   --source <url>      Optional URL appended to the bullet as reference.
 *   --dry-run           Log intended change without modifying the file.
 */

import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const current = argv[i];
    if (!current.startsWith('--')) continue;
    const key = current.slice(2);
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

function resolveRetroPath(retroPath) {
  const resolved = path.isAbsolute(retroPath)
    ? retroPath
    : path.resolve(process.cwd(), retroPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Retro file not found: ${resolved}`);
  }
  return resolved;
}

function normaliseHeading(section) {
  return section.trim();
}

function ensureSection(lines, headingLine) {
  const normalisedHeading = headingLine.trim().toLowerCase();
  let index = lines.findIndex(line => line.trim().toLowerCase() === normalisedHeading);
  if (index !== -1) {
    return index;
  }

  if (lines.length && lines[lines.length - 1].trim() !== '') {
    lines.push('');
  }
  lines.push(headingLine, '');
  return lines.length - 2; // index of the heading just pushed
}

function sectionBounds(lines, headingIndex) {
  const start = headingIndex + 1;
  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      end = i;
      break;
    }
  }
  return { start, end };
}

function removePlaceholder(lines, start, end) {
  for (let i = start; i < end; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '-' || trimmed === '- ' || trimmed === '') {
      lines.splice(i, 1);
      return { start, end: end - 1 };
    }
  }
  return { start, end };
}

function ensureLeadingBlank(lines, start) {
  if (start >= lines.length) {
    lines.push('');
    return start;
  }
  if (lines[start].trim() === '') {
    return start;
  }
  lines.splice(start, 0, '');
  return start + 1;
}

function buildBullet(entry, author, source) {
  const date = new Date().toISOString().slice(0, 10);
  const metadata = [date];
  if (author) metadata.push(author.trim());
  const prefix = metadata.filter(Boolean).join(' – ');
  let text = entry.trim();
  if (!text) {
    throw new Error('Retro entry cannot be blank.');
  }
  if (source) {
    text = `${text} ([details](${source.trim()}))`;
  }
  return prefix ? `- ${prefix}: ${text}` : `- ${text}`;
}

function insertBullet(lines, start, end, bullet) {
  const sectionLines = lines.slice(start, end).map(line => line.trim());
  if (sectionLines.includes(bullet.trim())) {
    return { changed: false, reason: 'duplicate' };
  }

  let insertIndex = end;
  for (let i = end - 1; i >= start; i--) {
    if (lines[i].trim() !== '') {
      insertIndex = i + 1;
      break;
    }
  }

  if (insertIndex === start) {
    insertIndex = ensureLeadingBlank(lines, start) + 1;
  }

  lines.splice(insertIndex, 0, bullet);
  return { changed: true };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const env = process.env;

  const retroInput = args.retro ?? args.retroPath ?? env.RETRO_PATH ?? env.RETRO_FILE;
  if (!retroInput) {
    throw new Error('Missing retro path (set --retro or RETRO_PATH).');
  }
  const retroPath = resolveRetroPath(retroInput);

  const entry = args.entry ?? env.RETRO_ENTRY ?? env.RETRO_NOTE;
  if (!entry) {
    throw new Error('Missing retro entry (set --entry or RETRO_ENTRY).');
  }

  const sectionName = normaliseHeading(
    args.section ?? args.retroSection ?? env.RETRO_SECTION ?? 'What Went Well'
  );
  const headingLine = `## ${sectionName}`;

  const author = args.author ?? env.RETRO_AUTHOR ?? env.GITHUB_ACTOR ?? env.AUTHOR;
  const source = args.source ?? env.RETRO_SOURCE ?? env.RUN_URL;
  const dryRun = Boolean(args.dryRun || env.RETRO_DRY_RUN === '1');

  const raw = fs.readFileSync(retroPath, 'utf8');
  const lines = raw.split(/\r?\n/);

  const headingIndex = ensureSection(lines, headingLine);
  const bounds = sectionBounds(lines, headingIndex);
  const adjusted = removePlaceholder(lines, bounds.start, bounds.end);
  const bullet = buildBullet(entry, author, source);
  const result = insertBullet(lines, adjusted.start, adjusted.end, bullet);

  if (!result.changed) {
    console.log(`retro-append: skipping (${result.reason})`);
    return;
  }

  const updated = lines.join('\n').replace(/\n{3,}/g, '\n\n');

  if (dryRun) {
    console.log('retro-append: dry run, updated content:\n');
    console.log(updated);
    return;
  }

  fs.writeFileSync(retroPath, `${updated}\n`, 'utf8');
  console.log(`retro-append: added entry to ${retroPath}`);
}

try {
  main();
} catch (error) {
  console.error(`retro-append: ${error.message}`);
  process.exit(1);
}
