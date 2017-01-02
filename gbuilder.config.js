"use strict";

var localPath = process.cwd(); //当前路径
var buildPath = ""; //静态文件输出目录
var buildPathCss="";
var gBuilderConfig = {
    tasks: {
        "main-js": {
            modules: [{ path: "./js/home/login.jsx", name: "main" }, { path: "./js/home/login.jsx", name: "findPwd" }],
            buildTo: buildPath,
            exportFileName: "index.js",
            compress: true,
            loaders: ["js", "react"]
        },
        "cssTaskName":{
            modules: ['./stylus/usercenternew.styl'],   //css文件集
            type:"stylus",                              //文件类型支持：stylus,css,postcss,less
            buildTo: buildPathCss,                      //编译到的路径
            compress: false,                            //是否压缩
            loaders: ["css","autoprefixer","rucksack"]  //postcss，processers
        }
    },
    watchers: {
        "main-watch": [
            {src: ['./js/home/*.js', './js/home/**/*.js'],task: "main-js"}
        ]
    }
};
module.exports = gBuilderConfig;
