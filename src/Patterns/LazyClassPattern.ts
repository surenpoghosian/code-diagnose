import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class LazyClassPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const classRegex = /class\s+\w+\s*\{[^]*?\}/g;

        let match: RegExpExecArray | null;
        while ((match = classRegex.exec(content)) !== null) {
            const classBody = match[0];
            const methodCount = (classBody.match(/(?:public|private|protected|static)?\s*(?:async\s+)?(?:function)?\s*\w+\(.*?\)\s*\{[^]*?\}/g) || []).length;

            if (methodCount <= 1) {
                hints.push(new Hint(`Possible Lazy Class detected: This class has only ${methodCount} method(s). Consider merging it with another class.`));
            }
        }

        return hints;
    }
}