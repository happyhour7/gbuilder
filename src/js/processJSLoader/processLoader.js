
import gulp from "gulp";
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import clc from 'cli-color';
import source from 'vinyl-source-stream';
import loaderStrategy from './loaderStrategyDefine';
import notifier from 'node-notifier';
//import { getLogText , handleError } from '../../util/util';
import  {getLogText,handleError}   from '../../util/util';

//var handleError=function(){}

export default function processLoader(browserify,task){

    let _loaderName=task.loaders[1],        //loader的名字，gulp任务的名字
        _isCompress=task.compress,          //是否压缩当前代码
        _distPath=task.buildTo,             //编译到哪里去
        _fileName=task.exportFileName;      //编译成功后的文件名

    //采用策略模式计算不同的loader不用的引用结果

    //添加特殊js的loaders处理
    browserify=loaderStrategy[_loaderName+"Loader"](browserify).bundle().on("error", handleError)
        //设置生成文件名
        .pipe(source(_fileName))
        .pipe(buffer());

    //是否compress
    _isCompress&&(browserify=browserify.pipe(uglify()));
    //任务输出
    return browserify.pipe(gulp.dest(_distPath)).on('data',function(file){
                //生成文件名
                var buildPaths=file.history;
                //获得生成文件名
                var buildName=buildPaths[buildPaths.length-1].split("/").pop();
                var  fileSize=file.contents.length/1000+"KB";
                //将文件列表输出
                console.log(getLogText(buildName)+"\t"+clc.yellow(getLogText(fileSize)));
            });
}
