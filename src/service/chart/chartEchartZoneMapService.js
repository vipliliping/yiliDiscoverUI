'use strict'
discovery.service('chartEchartZoneMapService', function (BoardParamService, EventService) {
  'ngInject'
  this.instance = null

  this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList)
    return this.instance.chart(null, persist, EventService)
  }

  this.parseOption = function (data) {
    let tooltip = {}
    let Levi = data.chartConfig.option.tooltip
    let keys = data.chartConfig.keys
    for (let i in keys) {
      if (Levi[keys[i].col]) {
        tooltip[keys[i].col] = Levi[keys[i].col]
        if (!Levi[keys[i].col].col) {
          tooltip[keys[i].col]['col'] = keys[i].col
        }
      } else {
        tooltip[keys[i].col] = {
          col: keys[i].col,
          isShow: true,
          formatter: ''
        }
      }
    }

    let tooltipTarget = {}
    let Target = data.chartConfig.option.tooltipTarget
    let targetValue = {}
    for (let j = 0; j < data.chartConfig.values.length; j++) {
      for (let k = 0; k < data.chartConfig.values[j].cols.length; k++) {
        targetValue[data.chartConfig.values[j].cols[k].alias] = {
          col: data.chartConfig.values[j].cols[k].alias
        }
      }
    }
    for (let i in targetValue) {
      tooltipTarget[i] = Target[i]
      if (Target[i] && Target[i].col) {
      } else {
        tooltipTarget[i] = {
          col: i,
          isShow: Target[i] ? Target[i].isShow : true,
          formatter: Target[i] && Target[i].formatter ? Target[i].formatter : ''
        }
      }
    }
    let tooltipGroups = {}
    let Groups = data.chartConfig.option.tooltipGroups
    let targetGroups = data.chartConfig.groups
    for (let i = 0; i < targetGroups.length; i++) {
      if (Groups[targetGroups[i].col]) {
        tooltipGroups[targetGroups[i].col] = Groups[targetGroups[i].col]
        if (!Groups[targetGroups[i].col].col) {
          tooltipGroups[targetGroups[i].col].col = targetGroups[i].col
        }
      } else {
        tooltipGroups[targetGroups[i].col] = {
          col: targetGroups[i].col,
          isShow: true,
          formatter: ''
        }
      }
    }

    var minColor = '#e0ffff'
    if (data.chartConfig.option.maxColor) {
      minColor = data.chartConfig.option.maxColor
    }
    var maxColor = '#006edd'
    if (data.chartConfig.option.minColor) {
      maxColor = data.chartConfig.option.minColor
    }
    var series_data = convertZoneData(data)  // 省份名称及数值
    var maxCity = _.max(series_data, function (series_data) {
      return series_data.value[2]
    })  //数值最大的城市坐标和数值

    var thresholdCode = data.chartConfig.thresholdCode
    if (thresholdCode) {
      var params = angular.copy(window.$$dlut_param)
      var seriesIndexObj = {}
      var dataIndexObj = {}
      for (let j in data.seriesConfig) {
        seriesIndexObj[j] = data.seriesConfig[j].valueAxisIndex
        dataIndexObj[j] = 2
      }
      var evalColor = function (series_data) {
        for (let i in series_data) {
          var data = series_data[i]
          // series_data[i] = eval(thresholdCode)
          try {
            series_data[i] = (new Function('data,params,seriesIndex,dataIndex',
              'return (' + thresholdCode + ')(data,params,seriesIndex,dataIndex)'))
            (series_data[i], params, i, 0)
          } catch (e) {
            console.error('data自定义计算公式错误', thresholdCode, params, series_data[i], i, 0, e)
          }
        }
      }
      evalColor(series_data)
    }
    var maxValue = _.max(series_data, function (d) {
      return Number(d.value[0])
    })
    if (Math.abs(maxValue) != Infinity) maxValue = maxValue.value[0]
    var minValue = _.min(series_data, function (d) {
      return Number(d.value[0])
    })
    if (minValue) minValue = minValue.value[0]
    var absoluteMaxValue = Math.abs(maxValue)
    if (Math.abs(minValue) > absoluteMaxValue) {
      absoluteMaxValue = Math.abs(minValue)
    }
    var chartOption = null

    // var url = './chinaZone.json'
    // if(data.chartConfig.option.provinceMap) {
    //   url = './china.json'
    // }
    // $.ajax({
    //   type: "get",
    //   url: url,
    //   async: false,
    //   success: function (cityJson) {
    //     echarts.registerMap('HK', cityJson)
    chartOption = {
      backgroundColor: "#D1D1D1",
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var finalResult = ''
          let value = ''
          let param = BoardParamService.getAll()
          for (let i in tooltip) {        //列维
            if (typeof tooltip[i] === undefined || tooltip[i].isShow !== false) {
              if (params.name) {
                value = params.name
                let result = params.name
                if (tooltip[i].formatter) {
                  result = eval(tooltip[i].formatter)
                }
                finalResult = finalResult + tooltip[i].col + ': ' + result + '<br/>'
              }
            }
          }
          for (let i in tooltipTarget) {  //指标
            if ((typeof tooltipTarget[i]) === undefined || tooltipTarget[i].isShow !== false) {
              let targetArray = _.keys(tooltipTarget)
              if (params.data && params.data.value) {
                value = params.data.value[_.indexOf(targetArray, i)]
                let result = params.data.value[_.indexOf(targetArray, i)]
                if (tooltipTarget[i].formatter) {
                  result = eval(tooltipTarget[i].formatter)
                }
                finalResult = finalResult + tooltipTarget[i].col + ': ' + result + '<br/>'
              }
            }
          }
          return finalResult
        }
      },
      geo: {
        show: true,
        //map: 'zhongguo',
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077'
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        }
      },
      visualMap: {
        type: 'continuous',
        min: minValue,
        max: maxValue,
        text: ['Low', 'High'],
        realtime: false,
        calculable: true,
        precision: 3,
        dimension: 0,
        range: [minValue, maxValue],
        inRange: {
          color: ['green', 'red']
        }
      },
      series: [
        {
          type: 'map',
          mapType: data.chartConfig.option.provinceMap ? 'china' : 'chinaZone', // 自定义扩展图表类型
          coordinateSystem: 'geo',
          itemStyle: {
            normal: {
              areaColor: '#F4F4F4',
              borderColor: 'white',
              borderWidth: 1,
              label: {show: false}
            },
            emphasis: {
              label: {show: true}
            }
          },
          data: series_data
        }
      ]
    }
    if (data.chartConfig.optionCode) {
      var optionCode = data.chartConfig.optionCode
      try {
        chartOption = (new Function('option, absoluteMaxValue',
          'return (' + optionCode + ')(option, absoluteMaxValue)'))
        (chartOption, absoluteMaxValue)
      } catch (e) {
        console.error('option自定义计算错误', chartOption, e)
      }
    }
    //   }
    // })

    return chartOption
  }
})

function convertZoneData(allData) {
  let data = allData.data
  let keys = allData.keys
  var res = []
  for (var i = 0; i < data.length; i++) {
    let itemData = data[i]
    for (var j = 0; j < itemData.length; j++) {
      var name = keys[j][0]
      var value = []
      if (name && (i === 0)) {
        var eventInfo = CBoardEChartRenderEventInfo(allData, undefined, j)
        let obj = {
          name: name,
          value: value.concat(data[i][j]),
          eventInfo: eventInfo
        }
        res.push(obj)
      } else {
        if (res[j] && res[j].value) {
          res[j].value = res[j].value.concat(data[i][j])
        }
      }
    }
  }
  // let originalData = allData.originalData.data
  // var res = []
  // for (var i = 0; i < originalData.length; i++) {
  //     var eventInfo = CBoardEChartRenderEventInfo(allData, undefined, i)
  //     var provinceObj = {
  //       name: originalData[i][0],
  //       value: _.rest(originalData[i]),
  //       eventInfo: eventInfo
  //     }
  //     res.push(provinceObj)
  // }
  return res
}
