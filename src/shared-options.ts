import type { SharedOptions } from '../types';

const importedFiles : Set<string> = new Set();
const importedPaths : Array<string> = [];
const ignoredFiles : Set<string> = new Set();
const ignorePatterns : Array<string> = [];
const CWD = process.cwd();

export const sharedOptions : SharedOptions = <SharedOptions> {
    cwd: CWD,
    root: true,
    importedFiles,
    importedPaths,
    ignoredFiles,
    ignorePatterns
};
