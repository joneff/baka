const path = require('path');
const baka = require('../index.js');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

const file = path.join(src, 'index.scss');
const outFile = path.join(dist, 'all.scss');

baka.compile(file, outFile);
