#!/usr/bin/env node

import { execSync } from 'child_process';

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

const gitCheckoutCommand = `git clone --depth 1 https://github.com/Kristoffer95/K95-starter ${repoName}`;
// const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

// console.log(`Installing dependencies for ${repoName}`);
// const installedDeps = runCommand(installDepsCommand);
// if (!installedDeps) process.exit(-1);

console.log(`\n\n`);
console.log("Do the following commands and you're ready to go! 🥳");
console.log(`cd ${repoName} && npm install`);
console.log(
  `create a .env file and copy and fill the variables from .env.example`,
);
console.log(`then do \`make dev\``);

console.log(`\n\n`);

console.log('NOTE: you can remove the `bin` folder as it\'s not used and in the package.json you can replace the bin to `"private": true`');