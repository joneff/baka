const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');
const suite = require('mocha').suite;
const before = require('mocha').before;
const context = require('mocha').describe;
const test = require('mocha').test;
const { del, buildSass } = require('./index');
const baka = require('../index');

const node_modules = path.join(process.cwd(), 'node_modules'); // eslint-disable-line camelcase
const dist = path.join(__dirname, 'dist');
const local = path.join(__dirname, 'local');


suite('kendo', () => {

    before(() => {
        fs.mkdirpSync(dist);
    });

    context('baka:full', () => {

        test('source vs flat', async () => { // eslint-disable-line space-before-function-paren
            let src = path.join(node_modules, '@progress/kendo-theme-default/scss/all.scss');
            let flat = path.join(dist, 'kendo-flat.scss');
            let _src = path.join(local, 'kendo.scss');
            let _flat = path.join(local, 'kendo-flat.scss');
            let _srcOut = path.join(dist, 'kendo.css');
            let _flatOut = path.join(dist, 'kendo-flat.css');

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
