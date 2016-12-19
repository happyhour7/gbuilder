"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = watchMinix;

var _gulp = require("gulp");

var _gulp2 = _interopRequireDefault(_gulp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function watchMinix(watcher, hasLoadedTask) {
    for (var i = 0, ii = watcher.length; i < ii; i++) {
        (function (index) {
            _gulp2.default.watch(watcher[index].src, function () {
                hasLoadedTask[watcher[index].task].callback(hasLoadedTask[watcher[index].task].task);
            });
        })(i);
    }
}