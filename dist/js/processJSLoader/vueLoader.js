'use strict';

var vueify = require('vueify');
module.exports.Mixin = function (browserify, exportCss) {
    browserify = browserify.transform(vueify);
    if (exportCss) {

        console.log("11111111111");
        browserify = browserify.plugin('vueify/plugins/extract-css', {
            out: exportCss // can also be a WritableStream
        });
        console.log("222222222");
    }
    return browserify;
};