import type { ExtendedVue } from 'vue/types/vue';
import Vue from 'vue';
declare type Column = number[];
declare const _sfc_main: ExtendedVue<Vue, {
    columns: Column[];
}, {
    redraw(force?: boolean): Promise<void>;
    columnCount(): number;
    fillColumns(itemIndex: number): Promise<void>;
}, {
    wall: HTMLDivElement;
    resizeObserver: ResizeObserver;
}, {
    items: unknown[];
    ssrColumns: number;
    columnWidth: number;
    gapX: number;
    gapY: number;
    rtl: boolean;
}>;
export default _sfc_main;
