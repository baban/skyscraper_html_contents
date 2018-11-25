var path = require('path');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var assetsPath = path.resolve(pkg.path.assetsDir);

var gulp = require('gulp');

// sass compiler
var sass = require('gulp-sass');

// add vender prifix
var autoprefixer = require('gulp-autoprefixer');

// error handling
var plumber = require('gulp-plumber');

gulp.task('document-css', function() {
    gulp.src(path.join(assetsPath, 'document.scss'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.join(assetsPath, './')));
});

gulp.task('seminor-css', function() {
    gulp.src(path.join(assetsPath, 'seminor.scss'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.join(assetsPath, './')));
});

gulp.task('programs-css', function() {
    gulp.src(path.join(assetsPath, 'programs.scss'))
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.join(assetsPath, './')));
});

gulp.task('default', function() {
    gulp.watch(path.join(assetsPath, '*.scss'),['document-css']);
    gulp.watch(path.join(assetsPath, '*.scss'),['programs-css']);
    gulp.watch(path.join(assetsPath, '*.scss'),['seminor-css']);
});
