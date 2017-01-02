'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Mixin;

var _gulpStylus = require('gulp-stylus');

var _gulpStylus2 = _interopRequireDefault(_gulpStylus);

var _poststylus = require('poststylus');

var _poststylus2 = _interopRequireDefault(_poststylus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mixin(gulp, processers) {
    return gulp.pipe((0, _gulpStylus2.default)({ 'include css': true, use: [(0, _poststylus2.default)(processers || [])] }));
}