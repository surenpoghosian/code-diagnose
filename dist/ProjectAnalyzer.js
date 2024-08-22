"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAnalyzer = void 0;
exports.analyze = analyze;
const AnalyzerEngine_1 = require("./AnalyzerEngine");
const ignorePatterns_1 = require("./Utils/ignorePatterns");
const isIgnored_1 = require("./Utils/isIgnored");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
class ProjectAnalyzer {
    constructor(basePath) {
        this.engine = new AnalyzerEngine_1.AnalyzerEngine();
        this.ignorePatterns = (0, ignorePatterns_1.getIgnorePatterns)(basePath);
    }
    analyzeProject(directory) {
        const files = this.getAllFiles(directory);
        return this.engine.analyze(files);
    }
    getAllFiles(dir) {
        const results = [];
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                results.push(...this.getAllFiles(fullPath));
            }
            else if (stat.isFile() && !(0, isIgnored_1.isIgnored)(fullPath, this.ignorePatterns)) {
                results.push(fullPath);
            }
        });
        return results;
    }
}
exports.ProjectAnalyzer = ProjectAnalyzer;
// Exporting the main functionality of the package
function analyze(directory) {
    const analyzer = new ProjectAnalyzer(directory);
    const reports = analyzer.analyzeProject(directory);
    return reports.map(report => report.generateSummary());
}
//# sourceMappingURL=ProjectAnalyzer.js.map