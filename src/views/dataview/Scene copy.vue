<template>
  <div class="scene-div">
    <div class="page-div" :style="pageStyle">
      <div class="container-div" :style="containerStyle" v-drag="{callback:handleContainerMove}">
        <div class="container-context">
          <v-chart ref="chart1" :options="orgOptions" :autoresize="true"></v-chart>
        </div>
        <div class="container-right-div" v-cresize="{callback:handleContainerResizeWidth}"></div>
        <div class="container-bottom-div" v-cresize="{callback:handleContainerResizeHeight}"></div>
        <div class="container-BR-div" v-cresize="{callback:handleContainerResizeBR}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
export default {
  name: 'Scene',
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
        pageStyle: {
            width: '1920px',
            height: '1080px'
        },
        containerStyle: {
            width: '100px',
            height: '100px',
            left: '500px',
            top: '300px'
        },
        orgOptions: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }]
        }
    }
  },
  created () {
  },
  methods: {
    handleContainerResize (width, height, wFlag, hFlag) {
      if (wFlag) {
        const oldWidth = parseInt(this.containerStyle.width)
        this.containerStyle.width = oldWidth + width + 'px'
      }
      if (hFlag) {
        const oldHeight = parseInt(this.containerStyle.height)
        this.containerStyle.height = oldHeight + height + 'px'
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
        this.containerStyle.top = top + 'px'
        this.containerStyle.left = left + 'px'
    }
  }
}
</script>

<style scoped>
.scene-div{
    border:1px solid red;
    min-width: calc(100vw - 20px);
    min-height: calc(100vh - 20px);
    overflow: auto;
    background: #969696;
}
.page-div{
    border:1px solid blue;
}
.container-div{
    border:1px solid green;
    position: relative;
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
