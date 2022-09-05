const fs = require('fs');
const path = require('path');
const sass = require('sass-embedded');

const sassOpts = {
    loadPaths: [ 'node_modules' ],
    logger: sass.Logger.silent
};

function sassBuild(file, outFile) {
    const result = sass.compile(file, sassOpts).css;
    writeFile( outFile, result );
}

function writeFile(file, content) {
    mkdir( path.dirname( file ) );
    fs.writeFileSync( file, content, 'utf-8' );
}

function mkdir( dirName ) {
    fs.mkdirSync( dirName, { recursive: true } );
}
function rmdir( dirName ) {
    fs.rmSync( dirName, { recursive: true, force: true } );
}
function del( ...files ) {
    files.forEach(file => {
        fs.rmSync(file, { recursive: true, force: true });
    });
}

module.exports = {
    sassBuild,
    writeFile,
    mkdir,
    rmdir,
    del
};
