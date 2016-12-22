"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

//-----------gulp+browserify+彩色输出+提示基础包---------------
var localPath = process.cwd();
//babel-preset-es2015
//babel-preset-react

//引入watcher处理器
var config = require(localPath + "/gbuilder.config");

var executed = false,
    hasLoadedTask = {};
//-----------------------遍历所有任务----------------------
//如果任务长度不为零，则输出文件列表的头部信息


/**
 * 遍历所有task实现配置可执行功能
 */
function taskExecute(taskName) {
    var _loop = function _loop() {
        var task = config.tasks[_name];
        hasLoadedTask[_name] = function () {
            return {
                callback: function callback(task) {
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
        return;
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

    executed === false && console.log(_cliColor2.default.red.bold((0, _util.getLogText)("unknow task name!")));
}

exports.default = taskExecute;