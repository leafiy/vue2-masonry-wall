import { PluginObject } from 'vue';
import component from "./masonry-wall";
declare type InstallableComponent = typeof component & PluginObject<never>;
declare const MasonryWall: InstallableComponent;
export default MasonryWall;
