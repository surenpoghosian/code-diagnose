// src/Patterns/MagicNumbersPattern.test.ts
import { MagicNumbersPattern } from '../src/Patterns/MagicNumbersPattern';

describe('MagicNumbersPattern', () => {
    let pattern: MagicNumbersPattern;

    beforeEach(() => {
        pattern = new MagicNumbersPattern();
    });

    test('should detect magic numbers', () => {
        const content = `
            function calculateArea(radius: number) {
                return radius * 3.14159; // Magic Number
            }
        `;
        const hints = pattern.analyze(content);
        expect(hints.length).toBeGreaterThan(0); // Expect detection of Magic Numbers
        expect(hints[0].message).toContain('Possible Magic Number detected');
    });

    // test('should not flag named constants', () => {
    //     const content = `
    //         const PI = 3.14159;
    //         function calculateArea(radius: number) {
    //             return radius * PI; // Named constant
    //         }
    //     `;
    //     const hints = pattern.analyze(content);
    //     expect(hints.length).toBe(0); // No Magic Numbers detected
    // });
});