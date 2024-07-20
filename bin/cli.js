#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const runCommand = (/** @type {string} */ command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const folderToExclude = 'bin'; // Folder to exclude

if (!repoName) {
  console.error('Please provide a name for your new project.');
  process.exit(1);
}

const gitCloneCommand = `git clone --depth 1 https://github.com/Kristoffer95/K95-starter ${repoName}`;

// Cloning the repository with name ${repoName}
const cloned = runCommand(gitCloneCommand);
if (!cloned) process.exit(-1);

// Remove the .git directory
const gitDirPath = path.join(repoName, '.git');
if (fs.existsSync(gitDirPath)) {
  fs.rmSync(gitDirPath, { recursive: true, force: true });
}

// Remove the bin folder
const folderToRemove = path.join(repoName, folderToExclude);
if (fs.existsSync(folderToRemove)) {
  // remove ${folderToExclude} folder
  fs.rmSync(folderToRemove, { recursive: true, force: true });
}

// Update package.json to add "private": true immediately below "type"
const packageJsonPath = path.join(repoName, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Reconstruct packageJson with "private" after "type"
  const updatedPackageJson = {};
  for (const [key, value] of Object.entries(packageJson)) {
    // @ts-ignore
    updatedPackageJson[key] = value;
    if (key === 'type') {
      // @ts-ignore
      updatedPackageJson.private = true;
    }
  }
  // @ts-ignore
  delete updatedPackageJson.bin;

  // Updated package.json to include "private": true immediately below "type"
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(updatedPackageJson, null, 2),
  );
}

// Reinitialize the Git repository
process.chdir(repoName);
const gitInitCommand = `git init`;
const reinitRepo = runCommand(gitInitCommand);
if (!reinitRepo) process.exit(-1);

// Duplicate .env.example to .env
const envExamplePath = path.join(process.cwd(), '.env.example');
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
}

console.log(
  '\nCongratulations! You are ready. Follow the following commands to start\n',
);
console.log(`cd ${repoName} && npm install && npm start\n`);
