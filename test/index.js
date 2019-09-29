const fs = require('fs-extra');
const buildSass = require('./buildSass');

const removeSync = (...files) => {
    [ ...files ].forEach((file) => {
        fs.removeSync(file);
    });
};

module.exports = {
    buildSass,
    del: removeSync
};
