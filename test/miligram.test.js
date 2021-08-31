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


suite.skip('milligram', () => {

    before(() => {
        fs.mkdirpSync(dist);
    });

    context('baka:full', () => {

        test('source vs flat', async () => { // eslint-disable-line space-before-function-paren
            let src = path.join(node_modules, 'milligram/src/milligram.sass');
            let flat = path.join(dist, 'milligram-flat.sass');
            let _src = path.join(local, 'milligram.sass');
            let _flat = path.join(local, 'milligram-flat.sass');
            let _srcOut = path.join(dist, 'milligram.css');
            let _flatOut = path.join(dist, 'milligram-flat.css');

            del( flat, _srcOut, _flatOut );

            baka.build({ file: src, output: { path: dist } });

            await Promise.all([
                buildSass(_src, dist),
                buildSass(_flat, dist)
            ]);

            assert.strictEqual( fs.readFileSync(_srcOut, 'utf-8').length, fs.readFileSync(_flatOut, 'utf-8').length );
        });

    });

});
