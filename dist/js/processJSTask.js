"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = processJSTask;

var _processLoader = require("./processJSLoader/processLoader");

var _processLoader2 = _interopRequireDefault(_processLoader);

var _stoneify = require("../util/stoneify");

var _stoneify2 = _interopRequireDefault(_stoneify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//js处理相关任务
function processJSTask(brow, task) {
    //加载文件路径
    for (var i = 0, ii = task.modules.length; i < ii; i++) {
        if (task.modules[i].name) {
            brow.require(task.modules[i].path, { expose: task.modules[i].name }).transform(_stoneify2.default);
        } else {
            brow.require(task.modules[i].path);
        }
    }
    //如果用户传递过来的loaders不是数组则强制转化成数组
    if (!(task.loaders instanceof Array)) {
        task.loaders = [task.loaders, task.loaders];
    } else if (task.loaders.length === 1) {
        //如果用户值传递来压缩类型，默认是普通js即es5的解析方式
        task.loaders.push(task.loaders[0]);
    }
    //执行当前task的loader
    return (0, _processLoader2.default)(brow, task);
}