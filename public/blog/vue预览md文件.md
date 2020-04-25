# vue预览md文件

使用场景：vue-cli3

## 一.使用vue-markdown-loader

```html
添加依赖  yarn add vue-markdown-loader
```

```
修改vue.vonfig.js

chainWebpack: (config) => {
	//添加md规则
    config.module.rule('md')
    .test(/\.md/)
    .use('vue-loader')
    .loader('vue-loader')
    .end()
    .use('vue-markdown-loader')
    .loader('vue-markdown-loader/lib/markdown-compiler')
    .options({
      raw: true
    })
})
```

```vue
<template>
  <div class="markdown-body">
    <my-markdown></my-markdown>
  </div>
</template>

<script>
import myMarkdown from '../../../public/blog/demo1.md'
import 'github-markdown-css'

export default {
  components: {
    myMarkdown
  }
  
  直接将md文件import，可以直接当成组件使用
```

## 二,使用vue-markdown

```
添加依赖 yarn add vue-markdown
```

```vue
<template>
  <div class="markdown-body">
    <a @click="handleNext">next</a>
    <vue-markdown :source="mdVal"></vue-markdown>
  </div>
</template>
<script>
    
import { axios } from '@/utils/request'
import VueMarkdown from 'vue-markdown'
import 'github-markdown-css'

export default {
  name: 'Myblog',
  components: {
    VueMarkdown
  },
  data () {
    return {
        mdVal: ''
    }
  },
  created () {
      this.setMdVal('/../blog/demo1.md')
  },

  methods: {
      handleNext () {
        this.setMdVal('/../blog/demo2.md')
      },
      setMdVal (url) {
        axios({
                url: url,
                method: 'get'
            }).then(res => {
                this.mdVal = res
            })
      }
  }
}
</script>
页面引入vue-markdown 动态加载md文件并把值赋给source实现md文件动态加载
```

## 附：

两种方式均使用 import 'github-markdown-css' 提供的样式，未深入理解样式使用效果并不理想

使用这个样式须在外层包裹 class=”markdown-body“