<template>
  <div class="page-div" :style="sceneConfig.page.styleOption" @click="handlePageClick">
    <container
      :containerConfig="item"
      :sceneConfig="sceneConfig"
      :ref="item.id"
      v-for="(item, index) of sceneConfig.page.container"
      :key="index"/>
  </div>
</template>

<script>
import Container from '../container/Container'
import { CommonMixin } from '@/mixin'
export default {
  name: 'Page',
  mixins: [
    CommonMixin
  ],
  components: {
    Container
  },
  props: {
    sceneConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
    console.log(this.sceneConfig)
  },
  methods: {
    handlePageClick () {
      this.$store.dispatch('onPageSelected')
    }
  },
  watch: {
    '$store.state.scene.onDeleteContainerKey': {
      handler (key) {
        if (key) {
          this.$refs[key]
        } else {
          this.$store.dispatch('onContainerDelete', '')
        }
      }
    }
  }
}
</script>

<style scoped>
.page-div{
    position: relative;
    border:1px solid blue;
}
</style>
