import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class MiddleManPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const methodDelegationRegex = /\w+\(\s*\)\s*{\s*return\s+\w+\.\w+\(\);?\s*}/g;

        let match: RegExpExecArray | null;
        while ((match = methodDelegationRegex.exec(content)) !== null) {
            hints.push(new Hint(`Possible Middle Man detected: This method simply delegates its work to another method. Consider removing it.`));
        }

        return hints;
    }
}