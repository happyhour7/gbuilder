"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _autoprefixerProcess = require("./autoprefixerProcess");

var _autoprefixerProcess2 = _interopRequireDefault(_autoprefixerProcess);

var _rucksackProcess = require("./rucksackProcess");

var _rucksackProcess2 = _interopRequireDefault(_rucksackProcess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processStrategy = {
    "autoprefixer": _autoprefixerProcess2.default,
    "rucksack": _rucksackProcess2.default
};
exports.default = processStrategy;