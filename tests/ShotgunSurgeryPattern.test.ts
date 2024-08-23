// src/Patterns/ShotgunSurgeryPattern.test.ts
import { ShotgunSurgeryPattern } from '../src/Patterns/ShotgunSurgeryPattern';

describe('ShotgunSurgeryPattern', () => {
    let pattern: ShotgunSurgeryPattern;

    beforeEach(() => {
        pattern = new ShotgunSurgeryPattern();
    });

    // test('should detect repeated variable usage across different functions', () => {
    //   const content = `
    //       let user = { name: 'John' };

    //       function updateName() {
    //           user.name = 'John';
    //       }
    //       function updateAddress() {
    //           user.address = '123 Street';
    //       }
    //       function updatePhone() {
    //           user.phone = '123-456-7890';
    //       }
    //   `;
    //   const hints = pattern.analyze(content);
    //   expect(hints.length).toBeGreaterThan(0); // Expect detection of Shotgun Surgery
    //   expect(hints[0].message).toContain('Possible Shotgun Surgery detected');
    // });

    test('should not flag unrelated functions', () => {
        const content = `
            function addUser() {
                let user = { name: 'John' };
            }
            function addAddress() {
                let address = '123 Street';
            }
            function addPhone() {
                let phone = '123-456-7890';
            }
        `;
        const hints = pattern.analyze(content);
        expect(hints.length).toBe(0); // No Shotgun Surgery detected
    });

    test('should not flag named constants', () => {
      const content = `
          const PI = 3.14159;
          function calculateArea(radius: number) {
              return radius * PI; // Named constant
          }
      `;
      const hints = pattern.analyze(content);
      expect(hints.length).toBe(0); // No Magic Numbers detected
    });
});