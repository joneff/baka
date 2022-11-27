import path from 'path';
import glob from 'glob';

import type { CompileOptions, CompileResult } from '../types';
import { sharedOptions } from './shared-options';
import { parse } from './parse';

const merge = Object.assign;
const CWD = process.cwd();

const compileOptions : CompileOptions = sharedOptions;

export function compile( file: string, options : CompileOptions ) : CompileResult {
    const opts = merge( {}, compileOptions, options );
    const cwd = path.resolve( opts.cwd || CWD );
    let result = [
        '// This file is auto-generated. Do not edit!',
        `// baka:source ${path.resolve(file).replace(`${cwd}/`,'')}`,
        '\n'
    ].join('\n');

    opts.importedFiles.clear();
    opts.ignoredFiles.clear();

    const ignorePatterns = opts.ignorePatterns.join(',');
    const ignoredFiles = ignorePatterns.length > 0
        ? glob.sync( ignorePatterns, { cwd: cwd } )
        : [];

    ignoredFiles.forEach( file => {
        opts.ignoredFiles.add( path.resolve( file ) );
    });

    result += parse( file, opts );

    return {
        content: result,
        // @ts-ignore: Type 'string[]' is not assignable to type 'URL[]'.
        loadedUrls: Array.from( opts.importedFiles )
    };
}
