//作用：把app下index.js文件编译，打包，压缩，重命名之后，放到server/public目录下；

import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import named from 'vinyl-named';
import webpackstream from 'webpack-stream';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('scripts',()=>{
    return gulp.src(['app/js/index.js'])
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackstream({
            module:{
                loaders:[
                    {
                        test:/\.js$/g,
                        loader:'babel-loader'
                    }
                ]
            }
        }))
        .pipe(gulp.dest('server/public/js'))
        .pipe(rename({
            basename:'index',
            extname:'.min.js'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('server/public/js'))
        .pipe(gulpif(args.watch,livereload()))
})