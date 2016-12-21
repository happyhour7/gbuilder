'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Mixin;

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _postcssScss = require('postcss-scss');

var _postcssScss2 = _interopRequireDefault(_postcssScss);

var _gulpPostcss = require('gulp-postcss');

var _gulpPostcss2 = _interopRequireDefault(_gulpPostcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//scss
function Mixin(gulp, processers) {
    return gulp.pipe((0, _gulpPostcss2.default)({ parser: _postcssScss2.default })).pipe(_gulpSass2.default.sync().on('error', _gulpSass2.default.logError));
}