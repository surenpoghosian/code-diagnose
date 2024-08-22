"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompositeAnalyzer {
    constructor() {
        this.strategies = [];
    }
    addStrategy(strategy) {
        this.strategies.push(strategy);
    }
    analyze(code) {
        let issues = [];
        for (const strategy of this.strategies) {
            issues = issues.concat(strategy.analyze(code));
        }
        return issues;
    }
}
exports.default = CompositeAnalyzer;
