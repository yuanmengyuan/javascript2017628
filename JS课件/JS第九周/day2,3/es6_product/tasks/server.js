import gulp from 'gulp';
import liveserver from 'gulp-live-server';
import args from './util/args';

//创建serve任务
gulp.task('serve',(cb)=>{
    if(!args.watch) return cb();

    //在有监听的情况下，先开启服务器
    var server=liveserver.new(['--harmony','server/bin/www']);
    server.start();
    //开始监听需要文件；
    gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],file=>{
        server.notify.apply(server,[file]);
    })
    //服务器的核心文件发生变更的时候，需要重启服务器
    gulp.watch(['server/bin/www','server/app'],()=>{
        server.start.bind(server)();
    })
})