const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baka = require('../index');
const { mkdir, del, sassBuild } = require('../lib/utils');

const dist = path.join(__dirname, 'dist');
const fixtures = path.join(__dirname, '__fixtures__');


describe.skip('milligram', () => {

    beforeAll(() => {
        mkdir(dist);
    });

    describe('baka:full', () => {

        test('source vs flat', () => {
            let src = path.join('node_modules', 'milligram/src/milligram.sass');
            let flat = path.join(dist, 'milligram-flat.sass');
            let _src = path.join(fixtures, 'milligram.sass');
            let _flat = path.join(fixtures, 'milligram-flat.sass');
            let _srcOut = path.join(dist, 'milligram.css');
            let _flatOut = path.join(dist, 'milligram-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.build({ file: src, output: { path: dist } });

            sassBuild(_src, _srcOut);
            sassBuild(_flat, _flatOut);

            assert.strictEqual( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
