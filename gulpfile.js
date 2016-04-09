// Modules used in this project.
var gulp = require('gulp');
var bs = require('browser-sync').create();

// Relevant directories
var html = 'app/*.html';
var css = 'app/styles/*.css';
var js = 'app/scripts/*.js';

// Setting up the Browser Sync server
gulp.task('browserSync', function() {
    bs.init({
        // Server base directory
        server:                 './dist',
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
