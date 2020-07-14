const nodeConfig1 = {
    title: '节点配置',
    configList: [
        {
            clos: [
                {
                    type: 'label',
                    label: '形状'
                },
                {
                    type: 'select',
                    keyIndex: 'type',
                    default: 'circle',
                    options: [
                        {
                            label: '圆形',
                            value: 'circle'
                        },
                        {
                            label: '矩形',
                            value: 'rect'
                        },
                        {
                            label: '椭圆',
                            value: 'ellipse'
                        },
                        {
                            label: '菱形',
                            value: 'triangle'
                        },
                        {
                            label: '星形',
                            value: 'star'
                        }
                    ]
                }
            ]
        },
        {
            show: false,
            clos: [
                {
                    type: 'label',
                    label: '宽度'
                },
                {
                    type: 'slider',
                    keyIndex: 'size[0]',
                    max: 500
                }
            ]
        },
        {
            show: false,
            clos: [
                {
                    type: 'label',
                    label: '高度'
                },
                {
                    type: 'slider',
                    keyIndex: 'size[1]',
                    max: 500
                }
            ]
        },
        {
            show: false,
            clos: [
                {
                    type: 'label',
                    label: '节点大小'
                },
                {
                    type: 'slider',
                    keyIndex: 'size',
                    max: 500
                }
            ]
        },
        {
            type: 'collapsePanel',
            title: '图形配置',
            configList: [
                {
                    clos: [
                        {
                            type: 'label',
                            label: '填充颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'style.fill',
                            default: '#c6e5ff'
                        }
                    ]
                },
                // {
                //     clos: [
                //         {
                //             type: 'label',
                //             label: '透明度'
                //         },
                //         {
                //             type: 'number',
                //             step: 0.1,
                //             max: 1,
                //             keyIndex: 'style.fillOpacity'
                //         }
                //     ]
                // },
                // {
                //     clos: [
                //         {
                //             type: 'label',
                //             label: ''
                //         },
                //         {
                //             type: 'number',
                //             step: 0.1,
                //             max: 1,
                //             keyIndex: 'style.opacity'
                //         }
                //     ]
                // },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '描边颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'style.stroke',
                            default: '#94b7fb'
                        }
                    ]

                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '描边粗细'
                        },
                        {
                            type: 'number',
                            keyIndex: 'style.lineWidth'
                        }
                    ]

                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影大小'
                        },
                        {
                            type: 'number',
                            keyIndex: 'style.shadowBlur'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'style.shadowColor'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影水平偏移'
                        },
                        {
                            type: 'number',
                            keyIndex: 'style.shadowOffsetX'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影垂直偏移'
                        },
                        {
                            type: 'number',
                            keyIndex: 'style.shadowOffsetY'
                        }
                    ]
                }
            ]
        },
        {
            type: 'collapsePanel',
            title: '文本配置',
            configList: [
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本'
                        },
                        {
                            type: 'text',
                            keyIndex: 'label'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '位置'
                        },
                        {
                            type: 'select',
                            keyIndex: 'labelCfg.position',
                            options: [
                                {
                                    label: '居中',
                                    value: 'center'
                                },
                                {
                                    label: '顶部',
                                    value: 'top'
                                },
                                {
                                    label: '居左',
                                    value: 'left'
                                },
                                {
                                    label: '居右',
                                    value: 'right'
                                },
                                {
                                    label: '底部',
                                    value: 'bottom'
                                }
                            ]
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'labelCfg.style.fill'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本描边颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'labelCfg.style.stroke'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本描边粗细'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.lineWidth'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本透明度'
                        },
                        {
                            type: 'number',
                            step: 0.1,
                            max: 1,
                            keyIndex: 'labelCfg.style.opacity'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本字体'
                        },
                        {
                            type: 'select',
                            keyIndex: 'labelCfg.style.fontFamily',
                            options: [
                                {
                                    label: '微软雅黑',
                                    value: '微软雅黑'
                                },
                                {
                                    label: '黑体',
                                    value: '黑体'
                                },
                                {
                                    label: '隶书',
                                    value: '隶书'
                                },
                                {
                                    label: '幼圆',
                                    value: '幼圆'
                                },
                                {
                                    label: 'arial',
                                    value: 'arial'
                                }
                            ]
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '字体大小'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.fontSize'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '字体粗细'
                        },
                        {
                            type: 'select',
                            keyIndex: 'labelCfg.style.fontWeight',
                            options: [
                                {
                                    label: '极细',
                                    value: 'lighter'
                                },
                                {
                                    label: '普通',
                                    value: 'normal'
                                },
                                {
                                    label: '加粗',
                                    value: 'bold'
                                },
                            ]
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影大小'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.shadowBlur'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'labelCfg.style.shadowColor'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影水平偏移'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.shadowOffsetX'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影垂直偏移'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.shadowOffsetY'
                        }
                    ]
                }
            ]

        }

    ]
}

export const nodeConfig = nodeConfig1

