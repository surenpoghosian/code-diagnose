import { DeadCodePattern } from '../src/Patterns/DeadCodePattern';
import { Hint } from '../src/Reports/Hint';

describe('DeadCodePattern', () => {
    const deadCodePattern = new DeadCodePattern();

    it('should detect unused variables', () => {
        const content = `
            const unusedVar = 42;
            const usedVar = 7;
            console.log(usedVar);
        `;

        const hints: Hint[] = deadCodePattern.analyze(content);

        expect(hints).toHaveLength(1);
        expect(hints[0].message).toMatch(/Unused variable 'unusedVar' detected/);
    });

    it('should detect unused function parameters', () => {
        const content = `
            function myFunction(usedParam, unusedParam) {
                console.log(usedParam);
            }
        `;

        const hints: Hint[] = deadCodePattern.analyze(content);

        expect(hints).toHaveLength(1);
        expect(hints[0].message).toMatch(/Unused variable 'unusedParam' detected/);
    });

    it('should not flag used variables', () => {
        const content = `
            const usedVar1 = 42;
            const usedVar2 = 7;
            console.log(usedVar1, usedVar2);
        `;

        const hints: Hint[] = deadCodePattern.analyze(content);

        expect(hints).toHaveLength(0);
    });

    it('should not flag global variables or imports', () => {
        const content = `
            import { someFunction } from 'someModule';

            const usedVar = 7;
            console.log(usedVar);

            someFunction();
        `;

        const hints: Hint[] = deadCodePattern.analyze(content);

        expect(hints).toHaveLength(0);
    });

    it('should detect unused variables within functions', () => {
        const content = `
            function myFunction() {
                const unusedVar = 42;
                const usedVar = 7;
                console.log(usedVar);
            }
        `;

        const hints: Hint[] = deadCodePattern.analyze(content);

        expect(hints).toHaveLength(1);
        expect(hints[0].message).toMatch(/Unused variable 'unusedVar' detected/);
    });
});