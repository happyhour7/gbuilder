"use strict";

var localPath = process.cwd(); //当前路径
var buildPath = ""; //静态文件输出目录

var gBuilderConfig = {
    tasks: {
        "main-js": {
            modules: [{ path: "./js/home/login.jsx", name: "main" }, { path: "./js/home/login.jsx", name: "findPwd" }],
            buildTo: buildPath,
            exportFileName: "index.js",
            compress: false,
            loaders: ["js", "react"]
        }
    },
    watches: {
        "main-watch": [
            {src: ['./js/home/*.js', './js/home/**/*.js'],task: "main-js"}
        ]
    }
};
module.exports = gBuilderConfig;
