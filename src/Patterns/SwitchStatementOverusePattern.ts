import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class SwitchStatementOverusePattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const switchRegex = /switch\s*\(.*?\)\s*\{[^]*?\}/g;

        let match: RegExpExecArray | null;
        while ((match = switchRegex.exec(content)) !== null) {
            const caseCount = (match[0].match(/case\s+/g) || []).length;
            if (caseCount > 5) {  // Threshold can be adjusted
                hints.push(new Hint(`Possible Switch Statement Overuse detected: This switch statement has ${caseCount} cases. Consider refactoring.`));
            }
        }

        return hints;
    }
}