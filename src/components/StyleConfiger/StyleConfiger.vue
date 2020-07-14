<template>
  <div>
    <div v-if="configItem.title" class="title-style">{{configItem.title}}</div>
    <row-temp :configItem="configItem" :datas="datas" @change="onChange"/>
  </div>
</template>

<script>
  import RowTemp from './RowTemp'

  export default {
      components: {
        RowTemp
      },
      data: () => {
          return {
            datas: {},
            configItem: {
              configList: []
            }
          }
      },
      props: {

      },
      methods: {
          setDatas (item) {
              this.datas = item
          },
          setConfig (item) {
              this.configItem = item
          },
          onChange (key, val) {
              this.$emit('styleChange', key, val)
          }
      }
  }
</script>

<style scoped>
  .title-style{
    height: 42px;
    text-align: left;
    line-height: 30px;
    font-size: 18px;
    font-weight: normal;
    padding: 5px 8px;
    background: #efefef;
    margin: 0px 0px 8px;
  }
</style>
