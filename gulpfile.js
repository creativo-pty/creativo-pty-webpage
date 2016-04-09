// Modules used in this project.
var gulp = require('gulp');
var bs = require('browser-sync').create();

// Relevant directories
var html = 'app/*.html';
var css = 'app/styles/*.css';
var js = 'app/scripts/*.js';

// Letting Browser Sync know that the root of the server is found in the 'app'
// folder.
gulp.task('browserSync', function() {
    bs.init({
        server:                 './dist',
        tunnel:                 'creativopty',
        open:                   'tunnel',
        scrollProportionally:   false
    });
});

// Definig what should happen if any file changes.
gulp.task('default', ['browserSync'], function() {
    // When an html file changes
    gulp.watch(html, ['html']);
    // When an css file changes
    gulp.watch(css, ['css']);
    // When an js file changes
    gulp.watch(js, ['js']);
});

// Tasks done to html files
gulp.task('html', function() {
    return gulp.src(html)
        // Copy app file to dist
        .pipe(gulp.dest('dist'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});

// Tasks done to css files
gulp.task('css', function() {
    return gulp.src(css)
        // Copy app file to dist
        .pipe(gulp.dest('dist/styles'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});

// Tasks done to js files
gulp.task('js', function() {
    return gulp.src(js)
        // Copy app file to dist
        .pipe(gulp.dest('dist/scripts'))
        // Reload the dist file in the browser
        .pipe(bs.stream());
});
