import gulp from 'gulp';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
    if(!args.watch) return cb();
    //如果有监听，服务器必须开启
    var server= liveserver.new(['--harmony','server/bin/www']);
    server.start();
    //当文件有变动的时候，通知服务器
    gulp.watch(['server/public/**/*.js','server/public/**/*.css','server/views/**/*.ejs'],file=>{
        server.notify.call(server,file);
    })
    //如果服务器核心文件有变动，重启服务器；
    gulp.watch(['server/bin/www','server/app.js'],()=>{
        server.start.bind(server)();
    })

})
