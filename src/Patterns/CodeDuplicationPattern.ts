import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';

export class CodeDuplicationPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        
        // Split the content into lines and group them by their occurrence
        const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const lineCounts = new Map<string, number>();
        
        lines.forEach(line => {
            lineCounts.set(line, (lineCounts.get(line) || 0) + 1);
        });

        // Analyze lines with multiple occurrences
        lineCounts.forEach((count, line) => {
            if (count > 1) {
                hints.push(new Hint(`Possible duplicate code detected: "${line}" appears ${count} times.`));
            }
        });

        // Further enhance detection by analyzing functional blocks (e.g., functions)
        const blocks = this.extractCodeBlocks(content);
        const blockCounts = new Map<string, number>();
        
        blocks.forEach(block => {
            const trimmedBlock = block.trim();
            blockCounts.set(trimmedBlock, (blockCounts.get(trimmedBlock) || 0) + 1);
        });

        // Detect duplicated blocks of code
        blockCounts.forEach((count, block) => {
            if (count > 1) {
                hints.push(new Hint(`Possible duplicate block detected: "${block}" appears ${count} times.`));
            }
        });

        return hints;
    }

    private extractCodeBlocks(content: string): string[] {
        // Basic implementation to extract code blocks (e.g., functions)
        // This needs to be improved based on actual use cases and language syntax
        const blocks: string[] = [];
        const regex = /(?:function|class|if|for|while|switch|try|catch|finally)[^]*?\{[^]*?\}/g;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(content)) !== null) {
            blocks.push(match[0]);
        }

        return blocks;
    }
}