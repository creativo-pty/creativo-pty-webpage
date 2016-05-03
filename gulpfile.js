// Modules used in this project.
var gulp = require('gulp');
var sequence = require('run-sequence');
var bs = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var htmlmin = require('gulp-htmlmin');
var htmlhint = require('gulp-htmlhint');
var stylelint = require('gulp-stylelint');
var jshint = require('gulp-jshint');
var sort = require('gulp-sort');
var uncss = require('gulp-uncss');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

// Relevant directories
var css = 'app/styles/**/*.css';
var js = 'app/scripts/*.js';
var njk = 'app/templates/**/*.njk';
var img = 'app/images/**/*.+(jpg|png)';

// Dictionaries that are used in more than one place
var htmlHintRules = {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "attr-value-not-empty": true,
    "attr-no-duplication": true,
    "doctype-first": true,
    "tag-pair": true,
    "tag-self-close": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "title-require": true,
    "head-script-disabled": true,
    "alt-require": true,
    "doctype-html5": true,
    "id-class-value": "dash",
    "style-disabled": true,
    "inline-style-disabled": true,
    "inline-script-disabled": true,
    "space-tab-mixed-disabled": "space",
    "id-class-ad-disabled": true,
    "href-abs-or-rel": "rel",
    "attr-unsafe-chars": true
};
var htmlMinOptions = {
    'removeComments': true,
    'removeCommentsFromCDATA': true,
    'collapseWhitespace': true,
    'collapseBooleanAttributes': true,
    'removeRedundantAttributes': true,
    'useShortDoctype': true,
    'removeEmptyAttributes': true,
    'removeOptionalTags': true
};

// Build web site from available content
gulp.task('build', function() {
    sequence('nunjucks', 'img', 'css', 'js');
});

// Setting up the Browser Sync server
gulp.task('browser-sync', function() {
    bs.init({
        // Server base directory
        server:                 'dist',
        // Should all the screens connected to this server scroll together
        scrollProportionally:   false
    });
});

// Setting up the Browser Sync server
gulp.task('tunnel-sync', function() {
    bs.init({
        // Server base directory
        server:                 'dist',
        // Try to connect to the tunnel service of the following name
        tunnel:                 'creativopty',
        // The manner in which the project opens once the server starts
        open:                   'tunnel',
        // Should all the screens connected to this server scroll together
        scrollProportionally:   false
    });
});

// Defining what should happen if any file changes
gulp.task('default', ['browser-sync', 'build'], function() {
    // When a Nunjucks file changes
    gulp.watch(njk, ['nunjucks']);
    // When a CSS file changes
    gulp.watch(css, ['css']);
    // When a JS file changes
    gulp.watch(js, ['js']);
    // When an image changes
    gulp.watch(img, ['img']);
});

// Convert Nunjucks templates into HTML files
gulp.task('nunjucks', function() {
    return gulp.src(njk)
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            // Location of templates in the project
            path: ['app/templates/']
        }))
        // Minify HTML files
        .pipe(htmlmin(htmlMinOptions))
        // Output files into the dist folder
        .pipe(gulp.dest('dist'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});

// Tasks done to css files
gulp.task('css', ['css-lint'], function() {
    return gulp.src(css)
        // Sort files in alphabetical order
        .pipe(sort())
        // Remove any unused CSS rules
        .pipe(uncss({ html: ['dist/**/*.html'] }))
        // Create a source map for future reference
        .pipe(sourcemaps.init())
            // Minify CSS
            .pipe(csso())
            // Combine all of the CSS files into one
            .pipe(concat('main.css'))
            // Prefix CSS rules for browser support
            .pipe(autoprefixer({ browsers: ['> 1%'] }))
        .pipe(sourcemaps.write())
        // Copy app file to dist
        .pipe(gulp.dest('dist/styles'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});

// Lint CSS files
gulp.task('css-lint', function() {
    return gulp.src([ css, '!' + css.replace('/**/*.css', '/library/**/*.css') ])
    // Use Stylelint to validate this CSS file
    .pipe(stylelint({
        failAfterError: true,
        reporters: [ { formatter: 'string', console: true } ]
    }));
});

// Tasks done to js files
gulp.task('js', function() {
    return gulp.src(js)
        // Sort files in alphabetical order
        .pipe(sort())
        // Use JS Hint to validate this JS file
        .pipe(jshint())
        // Report using JS Hint default reporter
        .pipe(jshint.reporter('default'))
        // Fail this task if there is an error
        .pipe(jshint.reporter('fail'))
        // Copy app file to dist
        .pipe(gulp.dest('dist/scripts'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});

// Move the images files from the app folder to the distribution folder
gulp.task('img', function() {
    // Get the images from the app folder
    return gulp.src(img)
    // Output images into the distribution folder
    .pipe(gulp.dest('dist/images'))
    // Reload the distribution file in the browser
    .pipe(bs.stream());
});
