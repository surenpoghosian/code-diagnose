import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class LongParameterListPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const methodRegex = /\w+\(([^)]*)\)\s*\{/g;

        let match: RegExpExecArray | null;
        while ((match = methodRegex.exec(content)) !== null) {
            const params = match[1].split(',').map(param => param.trim());
            if (params.length > 5) {  // Threshold can be adjusted
                hints.push(new Hint(`Possible Long Parameter List detected: Method with ${params.length} parameters. Consider refactoring.`));
            }
        }

        return hints;
    }
}