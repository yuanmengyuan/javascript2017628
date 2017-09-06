import gulp from 'gulp';
import args from './util/args';
//当app下源文件发生变动的时候，服务器下的文件也进行更新；
gulp.task('browser',(cb)=>{
    //如果没有监听，直接返回回调即可
    if(!args.watch) return cb();
    //当有监听的时候；
    gulp.watch('app/**/*.js',['scripts']);
    gulp.watch('app/**/*.css',['css']);
    gulp.watch('app/**/*.ejs',['page']);
})