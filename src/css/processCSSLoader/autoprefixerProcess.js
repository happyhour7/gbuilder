import autoprefixer from 'autoprefixer';

export default function Mixin(){
    return autoprefixer({browsers: ['last 10 version']});
}
