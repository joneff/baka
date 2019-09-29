const fs = require('fs');
const path = require('path');
const assert = require('assert');
const suite = require('mocha').suite;
const context = require('mocha').describe;
const test = require('mocha').test;
const { del, buildSass } = require('./index');
const baka = require('../index');

const node_modules = path.join(process.cwd(), 'node_modules'); // eslint-disable-line camelcase
const dist = path.join(__dirname, 'dist');
const local = path.join(__dirname, 'local');


suite.skip('uikit', () => {

    context('baka:full', () => {

        test('source vs flat', async () => { // eslint-disable-line space-before-function-paren
            let src = path.join(node_modules, 'uikit/src/scss/uikit.scss');
            let flat = path.join(dist, 'uikit-flat.scss');
            let _src = path.join(local, 'uikit.scss');
            let _flat = path.join(local, 'uikit-flat.scss');
            let _srcOut = path.join(dist, 'uikit.css');
            let _flatOut = path.join(dist, 'uikit-flat.css');

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
