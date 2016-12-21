import gulpPostCSS from 'gulp-postcss';
import less from 'postcss-less-engine';

//scss
export default function Mixin(gulp,processers){
    return  gulp.pipe(
                gulpPostCSS([less()], { parser: less.parser })
            );
}