const edgeConfig1 = {
    title: '连线配置',
    configList: [
        // {
        //     clos: [
        //         {
        //             type: 'label',
        //             label: '来源节点'
        //         },
        //         {
        //             type: 'number',
        //             keyIndex: 'sourceAnchor'
        //         }
        //     ]

        // },
        {
            type: 'collapsePanel',
            title: '图形配置',
            configList: [
                
                {
                    clos: [
                        {
                            type: 'label',
                            label: '类型'
                        },
                        {
                            type: 'select',
                            keyIndex: 'type',
                            default: 'line',
                            options: [
                                {
                                    label: '直线',
                                    value: 'line'
                                },
                                {
                                    label: '折线',
                                    value: 'polyline'
                                },
                                {
                                    label: '圆弧线',
                                    value: 'arc'
                                },
                                {
                                    label: '二阶贝塞尔曲线',
                                    value: 'quadratic'
                                },
                                {
                                    label: '三阶贝塞尔曲线',
                                    value: 'cubic'
                                },
                                {
                                    label: '垂直方向的三阶贝塞尔曲线',
                                    value: 'cubic-vertical'
                                },
                                {
                                    label: '水平方向的三阶贝塞尔曲线',
                                    value: 'cubic-horizontal'
                                },
                                {
                                    label: '自环',
                                    value: 'loop'
                                },
                            ]
                        }
                    ]

                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'style.stroke',
                            default: '#94b7fb'
                        }
                    ]

                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '宽度'
                        },
                        {
                            type: 'number',
                            keyIndex: 'style.lineWidth'
                        }
                    ]

                },
                // {
                //     clos: [
                //         {
                //             type: 'label',
                //             label: '显示开始箭头'
                //         },
                //         {
                //             type: 'switch',
                //             keyIndex: 'style.startArrow'
                //         }
                //     ]

                // },
                // {
                //     clos: [
                //         {
                //             type: 'label',
                //             label: '显示结束箭头'
                //         },
                //         {
                //             type: 'switch',
                //             keyIndex: 'style.endArrow'
                //         }
                //     ]

                // },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影大小'
                        },
                        {
                            type: 'number',
                            keyIndex: 'style.shadowBlur'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'style.shadowColor'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影水平偏移'
                        },
                        {
                            type: 'number',
                            min: '-50',
                            keyIndex: 'style.shadowOffsetX'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影垂直偏移'
                        },
                        {
                            type: 'number',
                            min: '-50',
                            keyIndex: 'style.shadowOffsetY'
                        }
                    ]
                }
            ]
        },
        {
            type: 'collapsePanel',
            title: '文本配置',
            configList: [
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本'
                        },
                        {
                            type: 'text',
                            keyIndex: 'label'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '位置'
                        },
                        {
                            type: 'select',
                            keyIndex: 'labelCfg.position',
                            options: [
                                {
                                    label: '起始',
                                    value: 'start'
                                },
                                {
                                    label: '中部',
                                    value: 'middle'
                                },
                                {
                                    label: '结束',
                                    value: 'end'
                                }
                            ]
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '水平偏移量'
                        },
                        {
                            type: 'number',
                            min: '-50',
                            keyIndex: 'labelCfg.refX',
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '垂直偏移量'
                        },
                        {
                            type: 'number',
                            min: '-50',
                            keyIndex: 'labelCfg.refY'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '随边旋转'
                        },
                        {
                            type: 'switch',
                            keyIndex: 'labelCfg.autoRotate',
                            default: false
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'labelCfg.style.fill'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本描边颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'labelCfg.style.stroke'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本描边粗细'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.lineWidth'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本透明度'
                        },
                        {
                            type: 'number',
                            step: 0.1,
                            max: 1,
                            keyIndex: 'labelCfg.style.opacity'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '文本字体'
                        },
                        {
                            type: 'select',
                            keyIndex: 'labelCfg.style.fontFamily',
                            options: [
                                {
                                    label: '微软雅黑',
                                    value: '微软雅黑'
                                },
                                {
                                    label: '黑体',
                                    value: '黑体'
                                },
                                {
                                    label: '隶书',
                                    value: '隶书'
                                },
                                {
                                    label: '幼圆',
                                    value: '幼圆'
                                },
                                {
                                    label: 'arial',
                                    value: 'arial'
                                }
                            ]
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '字体大小'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.fontSize'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '字体粗细'
                        },
                        {
                            type: 'select',
                            keyIndex: 'labelCfg.style.fontWeight',
                            options: [
                                {
                                    label: '极细',
                                    value: 'lighter'
                                },
                                {
                                    label: '普通',
                                    value: 'normal'
                                },
                                {
                                    label: '加粗',
                                    value: 'bold'
                                },
                            ]
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影大小'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.shadowBlur'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影颜色'
                        },
                        {
                            type: 'colorPicker',
                            keyIndex: 'labelCfg.style.shadowColor'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影水平偏移'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.shadowOffsetX'
                        }
                    ]
                },
                {
                    clos: [
                        {
                            type: 'label',
                            label: '阴影垂直偏移'
                        },
                        {
                            type: 'number',
                            keyIndex: 'labelCfg.style.shadowOffsetY'
                        }
                    ]
                }
            ]

        }
    ]
}

export const edgeConfig = edgeConfig1

export default {
    nodeConfig,
    edgeConfig
}
