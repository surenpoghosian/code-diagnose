import * as fs from 'fs';
import * as path from 'path';

export function getIgnorePatterns(basePath: string): string[] {
  const ignoreFilePath = path.join(basePath, '.diagnoseignore');
  if (!fs.existsSync(ignoreFilePath)) {
    return [];
  }

  const patterns = fs.readFileSync(ignoreFilePath, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));

  return patterns;
}