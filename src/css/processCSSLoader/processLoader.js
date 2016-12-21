import gulp from "gulp";
import loaderStrategy from "./loaderStrategy";
import processerStrategy from "./processerStrategy";
import clc from 'cli-color';
import source from 'vinyl-source-stream';
import  {getLogText,handleError}   from '../../util/util';
import fs from "fs";
var through = require('through2');
var gutil = require('gulp-util');
var localPath=process.cwd();
export default function processLoader(browserify , task){
    var processors =[],
        _distPath=task.buildTo,             //编译到哪里去
        _fileName=task.exportFileName;      //编译成功后的文件名
    var _gulp=gulp.src(task.modules);
    if(task.modules instanceof Array){
        for(var i=0,ii=task.modules.length;i<ii;i++){
            task.modules[i]=localPath+task.modules[i];
        }
    }else{
        task.modules=localPath+task.modules;
    }
    //postcss process加载
    /*for(let i=1,ii=task.loaders.length;i<ii;i++){
        let cKey=task.loaders[i];
        processerStrategy[cKey]&&getProcess(processors,processerStrategy[cKey]);
    }


    //如果需要压缩css代码
    task.isCompress&&task.loaders.indexOf("cssnano")<0&&getProcess("cssnano");
    for(let i=1,ii=task.loaders.length;i<ii;i++){
        let cKey=task.loaders[i];
        loaderStrategy[cKey]&&getLoaders(loaderStrategy[cKey]);
    }*/
    _distPath="/Users/happyhour7/code/tianwen/tianwen-static-server/0.0.6/w/css";
    writeFile(_distPath+"/main.css");
    //gulp.src(task.modules[0]).pipe(gulp.dest(_distPath));
    //console.log(task.modules,_distPath);
    /*gulp.src(task.modules).on("error", handleError)
        .pipe(gulp.dest(_distPath)).on('data',function(file){
            //生成文件名
            var buildPaths=file.history;
            var buildName=buildPaths[buildPaths.length-1].split("/").last();
            console.log(getLogText(buildName)+"\t"+clc.yellow(getLogText(file.contents.length/1000+'KB')));
        });*/

        function getLoaders(mixin){
            _gulp=mixin(_gulp,processors);
        }
        //处理process
        function getProcess(processors,processer){
            processors.push(processer());
        }
}

function kk(){
    return through.obj(function (file, enc, callback) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }

        var content=file.contents.toString();
        console.log("执行到此，文件内容如下：");
        console.log(content);
        file.contents = new Buffer(content);
        this.push(file);
        callback();
    });
}

function writeFile(file){
    // 测试用的中文
    var str = readFile("/Users/happyhour7/code/tianwen/tianwen-static/stylus/main.styl");
    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    console.log("append:"+file)
    try{
        fs.appendFile(file, str, function(err){
            console.log("file success!!!!!!!!!!!!!!!");
            if(err){
                console.log("fail " + err);
            }else{
                console.log("file success!!!!!!!!!!!!!!!");
            }

        });
    }catch(e){
        console.log(e);
    }

}

function readFile(file){
    var data = fs.readFileSync(file,'utf-8');
    console.log("读取文件内容：");
    console.log(data);
    return data;
}
