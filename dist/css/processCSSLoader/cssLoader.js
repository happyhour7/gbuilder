'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Mixin;

var _gulpPostcss = require('gulp-postcss');

var _gulpPostcss2 = _interopRequireDefault(_gulpPostcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
引用标准的postcss
*/
function Mixin(gulp, processers) {
    return gulp.pipe((0, _gulpPostcss2.default)(processers));
}