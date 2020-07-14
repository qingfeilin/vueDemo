<template>
  <div>
    <div :id="containerId" ref="container" class="container"></div>
    <div class="contextMenu" ref="contextMenu" v-show="nodeContexShow" @mouseleave="()=>{ nodeContexShow = false}">
      <ul>
        <li @click="handleNodeDelete">节点删除</li>
        <li @click="handleNodeUpdate">节点更新</li>
        <li></li>
      </ul>
    </div>
    <div class="contextMenu" ref="canvasContextMenu" v-show="canvasContexMenuShow" @mouseleave="()=>{ canvasContexMenuShow = false}">
      <ul>
        <li @click="handleAddNode">添加节点</li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import uuidv1 from 'uuid/v1'
  // import G6 from '@antv/g6'
  import G6 from '@/components/G6'
  import config from './config/index'

  G6.registerBehavior('click-add-node', {
  // Set the events and the corresponding responsing function for this behavior
  getEvents () {
    // The event is canvas:click, the responsing function is onClick
    return {
      'canvas:click': 'onClick'
    }
  },
  // Click event
  onClick (ev) {
    const self = this
    const graph = self.graph
    // Add a new node
    graph.addItem('node', {
      x: ev.canvasX,
      y: ev.canvasY,
      id: uuidv1() // Generate the unique id
    })
    console.log('click-add-node', self.graph.save())
  }
})
  // Register a custom behavior: click two end nodes to add an edge
  G6.registerBehavior('click-add-edge', {
    // Set the events and the corresponding responsing function for this behavior
    getEvents () {
      return {
        'node:click': 'onClick', // The event is canvas:click, the responsing function is onClick
        mousemove: 'onMousemove', // The event is mousemove, the responsing function is onMousemove
        'edge:click': 'onEdgeClick' // The event is edge:click, the responsing function is onEdgeClick
      }
    },
    // The responsing function for node:click defined in getEvents
    onClick (ev) {
      const self = this
      const node = ev.item
      const graph = self.graph
      // The position where the mouse clicks
      const point = { x: ev.x, y: ev.y }
      const model = node.getModel()
      if (self.addingEdge && self.edge) {
        graph.updateItem(self.edge, {
          target: model.id
        })

        self.edge = null
        self.addingEdge = false
      } else {
        // Add anew edge, the end node is the current node user clicks
        self.edge = graph.addItem('edge', {
          // type: 'polyline',
          source: model.id,
          target: model.id
        })
        self.addingEdge = true
      }
      console.log('click-add-edge', self.graph.save())
    },
    // The responsing function for mousemove defined in getEvents
    onMousemove (ev) {
      const self = this
      // The current position the mouse clicks
      const point = { x: ev.x, y: ev.y }
      if (self.addingEdge && self.edge) {
        // Update the end node to the current node the mouse clicks
        self.graph.updateItem(self.edge, {
          target: point
        })
      }
    },
    // The responsing function for edge:click defined in getEvents
    onEdgeClick (ev) {
      const self = this
      const currentEdge = ev.item
      if (self.addingEdge && self.edge === currentEdge) {
        self.graph.removeItem(self.edge)
        self.edge = null
        self.addingEdge = false
      }
      console.log('onEdgeClick', self.graph.save())
    }
  })

  export default {
    props: {
      datas: {
        type: Object,
        default: () => {
          return {}
        },
        required: false
      },
      width: {
        type: Number,
        default: 800,
        required: false
      },
      height: {
        type: Number,
        default: 500,
        required: false
      },
      nodeContextMenu: {
        type: Boolean,
        default: false,
        required: false
      },
      edgeContextMenu: {
        type: Boolean,
        default: false,
        required: false
      },
      canvaseContextMenu: {
        type: Boolean,
        default: false,
        required: false
      }
    },
      data () {
        return {
          nodeContexShow: false,
          canvasContexMenuShow: false,
          graph: null,
          canvasEvt: null,
          containerId: uuidv1(),
          operateItemId: ''
        }
      },
      created () {
      },
      mounted () {
        this.rander()
        this.eventInit()
      },
      methods: {
        handleAddNode () {
          let model = {
            // id: uuidv1(),
            x: this.canvasEvt.x,
            y: this.canvasEvt.y
          }
          this.handelAdd(model)
        },
        handelShowData () {
          console.log('showData', this.graph.save())
        },
        handleNodeDelete () {
          this.deleteItemById(this.operateItemId)
        },
        handleNodeUpdate () {
          const item = this.graph.findById(this.operateItemId)
          let model = item._cfg.model
          model.type = 'diamond'
          this.updateItem(model)
        },
        updateItem (model) {
          // const autoPaint = this.graph.get('autoPaint')
          if (model && model.id) {
            // this.graph.setAutoPaint(false)

            const item = this.graph.findById(model.id)
            this.graph.updateItem(item, model)
            return this.graph.findById(model.id)._cfg.model
          }
          this.graph.paint()
          // this.graph.setAutoPaint(autoPaint)
        },
        deleteItemById (id) {
          const item = this.graph.findById(id)
          this.graph.removeItem(item)
          // console.log('handleNodeDelete', this.graph.save())
        },
        handelModeChange (type) {
           this.graph.setMode(type)
        },
        handleChange () {
          this.data.nodes[0].x = this.data.nodes[0].x + 10
          this.graph.changeData(this.data)
          this.graph.render()
          // console.log(this.graph.save())
        },
        handelAdd (model) {
          this.graph.addItem('node', model)
          // console.log(this.graph.save())
        },
        eventInit () {
          let _this = this
          this.graph.on('node:click', evt => {
            const { item } = evt
            _this.$emit('nodeClick', item.getModel(), evt)
            // console.log('mouseenter:', item)
            // this.graph.setItemState(item, 'hover', true)
          })
          this.graph.on('edge:click', evt => {
            const { item } = evt
            _this.$emit('edgeClick', item.getModel(), evt)
            // console.log('mouseenter:', item)
            // this.graph.setItemState(item, 'hover', true)
          })
          this.graph.on('node:mouseenter', evt => {
            const { item } = evt
            // console.log('mouseenter:', item)
            this.graph.setItemState(item, 'hover', true)
          })
          this.graph.on('node:mouseleave', evt => {
            const { item } = evt
            // console.log('mouseleave:', item)
            this.graph.setItemState(item, 'hover', false)
            _this.nodeContexShow = false
          })

          this.graph.on('edge:mouseenter', evt => {
            const { item } = evt
            // console.log('mouseenter:', item)
            this.graph.setItemState(item, 'hover', true)
          })
          this.graph.on('edge:mouseleave', evt => {
            const { item } = evt
            // console.log('mouseleave:', item)
            this.graph.setItemState(item, 'hover', false)
            _this.nodeContexShow = false
          })

          this.graph.on('node:contextmenu', evt => { // 节点右键菜单
            evt.preventDefault()
            evt.stopPropagation()
            const { item } = evt
            _this.operateItemId = item.getModel().id
            if (_this.nodeContextMenu) {
              _this.nodeContexShow = true
              _this.$refs.contextMenu.style.left = `${evt.clientX - 3}px`
              _this.$refs.contextMenu.style.top = `${evt.clientY}px`
            }
            _this.$emit('nodeContextClick', evt)
          })
          this.graph.on('edge:contextmenu', evt => { // 连线右键菜单
            evt.preventDefault()
            evt.stopPropagation()
            const { item } = evt
            _this.operateItemId = item.getModel().id
            if (_this.edgeContextMenu) {
              _this.nodeContexShow = true
              _this.$refs.contextMenu.style.left = `${evt.clientX - 3}px`
              _this.$refs.contextMenu.style.top = `${evt.clientY}px`
            }
            _this.$emit('edgeContextClick', evt)
          })
          this.graph.on('canvas:contextmenu', evt => { // 画布右键菜单
            evt.preventDefault()
            evt.stopPropagation()
            _this.canvasEvt = evt
            
            if (_this.canvaseContextMenu) {
              _this.canvasContexMenuShow = true
              _this.$refs.canvasContextMenu.style.left = `${evt.clientX - 3}px`
              _this.$refs.canvasContextMenu.style.top = `${evt.clientY}px`
            }
            _this.$emit('canvasContextClick', evt)
          })
        },
        rander () {
          this.graph = new G6.Graph({
            container: this.$refs.container, // this.containerId, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
            width: this.width, // Number，必须，图的宽度
            height: this.height, // Number，必须，图的高度
            modes: {
              // Defualt mode
              default: [],
              // Adding node mode
              addNode: ['click-add-node', 'click-select'],
              // Adding edge mode
              addEdge: ['click-add-edge', 'click-select'],

              scnenEdit: ['click-add-node', 'click-add-edge', 'click-select', 'drag-node'],

              edit: ['click-add-edge', 'click-select', 'drag-node'],
              flowEdit: [
                // 'drag-node',
                {
                type: 'flow-control',
                config: {
                  shapeControlPoint: {
                    // 是否在缩放、旋转节点时更新所有与之相连的边
                    updateEdge: false
                  },
                  dragNode: {
                    // 是否在拖拽节点时更新所有与之相连的边
                    updateEdge: false
                  },
                  // 是否支持在节点上添加文本
                  nodeLabel: true,
                  // 是否支持在边上添加文本
                  edgeLabel: true,
                  // tooltip 是否启用
                  tooltip: {
                    shapeControl: true,
                    dragNode: true,
                    dragEdge: true
                  },
                  // 是否启用对齐线
                  alignLine: {
                    enable: true,
                    style: {
                      stroke: '#FFA500',
                      lineWidth: 1
                    }
                  }
                }
              }
             ],
            //   edit: [
            //   // 'zoom-canvas',
            //   // 'drag-canvas',
            //   // 'click-select',
            //   {
            //     type: 'node-control',
            //     config: {
            //       shapeControlPoint: {
            //         // 是否在缩放、旋转节点时更新所有与之相连的边
            //         updateEdge: false
            //       },
            //       dragNode: {
            //         // 是否在拖拽节点时更新所有与之相连的边
            //         updateEdge: false
            //       },
            //       // 是否支持在节点上添加文本
            //       nodeLabel: true,
            //       // 是否支持在边上添加文本
            //       edgeLabel: true,
            //       // tooltip 是否启用
            //       tooltip: {
            //         shapeControl: true,
            //         dragNode: true,
            //         dragEdge: true
            //       },
            //       // 是否启用对齐线
            //       alignLine: {
            //         enable: true,
            //         style: {
            //           stroke: '#FFA500',
            //           lineWidth: 1
            //         }
            //       }
            //     }
            //   }
            // ],
            },
            nodeStateStyles: {
              selected: {
                stroke: '#666',
                lineDash: [1],
                lineWidth: 2,
                // opacity: 0.8,
                // fillOpacity: 0.8,
                fill: 'steelblue'
              },
              hover: {
                stroke: '#f5f5f5',
                lineWidth: 3,
                // lineDash: [1],
                shadowColor: '#f5f5f5',
                shadowBlur: 2,
                // shadowOffsetX: 1,
                // shadowOffsetY: 1,
                opacity: 0.5,
                fillOpacity: 0.8,
                cursor: 'pointer'
              }
            },
            edgeStateStyles: {
              hover: {
                // stroke: '#fff',
                lineWidth: 3,
                strokeOpacity: 0.8,
                shadowColor: '#f5f5f5',
                // shadowBlur: 1,
                // shadowOffsetX: 3,
                // shadowOffsetY: 3,
                cursor: 'pointer'
              }
            }
          })
        // 挂载编辑器$X命名空间，用于Vue组件与Graph之间传值
        this.graph.lqfsss = 'sss'
          this.graph.$X = {
            ...config.$X
          }
          this.graph.setMode('flowEdit')
          this.graph.data(this.datas) // 读取 Step 2 中的数据源到图上

          this.graph.render() // 渲染图
          // console.log(this.graph.save())
        }
      }
  }
</script>
<style scoped>
  .container{
    background: #FFF;
  }
  .container >>> canvas{
    border: 1px solid #ccc;
  }
  .contextMenu {
    border: 1px solid red;
    position: fixed;
    left: 100px;
    top: 100px;
  }
</style>
