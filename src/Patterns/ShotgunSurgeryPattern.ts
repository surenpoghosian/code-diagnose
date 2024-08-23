import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class ShotgunSurgeryPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const functionRegex = /function\s+(\w+)\s*\(.*?\)\s*\{([^]*?)\}/g; // Match function bodies
        const variableRegex = /\b(\w+)\b\s*=\s*[^;]*;/g; // Match variable assignments

        const variableUsage = new Map<string, Set<string>>();
        let functionMatch: RegExpExecArray | null;

        while ((functionMatch = functionRegex.exec(content)) !== null) {
            const functionBody = functionMatch[2];
            const functionName = functionMatch[1];

            let variableMatch: RegExpExecArray | null;
            while ((variableMatch = variableRegex.exec(functionBody)) !== null) {
                const variableName = variableMatch[1];
                if (!variableUsage.has(variableName)) {
                    variableUsage.set(variableName, new Set());
                }
                variableUsage.get(variableName)!.add(functionName);
            }
        }

        variableUsage.forEach((functions, variable) => {
            if (functions.size > 1) {  // Adjust threshold as needed
                hints.push(new Hint(`Possible Shotgun Surgery detected: "${variable}" is modified in ${functions.size} functions.`));
            }
        });

        return hints;
    }
}