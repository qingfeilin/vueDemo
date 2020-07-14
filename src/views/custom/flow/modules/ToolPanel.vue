<template>
  <a-row>
    <a-col :span="16" class="tool-head-left">
      <template v-for="(item,index) of optGroupList">
        <a-tooltip v-for="(mitem, mindex) of item.memuList" :key="mindex">
          <template slot="title">
            {{ mitem.label }}
          </template>
          <span class="icon-menu">
            <a-icon :type="mitem.icon" />
          </span>
        </a-tooltip>
        <a-divider type="vertical" v-if="index+1 != optGroupList.length" :key="index"/>
      </template>
    </a-col>
    <a-col :span="8">
      按钮
    </a-col>
  </a-row>
</template>

<script>
    export default {
        name: 'ToolPanel',
        data () {
            return {
                optGroupList: [
                    {
                        memuList: [
                            {
                                icon: 'undo',
                                label: '撤销',
                                type: 'redo'
                            },
                            {
                                icon: 'redo',
                                label: '恢复',
                                type: 'redo'
                            }
                        ]
                    },
                    {
                        memuList: [
                            {
                                icon: 'copy',
                                label: '复制',
                                type: 'copy'
                            },
                            {
                                icon: 'snippets',
                                label: '粘贴',
                                type: 'pase'
                            },
                            {
                                icon: 'delete',
                                label: '删除',
                                type: 'delete'
                            }
                        ]
                    },
                    {
                        memuList: [
                            {
                                icon: 'zoom-in',
                                label: '放大',
                                type: 'copy'
                            },
                            {
                                icon: 'zoom-out',
                                label: '缩小',
                                type: 'pase'
                            },
                            {
                                icon: 'border-inner',
                                label: '实际大小',
                                type: 'delete'
                            },
                            {
                                icon: 'border-outer',
                                label: '适应屏幕',
                                type: 'delete'
                            }
                        ]
                    },
                    {
                        memuList: [
                            {
                                icon: 'vertical-align-top',
                                label: '移到上一层',
                                type: 'up'
                            },
                            {
                                icon: 'vertical-align-bottom',
                                label: '移到下一层',
                                type: 'down'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>
<style scoped>
    .tool-head-left {
        text-align: left;
        font-size: 18px;
    }
    .icon-menu {
        margin: 0 5px;
        padding: 3px 10px;
        border: 1px solid #FFF;
    }
    .icon-menu:hover {
        border: 1px solid #f0f2f5;
        box-shadow: 1px 2px 7px #bfbebe;
    }
    .icon-menu:active {
        border: 1px solid #bdbec0;
    }
</style>
