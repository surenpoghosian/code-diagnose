"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const CodeAnalyzer_1 = __importDefault(require("../optimization/CodeAnalyzer"));
const AnalysisStrategy_1 = require("../optimization/AnalysisStrategy");
const CompositeAnalyzer_1 = __importDefault(require("../optimization/CompositeAnalyzer"));
(0, vitest_1.describe)('CodeAnalyzer', () => {
    (0, vitest_1.it)('should detect duplicated code', () => {
        const analyzer = new CodeAnalyzer_1.default(new AnalysisStrategy_1.DuplicatedCodeAnalyzer());
        const issues = analyzer.analyze('some code with duplicates');
        (0, vitest_1.expect)(issues).toEqual([]); // Replace with expected issues
    });
    (0, vitest_1.it)('should detect long methods', () => {
        const analyzer = new CodeAnalyzer_1.default(new AnalysisStrategy_1.LongMethodAnalyzer());
        const issues = analyzer.analyze('some long method code');
        (0, vitest_1.expect)(issues).toEqual([]); // Replace with expected issues
    });
    (0, vitest_1.it)('should combine multiple analysis strategies', () => {
        const compositeAnalyzer = new CompositeAnalyzer_1.default();
        compositeAnalyzer.addStrategy(new AnalysisStrategy_1.DuplicatedCodeAnalyzer());
        compositeAnalyzer.addStrategy(new AnalysisStrategy_1.LongMethodAnalyzer());
        const issues = compositeAnalyzer.analyze('some code with duplicates and long methods');
        (0, vitest_1.expect)(issues).toEqual([]); // Replace with expected issues
    });
});
