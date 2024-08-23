import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class MagicNumbersPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const magicNumberRegex = /\b\d+\b/g;
        const allowedNumbers = new Set([0, 1]); // Add more allowed numbers if necessary

        let match: RegExpExecArray | null;
        while ((match = magicNumberRegex.exec(content)) !== null) {
            const number = parseInt(match[0], 10);
            if (!allowedNumbers.has(number)) {
                hints.push(new Hint(`Possible Magic Number detected: "${number}" should be replaced with a named constant.`));
            }
        }

        return hints;
    }
}