<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <tool-panel @exportXML="exportXML"/>
      </a-layout-header>
      <a-layout>
        <a-layout-sider theme="light">
          <node-side @handleDragEnd="handleDragEnd" @handleDragStart="handleDragStart"/>
        </a-layout-sider>
        <a-layout-content>
          <gview-panel ref="gviewPanel">

          </gview-panel>
        </a-layout-content>
      </a-layout>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
    import NodeSide from './modules/NodeSide'
    import ToolPanel from './modules/ToolPanel'
    import GviewPanel from '@/components/G6/GviewPanel'

    export default {
    components: {
        NodeSide,
        GviewPanel,
        ToolPanel
    },
    name: 'FlowDesigner',
    data () {
        return {

        }
    },
    methods: {
      exportXML () {
        this.$refs.gviewPanel.exportXML()
      },
      handleDragStart (e, addModel) {
        this.$refs.gviewPanel.graphSetVel('addNodeDragging', true)
        this.$refs.gviewPanel.graphSetVel('addModel', addModel)
      },
      handleDragEnd (e) {
        this.$refs.gviewPanel.graphEmit('canvas:mouseup', e)
        this.$refs.gviewPanel.graphSetVel('addNodeDragging', false)
        this.$refs.gviewPanel.graphSetVel('addModel', null)
      }
    }
}
</script>
<style scoped>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fff;
  border: 1px solid  #f0f2f5;
  /* color: #fff; */
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #f0f2f5;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  /* background: rgba(16, 142, 233, 1); */
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
