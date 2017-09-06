import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import named from 'vinyl-named'; //让服务器中文件的名称跟源码的名称对应；
import webpackStream from 'webpack-stream';
import rename from 'gulp-rename';// 把服务器下的文件拷贝一份，再重命名
import uglify from 'gulp-uglify';
import livereload from 'gulp-livereload';//热更新
import args from './util/args';//监听命令行参数的文件

//创建scirpts任务
gulp.task('scripts',()=>{
    return gulp.src(['app/js/index.js'])//读取
        .pipe(plumber())//在管道任务处理中出错的处理；
        .pipe(named()) //保证app下的文件个server下文件的名称对应
        .pipe(webpackStream({//编译es6到es5;
            module:{
                loaders:[
                    {
                        test:/\.js$/,
                        loader:'babel-loader'
                    }
                ]
            }
        }))
        .pipe(gulp.dest('server/public/js'))
        .pipe(rename({//复制服务器下的js文件，并且重命名
            basename:'cp',
            extname:'.min.js'
        }))
        .pipe(uglify())//压缩处理
        .pipe(gulp.dest('server/public/js'))//把改好的文件放到哪里
        .pipe(gulpif(args.watch,livereload()))
});

