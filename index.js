/// <reference path="./types/index.d.ts" />

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const merge = require('lodash.merge');

const { parse } = require('./src/parse.js');
const { replacePathVariables } = require('./src/templated-path.js');

const importedFiles = new Set();
const importedPaths = [];
const ignoredFiles = new Set();
const ignorePatterns = [];
const CWD = process.cwd();

/** @type {SharedOptions} */
const sharedOptions = {
    cwd: CWD,
    root: true,
    importedFiles,
    importedPaths,
    ignoredFiles,
    ignorePatterns
};
/** @type {CompileOptions} */
const compileOptions = merge( {}, sharedOptions );

/** @type {BuildOptions} */
const buildOptions = merge( {}, sharedOptions );

/**
 * @param {string} file
 * @param {CompileOptions=} options
 */
function compile( file, options ) {
    const opts = merge( {}, compileOptions, options );
    const cwd = path.resolve(opts.cwd || CWD);
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

    ignoredFiles.forEach(file => {
        opts.ignoredFiles.add(path.resolve(file));
    });

    result += parse( file, opts );

    return {
        content: result,
        loadedUrls: Array.from(opts.importedFiles)
    };
}

/**
 * @param {string} file
 * @param {string} outFile
 * @param {BuildOptions=} options
 */
function build( file, outFile, options ) {
    const opts = merge( {}, buildOptions, options );
    const cwd = path.resolve(opts.cwd || CWD);

    // eslint-disable-next-line no-param-reassign
    file = path.resolve( cwd, file );
    // eslint-disable-next-line no-param-reassign
    outFile = path.resolve( cwd, outFile );

    const result = compile( file, opts );

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, result.content);
}

/**
 * @param {string | string[]} fileOrGlob
 * @param {OutputOptions} output
 * @param {BuildFilesOptions=} options
 */
function buildFiles( fileOrGlob, output = {}, options ) {
    const opts = merge( {}, buildOptions, options );
    const cwd = path.resolve(opts.cwd || CWD);

    // eslint-disable-next-line no-param-reassign
    output = {
        path: path.resolve(cwd, output.path || 'dist'),
        filename: output.filename || '[name]-flat[ext]'
    };

    if (!Array.isArray(fileOrGlob)) {
        // eslint-disable-next-line no-param-reassign
        fileOrGlob = [ fileOrGlob ];
    }

    fileOrGlob.forEach(entry => {
        const files = glob.sync(entry, { cwd: cwd });

        files.forEach(file => {
            // eslint-disable-next-line no-param-reassign
            file = path.resolve(cwd, file);

            const outFile = path.resolve(
                output.path,
                replacePathVariables(output.filename, file)
            );

            build( file, outFile, opts );
        });
    });
}


module.exports = {
    build,
    buildFiles,
    compile
};
