"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = processLoader;

var _gulp2 = require("gulp");

var _gulp3 = _interopRequireDefault(_gulp2);

var _loaderStrategy = require("./loaderStrategy");

var _loaderStrategy2 = _interopRequireDefault(_loaderStrategy);

var _processerStrategy = require("./processerStrategy");

var _processerStrategy2 = _interopRequireDefault(_processerStrategy);

var _cliColor = require("cli-color");

var _cliColor2 = _interopRequireDefault(_cliColor);

var _util = require("../../util/util");

var _gulpCleanCss = require("gulp-clean-css");

var _gulpCleanCss2 = _interopRequireDefault(_gulpCleanCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localPath = process.cwd();

function processLoader(browserify, task) {
    var processors = [],
        _loaderType = task.type,
        //文件类型：css、styl、less
    _distPath = task.buildTo,
        //编译到哪里去
    _gulp = _gulp3.default.src(task.modules);
    //postcss process加载
    task.loaders.forEach(function (processer, index, loaders) {
        if (index > 0) {
            _processerStrategy2.default[processer] && getProcess(processors, _processerStrategy2.default[processer]);
        }
    });

    //css类型loader
    _loaderStrategy2.default[_loaderType] && getLoaders(_loaderStrategy2.default[_loaderType]);
    //如果需要压缩css代码
    if (task.compress === true) {
        _gulp = _gulp.pipe((0, _gulpCleanCss2.default)({ compatibility: 'ie8' }, function (details) {
            console.log((0, _util.getLogText20)(details.name) + "\t" + (0, _util.getLogText)("Original:" + _cliColor2.default.red((details.stats.originalSize / 1000 || 0) + 'KB')) + "\t" + (0, _util.getLogText)("Minified:" + _cliColor2.default.green((details.stats.minifiedSize / 1000 || 0) + 'KB')));
        }));
    }
    _gulp.on("error", _util.handleError).pipe(_gulp3.default.dest(_distPath)).on('data', function (file) {
        //生成文件名
        var buildPaths = file.history;
        var buildName = buildPaths[buildPaths.length - 1].split("/").pop();
        console.log((0, _util.getLogText20)(task.compress ? "----" : buildName) + "\t" + (0, _util.getLogText)("Build:" + _cliColor2.default.green(file.contents.length / 1000 + 'KB')));
    });

    function getLoaders(mixin) {
        _gulp = mixin(_gulp, processors);
    }
    //处理process
    function getProcess(processors, processer) {
        processors.push(processer());
    }
}