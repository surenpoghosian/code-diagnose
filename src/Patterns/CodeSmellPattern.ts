import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class CodeSmellPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];

        // Deep Nesting
        const deepNestingRegex = /if\s*\([^\)]+\)\s*\{[^]*(if\s*\([^\)]+\)\s*\{[^]*(if\s*\([^\)]+\)\s*\{[^]*\})\})\}/g;
        let match: RegExpExecArray | null;
        while ((match = deepNestingRegex.exec(content)) !== null) {
            hints.push(new Hint(`Possible deep nesting detected. Consider refactoring.`));
        }

        // Long Methods
        const methodRegex = /(?:public|private|protected|static)?\s*(?:async\s+)?(?:function)?\s*\w+\(.*?\)\s*\{[^]*?\}/g;
        while ((match = methodRegex.exec(content)) !== null) {
            const methodBody = match[0];
            const lineCount = methodBody.split('\n').length;
            if (lineCount > 50) {  // Threshold can be adjusted
                hints.push(new Hint(`Possible long method detected with ${lineCount} lines. Consider refactoring.`));
            }
        }

        return hints;
    }
}