import fs from 'fs';
import path from 'path';

import type { BuildOptions } from '../types';
import { sharedOptions } from './shared-options';
import { compile } from './compile';

const merge = Object.assign;
const CWD = process.cwd();

const buildOptions : BuildOptions = sharedOptions;

export function build( file : string, outFile: string, options?: BuildOptions ) {
    const opts = merge( {}, buildOptions, options );
    const cwd = path.resolve( opts.cwd || CWD );

    // eslint-disable-next-line no-param-reassign
    file = path.resolve( cwd, file );
    // eslint-disable-next-line no-param-reassign
    outFile = path.resolve( cwd, outFile );

    const result = compile( file, opts );

    fs.mkdirSync( path.dirname( outFile ), { recursive: true } );
    fs.writeFileSync( outFile, result.content );
}
