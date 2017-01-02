"use strict";

module.exports.Mixin = function (browserify) {
    return browserify.transform("babelify", { presets: ["react"] });
};