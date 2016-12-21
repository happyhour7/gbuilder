#!/usr/bin/env node
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _argumentsProcess = require("./arguments/argumentsProcess");

var _argumentsProcess2 = _interopRequireDefault(_argumentsProcess);

var _browserify = require("browserify");

var _browserify2 = _interopRequireDefault(_browserify);

var _cliColor = require("cli-color");

var _cliColor2 = _interopRequireDefault(_cliColor);

var _processTask = require("./task/processTask");

var _processTask2 = _interopRequireDefault(_processTask);

var _processJSTask = require("./js/processJSTask");

var _processJSTask2 = _interopRequireDefault(_processJSTask);

var _processCSSTask = require("./css/processCSSTask");

var _processCSSTask2 = _interopRequireDefault(_processCSSTask);

var _processTmplTask = require("./tmpl/processTmplTask");

var _processTmplTask2 = _interopRequireDefault(_processTmplTask);

var _util = require("./util/util");

var _watcherMinix = require("./watcher/watcherMinix");

var _watcherMinix2 = _interopRequireDefault(_watcherMinix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
    es6: babel -d ./bin ./src
*/
var localPath = process.cwd(),
    _args = process.argv.splice(2),
    taskName = _args[0];

//初始化参数配置
//---------------------项目初始化----------------------------
if (taskName && !taskName.indexOf(":") && (0, _argumentsProcess2.default)(taskName) === false) {
    console.log("存在参数，但是参数无法处理");
    process.exit();
} else if ((0, _argumentsProcess2.default)(taskName) === true) {
    console.log("初始化完毕");
    process.exit();
}

//-----------gulp+browserify+彩色输出+提示基础包---------------

//引入watcher处理器


//babel-preset-es2015
//babel-preset-react
var config = require(localPath + "/gbuilder.config");

var executed = false,
    hasLoadedTask = {};
//-----------------------遍历所有任务----------------------
//如果任务长度不为零，则输出文件列表的头部信息


/**
 * 遍历所有task实现配置可执行功能
 */

var _loop = function _loop() {
    var task = config.tasks[_name];
    hasLoadedTask[_name] = function () {
        return {
            callback: function callback(task) {
                console.log(_cliColor2.default.green.bold((0, _util.getLogText)("[fileName]")) + "\t" + _cliColor2.default.red.bold((0, _util.getLogText)("[fileSize]")));
                var brow = (0, _browserify2.default)(),
                    brow = {
                    "js": _processJSTask2.default,
                    "css": _processCSSTask2.default,
                    "tmpl": _processTmplTask2.default
                }[task.loaders.shift ? task.loaders[0] : task.loaders](brow, task);
            },
            task: task
        };
    }(task);
    if (taskName && _name == taskName || typeof taskName === 'undefined') {
        //存在taskname并且taskname等于当前配置的taskname
        executed = true;
        hasLoadedTask[_name].callback(hasLoadedTask[_name].task);
    }
};

for (var _name in config.tasks) {
    _loop();
}
//如果有单一任务 就优先执行单一任务
if (executed === true || !taskName) {
    console.log(taskName);
    process.exit();
}

/**
 * 遍历配置中所有的监控
 */
for (var _name in config.watchers) {

    if (_name != taskName) continue;
    var watcher = config.watchers[_name];
    //找到对应元素
    executed = true;
    (0, _watcherMinix2.default)(watcher, hasLoadedTask);
    console.log(_cliColor2.default.green.bold((0, _util.getLogText)("start watcher [" + _name + "]...")));
}

//判断是否已经执行了预编译流程
if (executed === false) {
    console.log(_cliColor2.default.red.bold("unknow task name!"));
    process.exit();
}