"use strict"
var fs=require("fs"),
    localPath=process.cwd();
module.exports.init=function(){
    //创建基础配置文件
    fs.exists(localPath+"/gbuilder.config.js",function(exits){
        if(!exits){
            //如果配置文件不存在
            var readStream = fs.createReadStream(__dirname+'/gbuilder.config.js');
            var writeStream = fs.createWriteStream(localPath+'/gbuilder.config.js');
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                console.log('create config file success!');
            });
            readStream.on('error', function () {
                console.log('create config file faile!');
            });
        }
    });
    //创建package.json
    fs.exists(localPath+"/package.json",function(exits){
        if(!exits){
            readStream = fs.createReadStream(__dirname+'/package.json');
            writeStream = fs.createWriteStream(localPath+'/package.json');
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                console.log('create json file success!');
            });
            readStream.on('error', function () {
                console.log('create json file faile!');
            });
        }
    });
    //任务完成输出返回
    console.log("project has inited,please execute 'npm install'");
    return false;
}