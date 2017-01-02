"use strict";

module.exports = {
    //每一个新的loader都在这里注册
    "jsLoader": require("./jsLoader").Mixin,
    "es6Loader": require("./es6Loader").Mixin,
    "reactLoader": require("./reactLoader").Mixin,
    "vueLoader": require("./vueLoader").Mixin,
    "react-es6Loader": require("./reactEs6Loader").Mixin
};