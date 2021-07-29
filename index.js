const fs = require('fs');
const path = require('path');
const merge = require('lodash.merge');

const { parse } = require('./src/parse.js');
const { replacePathVariables } = require('./src/templated-path.js');

/** @typedef { import('./src/types').BakaOptions } BakaOptions */

const importedFiles = new Set();
const importedPaths = [];
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
    importedPaths
};

/**
 * @param {BakaOptions} options
 */
function render( options ) {
    const opts = merge( {}, defaults, options );
    let result = '';

    opts.importedFiles.clear();

    result = parse( opts );

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
