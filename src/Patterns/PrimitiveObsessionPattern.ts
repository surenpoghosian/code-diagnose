import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class PrimitiveObsessionPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const primitiveRegex = /\b(string|number|boolean)\b/g;
        const occurrences = new Map<string, number>();

        let match: RegExpExecArray | null;
        while ((match = primitiveRegex.exec(content)) !== null) {
            const type = match[0];
            occurrences.set(type, (occurrences.get(type) || 0) + 1);
        }

        occurrences.forEach((count, type) => {
            if (count > 10) {  // Threshold can be adjusted
                hints.push(new Hint(`Possible Primitive Obsession detected: "${type}" is used ${count} times. Consider encapsulating in a custom type.`));
            }
        });

        return hints;
    }
}