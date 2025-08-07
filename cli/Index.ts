#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ncp } from 'ncp';

const templateDir = path.join(__dirname, '../template');
const targetDir = process.argv[2] || 'my-demo-app';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
  ncp(templateDir, targetDir, function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log(`🚀 Project created in ${targetDir}`);
    }
  });
} else {
  console.error(`❌ Directory ${targetDir} already exists.`);
  process.exit(1);
}
