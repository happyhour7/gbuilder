#!/usr/bin/env node

/**
    es6: babel -d ./bin ./src
*/
import fs from 'fs';
import argumentsTask from "./arguments/argumentsProcess";
const  _args = process.argv.splice(2),
        currentDirName=__dirname,
        taskName=_args[0];


//初始化参数配置
//---------------------项目初始化----------------------------
if(taskName && !taskName.indexOf(":") && argumentsTask(taskName,currentDirName)===false) {
    console.log("存在参数，但是参数无法处理");
}else if(argumentsTask(taskName,currentDirName)===true){
    console.log("初始化完毕");
}else{
    require("./taskInit").taskExecute(taskName);
}
