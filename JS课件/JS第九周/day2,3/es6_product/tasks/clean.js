import gulp from 'gulp';
import del from 'del';

gulp.task('clean',()=>{
    console.log(22222)
    del(['server/public','server/views'])
})