"use strict"
var fs=require("fs"),
    localPath=process.cwd();
module.exports.init=function(){
    //创建基础配置文件

    var folder_exists = fs.existsSync(localPath+"/gbuilder.config.js");
    if(folder_exists===false){
        //如果配置文件不存在
        var readStream = fs.createReadStream(__dirname+'/gbuilder.config.js');
        var writeStream = fs.createWriteStream(localPath+'/gbuilder.config.js');
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            console.log('create config file success!');
        });
        readStream.on('error', function (err) {
            console.log(err);
        });
    }

    var folder_exists = fs.existsSync(localPath+"/package.json");
    if(folder_exists===false){
        readStream = fs.createReadStream(__dirname+'/package.json');
        writeStream = fs.createWriteStream(localPath+'/package.json');
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            console.log('create json file success!');
        });
        readStream.on('error', function (err) {
            console.log(err);
        });
    }
    //任务完成输出返回
    console.log("project has inited,please execute 'npm install'");
    return true;
}
