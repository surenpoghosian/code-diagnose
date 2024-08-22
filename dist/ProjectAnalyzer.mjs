import { AnalyzerEngine } from './AnalyzerEngine';
import { getIgnorePatterns } from './Utils/ignorePatterns';
import { isIgnored } from './Utils/isIgnored';
import * as path from 'path';
import * as fs from 'fs';
export class ProjectAnalyzer {
    constructor(basePath) {
        this.engine = new AnalyzerEngine();
        this.ignorePatterns = getIgnorePatterns(basePath);
    }
    analyzeProject(directory) {
        const files = this.getAllFiles(directory);
        return this.engine.analyze(files);
    }
    getAllFiles(dir) {
        const results = [];
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                results.push(...this.getAllFiles(fullPath));
            }
            else if (stat.isFile() && !isIgnored(fullPath, this.ignorePatterns)) {
                results.push(fullPath);
            }
        });
        return results;
    }
}
// Exporting the main functionality of the package
export function analyze(directory) {
    const analyzer = new ProjectAnalyzer(directory);
    const reports = analyzer.analyzeProject(directory);
    return reports.map(report => report.generateSummary());
}
//# sourceMappingURL=ProjectAnalyzer.mjs.map