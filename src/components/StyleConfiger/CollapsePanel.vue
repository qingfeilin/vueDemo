<template>
  <div>
    <a-collapse>
      <a-collapse-panel key="1" :header="configItem.title">
        <row-temp :configItem="configItem" :datas="datas" @change="onChange"/>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
  import EditPanel from './EditPanel'

  export default {
    name: 'CollapsePanel',
    components: {
        EditPanel,
        RowTemp: () => import('./RowTemp.vue')
    },
    data: () => {
        return {}
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
        onChange (key, val) {
            this.$emit('change', key, val)
        }
    }
  }
</script>

<style scoped>

</style>
