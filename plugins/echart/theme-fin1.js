(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory)
  } else if (typeof exports === 'object' &&
    typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'))
  } else {
    // Browser globals
    factory({}, root.echarts)
  }
}(this, function (exports, echarts) {
  var colorPalette = [
    '#11A0F8',
    '#26C8A4',
    '#BF8FE1',
    '#FF8426',
    '#337FFF',
    '#7F8FA4',
    '#07A2A4', '#9A7FD1', '#588DD5', '#F5994E', '#C05050',
    '#59678C', '#C9AB00', '#7EB00A', '#6F5553', '#C14089'
  ]
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded')
    return
  }
  echarts.registerTheme('theme-fin1',
    {
      color: colorPalette,

      title: {
        textStyle: {
          fontWeight: 'normal',
          color: '#008acd'
        }
      },

      visualMap: {
        itemWidth: 15,
        color: ['#5ab1ef', '#e0ffff']
      },

      toolbox: {
        iconStyle: {
          normal: {
            borderColor: colorPalette[0]
          }
        }
      },

      tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        textStyle: {
          fontSize: 12
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(127, 143, 164, 0.23)',
            width: 20
          },
          crossStyle: {
            color: '#008acd'
          },
          shadowStyle: {
            color: 'rgba(200,200,200,0.2)'
          }
        }
      },

      dataZoom: {
        dataBackgroundColor: '#efefff',
        fillerColor: 'rgba(182,162,222,0.2)',
        handleColor: '#008acd'
      },

      grid: { left: 20, right: 25, top: 60, bottom: 5, containLabel: true },
      legend: {
        top: 8,
        left: 'right',
        itemWidth: 15, // 图例标记宽度/高度
        itemHeight: 6,
        textStyle: {
          fontSize: 12
        }
      },
      categoryAxis: {
        axisLabel: {
          fontSize: 12,
          color: '#354052'
        },
        axisLine: {
          lineStyle: {
            color: '#D0D3D7'
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#eee']
          }
        }
      },

      valueAxis: {
        axisLabel: {
          fontSize: 12,
          color: '#354052'
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#D0D3D7'
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#ccc'],
            type: 'dotted'
          }
        },

        nameTextStyle: {
          color: '#354052',
          fontSize: 12
        }
      },

      timeline: {
        lineStyle: {
          color: '#008acd'
        },
        controlStyle: {
          normal: { color: '#008acd' },
          emphasis: { color: '#008acd' }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
      },

      line: {
        symbol: 'emptyCircle',
        symbolSize: 6
      },

      candlestick: {
        itemStyle: {
          normal: {
            color: '#d87a80',
            color0: '#2ec7c9',
            lineStyle: {
              color: '#d87a80',
              color0: '#2ec7c9'
            }
          }
        }
      },

      scatter: {
        symbol: 'circle',
        symbolSize: 4
      },

      map: {
        label: {
          normal: {
            textStyle: {
              color: '#d87a80'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#eee',
            areaColor: '#ddd'
          },
          emphasis: {
            areaColor: '#fe994e'
          }
        }
      },

      graph: {
        color: colorPalette
      },

      gauge: {
        axisLine: {
          lineStyle: {
            color: [[0.2, '#2ec7c9'], [0.8, '#5ab1ef'], [1, '#d87a80']],
            width: 10
          }
        },
        axisTick: {
          splitNumber: 10,
          length: 15,
          lineStyle: {
            color: 'auto'
          }
        },
        splitLine: {
          length: 22,
          lineStyle: {
            color: 'auto'
          }
        },
        pointer: {
          width: 5
        }
      }
    }
  )
}))
