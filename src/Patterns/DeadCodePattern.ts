import { Hint } from '../Reports/Hint';
import { BasePattern } from './BasePattern';
import * as ts from 'typescript';

export class DeadCodePattern extends BasePattern {
  analyze(content: string): Hint[] {
    const sourceFile = ts.createSourceFile('file.ts', content, ts.ScriptTarget.ES2015, true);
    const hints: Hint[] = [];
    const declaredVariables = new Set<string>();
    const usedVariables = new Set<string>();

    const visit = (node: ts.Node) => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        declaredVariables.add(node.name.text);
      } else if (ts.isParameter(node) && ts.isIdentifier(node.name)) {
        declaredVariables.add(node.name.text);
      } else if (ts.isIdentifier(node)) {
        // Check if the identifier is used within an expression
        const parent = node.parent;
        if (parent && !ts.isVariableDeclaration(parent) && !ts.isParameter(parent)) {
          usedVariables.add(node.text);
        }
      }
      ts.forEachChild(node, visit);
    };

    visit(sourceFile);

    // Detect unused variables
    for (const variable of declaredVariables) {
      if (!usedVariables.has(variable)) {
        const hint = new Hint(`Unused variable '${variable}' detected.`);
        hints.push(hint);
      }
    }

    return hints;
  }
}