'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Mixin;

var _gulpPostcss = require('gulp-postcss');

var _gulpPostcss2 = _interopRequireDefault(_gulpPostcss);

var _postcssLessEngine = require('postcss-less-engine');

var _postcssLessEngine2 = _interopRequireDefault(_postcssLessEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//scss
function Mixin(gulp, processers) {
    return gulp.pipe((0, _gulpPostcss2.default)([(0, _postcssLessEngine2.default)()], { parser: _postcssLessEngine2.default.parser }));
}