'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Mixin;

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mixin() {
    return (0, _autoprefixer2.default)({ browsers: ['last 5 versions', 'IE 8'] });
}