<template>
  <a-menu
    style="width: 200px"
    :default-selected-keys="['1']"
    :default-open-keys="['sub1']"
    mode="inline"
    :theme="theme"
    :selected-keys="[current]"
    @click="handleClick"
    :open-keys="openKeys"
    @openChange="onOpenChange"
  >
    <a-sub-menu v-for="(item, index) of itenList" :key="'root' + index">
      <span slot="title"><a-icon type="appstore" /><span>{{ item.label }}</span></span>
      <a-menu-item class="node-menu-item" v-for="(subItem, subIndex) of item.children" :key="'root' + index + 'sub' + subIndex">
        <div class="menu-item-div flow-add-item-drag">
          <img :src="subItem.icon" alt="start.svg" height="30px" @dragstart="(e)=>{handleDragStart(e, subItem.model)}" @dragend="(e)=>{handleDragEnd(e,'asdf')}">
          <div>{{ subItem.label }}</div>
        </div>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
    import { createDom } from '@antv/dom-util'

export default {
  name: 'NodeSide',
  data () {
    return {
      current: '1',
      theme: 'light',
      ghost: createDom('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + ' style="opacity:0"/>'),
      rootSubmenuKeys: ['root0', 'root1', 'root2', 'root3', 'root4'],
      openKeys: [],
      itenList: [
          {
              label: '开始事件',
              children: [
                  {
                      label: '开始节点',
                      icon: require('@/assets/flow/start.svg'),
                      clazz: 'start',
                      model: { clazz: 'start', size: '30*30', label: '' }
                  },
                  {
                      label: '定时节点',
                      icon: require('@/assets/flow/timer-start.svg'),
                      clazz: 'timerStart',
                      model: { clazz: 'timerStart', size: '30*30', label: '' }
                  },
                  {
                      label: '消息节点',
                      icon: require('@/assets/flow/message-start.svg'),
                      clazz: 'messageStart',
                      model: { clazz: 'messageStart', size: '30*30', label: '' }
                  },
                  {
                      label: '信号节点',
                      icon: require('@/assets/flow/signal-start.svg'),
                      clazz: 'signalStart',
                      model: { clazz: 'signalStart', size: '30*30', label: '' }
                  }
              ]
          },
          {
              label: '活动',
              children: [
                  {
                      label: '审批节点',
                      icon: require('@/assets/flow/user-task.svg'),
                      clazz: 'userTask',
                      model: { clazz: 'userTask', size: '80*44', label: '审批节点' }
                  },
                  {
                      label: '脚本节点',
                      icon: require('@/assets/flow/script-task.svg'),
                      clazz: 'scriptTask',
                      model: { clazz: 'scriptTask', size: '80*44', label: '脚本节点' }
                  },
                  {
                      label: '自定义类节点',
                      icon: require('@/assets/flow/java-task.svg'),
                      clazz: 'javaTask',
                      model: { clazz: 'javaTask', size: '80*44', label: '自定义类节点' }
                  },
                  {
                      label: '邮件节点',
                      icon: require('@/assets/flow/mail-task.svg'),
                      clazz: 'mailTask',
                      model: { clazz: 'mailTask', size: '80*44', label: '邮件节点' }
                  },
                  {
                      label: '接收节点',
                      icon: require('@/assets/flow/receive-task.svg'),
                      clazz: 'receiveTask',
                      model: { clazz: 'receiveTask', size: '80*44', label: '接收节点' }
                  }
              ]
          },
          {
              label: '网关',
              children: [
                  {
                      label: '排他网关',
                      icon: require('@/assets/flow/exclusive-gateway.svg'),
                      clazz: 'exclusiveGateway',
                      model: { clazz: 'exclusiveGateway', size: '40*40', label: '' }
                  },
                  {
                      label: '并行网关',
                      icon: require('@/assets/flow/parallel-gateway.svg'),
                      clazz: 'parallelGateway',
                      model: { clazz: 'parallelGateway', size: '40*40', label: '' }
                  },
                  {
                      label: '包容网关',
                      icon: require('@/assets/flow/inclusive-gateway.svg'),
                      clazz: 'inclusiveGateway',
                      model: { clazz: 'inclusiveGateway', size: '40*40', label: '' }
                  }
              ]
          },
          {
              label: '捕获事件',
              children: [
                  {
                      label: '定时节点',
                      icon: require('@/assets/flow/timer-catch.svg'),
                      clazz: 'timerCatch',
                      model: { clazz: 'timerCatch', size: '50*30', label: '' }
                  },
                  {
                      label: '消息节点',
                      icon: require('@/assets/flow/message-catch.svg'),
                      clazz: 'messageEvent',
                      model: { clazz: 'messageCatch', size: '50*30', label: '' }
                  },
                  {
                      label: '信号节点',
                      icon: require('@/assets/flow/signal-catch.svg'),
                      clazz: 'signalEvent',
                      model: { clazz: 'signalCatch', size: '50*30', label: '' }
                  }
              ]
          },
          {
              label: '结束事件',
              children: [
                  {
                      label: '结束事件',
                      icon: require('@/assets/flow/end.svg'),
                      clazz: 'endEvent',
                      model: { clazz: 'end', size: '30*30', label: '' }
                  }
              ]
          }
      ]
    }
  },
  methods: {
    handleDragStart (e, model) {
        console.log('handleDragStart', model)
        e.dataTransfer.setDragImage(this.ghost, 0, 0)
        this.$emit('handleDragStart', e, model)
    },
    handleDragEnd (e) {
        console.log('handleDragEnd')
        this.$emit('handleDragEnd', e)
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    handleClick (e) {
      console.log('click ', e)
      this.current = e.key
    },
    changeTheme (checked) {
      this.theme = checked ? 'dark' : 'light'
    }
  }
}
</script>
<style scoped>
    .node-menu-item{
        height: 80px !important;
        padding-left: 12px !important;
    }
    .menu-item-div{
        padding-top: 5px;
    }
    .menu-item-div > img:hover {
        border: 1px solid #ccc;
        cursor: move;
    }
    .menu-title{
        text-align: left;
    }
    * >>> .ant-menu-submenu-title{
        text-align: left;
    }
</style>
