"use strict"
import argumentsLoader from "./arguments";

//arguments相关处理
export default function argumentsTask(argumentsName){
    return argumentsLoader[argumentsName]&&argumentsLoader[argumentsName]();
};
