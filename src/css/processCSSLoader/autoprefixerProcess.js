import autoprefixer from 'autoprefixer';

export default function Mixin(){
    return autoprefixer({ remove: false ,browsers: ['last 5 version']});
}
