const fs = require('fs');
const path = require('path');

const importResolver = require('@joneff/sass-import-resolver');

const reImport = /^[ \t]*@import\s+["']?(.*?)["']?;?$/gm;
const importedFiles = new Set();
const importedPaths = [];
const process_cwd = process.cwd(); // eslint-disable-line camelcase


// #region helpers
const ensureDirSync = (dir) => {
    let resolvedPath = path.normalize(dir);

    resolvedPath.split(path.sep).reduce((acc, curr) => {
        let dirPath = path.join(acc, curr);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        return dirPath;
    });
};
// #endregion


const parse = (url, options) => {

    let root = options.root;

    if (importedFiles.has( url )) {
        return [
            `// #region @import ${url.replace(process_cwd, '').replace(/\\/g, '/')}`,
            '// File already imported_once. Skipping output.',
            '// #endregion'
        ].join('\n');
    }

    const buffer = fs.readFileSync(url, 'utf8');
    let output = '';

    importedPaths.push(path.dirname( url ));
    importedFiles.add( url );

    if (root === true) {
        output = [
            '// This file is auto-generated. Do not edit!',
            `// baka:source ${url.replace(process_cwd, '').replace(/\\/g, '/')}}`,
            '\n'
        ].join('\n');
    }

    output += buffer.replace(reImport, (match, file) => {
        return importReplacer(match, file, options);
    });

    importedPaths.pop();

    return output;
};

const importReplacer = (match, file, options) => { // eslint-disable-line no-unused-vars
    const url = importResolver.resolve( file, { prev: importedPaths[ importedPaths.length - 1 ], nodeModules: options.nodeModules } );
    let output = [];

    output.push(`// #region ${match} -> ${url.replace(process_cwd, '').replace(/\\/g, '/')}`);
    output.push( parse( url, { ...options, root: false } ) );
    output.push('// #endregion');

    return output.join('\n');
};

const compile = (file, outFile, options) => { // eslint-disable-line consistent-return
    importedFiles.clear();
    const output = parse(file, { ...options, root: true });

    if (outFile) {
        try {
            fs.accessSync(outFile, fs.constants.W_OK | fs.constants.R_OK);
        } catch (error) {
            if (error.code === 'ENOENT') {
                ensureDirSync(path.dirname(outFile));
            } else {
                throw error;
            }
        }
        fs.writeFileSync(outFile, output);
    } else {
        return output;
    }
};


module.exports = {
    compile
};
