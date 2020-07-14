import { Marker } from '@antv/g-canvas/lib/shape'

export default function (G6) {
  G6.registerBehavior('hoverNodeActived', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'anchor:mouseleave': 'onAnchorLeave'
      }
    },
    onAnchorLeave (e) {
      // console.log('anchor:mouseleave')
      let node = e.item.getContainer().getParent()
      if (node && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(node.get('item'), 'show-anchor', false)
      }
    },
    onNodeEnter (e) {
      // console.log('node:onNodeEnter')
      const clazz = e.item.getModel().clazz
      if (clazz !== 'endEvent' && !this.graph.get('edgeDragging')) { this.graph.setItemState(e.item, 'show-anchor', true) }
    },
    onNodeLeave (e) {
      // console.log('node:mouseleave')
      // debugger
      // 填坑 不懂为什么 原来判断可以用
      //  if(!(e.target instanceof Marker) && !this.graph.get('edgeDragging')) {
      if (!(e.target && e.target.cfg && e.target.cfg.name === 'anchor-shape') && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', false)
      }
    }
  })
}
