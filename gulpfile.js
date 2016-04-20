// Modules used in this project.
var gulp = require('gulp');
var bs = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var htmlhint = require('gulp-htmlhint');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');

// Relevant directories
var html = 'app/*.html';
var css = 'app/styles/*.css';
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
    // When an HTML file changes
    gulp.watch(html, ['html']);
    // When a CSS file changes
    gulp.watch(css, ['css']);
    // When a JS file changes
    gulp.watch(js, ['js']);
    //When a Nunjucks file changes
    gulp.watch(njk, ['nunjucks']);
});

// Tasks done to html files
gulp.task('html', function() {
    return gulp.src(html)
        // Use HTML Hint to validate the HTML file
        .pipe(htmlhint(htmlHintRules))
        // Fail this task if there is an error
        .pipe(htmlhint.failReporter())
        // Copy app file to dist
        .pipe(gulp.dest('dist'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});

// Tasks done to css files
gulp.task('css', function() {
    return gulp.src(css)
        // Use CSS Lint to validate this CSS file
        .pipe(csslint())
        // Fail this task if there is an error
        .pipe(csslint.failReporter())
        // Copy app file to dist
        .pipe(gulp.dest('dist/styles'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});

// Tasks done to js files
gulp.task('js', function() {
    return gulp.src(js)
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
