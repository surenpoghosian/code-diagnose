import CodeAnalyzer from './optimization/CodeAnalyzer';
import { DuplicatedCodeAnalyzer, LongMethodAnalyzer } from './optimization/AnalysisStrategy';
import CompositeAnalyzer from './optimization/CompositeAnalyzer';

// Single Strategy
const singleAnalyzer = new CodeAnalyzer(new DuplicatedCodeAnalyzer());
const singleIssues = singleAnalyzer.analyze('some code with duplicates');
console.log('Single Analyzer Issues:', singleIssues);

// Composite Strategy
const compositeAnalyzer = new CompositeAnalyzer();
compositeAnalyzer.addStrategy(new DuplicatedCodeAnalyzer());
compositeAnalyzer.addStrategy(new LongMethodAnalyzer());
const compositeIssues = compositeAnalyzer.analyze('some code with various issues');
console.log('Composite Analyzer Issues:', compositeIssues);