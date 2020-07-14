/**
 * 全局注册G6配置
 */

import G6 from '@antv/g6'
import registerShape from './shape'
import registerBehavior from './behavior'

registerShape(G6)
registerBehavior(G6)

export default G6
