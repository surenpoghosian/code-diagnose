import { Report } from '../Reports/Report';

export abstract class BaseAnalyzer {
    abstract supports(file: string): boolean;
    abstract analyze(file: string): Report;
}