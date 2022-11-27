import path from 'path';
import glob from 'glob';

import type { BuildOptions, OutputOptions } from '../types';
import { sharedOptions } from './shared-options';
import { build } from './build';
import { replacePathVariables } from './templated-path';

const merge = Object.assign;
const CWD = process.cwd();

const buildOptions : BuildOptions = sharedOptions;

export function buildFiles( fileOrGlob: string | string[], output: OutputOptions, options?: BuildOptions ) {
    const opts = merge( {}, buildOptions, options );
    const cwd = path.resolve( opts.cwd || CWD );

    // eslint-disable-next-line no-param-reassign
    output = {
        path: path.resolve( cwd, output.path || 'dist' ),
        filename: output.filename || '[name]-flat[ext]'
    };

    if ( !Array.isArray(fileOrGlob) ) {
        // eslint-disable-next-line no-param-reassign
        fileOrGlob = [ fileOrGlob ];
    }

    fileOrGlob.forEach( entry => {
        const files = glob.sync( entry, { cwd: cwd } );

        files.forEach( file => {
            // eslint-disable-next-line no-param-reassign
            file = path.resolve( cwd, file );

            const outFile = path.resolve(
                output.path,
                replacePathVariables( output.filename, file )
            );

            build( file, outFile, opts );
        });
    });
}
