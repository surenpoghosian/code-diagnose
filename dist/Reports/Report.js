"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
class Report {
    constructor(file) {
        this.hints = [];
        this.file = file;
    }
    addHints(hints) {
        this.hints.push(...hints);
    }
    generateSummary() {
        const fileTitle = `\n📁 File: ${this.file}\n`;
        const hintsTitle = `💡 Hints:\n`;
        const hintsList = this.hints
            .map((hint, index) => {
            const icon = this.getHintIcon(hint);
            return `  ${index + 1}. ${icon} ${hint.message}`;
        })
            .join('\n');
        return `${fileTitle}${hintsTitle}${hintsList}`;
    }
    getHintIcon(hint) {
        // Example classification based on hint type or message
        if (hint.message.includes('error') || hint.message.includes('fail')) {
            return '❌'; // Red X for errors
        }
        else if (hint.message.includes('warning')) {
            return '⚠️'; // Warning sign
        }
        else if (hint.message.includes('note')) {
            return '📝'; // Note symbol for general information
        }
        else {
            return '💡'; // Light bulb for general hints
        }
    }
}
exports.Report = Report;
//# sourceMappingURL=Report.js.map