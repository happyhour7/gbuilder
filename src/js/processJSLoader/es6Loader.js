module.exports.Mixin=function(browserify){
    process.env.NODE_ENV=JSON.stringify("production") ;
    return browserify.transform("babelify", {presets: ["es2015"]});
}
