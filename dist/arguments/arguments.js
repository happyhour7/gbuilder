"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultReturn = {
    ":init": require("./process/init").init,
    ":v": require("./process/version").init
};
exports.default = defaultReturn;