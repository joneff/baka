const fs = require('fs');
const path = require('path');

const reImport = /^@import ["'](?!~)(.*?)["'];?$/gm;
const importedFiles = new Set();
const importedPaths = [];


const parse = (url) => {

    if (importedFiles.has( url )) {
        return '';
    }

    const buffer = fs.readFileSync(url, 'utf8');
    let output;

    importedPaths.push(path.dirname( url ));
    importedFiles.add( url );

    output = buffer.replace(reImport, importReplacer);

    importedPaths.pop();

    return output;
};

const importReplacer = (match, file) => { // eslint-disable-line no-unused-vars
    const url = path.join( importedPaths[importedPaths.length - 1], file );
    let output;

    output = parse( url );

    return output;
};

const compile = (file, outFile) => { // eslint-disable-line consistent-return
    const output = parse(file, true);

    if (outFile) {
        try {
            fs.accessSync(outFile, fs.constants.W_OK | fs.constants.R_OK);
        } catch (error) {
            if (error.code !== 'ENOENT') {
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
