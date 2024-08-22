"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzerEngine = void 0;
const TypeScriptAnalyzer_1 = require("./Analyzers/TypeScriptAnalyzer");
class AnalyzerEngine {
    constructor() {
        this.analyzers = [];
        this.analyzers.push(new TypeScriptAnalyzer_1.TypeScriptAnalyzer());
    }
    analyze(files) {
        const reports = [];
        for (const file of files) {
            for (const analyzer of this.analyzers) {
                if (analyzer.supports(file)) {
                    reports.push(analyzer.analyze(file));
                }
            }
        }
        return reports;
    }
}
exports.AnalyzerEngine = AnalyzerEngine;
//# sourceMappingURL=AnalyzerEngine.js.map