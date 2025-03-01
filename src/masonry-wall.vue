<!--MIT License-->

<!--Copyright (c) 2021 Fuxing Loh, Jan Müller-->

<!--Permission is hereby granted, free of charge, to any person obtaining a copy-->
<!--of this software and associated documentation files (the "Software"), to deal-->
<!--in the Software without restriction, including without limitation the rights-->
<!--to use, copy, modify, merge, publish, distribute, sublicense, and/or sell-->
<!--copies of the Software, and to permit persons to whom the Software is-->
<!--furnished to do so, subject to the following conditions:-->

<!--The above copyright notice and this permission notice shall be included in all-->
<!--copies or substantial portions of the Software.-->

<!--THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR-->
<!--IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,-->
<!--FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE-->
<!--AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER-->
<!--LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,-->
<!--OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE-->
<!--SOFTWARE.-->

<template>
  <div ref="wall" class="masonry-wall" :style="{ display: 'flex', gap: `${gapX}px ${gapY}px` }">
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="masonry-column"
      :data-index="columnIndex"
      :style="{
        display: 'flex',
        'flex-basis': 0,
        'flex-direction': 'column',
        'flex-grow': 1,
        height: ['-webkit-max-content', '-moz-max-content', 'max-content'],
        gap: `${gapX}px ${gapY}px`,
      }"
    >
      <div v-for="itemIndex in column" :key="itemIndex" class="masonry-item">
        <slot :item="items[itemIndex]" :index="itemIndex">{{ items[itemIndex] }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Column = number[]

function createColumns(count: number): Column[] {
  return [...new Array(count)].map(() => [])
}

export default /*#__PURE__*/ Vue.extend({
  name: 'MasonryWall',
  props: {
    items: {
      type: Array as () => unknown[],
      required: true,
    },
    ssrColumns: {
      type: Number,
      default: 0,
    },
    columnWidth: {
      type: Number,
      default: 400,
    },
    gapX: {
      type: Number,
      default: 0,
    },
    gapY: {
      type: Number,
      default: 0,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    if (this.ssrColumns > 0) {
      const columns = createColumns(this.ssrColumns)
      this.items.forEach((_, i) => columns[i % this.ssrColumns].push(i))
      return {
        columns: columns,
      }
    }
    return {
      columns: [],
    }
  },
  computed: {
    wall(): HTMLDivElement {
      return this.$refs.wall as HTMLDivElement
    },
    resizeObserver(): ResizeObserver {
      return new ResizeObserver(() => this.redraw())
    },
  },
  watch: {
    items() {
      this.redraw(true)
    },
    columnWidth() {
      this.redraw()
    },
    gapX() {
      this.redraw()
    },
    rtl() {
      this.redraw(true)
    },
  },
  mounted() {
    this.redraw()
    this.resizeObserver.observe(this.wall)
  },
  beforeDestroy() {
    this.resizeObserver.unobserve(this.wall)
  },
  methods: {
    async redraw(force = false) {
      if (this.columns.length === this.columnCount() && !force) {
        this.$emit('redraw-skip')
        return
      }
      this.columns = createColumns(this.columnCount())
      const scrollY = window.scrollY
      await this.fillColumns(0)
      window.scrollTo({ top: scrollY })
      this.$emit('redraw')
    },
    columnCount(): number {
      const count = Math.floor(
        (this.wall.getBoundingClientRect().width + this.gapX) /
          (this.columnWidth + this.gapX)
      )
      return count > 0 ? count : 1
    },
    async fillColumns(itemIndex: number) {
      if (itemIndex >= this.items.length) {
        return
      }
      await this.$nextTick()
      const columnDivs = [...this.wall.children] as HTMLDivElement[]
      if (this.rtl) {
        columnDivs.reverse()
      }
      const target = columnDivs.reduce((prev, curr) =>
        curr.getBoundingClientRect().height <
        prev.getBoundingClientRect().height
          ? curr
          : prev
      )
      this.columns[+target.dataset.index!].push(itemIndex)
      await this.fillColumns(itemIndex + 1)
    },
  },
})
</script>
