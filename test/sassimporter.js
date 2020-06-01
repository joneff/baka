const path = require('path');

const EMPTY_IMPORT = {};

const imported = new Set();

function sassImporterFactory(options = { cache: false, cwd: process.cwd() }) {
    function sassImporter(url, prev) {
        let file;

        if (url.startsWith('~')) {
            file = path.resolve(path.join(
                options.cwd,
                'node_modules/',
                url.slice(1)
            ));
        } else {
            file = path.resolve(path.join(
                path.dirname(prev),
                url
            ));
        }

        if (options.cache && imported.has(file)) {
            return EMPTY_IMPORT;
        }

        imported.add(file);

        return { file };
    }

    return sassImporter;
}


module.exports = sassImporterFactory;
