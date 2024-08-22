"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CodeAnalyzer_1 = __importDefault(require("./optimization/CodeAnalyzer"));
const AnalysisStrategy_1 = require("./optimization/AnalysisStrategy");
const CompositeAnalyzer_1 = __importDefault(require("./optimization/CompositeAnalyzer"));
// Single Strategy
const singleAnalyzer = new CodeAnalyzer_1.default(new AnalysisStrategy_1.DuplicatedCodeAnalyzer());
const singleIssues = singleAnalyzer.analyze('some code with duplicates');
console.log('Single Analyzer Issues:', singleIssues);
// Composite Strategy
const compositeAnalyzer = new CompositeAnalyzer_1.default();
compositeAnalyzer.addStrategy(new AnalysisStrategy_1.DuplicatedCodeAnalyzer());
compositeAnalyzer.addStrategy(new AnalysisStrategy_1.LongMethodAnalyzer());
const compositeIssues = compositeAnalyzer.analyze('some code with various issues');
console.log('Composite Analyzer Issues:', compositeIssues);
