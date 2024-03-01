const fs = require('fs');
const path = require('path');
const assert = require('assert');

const baka = require('../dist/index');
const { mkdir, del } = require('../lib/utils');

const dist = path.join(__dirname, 'dist');
const fixtures = path.join(__dirname, '__fixtures__');


describe.only('utf8bom', () => {

    beforeAll(() => {
        mkdir(dist);
    });

    describe('baka:full', () => {

        test('source vs flat', () => {
            // arrange
            const src = path.join(fixtures, 'import-utf8-bom.scss');
            const result = path.join(dist, 'import-utf8-bom-flat.scss');

            del(result );

            // act
            baka.build(src, result);

            // assert
            const resultBuffer = fs.readFileSync(result);
            const resultContent = resultBuffer.toString();

            assert.equal(resultContent.indexOf('.two') >= 0, true);
        });

    });

});
