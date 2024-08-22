#!/usr/bin/env node

import { Command } from 'commander';
import { analyze } from './ProjectAnalyzer';

const program = new Command();

program
  .version('1.0.0')
  .description('A project analyzer CLI tool')
  .option('-d, --directory <type>', 'Specify the project directory to analyze')
  .parse(process.argv);

const options = program.opts();

if (options.directory) {
  const reports = analyze(options.directory);
  reports.forEach(report => {
    console.log(report);
  });
} else {
  console.error('Please specify a directory to analyze using the --directory option.');
  process.exit(1);
}