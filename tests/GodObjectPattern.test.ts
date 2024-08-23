// src/Patterns/GodObjectPattern.test.ts
import { GodObjectPattern } from "../src/Patterns/GodeObjectPattern";

describe('GodObjectPattern', () => {
    let pattern: GodObjectPattern;

    beforeEach(() => {
        pattern = new GodObjectPattern();
    });


    // test('should detect a class with too many methods', () => {
    //   const content = `
    //       class GodClass {
    //           method1() {}
    //           method2() {}
    //           method3() {}
    //           method4() {}
    //           method5() {}
    //           // Add more methods to trigger detection
    //       }
    //   `;
    //   const hints = pattern.analyze(content);
    //   expect(hints.length).toBeGreaterThan(0); // Expect detection of God Object
    //   expect(hints[0].message).toContain('Possible God Object detected');
    // });

    test('should not flag a class with a reasonable number of methods', () => {
        const content = `
            class ReasonableClass {
                method1() {}
                method2() {}
                method3() {}
            }
        `;
        const hints = pattern.analyze(content);
        expect(hints.length).toBe(0); // No God Object detected
    });
});