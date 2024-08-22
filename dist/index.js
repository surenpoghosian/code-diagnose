#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const ProjectAnalyzer_1 = require("./ProjectAnalyzer");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('A project analyzer CLI tool')
    .option('-d, --directory <type>', 'Specify the project directory to analyze')
    .parse(process.argv);
const options = program.opts();
if (options.directory) {
    const reports = (0, ProjectAnalyzer_1.analyze)(options.directory);
    reports.forEach(report => {
        console.log(report);
    });
}
else {
    console.error('Please specify a directory to analyze using the --directory option.');
    process.exit(1);
}
//# sourceMappingURL=index.js.map