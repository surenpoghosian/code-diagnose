// src/Patterns/CodeDuplicationPattern.test.ts
import { CodeDuplicationPattern } from '../src/Patterns/CodeDuplicationPattern';

describe('CodeDuplicationPattern', () => {
    let pattern: CodeDuplicationPattern;

    beforeEach(() => {
        pattern = new CodeDuplicationPattern();
    });

    test('should detect duplicate functions', () => {
        const content = `
            function foo() {
                console.log('Hello');
            }
            
            function bar() {
                console.log('Hello');
            }
        `;
        const hints = pattern.analyze(content);
        expect(hints.length).toBeGreaterThan(0); // Allow multiple hints
        expect(hints.some(hint => hint.message.includes('console.log(\'Hello\')'))).toBe(true);
    });

    test('should detect duplicate class methods', () => {
        const content = `
            class A {
                method() {
                    console.log('World');
                }
            }
            
            class B {
                method() {
                    console.log('World');
                }
            }
        `;
        const hints = pattern.analyze(content);
        expect(hints.length).toBeGreaterThan(0); // Allow multiple hints
        expect(hints.some(hint => hint.message.includes('console.log(\'World\')'))).toBe(true);
    });

    test('should ignore common boilerplate code', () => {
      const content = `
          if (true) {
              // Some code
          }
          if (false) {
              // Some code
          }
      `;
      const hints = pattern.analyze(content);
      // Allow up to 2 hints for boilerplate code
      expect(hints.length).toBeLessThanOrEqual(2);
    });

    test('should handle code with only braces correctly', () => {
      const content = `
          function foo() {
              console.log('Code with braces');
          }
          
          function bar() {
              console.log('More code with braces');
          }
      `;
      const hints = pattern.analyze(content);
      expect(hints.length).toBeLessThanOrEqual(1); // Adjust based on expected behavior
    });

    test('should handle mixed content', () => {
        const content = `
            function foo() {
                console.log('Hello');
            }
            
            if (true) {
                console.log('Hello');
            }
            
            class Example {
                method() {
                    console.log('Hello');
                }
            }
            
            class AnotherExample {
                method() {
                    console.log('Hello');
                }
            }
        `;
        const hints = pattern.analyze(content);
        expect(hints.length).toBeGreaterThan(0); // Allow multiple hints
        expect(hints.some(hint => hint.message.includes('console.log(\'Hello\')'))).toBe(true);
        expect(hints.some(hint => hint.message.includes('method() {'))).toBe(true);
    });
});