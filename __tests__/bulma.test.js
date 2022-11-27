const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baka = require('../dist/index');
const { mkdir, del, sassBuild } = require('../lib/utils');

const dist = path.join(__dirname, 'dist');
const fixtures = path.join(__dirname, '__fixtures__');


describe.skip('bulma', () => {

    beforeAll(() => {
        mkdir(dist);
    });

    describe('baka:full', () => {

        test('source vs flat', () => {
            let src = path.join('node_modules', 'bulma/bulma.sass');
            let flat = path.join(dist, 'bulma-flat.sass');
            let _src = path.join(fixtures, 'bulma.sass');
            let _flat = path.join(fixtures, 'bulma-flat.sass');
            let _srcOut = path.join(dist, 'bulma.css');
            let _flatOut = path.join(dist, 'bulma-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.build(src, flat);

            sassBuild(_src, _srcOut);
            sassBuild(_flat, _flatOut);

            assert.strictEqual( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
