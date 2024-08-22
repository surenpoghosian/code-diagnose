import { TypeScriptAnalyzer } from '../src/Analyzers/TypeScriptAnalyzer';
import { FileReader } from '../src/Utils/FileReader';
import { Hint } from '../src/Reports/Hint';
import { CodeDuplicationPattern } from '../src/Patterns/CodeDuplicationPattern';

jest.mock('../src/Utils/FileReader');

describe('TypeScriptAnalyzer', () => {
    let analyzer: TypeScriptAnalyzer;

    beforeEach(() => {
        analyzer = new TypeScriptAnalyzer();
    });

    it('should analyze TypeScript files for code duplication', () => {
        (FileReader.read as jest.Mock).mockReturnValue(`
            const a = 1;
            const b = 2;
            const a = 1;  // Duplicate
            const c = 3;
            const a = 1;  // Duplicate
        `);

        const report = analyzer.analyze('test-file.ts');

        expect(report).toBeInstanceOf(Report);
        expect(report.generateSummary()).toContain('Duplicate code detected: "const a = 1;" appears 3 times.');
    });
});