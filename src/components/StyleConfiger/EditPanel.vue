<template>
  <div>
    <my-color-picker v-if="configItem.type=='colorPicker'" style="width: 120px" v-model="curVal" @change="dataChange"/>
    <a-input style="width: 120px" v-if="configItem.type=='text'" v-model="curVal" @change="dataChange"/>
    <a-input-number
      style="width: 120px"
      v-if="configItem.type=='number'"
      v-model="curVal"
      :step="configItem.step!=undefined?configItem.step:1"
      :min="configItem.min!=undefined?configItem.min:0"
      :max="configItem.max!=undefined?configItem.max:50"
      @change="dataChange" />
    <a-select v-model="curVal" v-if="configItem.type=='select'" style="width: 120px" @change="dataChange">
      <a-select-option :value="item.value" v-for="(item,index) of configItem.options" :key="item.value">
        {{ item.label }}
      </a-select-option>
    </a-select>
    <a-slider
      v-model="curVal"
      :step="configItem.step!=undefined?configItem.step:1"
      :min="configItem.min!=undefined?configItem.min:0"
      :max="configItem.max!=undefined?configItem.max:50"
      :range="configItem.range!=undefined?configItem.range:false"
      v-if="configItem.type=='slider'"
      @change="dataChange"/>
    <a-switch v-if="configItem.type=='switch'" v-model="curVal" @change="dataChange" />
  </div>
</template>

<script>
  import MyColorPicker from '@/components/MyColorPicker'
  import _ from 'lodash'

  export default {
    name: 'EditPanel',
    components: {
        MyColorPicker
    },
    props: {
        itemObj: {
            type: Object,
            require: true,
            default: () => {
                return {}
            }
        },
        configItem: {
            type: Object,
            require: true,
            default: () => {
                return {}
            }
        }
    },
    data: () => {
        return {
            curVal: ''
        }
    },
    methods: {
        dataChange (value, val) {
            if (this.configItem.type === 'collapsePanel') {
                this.$emit('change', value, val)
            } else if (this.configItem.type === 'text') {
                this.$emit('change', this.configItem.keyIndex, this.curVal)
            } else {
                this.$emit('change', this.configItem.keyIndex, value)
            }
        },
        setDatas (item) {
            this.itemObj = item
            this.curValInit()
        },
        curValInit () {
            this.curVal = _.get(this.itemObj, this.configItem.keyIndex, this.configItem.default ? this.configItem.default : '')
        }
    },
    created () {
        this.curValInit()
    },
    watch: {
        itemObj: {
            handler: function (val, oldVal) {
                this.curValInit()
            },
            deep: true
        }
    }

  }
</script>

<style scoped>

</style>
