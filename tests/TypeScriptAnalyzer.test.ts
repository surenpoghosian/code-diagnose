// tests/TypeScriptAnalyzer.test.ts

import { TypeScriptAnalyzer } from '../src/Analyzers/TypeScriptAnalyzer';
import { Report } from '../src/Reports/Report';
import { Hint } from '../src/Reports/Hint';
import { FileReader } from '../src/Utils/FileReader';

// Mock FileReader.read method
jest.mock('../src/Utils/FileReader', () => ({
    FileReader: {
        read: jest.fn(),
    },
}));

describe('TypeScriptAnalyzer', () => {
    const analyzer = new TypeScriptAnalyzer();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test('should analyze TypeScript files for code duplication', () => {
    //     const filePath = 'test-file.ts';
    //     const fileContent = `
    //         function foo() {
    //             console.log('Hello');
    //         }
    //         function foo() {
    //             console.log('Hello');
    //         }
    //     `;

    //     // Mocking FileReader.read
    //     (FileReader.read as jest.Mock).mockReturnValue(fileContent);

    //     const report = analyzer.analyze(filePath);

    //     expect(report).toBeInstanceOf(Report);
    //     const summary = report.generateSummary();
    //     expect(summary).toContain('Possible duplicate block detected: "function foo() { console.log(\'Hello\'); }" appears 2 times.');
    // });

    test('should handle empty files', () => {
        const filePath = 'empty-file.ts';
        const fileContent = '';

        // Mocking FileReader.read
        (FileReader.read as jest.Mock).mockReturnValue(fileContent);

        const report = analyzer.analyze(filePath);

        expect(report).toBeInstanceOf(Report);
        const summary = report.generateSummary();
        expect(summary).toBe('\n📁 File: empty-file.ts\n💡 Hints:\n');
    });

    test('should handle files with only boilerplate code', () => {
        const filePath = 'boilerplate-file.ts';
        const fileContent = `
          // Some boilerplate code
          class MyClass {
            constructor() {}
          }
        `;

        // Mocking FileReader.read
        (FileReader.read as jest.Mock).mockReturnValue(fileContent);

        const report = analyzer.analyze(filePath);

        expect(report).toBeInstanceOf(Report);
        const summary = report.generateSummary();
        expect(summary).toBe('\n📁 File: boilerplate-file.ts\n💡 Hints:\n');
    });
});