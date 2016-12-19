import gulp from "gulp";

export default function watchMinix (watcher,hasLoadedTask){
    for(var i=0,ii=watcher.length;i<ii;i++){
        (function(index){
            gulp.watch(watcher[index].src, function() {
                hasLoadedTask[watcher[index].task].callback(hasLoadedTask[watcher[index].task].task);
            });
        })(i);

    }
}
