#!/usr/bin/env node

// @ts-nocheck

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const askQuestions = async () => {
  const questions = [
    {
      name: 'projectName',
      type: 'input',
      message: 'Enter the project name:',
      when: () => !process.argv[2],
    },
    {
      name: 'runInstall',
      type: 'confirm',
      message: 'Do you want to run npm install after setup?',
      default: true,
    },
  ];
  return inquirer.prompt(questions);
};

const main = async () => {
  try {
    const answers = await askQuestions();
    const repoName = process.argv[2] || answers.projectName;
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

    if (answers.runInstall) {
      const installDeps = runCommand(`npm install`);
      if (!installDeps) process.exit(-1);
    }

    console.log(
      `\nCongratulations! you just installed ${chalk.yellow('@k95/starter')}. Follow the following commands to start\n`,
    );
    console.log(`cd ${repoName}\n`);

    console.log(`Fill the .env variables and you're ready to go. 🚀`);
  } catch (error) {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else if (error.message.includes('User force closed the prompt')) {
      console.log('Prompt was canceled by the user');
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
};

main();
