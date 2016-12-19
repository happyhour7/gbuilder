module.exports.Mixin=function(browserify){
    return browserify.transform("babelify", {presets: ["es2015"]});
}