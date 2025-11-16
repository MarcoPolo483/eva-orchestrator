#!/usr/bin/env node
/**
 * Update Dashboard Agent
 * 
 * Updates a GitHub Project (Projects v2) with repository information.
 * 
 * Usage:
 *   ts-node src/agents/update-dashboard-agent.ts --repo <owner/repo> --project "Project Name"
 * 
 * Environment Variables:
 *   GITHUB_TOKEN or GH_TOKEN - GitHub Personal Access Token with project and repo permissions
 */

import { Octokit } from "@octokit/rest";

interface Args {
  repo: string;
  project: string;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const parsed: Partial<Args> = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--repo" && i + 1 < args.length) {
      parsed.repo = args[i + 1];
      i++;
    } else if (args[i] === "--project" && i + 1 < args.length) {
      parsed.project = args[i + 1];
      i++;
    }
  }

  if (!parsed.repo || !parsed.project) {
    console.error("Usage: update-dashboard-agent --repo <owner/repo> --project \"Project Name\"");
    console.error("  --repo: Repository in format owner/repo (e.g., MarcoPolo483/eva-orchestrator)");
    console.error("  --project: GitHub Project name (e.g., \"EVA Agile Sprint 1\")");
    process.exit(1);
  }

  return parsed as Args;
}

async function getProjectId(
  octokit: Octokit,
  owner: string,
  projectName: string
): Promise<{ id: string; number: number } | null> {
  // GitHub Projects v2 uses GraphQL API
  const query = `
    query($owner: String!) {
      user(login: $owner) {
        projectsV2(first: 100) {
          nodes {
            id
            number
            title
          }
        }
      }
      organization(login: $owner) {
        projectsV2(first: 100) {
          nodes {
            id
            number
            title
          }
        }
      }
    }
  `;

  try {
    const response: any = await octokit.graphql(query, { owner });
    
    // Check user projects first
    const userProjects = response.user?.projectsV2?.nodes || [];
    const orgProjects = response.organization?.projectsV2?.nodes || [];
    const allProjects = [...userProjects, ...orgProjects];

    const project = allProjects.find((p: any) => p.title === projectName);
    
    if (project) {
      return {
        id: project.id,
        number: project.number
      };
    }

    return null;
  } catch (error: any) {
    if (error.status === 404) {
      console.error(`Owner '${owner}' not found or no access to projects`);
    } else {
      console.error("Error fetching projects:", error.message);
    }
    return null;
  }
}

async function getRepositoryInfo(octokit: Octokit, owner: string, repo: string) {
  try {
    const { data: repoData } = await octokit.repos.get({ owner, repo });
    const { data: issues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: "open",
      per_page: 100
    });

    const openIssues = issues.filter(i => !i.pull_request);
    const openPRs = issues.filter(i => i.pull_request);

    return {
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description,
      openIssues: openIssues.length,
      openPRs: openPRs.length,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      updatedAt: repoData.updated_at,
      language: repoData.language,
      url: repoData.html_url
    };
  } catch (error: any) {
    console.error(`Error fetching repository info: ${error.message}`);
    throw error;
  }
}

async function getProjectItems(octokit: Octokit, projectId: string) {
  const query = `
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          items(first: 100) {
            nodes {
              id
              content {
                ... on Issue {
                  id
                  number
                  title
                  repository {
                    nameWithOwner
                  }
                }
                ... on PullRequest {
                  id
                  number
                  title
                  repository {
                    nameWithOwner
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response: any = await octokit.graphql(query, { projectId });
    return response.node?.items?.nodes || [];
  } catch (error: any) {
    console.error("Error fetching project items:", error.message);
    return [];
  }
}

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    console.error("Missing GITHUB_TOKEN (or GH_TOKEN) environment variable.");
    console.error("Create a Personal Access Token with 'repo' and 'project' scopes.");
    process.exit(1);
  }

  const args = parseArgs();
  const [owner, repo] = args.repo.split("/");

  if (!owner || !repo) {
    console.error("Invalid repo format. Use: owner/repo");
    process.exit(1);
  }

  console.log(`🔍 Connecting to GitHub...`);
  const octokit = new Octokit({ auth: token });

  console.log(`📊 Fetching project: "${args.project}" for ${owner}`);
  const project = await getProjectId(octokit, owner, args.project);

  if (!project) {
    console.error(`❌ Project "${args.project}" not found for ${owner}`);
    console.error(`Make sure the project exists and you have access to it.`);
    process.exit(1);
  }

  console.log(`✅ Found project: ${args.project} (ID: ${project.id})`);

  console.log(`\n📦 Fetching repository info: ${owner}/${repo}`);
  const repoInfo = await getRepositoryInfo(octokit, owner, repo);

  console.log(`\n📈 Repository Dashboard Update:`);
  console.log(`─────────────────────────────────────────────────────`);
  console.log(`Repository: ${repoInfo.fullName}`);
  console.log(`Description: ${repoInfo.description || "N/A"}`);
  console.log(`Language: ${repoInfo.language || "N/A"}`);
  console.log(`Open Issues: ${repoInfo.openIssues}`);
  console.log(`Open PRs: ${repoInfo.openPRs}`);
  console.log(`Stars: ${repoInfo.stars}`);
  console.log(`Forks: ${repoInfo.forks}`);
  console.log(`Last Updated: ${new Date(repoInfo.updatedAt).toLocaleString()}`);
  console.log(`URL: ${repoInfo.url}`);
  console.log(`─────────────────────────────────────────────────────`);

  console.log(`\n🔗 Fetching project items...`);
  const items = await getProjectItems(octokit, project.id);
  console.log(`Found ${items.length} items in the project`);

  if (items.length > 0) {
    console.log(`\n📋 Project Items:`);
    items.forEach((item: any, index: number) => {
      const content = item.content;
      if (content) {
        const type = content.__typename === "Issue" ? "Issue" : "PR";
        const repo = content.repository?.nameWithOwner || "Unknown";
        console.log(`  ${index + 1}. [${type}] ${repo}#${content.number}: ${content.title}`);
      }
    });
  }

  console.log(`\n✨ Dashboard update complete!`);
  console.log(`\nNote: This agent currently displays project information.`);
  console.log(`To update project fields, custom fields would need to be configured`);
  console.log(`in the project settings and their IDs obtained via GraphQL.`);
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
