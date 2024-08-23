"use strict";
// src/Analyzers/TypeScriptAnalyzer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptAnalyzer = void 0;
const BaseAnalyzer_1 = require("./BaseAnalyzer");
const Report_1 = require("../Reports/Report");
const CodeDuplicationPattern_1 = require("../Patterns/CodeDuplicationPattern");
const FileReader_1 = require("../Utils/FileReader");
const CodeSmellPattern_1 = require("../Patterns/CodeSmellPattern");
const GodObjectASTPattern_1 = require("../Patterns/GodObjectASTPattern");
const GodeObjectPattern_1 = require("../Patterns/GodeObjectPattern");
const MagicNumbersPattern_1 = require("../Patterns/MagicNumbersPattern");
const ShotgunSurgeryPattern_1 = require("../Patterns/ShotgunSurgeryPattern");
const LargeClassPattern_1 = require("../Patterns/LargeClassPattern");
const LazyClassPattern_1 = require("../Patterns/LazyClassPattern");
const LongParameterListPattern_1 = require("../Patterns/LongParameterListPattern");
const MiddleManPattern_1 = require("../Patterns/MiddleManPattern");
const PrimitiveObsessionPattern_1 = require("../Patterns/PrimitiveObsessionPattern");
const SpeculativeGeneralityPattern_1 = require("../Patterns/SpeculativeGeneralityPattern");
const SwitchStatementOverusePattern_1 = require("../Patterns/SwitchStatementOverusePattern");
class TypeScriptAnalyzer extends BaseAnalyzer_1.BaseAnalyzer {
    constructor() {
        super(...arguments);
        this.patterns = [
            new CodeDuplicationPattern_1.CodeDuplicationPattern(),
            new CodeSmellPattern_1.CodeSmellPattern(),
            new GodObjectASTPattern_1.GodObjectASTPattern(),
            new GodeObjectPattern_1.GodObjectPattern(),
            new MagicNumbersPattern_1.MagicNumbersPattern(),
            new ShotgunSurgeryPattern_1.ShotgunSurgeryPattern(),
            new LargeClassPattern_1.LargeClassPattern(),
            new LazyClassPattern_1.LazyClassPattern(),
            new LongParameterListPattern_1.LongParameterListPattern(),
            new MiddleManPattern_1.MiddleManPattern(),
            new PrimitiveObsessionPattern_1.PrimitiveObsessionPattern(),
            new SpeculativeGeneralityPattern_1.SpeculativeGeneralityPattern(),
            new SwitchStatementOverusePattern_1.SwitchStatementOverusePattern(),
            // Add other patterns here...
        ];
    }
    supports(file) {
        return file.endsWith('.ts');
    }
    analyze(file) {
        const content = FileReader_1.FileReader.read(file);
        const report = new Report_1.Report(file);
        for (const pattern of this.patterns) {
            const hints = pattern.analyze(content);
            report.addHints(hints);
        }
        return report;
    }
}
exports.TypeScriptAnalyzer = TypeScriptAnalyzer;
//# sourceMappingURL=TypeScriptAnalyzer.js.map