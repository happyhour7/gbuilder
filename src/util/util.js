import fs from 'fs';
import clc from 'cli-color';
function getLogText(text){
    //长度为30个空格
    const spaceString="                                                            ",
            spaceNum=15-text.length;
    text=spaceString.substring(0,spaceNum)+text;
    return text;
}
function getLogText20(text){
    //长度为30个空格
    const spaceString="                                                            ",
            spaceNum=20-text.length;
    text=spaceString.substring(0,spaceNum)+text;
    return text;
}

function handleError(err){
    var msg = null;
    if (typeof err === 'string') {
        msg = err;
    } else {
        msg = err.error;
    }
    console.log("[Error]: " + err.message);
}



export {getLogText,handleError,getLogText20};
