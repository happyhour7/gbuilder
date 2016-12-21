import stylus from 'gulp-stylus';
import poststylus from 'poststylus';


export default function Mixin(gulp,processers){
    return  gulp.pipe(stylus({
                use: [
                    poststylus(processers)
                ]
            }));
}
