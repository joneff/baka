const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baka = require('../dist/index');
const { mkdir, del, sassBuild } = require('../lib/utils');

const dist = path.join(__dirname, 'dist');
const fixtures = path.join(__dirname, '__fixtures__');


describe('materialize', () => {

    beforeAll(() => {
        mkdir(dist);
    });

    describe('baka:full', () => {

        test('source vs flat', () => {
            let src = path.join('node_modules', 'materialize-css/sass/materialize.scss');
            let flat = path.join(dist, 'materialize-flat.scss');
            let _src = path.join(fixtures, 'materialize.scss');
            let _flat = path.join(fixtures, 'materialize-flat.scss');
            let _srcOut = path.join(dist, 'materialize.css');
            let _flatOut = path.join(dist, 'materialize-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.build(src, flat);

            sassBuild(_src, _srcOut);
            sassBuild(_flat, _flatOut);

            assert.strictEqual( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
