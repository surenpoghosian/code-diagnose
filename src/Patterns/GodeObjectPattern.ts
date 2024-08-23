import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class GodObjectPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const classRegex = /class\s+\w+\s*\{[^]*?\}/g;
        const methodRegex = /(?:public|private|protected|static)?\s*(?:async\s+)?(?:function)?\s*\w+\(.*?\)\s*\{[^]*?\}/g;
        const propertyRegex = /(?:public|private|protected|static)?\s*(?:async\s+)?\w+\s*:\s*\w+\s*;/g;

        let match: RegExpExecArray | null;
        while ((match = classRegex.exec(content)) !== null) {
            const classBody = match[0];
            const methodCount = (classBody.match(methodRegex) || []).length;
            const propertyCount = (classBody.match(propertyRegex) || []).length;

            if (methodCount > 10 || propertyCount > 10) {  // Threshold can be adjusted
                hints.push(new Hint(`Possible God Object detected: Class has ${methodCount} methods and ${propertyCount} properties.`));
            }
        }

        return hints;
    }
}