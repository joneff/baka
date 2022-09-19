const fs = require('fs');
const path = require('path');
const importResolver = require('@joneff/sass-import-resolver');

const RE_IMPORT = /^[ \t]*@import[ \t]+["']?(.*?)["']?;[ \t]*(?:\/\/)?[ \t]*(.*?)?$/gm;

function normalizePath(url, cwd) {
    let result = path.posix.resolve(url);

    if (typeof cwd === 'string') {
        result = result.replace(`${cwd}/`, '');
    }

    return result;
}

/**
 * @param {String} matchedLine
 * @param {BakaOptions} context
 */
function importReplacer( matchedLine, matchedPath, annotation, context ) {
    const {
        importedPaths,
        ignoredFiles
    } = context;
    const cwd = path.resolve(context.cwd || process.cwd());
    const nodeModules = path.resolve( cwd, context.nodeModules || 'node_modules');
    const result = [];
    let url;
    let directive;

    if (typeof annotation === 'string' && annotation.startsWith('baka:')) {
        directive = annotation.substring(5);
    }

    url = importResolver.resolve({
        file: matchedPath,
        prev: importedPaths[ importedPaths.length - 1 ],
        includePaths: [ nodeModules ],
        nodeModules: nodeModules
    });

    if (ignoredFiles.has(url)) {
        return matchedLine;
    }

    if (directive === 'skip') {
        return matchedLine;
    }

    if (directive === 'ignore') {
        ignoredFiles.add(url);
        return matchedLine;
    }

    result.push(`// #region ${matchedLine} -> ${normalizePath( url, cwd )}`);
    result.push( parse( url, context ) );
    result.push('// #endregion');

    return result.join('\n');
}

/**
 * @param {BakaOptions} options
 */
function parse( file, options ) {

    const {
        importedFiles,
        importedPaths,
        ignoredFiles
    } = options;

    if (ignoredFiles.has( file )) {
        return '';
    }

    if (importedFiles.has( file )) {
        return '// File already imported_once. Skipping output.';
    }
    const buffer = fs.readFileSync(file, 'utf8');
    let output = '';

    importedPaths.push(path.dirname( file ));
    importedFiles.add( file );

    output += buffer.replace(RE_IMPORT, ( match, filePath, annotation ) => {
        return importReplacer( match, filePath, annotation, options );
    });

    importedPaths.pop();

    return output;
}

module.exports = {
    parse
};
