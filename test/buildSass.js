const gulp = require('gulp');
const sass = require('gulp-sass');
const sassImporterFactory = require('./sassimporter');

const sassOptions = {
    precision: 10,
    outputStyle: 'expanded',
    importer: sassImporterFactory({ cache: true, cwd: __dirname })
};

const buildSass = async (src, dest) => { // eslint-disable-line space-before-function-paren

    return new Promise((resolve) => {
        gulp.src(src)
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(gulp.dest(dest))
            .on('end', () => {
                resolve();
            });
    });
};

module.exports = buildSass;
