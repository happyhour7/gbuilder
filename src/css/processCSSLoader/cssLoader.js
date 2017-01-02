
import postcss from 'gulp-postcss';

/**
引用标准的postcss
*/
export default function Mixin(gulp,processers){
    return  gulp.pipe(postcss(processers||[]));
}
