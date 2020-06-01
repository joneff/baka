const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');
const suite = require('mocha').suite;
const before = require('mocha').before;
const context = require('mocha').describe;
const test = require('mocha').test;
const { del, buildSass } = require('./index');
const baka = require('../index');

const node_modules = path.join(__dirname, 'node_modules'); // eslint-disable-line camelcase
const dist = path.join(__dirname, 'dist');
const local = path.join(__dirname, 'local');


suite('materialize', () => {

    before(() => {
        fs.mkdirpSync(dist);
    });

    context('baka:full', () => {

        test('source vs flat', async () => { // eslint-disable-line space-before-function-paren
            let src = path.join(node_modules, 'materialize-css/sass/materialize.scss');
            let flat = path.join(dist, 'materialize-flat.scss');
            let _src = path.join(local, 'materialize.scss');
            let _flat = path.join(local, 'materialize-flat.scss');
            let _srcOut = path.join(dist, 'materialize.css');
            let _flatOut = path.join(dist, 'materialize-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.compile(src, flat);

            await Promise.all([
                buildSass(_src, dist),
                buildSass(_flat, dist)
            ]);

            assert.equal( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
