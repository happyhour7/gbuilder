
import {default as autoprefixerProcess} from "./autoprefixerProcess";
import {default as rucksackProcess} from "./rucksackProcess";
import {default as precssProcess} from "./precssProcess";
var processStrategy={
    "autoprefixer":autoprefixerProcess,
    "rucksack":rucksackProcess,
    "precss":precssProcess
}
export default processStrategy;
