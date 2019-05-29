/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartEchart3dAreaService', function (EventService) {
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
    var serie = {}
    var series = []
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
        barData.push(j)
        barData.push(i)
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
      tooltip: {},
      backgroundColor: '#fff',
      visualMap: {
        show: false,
        dimension: 2,
        min: -1,
        max: max,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
      },
      xAxis3D: {
        type: 'category',
        data: yAxisData,
        axisPointer: {
          lineStyle: {
            color: '#900'
          }
        }
      },
      yAxis3D: {
        type: 'category',
        data: xAxisData,
        axisPointer: {
          lineStyle: {
            color: '#090'
          }
        }
      },
      zAxis3D: {
        type: 'value'
      },
      grid3D: {
        viewControl: {
          // projection: 'orthographic'
        }
      },
      series: [{
        type: 'surface',
        wireframe: {
          // show: false
        },
        data: barDatas
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
