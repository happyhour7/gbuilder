"use strict";

var fs = require("fs"),
    path = require("path"),
    localPath = process.cwd();

module.exports.init = function (currentDirName) {
    //创建基础配置文件

    var sourcePackagePath = path.normalize(currentDirName + "/package.json"),
        sourceConfigPath = path.normalize(currentDirName + "/gbuilder.config.js"),
        distPackagePath = path.normalize(localPath + "/package.json"),
        distConfigPath = path.normalize(localPath + "/gbuilder.config.js");

    var folder_exists = fs.existsSync(distConfigPath);
    if (folder_exists === false) {
        //如果配置文件不存在
        var readStream = fs.createReadStream(sourceConfigPath);
        var writeStream = fs.createWriteStream(distConfigPath);
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            console.log('create config file success!');
        });
        readStream.on('error', function (err) {
            console.log(err);
        });
    }

    var folder_exists = fs.existsSync(distPackagePath);
    if (folder_exists === false) {
        readStream = fs.createReadStream(sourcePackagePath);
        writeStream = fs.createWriteStream(distPackagePath);
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
};