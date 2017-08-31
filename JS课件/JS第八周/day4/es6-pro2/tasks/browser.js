import gulp from 'gulp';
import args from './util/args';

gulp.task('browser',(cb)=>{
    if(!args.watch) return cb();
    //需要浏览器监听文件的变化
    gulp.watch('app/**/*.js',['scripts']);
    gulp.watch('app/**/*.css',['css']);
    gulp.watch('app/**/*.ejs',['page']);
});
