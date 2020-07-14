<template>
  <div class="component-context">
    <v-chart ref="chart" :options="componentConfig.options" :autoresize="true"></v-chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
export default {
  name: 'SimpleLine',
  components: {
    'v-chart': ECharts
  },
  props: {
    sceneConfig: {
      type: Object,
      required: true
    },
    containerConfig: {
      type: Object,
      required: true
    },
    componentConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
  },
  watch: {
    '$store.scene.addComponentType': {
      handler () {
      }
    }
  }
}
</script>

<style scoped>
.component-context{
    width:100%;
    height:100%;
}
</style>
