(function(l,f){typeof exports=="object"&&typeof module!="undefined"?module.exports=f(require("vue")):typeof define=="function"&&define.amd?define(["vue"],f):(l=typeof globalThis!="undefined"?globalThis:l||self,l.MasonryWall=f(l.Vue))})(this,function(l){"use strict";function f(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var _=f(l);function c(e){return[...new Array(e)].map(()=>[])}var v=_.default.extend({name:"MasonryWall",props:{items:{type:Array,required:!0},ssrColumns:{type:Number,default:0},columnWidth:{type:Number,default:400},gapX:{type:Number,default:0},gapY:{type:Number,default:0},rtl:{type:Boolean,default:!1}},data(){if(this.ssrColumns>0){const e=c(this.ssrColumns);return this.items.forEach((t,r)=>e[r%this.ssrColumns].push(r)),{columns:e}}return{columns:[]}},computed:{wall(){return this.$refs.wall},resizeObserver(){return new ResizeObserver(()=>this.redraw())}},watch:{items(){this.redraw(!0)},columnWidth(){this.redraw()},gapX(){this.redraw()},rtl(){this.redraw(!0)}},mounted(){this.redraw(),this.resizeObserver.observe(this.wall)},beforeDestroy(){this.resizeObserver.unobserve(this.wall)},methods:{async redraw(e=!1){if(this.columns.length===this.columnCount()&&!e){this.$emit("redraw-skip");return}this.columns=c(this.columnCount());const t=window.scrollY;await this.fillColumns(0),window.scrollTo({top:t}),this.$emit("redraw")},columnCount(){const e=Math.floor((this.wall.getBoundingClientRect().width+this.gapX)/(this.columnWidth+this.gapX));return e>0?e:1},async fillColumns(e){if(e>=this.items.length)return;await this.$nextTick();const t=[...this.wall.children];this.rtl&&t.reverse();const r=t.reduce((u,s)=>s.getBoundingClientRect().height<u.getBoundingClientRect().height?s:u);this.columns[+r.dataset.index].push(e),await this.fillColumns(e+1)}}}),w=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"wall",staticClass:"masonry-wall",style:{display:"flex",gap:`${e.gapX}px ${e.gapY}px`}},e._l(e.columns,function(u,s){return r("div",{key:s,staticClass:"masonry-column",style:{display:"flex","flex-basis":0,"flex-direction":"column","flex-grow":1,height:["-webkit-max-content","-moz-max-content","max-content"],gap:`${e.gapX}px ${e.gapY}px`},attrs:{"data-index":s}},e._l(u,function(a){return r("div",{key:a,staticClass:"masonry-item"},[e._t("default",function(){return[e._v(e._s(e.items[a]))]},{item:e.items[a],index:a})],2)}),0)}),0)},y=[];function g(e,t,r,u,s,a,h,R){var n=typeof e=="function"?e.options:e;t&&(n.render=t,n.staticRenderFns=r,n._compiled=!0),u&&(n.functional=!0),a&&(n._scopeId="data-v-"+a);var o;if(h?(o=function(i){i=i||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!i&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(i=__VUE_SSR_CONTEXT__),s&&s.call(this,i),i&&i._registeredComponents&&i._registeredComponents.add(h)},n._ssrRegister=o):s&&(o=R?function(){s.call(this,(n.functional?this.parent:this).$root.$options.shadowRoot)}:s),o)if(n.functional){n._injectStyles=o;var W=n.render;n.render=function(T,p){return o.call(p),W(T,p)}}else{var m=n.beforeCreate;n.beforeCreate=m?[].concat(m,o):[o]}return{exports:e,options:n}}const d={};var C=g(v,w,y,!1,b,null,null,null);function b(e){for(let t in d)this[t]=d[t]}var $=function(){return C.exports}();return(()=>{const e=$;return e.install=t=>{t.component("MasonryWall",e)},e})()});
