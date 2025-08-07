#!/usr/bin/env ts-node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('kubu-hai')
  .description('CLI for the Kubu-Hai project')
  .version('1.0.0');

// Example: create new project
program
  .command('create <project-name>')
  .description('Create a new Kubu-Hai app')
  .action((projectName: string) => {
    const templateDir = path.join(__dirname, '..', 'template');
    const targetDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      console.error(`❌ Directory "${projectName}" already exists.`);
      process.exit(1);
    }

    fs.mkdirSync(targetDir);
    fs.cpSync(templateDir, targetDir, { recursive: true });
    console.log(`🚀 Project created at ${targetDir}`);
  });

// Example: say hello
program
  .command('hello')
  .description('Prints hello message')
  .action(() => {
    console.log('👋 Hello from Kubu-Hai CLI!');
  });

program.parse(process.argv);
