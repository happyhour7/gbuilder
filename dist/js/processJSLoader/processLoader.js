'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = processLoader;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _loaderStrategyDefine = require('./loaderStrategyDefine');

var _loaderStrategyDefine2 = _interopRequireDefault(_loaderStrategyDefine);

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _util = require('../../util/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var handleError=function(){}

function processLoader(browserify, task) {

    var _loaderName = task.loaders[1],
        //loader的名字，gulp任务的名字
    _isCompress = task.compress,
        //是否压缩当前代码
    _distPath = task.buildTo,
        //编译到哪里去
    _fileName = task.exportFileName; //编译成功后的文件名

    //采用策略模式计算不同的loader不用的引用结果

    //添加特殊js的loaders处理
    browserify = _loaderStrategyDefine2.default[_loaderName + "Loader"](browserify).bundle().on("error", _util.handleError)
    //设置生成文件名
    .pipe((0, _vinylSourceStream2.default)(_fileName)).pipe((0, _vinylBuffer2.default)());

    //是否compress
    _isCompress && (browserify = browserify.pipe((0, _gulpUglify2.default)()));
    //任务输出
    return browserify.pipe(_gulp2.default.dest(_distPath)).on('data', function (file) {
        //生成文件名
        var buildPaths = file.history;
        //获得生成文件名
        var buildName = buildPaths[buildPaths.length - 1].split("/").pop();
        var fileSize = file.contents.length / 1000 + "KB";
        //将文件列表输出
        console.log((0, _util.getLogText)(buildName) + "\t" + _cliColor2.default.yellow((0, _util.getLogText)(fileSize)));
    });
}
//import { getLogText , handleError } from '../../util/util';