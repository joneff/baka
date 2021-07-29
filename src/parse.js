const fs = require('fs');
const path = require('path');
const importResolver = require('@joneff/sass-import-resolver');

/** @typedef { import('./types').BakaOptions } BakaOptions */

const RE_IMPORT = /^[ \t]*@import\s+["']?(.*?)["']?;?$/gm;

/**
 * @param {String} matchedLine
 * @param {BakaOptions} context
 */
function importReplacer( matchedLine, matchedPath, context ) {
    const {
        cwd,
        nodeModules,
        importedPaths
    } = context;
    const result = [];
    let url;

    url = importResolver.resolve({
        file: matchedPath,
        prev: importedPaths[ importedPaths.length - 1 ],
        nodeModules: nodeModules
    });

    result.push(`// #region ${matchedLine} -> ${url.replace(cwd, '').replace(/\\/g, '/')}`);
    result.push( parse( { ...context, root: false, file: url } ) );
    result.push('// #endregion');

    return result.join('\n');
}

/**
 * @param {BakaOptions} options
 */
function parse( options ) {

    let {
        cwd,
        file,
        root,
        importedFiles,
        importedPaths
    } = options;

    if (importedFiles.has( file )) {
        return [
            `// #region @import ${file.replace(cwd, '').replace(/\\/g, '/')}`,
            '// File already imported_once. Skipping output.',
            '// #endregion'
        ].join('\n');
    }

    const buffer = fs.readFileSync(file, 'utf8');
    let output = '';

    importedPaths.push(path.dirname( file ));
    importedFiles.add( file );

    if (root === true) {
        output = [
            '// This file is auto-generated. Do not edit!',
            `// baka:source ${file.replace(cwd, '').replace(/\\/g, '/')}`,
            '\n'
        ].join('\n');
    }

    output += buffer.replace(RE_IMPORT, ( match, filePath ) => {
        return importReplacer( match, filePath, options );
    });

    importedPaths.pop();

    return output;
}

module.exports.parse = parse;
