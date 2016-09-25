var gulp            = require('gulp'),
    uglify          = require('gulp-uglify'),
    plumber         = require('gulp-plumber'),
    filter          = require('gulp-filter'),
    imagemin        = require('gulp-imagemin'),
    compass         = require('gulp-compass'),
    minifyCSS       = require('gulp-clean-css'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync').create();

gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
            .pipe(plumber())
            .pipe(uglify())
            .pipe(gulp.dest('./assets/js'));
});

gulp.task('sass', function() {
    gulp.src('./src/sass/*.sass')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./assets/css'))
        .pipe(filter('./assets/css/*.css')
        .pipe(browserSync.stream()));
});

gulp.task('images', function() {
    gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/img'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });
    gulp.watch('./src/js/**/*.js', ['uglify', browserSync.reload]);
    gulp.watch("./src/sass/**/*.sass", ['sass']);
    gulp.watch('./src/img/**/*', ['images']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['uglify', 'sass', 'images', 'serve']);
