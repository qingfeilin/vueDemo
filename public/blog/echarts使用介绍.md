# vue-echarts常用配置介绍

## 页面引用说明

    <https://github.com/ecomfe/vue-echarts/blob/HEAD/README.zh_CN.md>

```vue
<template>
    <v-chart :options="polar"/>
</template>
```

```js
import ECharts from 'vue-echarts'  //引入vue-echarts
//按需引用图表类型
import 'echarts/lib/chart/line'    //折线图
import 'echarts/lib/chart/bar'     //柱图
import 'echarts/lib/chart/pie'     //饼图
...

//按需引入图表组件
import 'echarts/lib/component/title'      //标题
import 'echarts/lib/component/tooltip'    //悬浮提示框
import 'echarts/lib/component/legend'     //图例
import 'echarts/lib/component/markLine'   //指示线
import 'echarts/lib/component/polar'      //极坐标系

 components: {
    'v-chart': ECharts
  },
```

![](http://localhost:8001/blog/test.png)

## 配置结构说明

​      参考echarts官方配置手册 <https://www.echartsjs.com/zh/option.html#title>

```json
info: {
        title: {                      //标题
          text: 'echarts配置对象'
        },
        legend: {                     //图例
          data: ['line']
        },
        xAxis: {                      //x轴
          type: 'value'
        },
        yAxis: {                      //y轴
          type: 'value'
        },
        tooltip: {                    //提示框
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        series: [                     //图形系列
          {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data1
          }
        ]
      }
```



## 常用事件绑定



| click       | 鼠标单击 |
| ----------- | -------- |
| dblclick    | 鼠标双击 |
| mouseover   | 鼠标移入 |
| mouseout    | 鼠标移出 |
| mousemove   | 鼠标移动 |
| mousedown   | 鼠标按下 |
| mouseup     | 鼠标放开 |
| globalout   | 全局移出 |
| contextmenu | 鼠标右键 |



### 常用api

| mergeOptions | 配置对象设置，同原来setOption |
| ------------ | ----------------------------- |
| resize       | 改变图形大小                  |
| showLoading  | 显示加载动画                  |
| hideLoading  | 隐藏加载动画                  |
| getDataURL   | 获取截图                      |
| clear        | 清除                          |
| dispose      | 销毁                          |



作业 分别完成饼图 柱图 折线图的案例（要求:要在案例中体现富文本的使用,数据不能为静态的要模拟请求所得）