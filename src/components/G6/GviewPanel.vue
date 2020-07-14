<template>
  <div ref="container">

  </div>
</template>

<script>
    // import G6 from './index'
    import G6 from './flow/G6'
    import { getShapeName } from './flow/util/clazz'
    import CanvasPanel from './flow/plugins/canvasPanel'
    import Toolbar from './flow/plugins/toolbar'
    import Command from './flow/plugins/command'
    import { exportXML } from './flow/util/bpmn'

    export default {
        name: 'GviewPanel',
        data () {
            return {
                graph: null,
                cmdPlugin: null,
                state: {
                    selectedModel: {},
                    processModel: {
                        id: '',
                        name: '',
                        clazz: 'process',
                        dataObjs: [],
                        signalDefs: [],
                        messageDefs: []
                    }
                }
            }
        },
        methods: {
            graphSetVel (key, val) {
                this.graph.set(key, val)
            },
            graphEmit (type, e) {
                this.graph.emit(type, e)
            },
            exportXML (createFile = true) {
                exportXML(this.graph.save(), this.state.processModel, createFile)
            },
            paint () {
            const data = {
            nodes: [{ id: 'startNode1', x: 50, y: 200, label: '', clazz: 'start' },
                { id: 'startNode2', x: 50, y: 320, label: '', clazz: 'timerStart' },
                { id: 'taskNode1', x: 200, y: 200, label: '主任审批', clazz: 'userTask' },
                { id: 'taskNode2', x: 400, y: 200, label: '经理审批', clazz: 'scriptTask' },
                { id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', clazz: 'inclusiveGateway' },
                { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', clazz: 'receiveTask' },
                { id: 'catchNode1', x: 600, y: 200, label: '等待结束', clazz: 'signalCatch' },
                { id: 'endNode', x: 600, y: 320, label: '', clazz: 'end' }],
            edges: [{ source: 'startNode1', target: 'taskNode1', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow' },
                { source: 'startNode2', target: 'gatewayNode', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow' },
                { source: 'taskNode1', target: 'catchNode1', sourceAnchor: 0, targetAnchor: 0, clazz: 'flow' },
                { source: 'taskNode1', target: 'taskNode2', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow' },
                { source: 'taskNode2', target: 'gatewayNode', sourceAnchor: 1, targetAnchor: 0, clazz: 'flow' },
                { source: 'taskNode2', target: 'taskNode1', sourceAnchor: 2, targetAnchor: 2, clazz: 'flow' },
                { source: 'gatewayNode', target: 'taskNode3', sourceAnchor: 2, targetAnchor: 0, clazz: 'flow' },
                { source: 'gatewayNode', target: 'endNode', sourceAnchor: 1, targetAnchor: 2, clazz: 'flow' },
                { source: 'taskNode3', target: 'endNode', sourceAnchor: 1, targetAnchor: 1, clazz: 'flow' },
                { source: 'catchNode1', target: 'endNode', sourceAnchor: 1, targetAnchor: 0, clazz: 'flow' }]
            }

            for (let d of data.nodes) {
                d.type = getShapeName(d.clazz)
            }

            let plugins = []
            this.cmdPlugin = new Command()
            const toolbar = new Toolbar({ container: this.$refs.container })
            const canvasPanel = new CanvasPanel({ container: this.$refs.container })
            plugins.push(this.cmdPlugin)
            plugins.push(toolbar)
            plugins.push(canvasPanel)

            let height = 555
            let width = 1166
            this.graph = new G6.Graph({
                plugins: plugins,
                container: this.$refs.container,
                height: height,
                width: width,
                modes: {
                    default: ['drag-canvas', 'clickSelected'],
                    view: [ ],
                    edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
                    'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign', 'dragPoint', 'brush-select']
                },
                defaultEdge: {
                    type: 'flow-polyline-round'
                }
            })

            this.graph.setMode('edit')
            this.graph.data(data)
            this.graph.render()
            }
        },
        mounted () {
            this.paint()
        }
    }
</script>

<style scoped>

</style>
