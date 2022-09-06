const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baka = require('../index');
const { mkdir, del, sassBuild } = require('../lib/utils');

const dist = path.join(__dirname, 'dist');
const fixtures = path.join(__dirname, '__fixtures__');


describe('uikit', () => {

    beforeAll(() => {
        mkdir(dist);
    });

    describe('baka:full', () => {

        test('source vs flat', () => {
            let src = path.join('node_modules', 'uikit/src/scss/uikit.scss');
            let flat = path.join(dist, 'uikit-flat.scss');
            let _src = path.join(fixtures, 'uikit.scss');
            let _flat = path.join(fixtures, 'uikit-flat.scss');
            let _srcOut = path.join(dist, 'uikit.css');
            let _flatOut = path.join(dist, 'uikit-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.build(src, flat);

            sassBuild(_src, _srcOut);
            sassBuild(_flat, _flatOut);

            assert.strictEqual( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
