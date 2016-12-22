"use strict"
import argumentsLoader from "./arguments";

//arguments相关处理
export default function argumentsTask(argumentsName,currentDirName){
    return argumentsLoader[argumentsName]&&argumentsLoader[argumentsName](currentDirName);
};
