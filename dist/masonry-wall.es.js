import Vue from "vue";
function createColumns(count) {
  return [...new Array(count)].map(() => []);
}
var __vue2_script = /* @__PURE__ */ Vue.extend({
  name: "MasonryWall",
  props: {
    items: {
      type: Array,
      required: true
    },
    ssrColumns: {
      type: Number,
      default: 0
    },
    columnWidth: {
      type: Number,
      default: 400
    },
    gapX: {
      type: Number,
      default: 0
    },
    gapY: {
      type: Number,
      default: 0
    },
    rtl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    if (this.ssrColumns > 0) {
      const columns = createColumns(this.ssrColumns);
      this.items.forEach((_, i) => columns[i % this.ssrColumns].push(i));
      return {
        columns
      };
    }
    return {
      columns: []
    };
  },
  computed: {
    wall() {
      return this.$refs.wall;
    },
    resizeObserver() {
      return new ResizeObserver(() => this.redraw());
    }
  },
  watch: {
    items() {
      this.redraw(true);
    },
    columnWidth() {
      this.redraw();
    },
    gapX() {
      this.redraw();
    },
    rtl() {
      this.redraw(true);
    }
  },
  mounted() {
    this.redraw();
    this.resizeObserver.observe(this.wall);
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.wall);
  },
  methods: {
    async redraw(force = false) {
      if (this.columns.length === this.columnCount() && !force) {
        this.$emit("redraw-skip");
        return;
      }
      this.columns = createColumns(this.columnCount());
      const scrollY = window.scrollY;
      await this.fillColumns(0);
      window.scrollTo({ top: scrollY });
      this.$emit("redraw");
    },
    columnCount() {
      const count = Math.floor(
        (this.wall.getBoundingClientRect().width + this.gapX) / (this.columnWidth + this.gapX)
      );
      return count > 0 ? count : 1;
    },
    async fillColumns(itemIndex) {
      if (itemIndex >= this.items.length) {
        return;
      }
      await this.$nextTick();
      const columnDivs = [...this.wall.children];
      if (this.rtl) {
        columnDivs.reverse();
      }
      const target = columnDivs.reduce(
        (prev, curr) => curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev
      );
      this.columns[+target.dataset.index].push(itemIndex);
      await this.fillColumns(itemIndex + 1);
    }
  }
});
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    ref: "wall",
    staticClass: "masonry-wall",
    style: {
      display: "flex",
      gap: `${_vm.gapX}px ${_vm.gapY}px`
    }
  }, _vm._l(_vm.columns, function(column, columnIndex) {
    return _c("div", {
      key: columnIndex,
      staticClass: "masonry-column",
      style: {
        display: "flex",
        "flex-basis": 0,
        "flex-direction": "column",
        "flex-grow": 1,
        height: ["-webkit-max-content", "-moz-max-content", "max-content"],
        gap: `${_vm.gapX}px ${_vm.gapY}px`
      },
      attrs: {
        "data-index": columnIndex
      }
    }, _vm._l(column, function(itemIndex) {
      return _c("div", {
        key: itemIndex,
        staticClass: "masonry-item"
      }, [_vm._t("default", function() {
        return [_vm._v(_vm._s(_vm.items[itemIndex]))];
      }, {
        "item": _vm.items[itemIndex],
        "index": itemIndex
      })], 2);
    }), 0);
  }), 0);
};
var staticRenderFns = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(
        this,
        (options.functional ? this.parent : this).$root.$options.shadowRoot
      );
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(
  __vue2_script,
  render,
  staticRenderFns,
  false,
  __vue2_injectStyles,
  null,
  null,
  null
);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var component = /* @__PURE__ */ function() {
  return __component__.exports;
}();
const MasonryWall = /* @__PURE__ */ (() => {
  const installable = component;
  installable.install = (Vue2) => {
    Vue2.component("MasonryWall", installable);
  };
  return installable;
})();
export { MasonryWall as default };
