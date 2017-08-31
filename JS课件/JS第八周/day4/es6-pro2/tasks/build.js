import gulp from 'gulp';
import gulpsequence from 'gulp-sequence';

gulp.task('build',gulpsequence('clean','css','page','scripts',['browser','serve']));