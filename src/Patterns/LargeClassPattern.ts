import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class LargeClassPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const classRegex = /class\s+\w+\s*\{[^]*?\}/g;
        const methodRegex = /(?:public|private|protected|static)?\s*(?:async\s+)?(?:function)?\s*\w+\(.*?\)\s*\{[^]*?\}/g;
        const propertyRegex = /(?:public|private|protected|static)?\s*\w+\s*:\s*\w+\s*;/g;

        let match: RegExpExecArray | null;
        while ((match = classRegex.exec(content)) !== null) {
            const classBody = match[0];
            const methodCount = (classBody.match(methodRegex) || []).length;
            const propertyCount = (classBody.match(propertyRegex) || []).length;

            if (methodCount > 15 || propertyCount > 15) {  // Threshold can be adjusted
                hints.push(new Hint(`Possible Large Class detected: This class has ${methodCount} methods and ${propertyCount} properties. Consider splitting it into smaller classes.`));
            }
        }

        return hints;
    }
}