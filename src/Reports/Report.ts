import { Hint } from './Hint';

export class Report {
    private file: string;
    private hints: Hint[] = [];

    constructor(file: string) {
        this.file = file;
    }

    addHints(hints: Hint[]): void {
        this.hints.push(...hints);
    }

    generateSummary(): string {
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

    private getHintIcon(hint: Hint): string {
        // Example classification based on hint type or message
        if (hint.message.includes('error') || hint.message.includes('fail')) {
            return '❌'; // Red X for errors
        } else if (hint.message.includes('warning')) {
            return '⚠️'; // Warning sign
        } else if (hint.message.includes('note')) {
            return '📝'; // Note symbol for general information
        } else {
            return '💡'; // Light bulb for general hints
        }
    }
}