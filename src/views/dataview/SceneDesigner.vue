<template>
  <div>
    <div class="scene-desigern-div">
      <div class="design-left-menu">
        <div class="charts-side-menu" @click="handleAddComponent('simplePie')">基本饼图</div>
        <div class="charts-side-menu" @click="handleAddComponent('simpleLine')">基本折线图</div>
      </div>
      <div class="design-cneter">
        <div class="design-top-menu">
          <a @click="handleSaveConfig" class="desigher-head-menu">保存</a>
          <a class="desigher-head-menu" @click="handleResetConfig">重置</a>
          <a class="desigher-head-menu" @click="handleGotoView">预览</a>
        </div>
        <div class="design-cneter-area">
          <page :sceneConfig="sceneConfig"/>
        </div>
      </div>
      <div class="design-right-menu">
        <div v-if="configContainer.styleOption && sceneConfig.page.container[editContainerIndex]">
          容器配置
          <a class="desigher-head-menu" @click="handleContainerDelete">删除</a>
          <div>
            x:<input v-model="sceneConfig.page.container[editContainerIndex].styleOption.left"/>
          </div>
          <div>
            y:<input v-model="sceneConfig.page.container[editContainerIndex].styleOption.top"/>
          </div>
          <div>
            宽:<input v-model="sceneConfig.page.container[editContainerIndex].styleOption.width"/>
          </div>
          <div>
            高:<input v-model="sceneConfig.page.container[editContainerIndex].styleOption.height"/>
          </div>
        </div>
        <div v-else>
          页面配置
          <div>
            宽:<input v-model="sceneConfig.page.styleOption.width"/>
          </div>
          <div>
            高:<input v-model="sceneConfig.page.styleOption.height"/>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      :visible="comEditVisible"
      width="800"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :footer="null"
    >
      <ComponentEditor
        ref="ComponentEditor"
        :sceneConfig="editConfig"
        @saveComponentConfig="saveComponentConfig"
        :sceneConfigStr="editConfigStr"/>
    </a-modal>
  </div>
</template>

<script>
import Page from './pages/Page'
import { sceneConfig } from './SceneConfig'
import component from './components/index'
import _ from 'lodash'
import ComponentEditor from './ComponentEditor'

export default {
  name: 'Scene',
  components: {
    Page,
    ComponentEditor
  },
  data () {
    return {
        comEditVisible: false,
        confirmLoading: false,
        component,
        staticConfig: sceneConfig,
        sceneConfig: {},
        configContainer: {},
        editContainerIndex: 0,
        editConfig: {},
        editConfigStr: ''
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
  destroyed () {
    // localStorage.setItem('sceneConfig', JSON.stringify(this.sceneConfig))
  },
  methods: {
    handleAddComponent (type) {
      this.$store.dispatch('addComponent', type)
    },
    handleSaveConfig () {
      localStorage.setItem('sceneConfig', JSON.stringify(this.sceneConfig))
    },
    handleResetConfig () {
      localStorage.setItem('sceneConfig', JSON.stringify(this.staticConfig))
      this.sceneConfig = JSON.parse(localStorage.getItem('sceneConfig'))
    },
    handleGotoView () {
      this.$router.push({
        path: '/scene'
      })
    },
    handleContainerDelete () {
      _.pull(this.sceneConfig.page.container, this.configContainer)
      this.$store.dispatch('onContainerDelete', this.configContainer.id)
    },
    handleCancel () {
      this.comEditVisible = false
    },
    saveComponentConfig (config) {
      let container = _.get(config, 'page.container[0]')
      for (let d of this.sceneConfig.page.container) {
        if (d.id === container.id) {
          d.component = container.component
        }
      }
      this.$store.dispatch('onComponentConfigSave', null)
    }
  },
  watch: {
    '$store.state.scene.addComponentType': {
      handler (type) {
        if (type === '') {

          // let path = '../../../public/scene/component/js/SceneConfig.js'
          // import(path).then((obj) => {
          //   debugger
          //   console.log(obj)
          //   console.log(2222222222)
          // })
        } else {
          let newComp = this.component[type].getNewConfig()
          this.sceneConfig.page.container.push(newComp)
          this.$store.dispatch('addComponent', '')
        }
      }
    },
    '$store.state.scene.onSelectContainer': {
      handler (obj) {
        if (obj != null) {
          let i = 0
          for (let d of this.sceneConfig.page.container) {
            if (d.id === obj.id) {
              this.editContainerIndex = i
              break
            }
            i++
          }
          this.configContainer = obj
        } else {
          this.configContainer = {}
        }
      }
    },
    '$store.state.scene.componentEdit.show': {
      handler (show) {
        if (show) {
          this.editConfig = this.$store.state.scene.componentEdit.sceneConfig
          this.editConfigStr = JSON.stringify(_.get(this.editConfig, 'page.container[0].component', ''), null, '\t')
          // this.$refs.ComponentEditor.compEditorShow(sceneConfig)
          this.comEditVisible = true
        } else {
          this.comEditVisible = false
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@leftMenuWidth : 80px;
@rightMenuWidth : 260px;
@topMenuHeight : 50px;
.scene-desigern-div{
    border:1px solid red;
    min-width: calc(100vw - 20px);
    min-height: calc(100vh - 20px);
    overflow: auto;
    background: #969696;
    display:flex;
}
.design-left-menu{
  width:@leftMenuWidth ;
  border:1px solid red;
  height: calc(100vh - 2px);
}
.design-top-menu{
  height: @topMenuHeight;
}
.design-cneter{
  width: calc(100vw - @leftMenuWidth - @rightMenuWidth);
  height: calc(100vh - 2px);
  // height: 100vh;
}
.design-cneter-area{
  width: 100%;
  height: calc(100% - @topMenuHeight);
  border: 1px solid red;
  overflow: auto;
}
.design-right-menu{
  width:@rightMenuWidth;
  border:1px solid red;
  height: calc(100vh - 2px);
}
.desigher-head-menu{
  padding: 10px;
  background: greenyellow;
  margin: 10px;
}
.charts-side-menu{
  padding: 3px;
  margin: 10px 0;
  background: greenyellow;
}
</style>
