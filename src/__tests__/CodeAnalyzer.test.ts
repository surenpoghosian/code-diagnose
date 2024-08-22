import { describe, it, expect } from 'vitest';
import CodeAnalyzer from '../optimization/CodeAnalyzer';
import { DuplicatedCodeAnalyzer, LongMethodAnalyzer } from '../optimization/AnalysisStrategy';
import CompositeAnalyzer from '../optimization/CompositeAnalyzer';

describe('CodeAnalyzer', () => {
  it('should detect duplicated code', () => {
    const analyzer = new CodeAnalyzer(new DuplicatedCodeAnalyzer());
    const issues = analyzer.analyze('some code with duplicates');
    expect(issues).toEqual([]); // Replace with expected issues
  });

  it('should detect long methods', () => {
    const analyzer = new CodeAnalyzer(new LongMethodAnalyzer());
    const issues = analyzer.analyze('some long method code');
    expect(issues).toEqual([]); // Replace with expected issues
  });

  it('should combine multiple analysis strategies', () => {
    const compositeAnalyzer = new CompositeAnalyzer();
    compositeAnalyzer.addStrategy(new DuplicatedCodeAnalyzer());
    compositeAnalyzer.addStrategy(new LongMethodAnalyzer());
    const issues = compositeAnalyzer.analyze('some code with duplicates and long methods');
    expect(issues).toEqual([]); // Replace with expected issues
  });
});