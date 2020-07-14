<template>
  <div class="color-picker" ref="colorPickerDiv" @mouseleave="()=>{showPicker = false}">
    <span class="color-show" :style="{'background': showVal}" @click="showPickerPanel"/>
    <a-input class="show-input" ref="inputDObj" v-model="showVal" @click="showPickerPanel"/>
    <div style="position" ref="position"/>
    <div
      class="picker-div"
      v-show="showPicker"
      ref="pickerDiv">
      <!-- <chrome-picker
        :disableFields="disableFields"
        v-if="type"
        ref="chromePicker"
        :disableAlpha="disableAlpha"
        v-model="colors"/> -->
      <!-- <photoshop-picker class="chrome-picker" v-model="colors" v-show="showPicker"/> -->
      <!-- <material-picker class="chrome-picker" v-model="colors" v-show="showPicker" /> -->
      <!-- <compact-picker class="chrome-picker" v-model="colors" v-show="showPicker"/> -->
      <!-- <swatches-picker class="chrome-picker" v-model="colors" v-show="showPicker"/> -->
      <!-- <slider-picker class="chrome-picker" v-model="colors" v-show="showPicker"/> -->
      <sketch-picker v-model="colors" v-show="showPicker"/>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {
    Photoshop,
    Chrome,
    Sketch,
    Slider,
    Swatches,
    Compact,
    Material } from 'vue-color'

  export default {
      name: 'RelationMapEdit',
      components: {
        'material-picker': Material,
        'compact-picker': Compact,
        'swatches-picker': Swatches,
        'slider-picker': Slider,
        'sketch-picker': Sketch,
        'chrome-picker': Chrome,
        'photoshop-picker': Photoshop
      },
    //   props: [
    //     'value',
    //     'disableAlpha'
    //   ],
      props: {
        value: String,
        disableAlpha: {
            type: Boolean,
            default: false,
            required: false
        },
        disableFields: {
            type: Boolean,
            default: false,
            required: false
        },
        type: {
            type: String,
            default: 'chromePicker',
            required: false
        }
      },
      data () {
        return {
            showPicker: false,
            colors: {
              hex: '#FFFFFF'
            },
            showVal: '',
            emitFlag: false
        }
      },
      created () {
          if (this.value) {
            this.valueChange()
          }
      },
      mounted () {
      },
      methods: {
        showPickerPanel (e) {
          this.showPicker = true
          this.$nextTick(() => {
            let targitHeight = e.currentTarget.offsetHeight
            let targitEveoffsetY = e.offsetY
            this.$refs.pickerDiv.style.top = e.clientY + (targitHeight - targitEveoffsetY) + 'px'
          })
        },
        valueChange: function () {
          this.emitFlag = false // 外层值改变无需提交change事件
          this.showVal = this.value + ''
          this.colors = { hex: this.showVal }
          // this.emitFlag = true
        }
      },
    //   computed: {
    //       colors: () => {
    //           debugger
    //           return {
    //               hex: this.value
    //           }
    //       }
    //   },
      watch: {
        'value': function (val, oldVal) {
          this.valueChange()
        },
        'colors': {
            handler: function (val, oldVal) {
                if (this.type === 'chromePicker') {
                  if (val && val.rgba && val.rgba.a < 1) {
                    this.showVal = this.$refs.chromePicker.activeColor
                  } else {
                    this.showVal = val.hex
                  }
                }
                if (this.emitFlag) {
                  console.log('myPickerEmit')
                  this.$emit('change', this.showVal)
                }
                this.emitFlag = true
            },
            deep: true
        }
      }
  }
</script>
<style scoped>
  .color-picker{
    height: 35px;
    background: #fff;
  }
  .picker-div{
    position: fixed;
    z-index: 2;
  }
  .show-input {
    padding-left: 30px;
  }
  .color-show{
    position: absolute;
    padding: 7px;
    border: 1px solid #ccc;
    z-index: 1;
    margin: 8px;
  }
</style>
