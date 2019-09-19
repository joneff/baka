const path = require("path");
const baka = require("../index.js");

const base = path.join(__dirname, "scss");

const file = path.join(base, "index.scss");
const outFile = path.join(base, "all.scss");

baka.compile(file);