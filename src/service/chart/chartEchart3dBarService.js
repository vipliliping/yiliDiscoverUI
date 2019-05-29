/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartEchart3dBarService', function (EventService) {
  "ngInject"
  this.instance = null

  this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList)
    return this.instance.chart(null, persist, EventService)
  }

  this.parseOption = function (data) {
    var chartConfig = data.chartConfig
    var casted_keys = data.keys
    var casted_values = data.series
    var aggregate_data = data.data
    var newValuesConfig = data.seriesConfig
    var barDatas = []
    var max = 0
    var xAxisData = _.map(casted_keys, function (key) {
      return key.join('-')
    })
    var yAxisData = _.map(casted_values, function (value) {
      return value.join('-')
    })
    for (var i = 0; i < xAxisData.length; i++) {
      for (var j = 0; j < yAxisData.length; j++) {
        var barData = []
        barData.push(i)
        barData.push(j)
        if (aggregate_data[j][i] != undefined) {
          if (parseInt(aggregate_data[j][i]) > max) {
            max = aggregate_data[j][i]
          }
          barData.push(parseInt(aggregate_data[j][i]))
        }
        else {
          barData.push(0)
        }
        barDatas.push(barData)
      }
    }
    var echartOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        // axisPointer : {
        //     type : 'shadow'
        // },
        formatter: function (params) {
          var names = params.data.itemInfo.names,
            value = params.data.itemInfo.value,
            tooltip = names.join("-") + ":" + value
          return tooltip
        }
      },
      visualMap: {
        max: max,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
      },
      xAxis3D: {
        type: 'category',
        data: xAxisData,
        axisPointer: {
          lineStyle: {
            color: '#900'
          }
        }
      },
      yAxis3D: {
        type: 'category',
        data: yAxisData,
        axisPointer: {
          lineStyle: {
            color: '#090'
          }
        }
      },
      zAxis3D: {
        type: 'value',
        axisPointer: {
          lineStyle: {
            color: '#009'
          }
        }
      },
      grid3D: {
        boxWidth: 250,
        boxDepth: 90,
        viewControl: {
          // projection: 'orthographic'
        },
        light: {
          main: {
            intensity: 1.2,
            shadow: true
          },
          ambient: {
            intensity: 0.3
          }
        }
      },
      series: [{
        type: 'bar3D',
        data: barDatas.map(function (item) {
          return {
            itemInfo: {
              names: [xAxisData[item[0]], yAxisData[item[1]]],
              value: item[2]
            },
            value: [item[0], item[1], item[2]],
            label: {
              show: false
              // show: item[2] != 0
            }
          }
        }),
        bevelSize: 0.2,
        bevelSmoothness: 3,
        shading: 'lambert',
        label: {
          textStyle: {
            fontSize: 16,
            borderWidth: 1
          }
        },

        itemStyle: {
          opacity: 0.9
        },

        emphasis: {
          label: {
            textStyle: {
              fontSize: 20,
              color: '#900'
            }
          },
          itemStyle: {
            color: '#900'
          }
        }
      }]
    }

    var tunningOpt = chartConfig.option
    if (tunningOpt) {
      if (tunningOpt.legendShow == false) {
        echartOption.grid = echartsBasicOption.grid
        echartOption.grid.top = '5%'
        echartOption.legend.show = false
      }
    }
    return echartOption
  }
})
