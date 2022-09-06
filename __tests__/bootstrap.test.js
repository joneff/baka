const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baka = require('../index');
const { mkdir, del, sassBuild } = require('../lib/utils');

const dist = path.join(__dirname, 'dist');
const fixtures = path.join(__dirname, '__fixtures__');


describe.only('bootstrap', () => {

    beforeAll(() => {
        mkdir(dist);
    });

    describe('baka:full', () => {

        test('source vs flat', () => {
            let src = path.join('node_modules', 'bootstrap/scss/bootstrap.scss');
            let flat = path.join(dist, 'bootstrap-flat.scss');
            let _src = path.join(fixtures, 'bootstrap.scss');
            let _flat = path.join(fixtures, 'bootstrap-flat.scss');
            let _srcOut = path.join(dist, 'bootstrap.css');
            let _flatOut = path.join(dist, 'bootstrap-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.build(src, flat);

            sassBuild(_src, _srcOut);
            sassBuild(_flat, _flatOut);

            assert.strictEqual( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
