import { BaseAnalyzer } from './Analyzers/BaseAnalyzer';
import { TypeScriptAnalyzer } from './Analyzers/TypeScriptAnalyzer';
import { Report } from './Reports/Report';

export class AnalyzerEngine {
    private analyzers: BaseAnalyzer[] = [];

    constructor() {
        this.analyzers.push(new TypeScriptAnalyzer());
    }

    analyze(files: string[]): Report[] {
        const reports: Report[] = [];
        
        for (const file of files) {
            for (const analyzer of this.analyzers) {
                if (analyzer.supports(file)) {
                    reports.push(analyzer.analyze(file));
                }
            }
        }

        return reports;
    }
}