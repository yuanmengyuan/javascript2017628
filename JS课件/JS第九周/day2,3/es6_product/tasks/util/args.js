import yargs from 'yargs';
//args.js文件，用来监听命令行的参数
let args=yargs
    //是否是上线阶段
    .option('production',{
        boolean:true,
        default:false,
        describe:'min all scripts'
    })
    //设置是否添加监听
    .option('watch',{
        boolean:true,
        default:false,
        describe:'watch all files'
    })
    //是否打印日志
    .option('verbose',{
        boolean:true,
        default:false,
        describe:'log'
    })
    //设置默认的端口号
    .option('port',{
        string:true,
        default:'8080',
        descript:'script port'
    })
    .argv;
export default args;
