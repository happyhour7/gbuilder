import stylus from 'gulp-stylus';
import postStylus from 'poststylus';
import cssnano from 'cssnano';

export default function Mixin(gulp,processers){
    return  gulp.pipe(stylus({'include css': true,use: [postStylus(processers||[])]}));
}
