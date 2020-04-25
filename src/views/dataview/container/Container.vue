<template>
  <div
    :class="['container-div', isSelect?'container-div-select':'']"
    :style="containerConfig.styleOption"
    v-drag="{callback:handleContainerMove}"
    @dblclick="handleComponentConfig"
    @click="handleContainerConfig">
    <div class="container-context">
      <simple-line
        v-if="containerConfig.component.type === 'simpleLine'"
        :sceneConfig="sceneConfig"
        :containerConfig="containerConfig"
        :componentConfig="containerConfig.component"/>
      <simple-pie
        v-if="containerConfig.component.type === 'simplePie'"
        :sceneConfig="sceneConfig"
        :containerConfig="containerConfig"
        :componentConfig="containerConfig.component"/>
    </div>
    <div class="container-right-div" v-cresize="{callback:handleContainerResizeWidth}"></div>
    <div class="container-bottom-div" v-cresize="{callback:handleContainerResizeHeight}"></div>
    <div class="container-BR-div" v-cresize="{callback:handleContainerResizeBR}"></div>
  </div>
</template>

<script>
import SimpleLine from '../components/echarts/line/SimpleLine'
import SimplePie from '../components/echarts/pie/SimplePie'
import { CommonMixin } from '@/mixin'
import moment from 'moment'
import _ from 'lodash'
console.log('CommonMixin', CommonMixin)
export default {
  name: 'Container',
  mixins: [
    CommonMixin
  ],
  components: {
    SimpleLine,
    SimplePie
  },
  computed: {
    isSelect: function () {
      return _.get(this.$store.state.scene, 'onSelectContainer.id', '') === _.get(this.containerConfig, 'id')
    }
  },
  props: {
    sceneConfig: {
      type: Object,
      required: true
    },
    containerConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  created () {
    console.log('container', moment().format('HH:mm:ss'))
  },
  methods: {
    handleContainerConfig (e) {
      if (e && e.stopPropagation) { e.stopPropagation() } else { window.event.cancelBubble = true }
      this.$store.dispatch('onContainerSelected', this.containerConfig)
    },
    handleContainerResize (width, height, wFlag, hFlag) {
      if (wFlag) {
        const oldWidth = parseInt(this.containerConfig.styleOption.width)
        this.containerConfig.styleOption.width = oldWidth + width + 'px'
      }
      if (hFlag) {
        const oldHeight = parseInt(this.containerConfig.styleOption.height)
        this.containerConfig.styleOption.height = oldHeight + height + 'px'
      }
    },
    handleContainerResizeWidth (width, height, wFlag, hFlag) {
      this.handleContainerResize(width, height, true, false)
    },
    handleContainerResizeHeight (width, height) {
      this.handleContainerResize(width, height, false, true)
    },
    handleContainerResizeBR (width, height) {
      this.handleContainerResize(width, height, true, true)
    },
    handleContainerMove (top, left) {
        if (top < 0) {
            top = 0
        }
        if (left < 0) {
            left = 0
        }
        this.containerConfig.styleOption.top = top + 'px'
        this.containerConfig.styleOption.left = left + 'px'
    },
    handleComponentConfig () {
      let sceneConfig = _.cloneDeep(this.sceneConfig)
      _.set(sceneConfig, 'page.container', [_.cloneDeep(this.containerConfig)])
      debugger
      this.$store.dispatch('onComponentConfig', sceneConfig)
    }
  }
}
</script>

<style scoped>
.container-div{
    position: absolute;
    border:1px solid #898989;
}
.container-div-select {
    border:1px solid #0079cf;
}
.container-right-div{
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% - 5px);
    width: 5px;
    /* border: solid 1px red; */
    cursor: e-resize;
}
.container-bottom-div{
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100% - 5px);
    height: 5px;
    /* border: solid 1px blue; */
    cursor: s-resize;
}
.container-BR-div{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 5px;
    height: 5px;
    /* border: solid 1px yellow; */
    cursor: se-resize;
}
.container-context{
  /* background: turquoise; */
  /* border:1px solid red; */
  width: 100%;
  height: 100%;
}
</style>
