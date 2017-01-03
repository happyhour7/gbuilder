
import processLoader from "./processJSLoader/processLoader";
//js处理相关任务
export default function processJSTask(brow,task){
    //加载文件路径
    for(let i=0,ii=task.modules.length;i<ii;i++){
        if(task.modules[i].name){
            brow.require(task.modules[i].path,{expose:task.modules[i].name});
        }else{
            brow.require(task.modules[i].path);
        }

    }
    //如果用户传递过来的loaders不是数组则强制转化成数组
    if(!(task.loaders instanceof Array)){
        task.loaders=[task.loaders,task.loaders];
    }else if(task.loaders.length===1){
        //如果用户值传递来压缩类型，默认是普通js即es5的解析方式
        task.loaders.push(task.loaders[0]);
    }
    //执行当前task的loader
    return processLoader(brow,task);
}
