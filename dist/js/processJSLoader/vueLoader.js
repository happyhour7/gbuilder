'use strict';

var vueify = require('vueify');
module.exports.Mixin = function (browserify, exportCss) {
    browserify = browserify.transform(vueify);
    if (exportCss) {
        browserify = browserify.plugin('vueify/plugins/extract-css', {
            out: exportCss // can also be a WritableStream
        });
    }
    return browserify;
};