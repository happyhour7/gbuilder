"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lessLoader = require("./lessLoader");

var _lessLoader2 = _interopRequireDefault(_lessLoader);

var _cssLoader = require("./cssLoader");

var _cssLoader2 = _interopRequireDefault(_cssLoader);

var _stylusLoader = require("./stylusLoader");

var _stylusLoader2 = _interopRequireDefault(_stylusLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaderStrategy = {
    stylus: _stylusLoader2.default,
    less: _lessLoader2.default,
    css: _cssLoader2.default
};
exports.default = loaderStrategy;