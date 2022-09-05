const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baka = require('../index');
const { mkdir, del, sassBuild } = require('../lib/utils');

const dist = path.join(__dirname, 'dist');
const fixtures = path.join(__dirname, '__fixtures__');


describe('foundation', () => {

    beforeAll(() => {
        mkdir(dist);
    });

    describe('baka:full', () => {

        test('source vs flat', () => {
            let src = path.join('node_modules', 'foundation-sites/scss/foundation.scss');
            let flat = path.join(dist, 'foundation-flat.scss');
            let _src = path.join(fixtures, 'foundation.scss');
            let _flat = path.join(fixtures, 'foundation-flat.scss');
            let _srcOut = path.join(dist, 'foundation.css');
            let _flatOut = path.join(dist, 'foundation-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.build({ file: src, output: { path: dist } });

            sassBuild(_src, _srcOut);
            sassBuild(_flat, _flatOut);

            assert.strictEqual( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
