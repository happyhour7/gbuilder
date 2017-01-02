## 作用

    用gulp实现webpac的部分功能，gulp的底层、webpack的方便易用两不误
      * 通过配置gbuilder.config.js文件实现任务的编译、执行

##GITHUB源码地址：
    https://github.com/happyhour7/gbuilder.git

##基本说明：
    gbuilder最简单的地方在于：如果有人配置好了环境后，自己只需要安装gbuilder、配置好的gbuilder.config.js以及执行npm install即可。就算没有配置好，也不需要自己写gulp.task，gulp.watch之类的大量重复代码，也不用手动require各种gulp支持包。

##静态资源项目初始化：jbuilder.config.js、package.json,初始化的package.json中包含了尽量多的支持不同开发技术的与处理器
```bash
$ gbuilder :init
$ sudo npm intall
```
##gbuilder.config.js配置文件
```js
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
        },
        "cssTaskName":{
            modules: ['./stylus/usercenternew.styl'],   //css文件集
            type:"stylus",                              //文件类型支持：stylus,css,postcss,less
            buildTo: buildPathCss,                      //编译到的路径
            compress: false,                            //是否压缩
            loaders: ["css","autoprefixer","rucksack"]  //postcss，processers
        }
    },
    watches: {
        "main-watch": [
            {src: ['./js/home/*.js', './js/home/**/*.js'],task: "main-js"}
        ]
    }
};
module.exports = gBuilderConfig;
```



## 安装

  将developerjs安装到本地计算机

```bash
$ npm install -g gbuilder
```


## 重新编译
    gbuilder采用es6编写，使用babel进行编译
    ```bash
    $ npm run build
    ```


## 关于css预编译
    目前支持的语法：stylus、less、css
    目前支持的postcss插件：autoprefixer、rucksack、precss

###0.1.25版本无法支持postcss插件配置，会在后续版本中体现。


## 更新记录
    2016-12-19 0.1.18版本：实现单一js编译任务、js的watcher任务配置;
    2016-12-19 0.1.19版本：前版基础上更新了readme文件;
    2016-12-19 0.1.25版本：前版基础上增加了css预编译功能，支持stylus,css,postcss,less;
    2016-12-19 0.1.33版本：前版基础上解决了windows平台上路径错误问题;
    2016-12-19 0.1.34版本：前版基础上解决了precss编译bug;
    2016-12-19 0.1.36版本：前版基础上解决了配置文件配置错误;

## License
    [BSD]快快来贡献😄(LICENSE)
