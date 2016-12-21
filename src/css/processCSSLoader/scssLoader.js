
import sass from 'gulp-sass';
import syntax from 'postcss-scss';
import gulpPostCSS from 'gulp-postcss';

//scss
export default function Mixin(gulp,processers){
    return  gulp.pipe(gulpPostCSS({ parser: syntax })).pipe(sass.sync().on('error', sass.logError));
}
