<template>
  <div class="scene-div">
    <page :sceneConfig="sceneConfig"/>
  </div>
</template>

<script>
import Page from './pages/Page'
import { sceneConfig } from './SceneConfig'
export default {
  name: 'Scene',
  components: {
    Page
  },
  data () {
    return {
        staticConfig: sceneConfig,
        sceneConfig: {}
    }
  },
  created () {
    this.$store.dispatch('setDesignerType', true)
    let config = localStorage.getItem('sceneConfig')
    if (!config) {
      localStorage.setItem('sceneConfig', JSON.stringify(this.staticConfig))
    }
    this.sceneConfig = JSON.parse(localStorage.getItem('sceneConfig'))
  },
  methods: {
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

</style>
