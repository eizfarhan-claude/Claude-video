import edlJson from './edl.json';
import {Edl, makeTimeline} from '../../engine/timeline';
export const tl = makeTimeline(edlJson as Edl);
export const {at, sectionStart, sectionEnd} = tl;
export {sec, FPS} from '../../engine/timeline';
