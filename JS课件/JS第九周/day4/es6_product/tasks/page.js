import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

//创建page任务

gulp.task('page',()=>{
    return gulp.src(['app/**/*.ejs'])
        .pipe(gulp.dest('server'))
        .pipe(gulpif(args.watch,livereload()))
})