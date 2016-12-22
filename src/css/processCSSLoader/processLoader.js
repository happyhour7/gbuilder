import gulp from "gulp";
import loaderStrategy from "./loaderStrategy";
import processerStrategy from "./processerStrategy";
import clc from 'cli-color';
import  {getLogText,handleError}   from '../../util/util';
import  cleanCSS from 'gulp-clean-css';
var localPath=process.cwd();


export default function processLoader(browserify , task){
    var processors =[],
        _loaderType=task.type,                    //文件类型：css、styl、less
        _distPath=task.buildTo,             //编译到哪里去
        _gulp=gulp.src(task.modules);
    //postcss process加载
    task.loaders.forEach(function(processer,index,loaders){
        processerStrategy[processer]&&getProcess(processors,processerStrategy[processer]);
    });



    //css类型loader
    loaderStrategy[_loaderType]&&getLoaders(loaderStrategy[_loaderType]);
    //如果需要压缩css代码
    if(task.compress===true){
        _gulp=_gulp.pipe(cleanCSS({compatibility: 'ie8'}, function(details) {
            console.log(getLogText(details.name)+"\t"+
                        clc.yellow(getLogText("Original:"+details.stats.originalSize/1000+'KB')));

            console.log(getLogText("----")+"\t"+
                        clc.yellow(getLogText("Minified:"+details.stats.minifiedSize/1000+'KB')));
        }));
    }
    _gulp.on("error", handleError)
        .pipe(gulp.dest(_distPath)).on('data',function(file){
            //生成文件名
            var buildPaths=file.history;
            var buildName=buildPaths[buildPaths.length-1].split("/").pop();
            console.log(getLogText(task.compress?"----":buildName)+"\t"+clc.yellow(getLogText("Build:"+file.contents.length/1000+'KB')));
        });

        function getLoaders(mixin){
            _gulp=mixin(_gulp,processors);
        }
        //处理process
        function getProcess(processors,processer){
            processors.push(processer());
        }
}
