<template>
  <a-card>
    <div class="topMenu">
      <a-button type="primary" @click="handleChangeModel">编辑</a-button>
      <a-button type="primary">撤销</a-button>
      <a-button type="primary">前进</a-button>
      <a-button type="primary">保存</a-button>
    </div>
    <a-row>
      <a-col :span="16">
        <div class="mapDiv">
          <relation-map
            ref="relationMap"
            :datas="datas"
            :width="850"
            @nodeClick="nodeClick"
            @edgeClick="edgeClick"
            :nodeContextMenu="false"
            :canvaseContextMenu="true"
            :height="500">

          </relation-map>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="configDiv">
          <!-- <my-color-picker v-model="colors" @change="handelModelChange"/>
          <a-input v-model="colors"/> -->
          <style-configer ref="styleconfiger" @styleChange="onStyleChange"/>
        </div>
      </a-col>
    </a-row>

  </a-card>
</template>

<script>
  import RelationMap from './RelationMap'
  import MyColorPicker from '@/components/MyColorPicker'
  import _ from 'lodash'
  import StyleConfiger from '@/components/StyleConfiger'
  import { nodeConfig, edgeConfig } from './RelationMapConfig'
  import config from '@/components/G6/config'

  export default {
      name: 'RelationMapEdit',
      components: {
        RelationMap,
        MyColorPicker,
        StyleConfiger
      },
      data () {
        return {
          nodeConfig,
          edgeConfig,
          showPicker: false,
          colors: 'rgba(1,1,1,0.4)',
          editType: '',
          datas: {
            editModel: {},
            // 点集
            nodes: [
              {
                id: 'node1', // String，该节点存在则必须，节点的唯一标识
                type: 'end-node',
                label: '第一个点',
                size: [100, 50],
                lqf: 'yes',
                // anchorPoints: [1, 0],
                style: {
                },
                labelCfg: {
                },
                anchorPoints: [
                  [0, 0.5],
                  [0.5, 0],
                  [1, 0.5],
                  [1, 1],
                  [0.5, 1],
                ],
                linkPoints: {
                  ...config.anchor.style.default,
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  // the diameter of the linkPoint
                  name: 'anchorPoint',
                },
                x: 100, // Number，可选，节点位置的 x 值
                y: 200 // Number，可选，节点位置的 y 值
              },
              {
                id: 'node2', // String，该节点存在则必须，节点的唯一标识
                anchorPoints: [
                  [0, 0.5],
                  [0.5, 0],
                  [1, 0.5],
                  [1, 1],
                  [0.5, 1],
                ],
                linkPoints: {
                  ...config.anchor.style.default,
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  // the diameter of the linkPoint
                  name: 'anchorPoint',
                },
                x: 300, // Number，可选，节点位置的 x 值
                y: 200 // Number，可选，节点位置的 y 值
              }
            ],
            // 边集
            edges: [
              {
                type: 'polyline',
                source: 'node1', // String，必须，起始点 id
                target: 'node2', // String，必须，目标点 id
                sourceAnchor: 3,
                // targetAnchor: 2
              }
            ]
          }
        }
      },
      created () {
      },
      mounted () {
      },
      methods: {
        handleChangeModel () {
          this.$refs.relationMap.handelModeChange('edit')
        },
        nodeClick (model) {
          this.editType = 'node'
          this.editModel = _.cloneDeep(model)
          this.$refs.styleconfiger.setConfig(this.nodeConfig)
          this.$refs.styleconfiger.setDatas(model)
        },
        edgeClick (model) {
          this.editType = 'edge'
          this.editModel = _.cloneDeep(model)
          this.$refs.styleconfiger.setConfig(this.edgeConfig)
          this.$refs.styleconfiger.setDatas(model)
        },
        handelModelChange (value) {
          _.set(this.editModel, 'style.fill', value)
          this.$refs.relationMap.updateItem(this.editModel)
        },
        onStyleChange (key, val) {
          _.set(this.editModel, key, val)
          if (this.editType === 'node') {
            if (key === 'type') {
              if (val === 'circle' || val === 'triangle' || val === 'star') {
                _.set(this.nodeConfig, 'configList[1].show', false)
                _.set(this.nodeConfig, 'configList[2].show', false)
                _.set(this.nodeConfig, 'configList[3].show', true)
              } else {
                _.set(this.nodeConfig, 'configList[1].show', true)
                _.set(this.nodeConfig, 'configList[2].show', true)
                _.set(this.nodeConfig, 'configList[3].show', false)
              }
            }
            this.$refs.styleconfiger.setConfig(this.nodeConfig)
          }
          let item = this.$refs.relationMap.updateItem(this.editModel)
          console.log('item', item)
          debugger
        }
      }
  }
</script>
<style scoped>
  .topMenu {
    margin-bottom: 5px;
  }
  .topMenu >>> .ant-btn{
    margin-left: 5px;
  }
  .mapDiv {
    overflow: auto;
    border: 1px solid #ccc;
  }
  .configDiv {
    overflow: auto;
    height: 500px;
    border: 1px solid #ccc;
  }
  .color-picker{
    height: 35px;
  }
  .chrome-picker{
    position: absolute;
    z-index: 1;
  }
</style>
