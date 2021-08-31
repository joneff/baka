const fs = require('fs');
const path = require('path');
const glob = require('glob');
const merge = require('lodash.merge');

const { parse } = require('./src/parse.js');
const { replacePathVariables } = require('./src/templated-path.js');

/** @typedef { import('./src/types').BakaOptions } BakaOptions */

const importedFiles = new Set();
const importedPaths = [];
const ignoredFiles = new Set();
const ignorePatterns = [];
const cwd = process.cwd();

/** @type BakaOptions */
const defaults = {
    cwd,
    root: true,
    output: {
        path: path.join(cwd, 'dist'),
        filename: '[name]-flat[ext]'
    },
    importedFiles,
    importedPaths,
    ignoredFiles,
    ignorePatterns
};

/**
 * @param {BakaOptions} options
 */
function render( options ) {
    const opts = merge( {}, defaults, options );
    let result = [
        '// This file is auto-generated. Do not edit!',
        `// baka:source ${path.posix.resolve(opts.file).replace(`${opts.cwd}/`)}`,
        '\n'
    ].join('\n');

    opts.importedFiles.clear();
    opts.ignoredFiles.clear();

    const ignorePatterns = opts.ignorePatterns.join(',');
    const ignoredFiles = ignorePatterns.length > 0
        ? glob.sync( ignorePatterns, { cwd: opts.cwd } )
        : [];

    ignoredFiles.forEach(file => {
        opts.ignoredFiles.add(path.resolve(file));
    });

    result += parse( opts );

    return result;
}

/**
 * @param {BakaOptions} options
 */
function build( options ) {
    const opts = merge( {}, defaults, options );
    const output = opts.output;
    let outFile = path.resolve( output.path, replacePathVariables(output.filename, opts.file) );
    let result = '';

    result = render( opts );

    fs.mkdirSync(output.path, { recursive: true });
    fs.writeFileSync(outFile, result);
}


module.exports.build = build;
module.exports.render = render;
