#!/usr/bin/env node

/**
    es6: babel -d ./bin ./src
*/
import fs from 'fs';
import argumentsTask from "./arguments/argumentsProcess";

const localPath=process.cwd(),
    _args = process.argv.splice(2),
    taskName=_args[0];

writeFile("C:\\Users\\happy\\Documents\\helo.txt");
//初始化参数配置
//---------------------项目初始化----------------------------
if(taskName && !taskName.indexOf(":") && argumentsTask(taskName)===false) {
    console.log("存在参数，但是参数无法处理");
    //process.exit();
}else if(argumentsTask(taskName)===true){
    console.log("初始化完毕");
    //process.exit();
}else{
    taskExecute();
}



//-----------gulp+browserify+彩色输出+提示基础包---------------
import  browserify from "browserify";
import clc from "cli-color";
import processTask from "./task/processTask";
import processJSTask from "./js/processJSTask";
import processCSSTask from "./css/processCSSTask";
import processTmplTask from "./tmpl/processTmplTask";
import {getLogText} from "./util/util";
//引入watcher处理器
import watchMinix from "./watcher/watcherMinix";


//babel-preset-es2015
//babel-preset-react
const config=require(localPath+"/gbuilder.config");


var executed=false,
    hasLoadedTask={};
//-----------------------遍历所有任务----------------------
//如果任务长度不为零，则输出文件列表的头部信息


/**
 * 遍历所有task实现配置可执行功能
 */
function taskExecute(){
    for (var _name in config.tasks) {
        let task=config.tasks[_name];
        hasLoadedTask[_name]=(function(){
            return {
                    callback:function(task){
                        console.log(clc.green.bold(getLogText("[fileName]"))+
                                     "\t"+
                                     clc.red.bold(getLogText("[fileSize]")));
                        var brow = browserify(),
                            brow={
                                "js":processJSTask,
                                "css":processCSSTask,
                                "tmpl":processTmplTask
                            }[task.loaders.shift?task.loaders[0]:task.loaders](brow,task);
                    },
                    task:task
                };
        })(task);
        if(taskName && _name==taskName||typeof taskName ==='undefined') {
            //存在taskname并且taskname等于当前配置的taskname
            executed=true;
            hasLoadedTask[_name].callback(hasLoadedTask[_name].task);
        }
    }
    //如果有单一任务 就优先执行单一任务
    if(executed===true||!taskName) {
        console.log(taskName);
        return;
    }

    /**
     * 遍历配置中所有的监控
     */
    for(var _name in config.watchers){

        if(_name!=taskName) continue;
        let watcher=config.watchers[_name];
        //找到对应元素
        executed=true;
        watchMinix(watcher,hasLoadedTask);
        console.log(clc.green.bold(getLogText("start watcher ["+_name+"]...")));
    }

}

//判断是否已经执行了预编译流程
function writeFile(file){
    // 测试用的中文
    var str = "hello i am a file";//readFile("/Users/happyhour7/code/tianwen/tianwen-static/stylus/main.styl");
    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    console.log("append:"+file)
    try{

        fs.appendFile(file, 'data to append', function (err) {

          if (err) throw err;

          console.log('The "data to append" was appended to file!');

        });
    }catch(e){
        console.log("asdfasdfasdf");
        console.log(e);
    }
}
