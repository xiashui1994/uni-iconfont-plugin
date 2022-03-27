#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import colors from 'colors';
import minimist from 'minimist';

const args = minimist<{ output: string }>(process.argv.slice(2));

let outputPath = 'iconfont.json';

if (args.output && typeof args.output === 'string') {
  outputPath = args.output;
  if (outputPath.split('.').pop() !== 'json') {
    outputPath += '.json';
  }
}

const targetFile = path.resolve(outputPath);

if (fs.existsSync(targetFile)) {
  console.error(colors.red(`File "${outputPath}" was created before.`));
} else {
  fse.copySync(path.join(__dirname, '../../src/libs/iconfont.json'), targetFile);
  console.log(colors.green(`File "${outputPath}" is created now. We recommend you add it to version control.`));
}
