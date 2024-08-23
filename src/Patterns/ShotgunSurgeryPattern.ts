import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class ShotgunSurgeryPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const methodOrPropertyRegex = /\b\w+\b/g;
        const occurrences = new Map<string, number>();

        let match: RegExpExecArray | null;
        while ((match = methodOrPropertyRegex.exec(content)) !== null) {
            const name = match[0];
            occurrences.set(name, (occurrences.get(name) || 0) + 1);
        }

        occurrences.forEach((count, name) => {
            if (count > 5) {  // Threshold can be adjusted
                hints.push(new Hint(`Possible Shotgun Surgery detected: "${name}" is modified in ${count} places.`));
            }
        });

        return hints;
    }
}