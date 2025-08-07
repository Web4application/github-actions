#!/usr/bin/env node

const { cpSync, existsSync, mkdirSync, statSync, readdirSync } = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.name === 'node_modules' || entry.name === '.git') continue;

    if (entry.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyRecursiveSync(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

const targetDir = process.argv[2] || 'my-demo-app';
const templateDir = path.join(__dirname, '..'); // assumes the template is one level up

if (!existsSync(targetDir)) {
  mkdirSync(targetDir);
  copyRecursiveSync(templateDir, targetDir);
  console.log(`🚀 Project created in ${targetDir}`);
} else {
  console.error(`❌ Directory "${targetDir}" already exists.`);
  process.exit(1);
}
