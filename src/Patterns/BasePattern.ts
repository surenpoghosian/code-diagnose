import { Hint } from '../Reports/Hint';

export abstract class BasePattern {
    /**
     * Analyzes the content of a file and returns an array of hints or suggestions.
     * 
     * @param content The content of the file to be analyzed.
     * @returns An array of Hint objects containing suggestions or warnings.
     */
    abstract analyze(content: string): Hint[];
}