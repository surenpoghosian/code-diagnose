// src/Analyzers/TypeScriptAnalyzer.ts

import { BaseAnalyzer } from './BaseAnalyzer';
import { Report } from '../Reports/Report';
import { Hint } from '../Reports/Hint';
import { CodeDuplicationPattern } from '../Patterns/CodeDuplicationPattern';
import { FileReader } from '../Utils/FileReader';

export class TypeScriptAnalyzer extends BaseAnalyzer {
    private patterns = [new CodeDuplicationPattern()];

    supports(file: string): boolean {
        return file.endsWith('.ts');
    }

    analyze(file: string): Report {
        const content = FileReader.read(file);
        const report = new Report(file);

        for (const pattern of this.patterns) {
            const hints: Hint[] = pattern.analyze(content);
            report.addHints(hints);
        }

        return report;
    }
}