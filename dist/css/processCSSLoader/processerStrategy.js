"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _autoprefixerProcess = require("./autoprefixerProcess");

var _csscnanoProcess = require("./csscnanoProcess");

var processStrategy = {
    "autoprefixer": _autoprefixerProcess.Mixin,
    "csscanco": _csscnanoProcess.Mixin
};
exports.default = processStrategy;