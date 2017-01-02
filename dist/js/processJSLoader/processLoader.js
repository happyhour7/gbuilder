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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _loaderStrategyDefine = require('./loaderStrategyDefine');

var _loaderStrategyDefine2 = _interopRequireDefault(_loaderStrategyDefine);

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _custom = require('envify/custom');

var _custom2 = _interopRequireDefault(_custom);

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
    _buildCssTo = task.buildCssTo,
        //vue的编译选项，将css提取到如下路径
    _exportCss = task.exportCssFileName,
        //如果是vue的话还有这么个配置项
    _fileName = task.exportFileName,
        //编译成功后的文件名
    _exportCssFilePath = _exportCss ? _path2.default.normalize(_buildCssTo + "/" + _exportCss) : null;

    //是否compress
    if (_isCompress === true) {
        browserify.transform((0, _custom2.default)({
            NODE_ENV: JSON.stringify("production")
        }));
        process.env.NODE_ENV = "production";
    } else {
        browserify.transform((0, _custom2.default)({
            NODE_ENV: JSON.stringify("development")
        }));
        process.env.NODE_ENV = "development";
    }
    //采用策略模式计算不同的loader不用的引用结果
    //添加特殊js的loaders处理
    browserify = _loaderStrategyDefine2.default[_loaderName + "Loader"](browserify, _exportCssFilePath).bundle().on("error", _util.handleError)
    //设置生成文件名
    .pipe((0, _vinylSourceStream2.default)(_fileName)).pipe((0, _vinylBuffer2.default)());
    _isCompress && browserify.pipe((0, _gulpUglify2.default)());
    console.log("当前代码运行环境：" + _cliColor2.default.green(process.env.NODE_ENV || "[未定义]"));
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