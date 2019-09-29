const fs = require('fs');
const path = require('path');

const reImport = /^\/\/ #= (import|import_once) (.*?)$/gm;
const importedFiles = new Set();
const importedOnceFiles = new Set();
let currentPath;
const process_cwd = process.cwd(); // eslint-disable-line camelcase


const parse = (url, root = false) => {
    const buffer = fs.readFileSync(url, 'utf8');
    let output = '';

    currentPath = path.dirname( url );
    importedFiles.add( url );

    if (root === true) {
        output += [
            '// This file is auto-generated. Do not edit!',
            `// Origin .${path.dirname( url ).replace(process_cwd, '').replace(/\\/g, '/')}/${path.basename( url )}`,
            '\n'
        ].join('\n');
    }

    output += buffer.replace(reImport, importReplacer);

    return output;
};

const importReplacer = (match, importType, file) => {
    let output = [];
    const toBeImportedFile = path.join( currentPath, file );

    output.push(match);

    output.push(`// #region ${importType} .${currentPath.replace(process_cwd, '').replace(/\\/g, '/')}/${file}`);

    output.push(
        (
            importedOnceFiles.has(toBeImportedFile)
            ||
            (importType === 'import_once' && importedFiles.has(toBeImportedFile))
        )
            ? '// File already imported_once. Skipping output.'
            : parse( toBeImportedFile )
    );

    output.push('// #endregion');

    if (importType === 'import_once') {
        importedOnceFiles.add(toBeImportedFile);
    }

    return output.join('\n');
};

const compile = (file, outFile) => { // eslint-disable-line consistent-return
    const output = parse(file, true);

    if (outFile) {
        try {
            fs.accessSync(outFile, fs.constants.W_OK | fs.constants.R_OK);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error(error); // eslint-disable-line no-console
                process.exit(1);
            }
        }
        console.info(`Inlineing ${file} to ${outFile}`); // eslint-disable-line no-console
        fs.writeFileSync(outFile, output);
    } else {
        return output;
    }
};


module.exports = {
    compile
};
