"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = argumentsTask;

var _arguments = require("./arguments");

var _arguments2 = _interopRequireDefault(_arguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//arguments相关处理
function argumentsTask(argumentsName, currentDirName) {
    return _arguments2.default[argumentsName] && _arguments2.default[argumentsName](currentDirName);
};