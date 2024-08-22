import { AnalysisStrategy } from './AnalysisStrategy';

class CodeAnalyzer {
  private strategy: AnalysisStrategy;

  constructor(strategy: AnalysisStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: AnalysisStrategy): void {
    this.strategy = strategy;
  }

  public analyze(code: string): string[] {
    return this.strategy.analyze(code);
  }
}

export default CodeAnalyzer;