// Modules used in this project.
var gulp = require('gulp');
var bs = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var htmlhint = require('gulp-htmlhint');
var csslint = require('gulp-csslint');
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

// Setting up the Browser Sync server
gulp.task('browserSync', function() {
    bs.init({
        // Server base directory
        server:                 'dist',
        // Should all the screens connected to this server scroll together
        scrollProportionally:   false
    });
});

// Setting up the Browser Sync server
gulp.task('bsTunnel', function() {
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
gulp.task('default', ['browserSync'], function() {
    // When a CSS file changes
    gulp.watch(css, ['css']);
    // When a JS file changes
    gulp.watch(js, ['js']);
    //When a Nunjucks file changes
    gulp.watch(njk, ['nunjucks']);
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
    // Use CSS Lint to validate this CSS file
    .pipe(csslint())
    // Fail this task if there is an error
    .pipe(csslint.failReporter())
    // Use Stylelint to validate this CSS file
    .pipe(stylelint({ failAfterError: true }));
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

// Convert Nunjucks templates into HTML files
gulp.task('nunjucks', function() {
    // Gets .html, .nunjucks, and .njk files in templates
    return gulp.src('app/templates/**/*.+(html|nunjucks|njk)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        // Location of templates in the project
        path: ['app/templates/']
    }))
    // Use HTML Hint to validate the HTML file
    .pipe(htmlhint(htmlHintRules))
    // Fail this task if there is an error
    .pipe(htmlhint.failReporter())
    // Output files into the dist folder
    .pipe(gulp.dest('dist'))
    // Reload the dist file in the browser
    .pipe(bs.stream());
});
