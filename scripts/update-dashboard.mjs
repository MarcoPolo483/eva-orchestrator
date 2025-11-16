#!/usr/bin/env node
/**
 * Update a GitHub Project (dashboard) with repository issues and pull requests.
 * 
 * Usage:
 *   npm run update-dashboard -- --repo owner/repo --project "Project Name"
 * 
 * Parameters:
 *   --repo <owner/repo>     Repository in owner/repo format. Required.
 *   --project <name>        Project title to update. Required.
 *   --dry-run               Log intended changes without modifying the project.
 * 
 * Environment:
 *   GITHUB_TOKEN            GitHub personal access token with repo and project scopes.
 */

import { Octokit } from '@octokit/rest';

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
    args[key] = value;
    i += 1;
  }
  return args;
}

function parseRepo(repoStr) {
  const parts = repoStr.split('/');
  if (parts.length !== 2) {
    throw new Error(`Invalid repo format: ${repoStr}. Expected: owner/repo`);
  }
  return { owner: parts[0], repo: parts[1] };
}

async function findProject(octokit, owner, projectTitle) {
  // Use GraphQL to find the project by title
  const query = `
    query($owner: String!, $projectTitle: String!) {
      repositoryOwner(login: $owner) {
        ... on Organization {
          projectsV2(first: 100, query: $projectTitle) {
            nodes {
              id
              title
              number
            }
          }
        }
        ... on User {
          projectsV2(first: 100, query: $projectTitle) {
            nodes {
              id
              title
              number
            }
          }
        }
      }
    }
  `;

  const result = await octokit.graphql(query, { owner, projectTitle });
  const projects = result.repositoryOwner?.projectsV2?.nodes || [];
  
  // Find exact match
  const project = projects.find(p => p.title === projectTitle);
  if (!project) {
    throw new Error(`Project "${projectTitle}" not found for owner ${owner}`);
  }
  
  return project;
}

async function getRepositoryIssues(octokit, owner, repo) {
  const issues = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    const response = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'all',
      per_page: perPage,
      page
    });
    
    if (response.data.length === 0) break;
    
    // Filter out pull requests (issues API returns both)
    const actualIssues = response.data.filter(issue => !issue.pull_request);
    issues.push(...actualIssues);
    
    if (response.data.length < perPage) break;
    page++;
  }
  
  return issues;
}

async function getRepositoryPullRequests(octokit, owner, repo) {
  const prs = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    const response = await octokit.pulls.list({
      owner,
      repo,
      state: 'all',
      per_page: perPage,
      page
    });
    
    if (response.data.length === 0) break;
    prs.push(...response.data);
    
    if (response.data.length < perPage) break;
    page++;
  }
  
  return prs;
}

async function getProjectItems(octokit, projectId) {
  // Use GraphQL to get project items
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
                  state
                  repository {
                    nameWithOwner
                  }
                }
                ... on PullRequest {
                  id
                  number
                  title
                  state
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
  
  const result = await octokit.graphql(query, { projectId });
  return result.node?.items?.nodes || [];
}

async function addItemToProject(octokit, projectId, contentId, dryRun = false) {
  if (dryRun) {
    console.log(`[DRY-RUN] Would add item ${contentId} to project ${projectId}`);
    return;
  }
  
  const mutation = `
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
        item {
          id
        }
      }
    }
  `;
  
  try {
    await octokit.graphql(mutation, { projectId, contentId });
  } catch (error) {
    // Item might already be in the project
    if (!error.message?.includes('already exists')) {
      throw error;
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  
  if (!args.repo) {
    throw new Error('Missing --repo parameter. Usage: --repo owner/repo');
  }
  
  if (!args.project) {
    throw new Error('Missing --project parameter. Usage: --project "Project Name"');
  }
  
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    throw new Error('Missing GITHUB_TOKEN or GH_TOKEN environment variable');
  }
  
  const { owner, repo } = parseRepo(args.repo);
  const projectTitle = args.project;
  const dryRun = args.dryRun || false;
  
  const octokit = new Octokit({ auth: token });
  
  console.log(`Repository: ${owner}/${repo}`);
  console.log(`Project: ${projectTitle}`);
  console.log(`Dry run: ${dryRun ? 'YES' : 'NO'}`);
  console.log('');
  
  // Find the project
  console.log('Finding project...');
  const project = await findProject(octokit, owner, projectTitle);
  console.log(`Found project: ${project.title} (ID: ${project.id})`);
  console.log('');
  
  // Get existing project items
  console.log('Fetching existing project items...');
  const projectItems = await getProjectItems(octokit, project.id);
  const existingContentIds = new Set(
    projectItems
      .map(item => item.content?.id)
      .filter(Boolean)
  );
  console.log(`Found ${existingContentIds.size} existing items in project`);
  console.log('');
  
  // Get repository issues
  console.log('Fetching repository issues...');
  const issues = await getRepositoryIssues(octokit, owner, repo);
  console.log(`Found ${issues.length} issues`);
  
  // Get repository pull requests
  console.log('Fetching repository pull requests...');
  const prs = await getRepositoryPullRequests(octokit, owner, repo);
  console.log(`Found ${prs.length} pull requests`);
  console.log('');
  
  // Add issues to project
  let addedCount = 0;
  console.log('Adding issues to project...');
  for (const issue of issues) {
    if (!existingContentIds.has(issue.node_id)) {
      await addItemToProject(octokit, project.id, issue.node_id, dryRun);
      addedCount++;
      if (!dryRun) {
        console.log(`Added issue #${issue.number}: ${issue.title}`);
      }
    }
  }
  
  // Add pull requests to project
  console.log('Adding pull requests to project...');
  for (const pr of prs) {
    if (!existingContentIds.has(pr.node_id)) {
      await addItemToProject(octokit, project.id, pr.node_id, dryRun);
      addedCount++;
      if (!dryRun) {
        console.log(`Added PR #${pr.number}: ${pr.title}`);
      }
    }
  }
  
  console.log('');
  console.log('Summary:');
  console.log(`- Total issues: ${issues.length}`);
  console.log(`- Total PRs: ${prs.length}`);
  console.log(`- Already in project: ${existingContentIds.size}`);
  console.log(`- ${dryRun ? 'Would add' : 'Added'}: ${addedCount}`);
  console.log('');
  console.log('Dashboard update complete!');
}

try {
  main();
} catch (error) {
  console.error(`update-dashboard: ${error.message}`);
  process.exit(1);
}
