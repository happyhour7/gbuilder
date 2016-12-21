"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = processCSSTask;

var _processLoader = require("./processCssLoader/processLoader");

var _processLoader2 = _interopRequireDefault(_processLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//css处理相关任务
function processCSSTask(brow, task) {
    //加载文件路径
    for (var i = 0, ii = task.modules.length; i < ii; i++) {
        brow.require(task.modules[i].path, { expose: task.modules[i].name });
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
};