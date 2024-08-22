import { AnalysisStrategy } from './AnalysisStrategy';

class CompositeAnalyzer implements AnalysisStrategy {
  private strategies: AnalysisStrategy[] = [];

  public addStrategy(strategy: AnalysisStrategy): void {
    this.strategies.push(strategy);
  }

  public analyze(code: string): string[] {
    let issues: string[] = [];
    for (const strategy of this.strategies) {
      issues = issues.concat(strategy.analyze(code));
    }
    return issues;
  }
}

export default CompositeAnalyzer;