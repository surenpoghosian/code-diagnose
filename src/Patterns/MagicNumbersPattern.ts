import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class MagicNumbersPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const magicNumberRegex = /\b\d+\b/g;
        const namedConstantRegex = /const\s+(\w+)\s*=\s*(\d+)/g; // Match named constants

        const namedConstants = new Set<string>();
        let constantMatch: RegExpExecArray | null;

        while ((constantMatch = namedConstantRegex.exec(content)) !== null) {
            namedConstants.add(constantMatch[2]); // Add constant values
        }

        let numberMatch: RegExpExecArray | null;
        while ((numberMatch = magicNumberRegex.exec(content)) !== null) {
            const number = numberMatch[0];
            if (!namedConstants.has(number)) {
                hints.push(new Hint(`Possible Magic Number detected: "${number}" should be replaced with a named constant.`));
            }
        }

        return hints;
    }
}