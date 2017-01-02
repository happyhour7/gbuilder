import autoprefixer from 'autoprefixer';

export default function Mixin(){
    return autoprefixer({browsers: ['last 5 versions','IE 8']});
}
