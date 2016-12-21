
import scssLoader from "./scssLoader";
import lessLoader from "./lessLoader";
import cssLoader from "./cssLoader";
import stylusLoader from "./stylusLoader";


var loaderStrategy={
    stylus:stylusLoader,
    scss:scssLoader,
    less:lessLoader,
    css:cssLoader
}
export default loaderStrategy;
