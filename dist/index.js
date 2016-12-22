#!/usr/bin/env node
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _argumentsProcess = require("./arguments/argumentsProcess");

var _argumentsProcess2 = _interopRequireDefault(_argumentsProcess);

var _taskInit = require("./taskInit");

var _taskInit2 = _interopRequireDefault(_taskInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _args = process.argv.splice(2),
    taskName = _args[0];

//初始化参数配置
//---------------------项目初始化----------------------------


/**
    es6: babel -d ./bin ./src
*/
if (taskName && !taskName.indexOf(":") && (0, _argumentsProcess2.default)(taskName) === false) {
    console.log("存在参数，但是参数无法处理");
} else if ((0, _argumentsProcess2.default)(taskName) === true) {
    console.log("初始化完毕");
} else {
    (0, _taskInit2.default)(taskName);
}