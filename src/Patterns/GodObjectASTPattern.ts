import { BasePattern } from './BasePattern';
import { Hint } from '../Reports/Hint';
import * as ts from 'typescript';

export class GodObjectASTPattern extends BasePattern {
    analyze(content: string): Hint[] {
        const hints: Hint[] = [];
        const sourceFile = ts.createSourceFile('file.ts', content, ts.ScriptTarget.Latest, true);
        
        function analyzeNode(node: ts.Node) {
            if (ts.isClassDeclaration(node) && node.members.length > 20) {  // Threshold can be adjusted
                const className = node.name ? node.name.getText() : 'Unnamed Class';
                hints.push(new Hint(`Possible God Object detected: ${className} has too many members.`));
            }
            node.forEachChild(analyzeNode);
        }

        analyzeNode(sourceFile);

        return hints;
    }
}