import { AnalyzerEngine } from './AnalyzerEngine';
import { getIgnorePatterns } from './Utils/ignorePatterns';
import { isIgnored } from './Utils/isIgnored';
import { Report } from './Reports/Report';
import * as path from 'path';
import * as fs from 'fs';

export class ProjectAnalyzer {
  private engine: AnalyzerEngine;
  private ignorePatterns: string[];

  constructor(basePath: string) {
    this.engine = new AnalyzerEngine();
    this.ignorePatterns = getIgnorePatterns(basePath);
  }

  analyzeProject(directory: string): Report[] {
    const files = this.getAllFiles(directory);
    return this.engine.analyze(files);
  }

  private getAllFiles(dir: string): string[] {
    const results: string[] = [];

    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        results.push(...this.getAllFiles(fullPath));
      } else if (stat.isFile() && !isIgnored(fullPath, this.ignorePatterns)) {
        results.push(fullPath);
      }
    });

    return results;
  }
}

// Exporting the main functionality of the package
export function analyze(directory: string): string[] {
  const analyzer = new ProjectAnalyzer(directory);
  const reports = analyzer.analyzeProject(directory);

  return reports.map(report => report.generateSummary());
}