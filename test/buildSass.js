const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');
const sassImporterFactory = require('./sassimporter');

const browsers = [
    'last 1 Edge versions',
    'last 1 Chrome versions',
    'last 1 Firefox versions',
    'last 1 Safari versions'
];
const postcssPlugins = [
    calc({
        precision: 10
    }),
    autoprefixer({
        overrideBrowserslist: browsers
    })
];
const sassOptions = {
    precision: 10,
    outputStyle: 'expanded',
    importer: sassImporterFactory({ cache: true })
};
const buildSass = async (src, dest) => { // eslint-disable-line space-before-function-paren

    return new Promise((resolve) => {
        gulp.src(src)
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(postcss(postcssPlugins))
            .pipe(gulp.dest(dest))
            .on('end', () => {
                resolve();
            });
    });
};

module.exports = buildSass;
