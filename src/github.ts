import { Octokit } from "@octokit/rest";
import path from "node:path";
import { promises as fs } from "node:fs";

export type RepoSpec = {
  owner: string;
  name: string;
  private?: boolean;
  defaultBranch?: string;
};

export async function ensureRepo(octokit: Octokit, spec: RepoSpec) {
  try {
    await octokit.repos.get({ owner: spec.owner, repo: spec.name });
    return;
  } catch (e: any) {
    if (e?.status !== 404) throw e;
  }

  // Try create in org first; if it fails, fall back to create for user
  try {
    await octokit.repos.createInOrg({
      org: spec.owner,
      name: spec.name,
      private: spec.private ?? true,
      has_issues: true,
      has_projects: true,
      has_wiki: false,
      auto_init: true
    });
  } catch (e: any) {
    if (e?.status !== 404 && e?.status !== 422) throw e;
    // Fall back to user-owned repo
    await octokit.repos.createForAuthenticatedUser({
      name: spec.name,
      private: spec.private ?? true,
      has_issues: true,
      has_projects: true,
      has_wiki: false,
      auto_init: true
    });
    // If created under the authed user but spec.owner is different, user must have rights in that owner
  }
}

export async function upsertLabel(octokit: Octokit, owner: string, repo: string, name: string, color = "0E8A16", description?: string) {
  try {
    await octokit.issues.getLabel({ owner, repo, name });
  } catch (e: any) {
    if (e?.status !== 404) throw e;
    await octokit.issues.createLabel({ owner, repo, name, color, description });
    return;
  }
  try {
    await octokit.issues.updateLabel({ owner, repo, name, color, description });
  } catch {
    // ignore
  }
}

export async function ensureTrackingIssue(octokit: Octokit, owner: string, repo: string, title: string, body: string) {
  const issues = await octokit.issues.listForRepo({ owner, repo, state: "open" });
  const existing = issues.data.find(i => i.title === title);
  if (existing) {
    await octokit.issues.update({ owner, repo, issue_number: existing.number, body });
  } else {
    await octokit.issues.create({ owner, repo, title, body });
  }
}

export async function putFile(
  octokit: Octokit,
  owner: string,
  repo: string,
  filePath: string,
  content: string,
  message: string
) {
  // Read existing sha (if any)
  let sha: string | undefined;
  try {
    const res = await octokit.repos.getContent({ owner, repo, path: filePath });
    if (!Array.isArray(res.data) && "sha" in res.data) sha = (res.data as any).sha;
  } catch (e: any) {
    if (e?.status !== 404) throw e;
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    sha
  });
}

export async function pushDirectory(
  octokit: Octokit,
  owner: string,
  repo: string,
  localDir: string,
  commitPrefix = "chore: scaffold"
) {
  const files = await listFilesRecursive(localDir);
  for (const rel of files) {
    const full = path.join(localDir, rel);
    const buf = await fs.readFile(full);
    await putFile(octokit, owner, repo, rel.replace(/\\/g, "/"), buf.toString("utf8"), `${commitPrefix}: ${rel}`);
  }
}

async function listFilesRecursive(dir: string, base = dir): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await listFilesRecursive(p, base)));
    } else {
      out.push(path.relative(base, p));
    }
  }
  return out;
}