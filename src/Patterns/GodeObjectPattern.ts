import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class GodObjectPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const classRegex = /class\s+(\w+)\s*\{([^]*?)\}/g; // Match class bodies
        const methodRegex = /(?:public|private|protected|static)?\s*(?:async\s+)?(?:function|method)\s*\w+\s*\(.*?\)\s*\{[^]*?\}/g;
        const propertyRegex = /(?:public|private|protected|static)?\s*\w+\s*:\s*\w+\s*;/g;

        let classMatch: RegExpExecArray | null;
        while ((classMatch = classRegex.exec(content)) !== null) {
            const classBody = classMatch[2];
            const methodCount = (classBody.match(methodRegex) || []).length;
            const propertyCount = (classBody.match(propertyRegex) || []).length;

            if (methodCount > 10 || propertyCount > 10) {  // Adjust thresholds as needed
                hints.push(new Hint(`Possible God Object detected: Class has ${methodCount} methods and ${propertyCount} properties.`));
            }
        }

        return hints;
    }
}