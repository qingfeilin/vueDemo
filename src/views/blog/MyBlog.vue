<template>
  <div class="markdown-body">
    <a @click="handleNext">next</a>
    <!-- <my-markdown  v-highlight></my-markdown> -->
    <vue-markdown v-highlight :source="mdVal"></vue-markdown>
  </div>
</template>

<script>
// import myMarkdown from '../../../public/blog/echarts使用介绍.md'
import { axios } from '@/utils/request'
import VueMarkdown from 'vue-markdown'
import 'github-markdown-css'

// console.log(myMarkdown)
export default {
  name: 'Myblog',
  components: {
    // myMarkdown
    VueMarkdown
  },
  data () {
    return {
        mdVal: ''
    }
  },
  created () {
      this.setMdVal('/../blog/echarts使用介绍.md')
  },
  methods: {
      handleNext () {
        this.setMdVal('/../blog/vue预览md文件.md')
      },
      setMdVal (url) {
        axios({
                url: url,
                method: 'get'
            }).then(res => {
              console.log(res)
                this.mdVal = res
            })
      }
  }
}
</script>

<style scoped>

</style>
