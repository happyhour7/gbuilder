'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleError = exports.getLogText = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLogText(text) {
    //长度为30个空格
    var spaceString = "                              ",
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
    notifier.notify({
        title: "gbuilder Error!",
        message: msg
    });
    console.log("[Error]: " + err.message);
}
exports.getLogText = getLogText;
exports.handleError = handleError;