<template>
  <div style="display: flex;">
    <div class="component-context">
      <v-chart ref="chart" :options="bmap" :autoresize="true"></v-chart>
    </div>
    <div>
      <a-row>
        <a-col :span="8">zoom</a-col>
        <a-col :span="16">
          <a-input-number size="large" v-model="bmap.geo.zoom" step="0.01"/>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">aspectScale</a-col>
        <a-col :span="16">
          <a-input-number size="large" v-model="bmap.geo.aspectScale" step="0.01"/>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">top</a-col>
        <a-col :span="16">
          <a-input-number size="large" v-model="bmap.geo.top" step="1"/>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">left</a-col>
        <a-col :span="16">
          <a-input-number size="large" v-model="bmap.geo.left" step="1"/>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/map/js/world'
import 'echarts/extension/bmap/bmap.js'
import map from './data/map'
import bmap from './data/bmap'

// Map of China
import chinaMap from './china.json'

// registering map data
ECharts.registerMap('china', chinaMap)

export default {
  name: 'SimpleLine',
  components: {
    'v-chart': ECharts
  },
  props: {
  },
  data () {
    return {
        bmap,
        map,
        options: {
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'pie'
            }]
        },
        mapOption: {
          title: {
            text: 'World Flights',
            left: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          backgroundColor: '#003',
        //   tooltip: {
        //     formatter (param) {
        //       const route = data.routes[param.dataIndex]
        //       return (
        //         data.airports[route[1]][1] + ' > ' + data.airports[route[2]][1]
        //       )
        //     }
        //   },
          geo: {
            map: 'world',
            left: 0,
            right: 0,
            silent: true,
            itemStyle: {
              normal: {
                borderColor: '#003',
                color: '#005'
              }
            }
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
            //   data: routes,
              large: true,
              largeThreshold: 100,
              lineStyle: {
                normal: {
                  opacity: 0.05,
                  width: 0.5,
                  curveness: 0.3
                }
              },
              // 设置混合模式为叠加
              blendMode: 'lighter'
            }
          ]
        }
    }
  },
  created () {
      setTimeout(() => {
          console.log(this.$refs.chart)
        //   debugger
      }, 3000)
  },
  mounted () {
    this.map = this.$refs.chart.chart
    .getModel()
    .getComponent('bmap')
    .getBMap()
    this.map.setMapType(BMAP_SATELLITE_MAP)
    // console.log('BMAP_SATELLITE_MAP', BMAP_SATELLITE_MAP)
  },
  methods: {
  }
}
</script>

<style scoped>
.component-context{
    width:1000px;
    height:500px;
}
</style>
