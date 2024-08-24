// src/Analyzers/TypeScriptAnalyzer.ts

import { BaseAnalyzer } from './BaseAnalyzer';
import { Report } from '../Reports/Report';
import { Hint } from '../Reports/Hint';
import { CodeDuplicationPattern } from '../Patterns/CodeDuplicationPattern';
import { FileReader } from '../Utils/FileReader';
import { CodeSmellPattern } from '../Patterns/CodeSmellPattern';
import { GodObjectASTPattern } from '../Patterns/GodObjectASTPattern';
import { GodObjectPattern } from '../Patterns/GodeObjectPattern';
import { MagicNumbersPattern } from '../Patterns/MagicNumbersPattern';
import { ShotgunSurgeryPattern } from '../Patterns/ShotgunSurgeryPattern';
import { LargeClassPattern } from '../Patterns/LargeClassPattern';
import { LazyClassPattern } from '../Patterns/LazyClassPattern';
import { LongParameterListPattern } from '../Patterns/LongParameterListPattern';
import { MiddleManPattern } from '../Patterns/MiddleManPattern';
import { PrimitiveObsessionPattern } from '../Patterns/PrimitiveObsessionPattern';
import { SpeculativeGeneralityPattern } from '../Patterns/SpeculativeGeneralityPattern';
import { SwitchStatementOverusePattern } from '../Patterns/SwitchStatementOverusePattern';
import { DeadCodePattern } from '../Patterns/DeadCodePattern';

export class TypeScriptAnalyzer extends BaseAnalyzer {
    private patterns = [
        new CodeDuplicationPattern(),
        new CodeSmellPattern(),
        new GodObjectASTPattern(),
        new GodObjectPattern(),
        new MagicNumbersPattern(),
        new ShotgunSurgeryPattern(),
        new LargeClassPattern(),
        new LazyClassPattern(),
        new LongParameterListPattern(),
        new MiddleManPattern(),
        new PrimitiveObsessionPattern(),
        new SpeculativeGeneralityPattern(),
        new SwitchStatementOverusePattern(),
        new DeadCodePattern(),
        // Add other patterns here...
    ];

    supports(file: string): boolean {
        return file.endsWith('.ts');
    }

    analyze(file: string): Report {
        const content = FileReader.read(file);
        const report = new Report(file);

        for (const pattern of this.patterns) {
            const hints: Hint[] = pattern.analyze(content);
            report.addHints(hints);
        }

        return report;
    }
}