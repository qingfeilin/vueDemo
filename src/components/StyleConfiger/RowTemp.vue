<template>
  <div>
    <template v-for="(item, index) of configItem.configList">
      <div v-if="item.show===undefined?true:item.show" :key="index">
        <a-row v-if="item.type != 'collapsePanel'" class="config-row-style">
          <template v-for="(colItem, colIndex) of item.clos">
            <a-col :span="6" :key="colIndex" v-if="colItem.type==='label'" class="row-label-style">{{ colItem.label }}:</a-col>
            <a-col :span="18" :key="colIndex" v-if="colItem.type!='label'">
              <edit-panel
                @change="onChange"
                :itemObj="datas"
                :configItem="colItem"/>
            </a-col>
          </template>
        </a-row>
        <collapse-panel v-else :datas="datas" :configItem="item" @change="onChange"/>
      </div>
    </template>
  </div>
</template>

<script>
  import EditPanel from './EditPanel'

  export default {
      name: 'RowTemp',
      components: {
        EditPanel,
        CollapsePanel: () => import('./CollapsePanel.vue')
      },
      data: () => {
          return {
          }
      },
      props: {
          datas: {
              type: Object,
              required: false,
              default: () => {
                  return {}
              }
          },
          configItem: {
              type: Object,
              required: false,
              default: () => {
                  return {
                        configList: []
                  }
              }
          }
      },
      methods: {
          setDatas (item) {
              this.datas = item
          },
          setConfig (item) {
              this.configItem = item
          },
          onChange (key, val) {
              this.$emit('change', key, val)
          }
      }
  }
</script>

<style scoped>
  .config-row-style {
    margin: 2px;
  }
  .row-label-style {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    padding-right: 5px;
    line-height: 36px;
  }
</style>
