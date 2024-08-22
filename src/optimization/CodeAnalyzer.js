"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CodeAnalyzer {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    analyze(code) {
        return this.strategy.analyze(code);
    }
}
exports.default = CodeAnalyzer;
