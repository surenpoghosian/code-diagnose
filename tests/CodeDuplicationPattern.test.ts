import { CodeDuplicationPattern } from '../src/Patterns/CodeDuplicationPattern';
import { Hint } from '../src/Reports/Hint';

describe('CodeDuplicationPattern', () => {
    let pattern: CodeDuplicationPattern;

    beforeEach(() => {
        pattern = new CodeDuplicationPattern();
    });

    it('should detect duplicate lines of code', () => {
        const content = `
            const a = 1;
            const b = 2;
            const a = 1;  // Duplicate
            const c = 3;
            const a = 1;  // Duplicate
        `;

        const hints = pattern.analyze(content);

        expect(hints).toHaveLength(2);
        expect(hints).toEqual(expect.arrayContaining([
            expect.objectContaining({ message: 'Duplicate code detected: "const a = 1;" appears 3 times.' })
        ]));
    });

    it('should not detect false positives', () => {
        const content = `
            const a = 1;
            const b = 2;
            const c = 3;
        `;

        const hints = pattern.analyze(content);

        expect(hints).toHaveLength(0);
    });
});