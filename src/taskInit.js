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

const localPath=process.cwd();
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
function taskExecute(taskName){
    for (var _name in config.tasks) {
        let task=config.tasks[_name];
        hasLoadedTask[_name]=(function(){
            return {
                    callback:function(task){
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

    executed===false&&console.log(clc.red.bold(getLogText("unknow task name!")));
}

export default   taskExecute;
