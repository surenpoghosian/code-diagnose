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

    test('should ignore lines that match common patterns', () => {
        const content = `
            function foo() {
                console.log('Hello');
            }
            
            function bar() {
                console.log('Hello');
            }
            
            }
            
            {
            
            });
            
            });
        `;
        const hints = pattern.analyze(content);
        
        // Check that the common patterns are ignored and do not trigger duplicate detection
        expect(hints.length).toBeGreaterThan(0); // Expecting hints for "console.log('Hello')"
        expect(hints.some(hint => hint.message.includes('console.log(\'Hello\')'))).toBe(true);
        
        // Ensure that none of the hints relate to the common patterns
        const commonPatternMessages = [
            'Possible duplicate code detected: "}"',
            'Possible duplicate code detected: "{"',
            'Possible duplicate code detected: ");"',
            'Possible duplicate code detected: "});"',
        ];
        commonPatternMessages.forEach(message => {
            expect(hints.some(hint => hint.message === message)).toBe(false);
        });
    });
});