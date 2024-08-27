"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeDuplicationPattern = void 0;
const BasePattern_1 = require("./BasePattern");
const Hint_1 = require("../Reports/Hint");
class CodeDuplicationPattern extends BasePattern_1.BasePattern {
    analyze(content) {
        const hints = [];
        const commonPatterns = [
            /^\}$/, // single closing curly brace
            /^\{$/, // single opening curly brace
            /^\);$/, // closing parenthesis followed by a semicolon
            /^\}\);$/, // closing curly brace followed by closing parenthesis and semicolon
        ];
        const lines = content.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !this.isCommonLine(line, commonPatterns));
        const lineCounts = new Map();
        lines.forEach(line => {
            lineCounts.set(line, (lineCounts.get(line) || 0) + 1);
        });
        // Analyze lines with multiple occurrences
        lineCounts.forEach((count, line) => {
            if (count > 1) {
                hints.push(new Hint_1.Hint(`Possible duplicate code detected: "${line}" appears ${count} times.`));
            }
        });
        // Further enhance detection by analyzing functional blocks (e.g., functions)
        const blocks = this.extractCodeBlocks(content);
        const blockCounts = new Map();
        blocks.forEach(block => {
            const trimmedBlock = block.trim();
            blockCounts.set(trimmedBlock, (blockCounts.get(trimmedBlock) || 0) + 1);
        });
        // Detect duplicated blocks of code
        blockCounts.forEach((count, block) => {
            if (count > 1) {
                hints.push(new Hint_1.Hint(`Possible duplicate block detected: "${block}" appears ${count} times.`));
            }
        });
        return hints;
    }
    isCommonLine(line, patterns) {
        return patterns.some(pattern => pattern.test(line));
    }
    extractCodeBlocks(content) {
        // Basic implementation to extract code blocks (e.g., functions)
        // This needs to be improved based on actual use cases and language syntax
        const blocks = [];
        const regex = /(?:function|class|if|for|while|switch|try|catch|finally)[^]*?\{[^]*?\}/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            blocks.push(match[0]);
        }
        return blocks;
    }
}
exports.CodeDuplicationPattern = CodeDuplicationPattern;
//# sourceMappingURL=CodeDuplicationPattern.js.map