import * as fs from 'fs';

export class FileReader {
    static read(filePath: string): string {
        return fs.readFileSync(filePath, 'utf-8');
    }
}