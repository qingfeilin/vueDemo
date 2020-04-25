<template>
  <div class="component-editor">
    <div class="config-area">
      <editor
        v-model="componentConfigStr"
        @init="editorInit"
        lang="javascript"
        theme="chrome"
        width="300"
        height="400"></editor>
    </div>
    <a @click="save">保存</a>
    <div class="scene-div">
      <page :sceneConfig="editConfig"/>
    </div>
  </div>
</template>

<script>
import Page from './pages/Page'
import _ from 'lodash'

export default {
  name: 'ComponentEditor',
  components: {
    Page,
    editor: require('vue2-ace-editor')
  },
  props: {
    sceneConfig: {
      type: Object,
      required: true,
      default: () => {
          return {}
      }
    },
    sceneConfigStr: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    let that = this
    return {
        confirmLoading: false,
        editConfig: {},
        componentConfigStr: '', // JSON.stringify(sceneConfig.page.container[0].component, null, '\t'),
        styleChangeTimer: null,
        save: () => {
            that.$emit('saveComponentConfig', this.editConfig)
        }
    }
  },
  created () {
      this.editConfig = _.cloneDeep(this.sceneConfig)
      this.componentConfigStr = JSON.stringify(_.get(this.editConfig, 'page.container[0].component', ''), null, '\t')
  },
  methods: {
    editorInit: function () {
        require('brace/ext/language_tools')
        require('brace/mode/html')
        require('brace/mode/javascript')
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/snippets/javascript')
    },
    // compEditorShow: (sceneConfig) => {
    //     this.visible = true
    //     this.$nextTick(() => {
    //         this.sceneConfigStr = JSON.stringify(_.get(sceneConfig, 'page.container[0].component', ''), null, '\t')
    //         this.sceneConfig = sceneConfig
    //     })
    // },
    // handleOk: () => {
    //     // this.visible = false
    // }
  },
  watch: {
      'componentConfigStr': {
          handler (value) {
              if (this.styleChangeTimer) {
                clearTimeout(this.styleChangeTimer)
              }
              let that = this
              this.styleChangeTimer = setTimeout(() => {
                  _.set(that.editConfig, 'page.container[0].component', JSON.parse(value))
              }, 100)
          }
      }
  }
}
</script>

<style scoped  lang="less">
@rightAreaWidth : 320px;
.component-editor {
    display:flex;
    border: 1px solid rgb(76, 0, 255);
    overflow: auto;
}
.config-area {
    border: 1px solid rgb(0, 255, 213);
    width: @rightAreaWidth;
}
.scene-div {
    border:1px solid red;
    max-width: 800px;
    max-height: 600px;
    overflow: auto;
    background: #969696;
}

</style>
