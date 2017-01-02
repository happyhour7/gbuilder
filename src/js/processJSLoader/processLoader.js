
import gulp from "gulp";
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import clc from 'cli-color';
import path from 'path';
import source from 'vinyl-source-stream';
import loaderStrategy from './loaderStrategyDefine';
import notifier from 'node-notifier';

import envify from "envify/custom";
//import { getLogText , handleError } from '../../util/util';
import  {getLogText,handleError}   from '../../util/util';

//var handleError=function(){}

export default function processLoader(browserify,task){

    let _loaderName=task.loaders[1],        //loader的名字，gulp任务的名字
        _isCompress=task.compress,          //是否压缩当前代码
        _distPath=task.buildTo,             //编译到哪里去
        _buildCssTo=task.buildCssTo,        //vue的编译选项，将css提取到如下路径
        _exportCss=task.exportCssFileName,  //如果是vue的话还有这么个配置项
        _fileName=task.exportFileName,      //编译成功后的文件名
        _exportCssFilePath=_exportCss?path.normalize(_buildCssTo+"/"+_exportCss):null;


        //是否compress
        if(_isCompress===true){
            browserify.transform(envify({
              NODE_ENV: JSON.stringify("production")
            }));
            process.env.NODE_ENV="production";
        }else{
            browserify.transform(envify({
              NODE_ENV:JSON.stringify("development")
            }));
            process.env.NODE_ENV="development";
        }
    //采用策略模式计算不同的loader不用的引用结果
    //添加特殊js的loaders处理
    browserify=loaderStrategy[_loaderName+"Loader"](browserify,_exportCssFilePath).bundle().on("error", handleError)
        //设置生成文件名
        .pipe(source(_fileName))
        .pipe(buffer());
    _isCompress&&browserify.pipe(uglify());
    console.log("当前代码运行环境："+clc.green(process.env.NODE_ENV||"[未定义]"));
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
