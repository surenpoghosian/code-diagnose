import * as path from 'path';

// Utility function to check if a file should be ignored
export function isIgnored(filePath: string, ignorePatterns: string[]): boolean {
  const relativePath = path.relative(process.cwd(), filePath);

  return ignorePatterns.some(pattern => {
    const regex = new RegExp(
      pattern
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.')
        .replace(/\//g, '\\/')
    );

    return regex.test(relativePath);
  });
}