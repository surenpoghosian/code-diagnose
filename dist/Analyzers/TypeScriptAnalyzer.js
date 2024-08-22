"use strict";
// src/Analyzers/TypeScriptAnalyzer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptAnalyzer = void 0;
const BaseAnalyzer_1 = require("./BaseAnalyzer");
const Report_1 = require("../Reports/Report");
const CodeDuplicationPattern_1 = require("../Patterns/CodeDuplicationPattern");
const FileReader_1 = require("../Utils/FileReader");
class TypeScriptAnalyzer extends BaseAnalyzer_1.BaseAnalyzer {
    constructor() {
        super(...arguments);
        this.patterns = [new CodeDuplicationPattern_1.CodeDuplicationPattern()];
    }
    supports(file) {
        return file.endsWith('.ts');
    }
    analyze(file) {
        const content = FileReader_1.FileReader.read(file);
        const report = new Report_1.Report(file);
        for (const pattern of this.patterns) {
            const hints = pattern.analyze(content);
            report.addHints(hints);
        }
        return report;
    }
}
exports.TypeScriptAnalyzer = TypeScriptAnalyzer;
//# sourceMappingURL=TypeScriptAnalyzer.js.map