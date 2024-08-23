import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class SpeculativeGeneralityPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const interfaceRegex = /interface\s+\w+\s*\{[^]*?\}/g;

        let match: RegExpExecArray | null;
        while ((match = interfaceRegex.exec(content)) !== null) {
            const interfaceBody = match[0];
            if (interfaceBody.includes('<T>') && !interfaceBody.includes('T used')) { // Simplified check for generic misuse
                hints.push(new Hint(`Possible Speculative Generality detected: Interface uses generics without clear necessity.`));
            }
        }

        return hints;
    }
}