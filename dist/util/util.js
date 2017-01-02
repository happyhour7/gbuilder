'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLogText20 = exports.handleError = exports.getLogText = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLogText(text) {
    //长度为30个空格
    var spaceString = "                                                            ",
        spaceNum = 15 - text.length;
    text = spaceString.substring(0, spaceNum) + text;
    return text;
}
function getLogText20(text) {
    //长度为30个空格
    var spaceString = "                                                            ",
        spaceNum = 20 - text.length;
    text = spaceString.substring(0, spaceNum) + text;
    return text;
}

function handleError(err) {
    var msg = null;
    if (typeof err === 'string') {
        msg = err;
    } else {
        msg = err.error;
    }
    console.log("[Error]: " + err.message);
}

exports.getLogText = getLogText;
exports.handleError = handleError;
exports.getLogText20 = getLogText20;