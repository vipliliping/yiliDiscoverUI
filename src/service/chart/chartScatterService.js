/**
 * Created by yfyuan on 2017/03/03.
 */
'use strict'
discovery.service('chartScatterService', function (dataService, BoardParamService, EventService) {
  "ngInject"
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
          formatter: keys[i] && keys[i].formatter ? keys[i].formatter : ''
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
          formatter: targetGroups[i] && targetGroups[i].formatter ? targetGroups[i].formatter : ''
        }
      }
    }

    var chartConfig = data.chartConfig
    var casted_keys = data.keys
    var casted_values = data.series
    var aggregate_data = data.data
    var newValuesConfig = data.seriesConfig
    var tunningOpt = chartConfig.option
    var data_copy = data

    var string_keys = _.map(casted_keys, function (key) {
      return key.join('-')
    })
    var series = []
    var valueName = []

    for (var i = 0; i < casted_values.length; i++) {
      var joined_values = casted_values[i].join('-')
      var valueAxisIndex = newValuesConfig[joined_values].valueAxisIndex
      var name = casted_values[i].slice(0, -1).join('-')

      var s = _.find(series, function (_s) {
        return _s.name == name
      })
      if (!s) {
        s = {name: name}
        series.push(s)
      }
      if (valueAxisIndex == 0) {
        s.yIdx = i
      }
      if (valueAxisIndex == 1) {
        s.sizeIdx = i
      }
      if (valueAxisIndex == 2) {
        s.colorIdx = i
      }
      valueName[valueAxisIndex] = casted_values[i][casted_values[i].length - 1]
    }
    var data = _.unzip(aggregate_data)

    _.each(series, function (s, i) {
      s.data = _.map(data, function (d, j) {
        var eventInfo = CBoardEChartRenderEventInfo(data_copy, i, j)
        return [
          string_keys[j],
          d[s.yIdx],
          d[s.sizeIdx] ? d[s.sizeIdx] : 1,
          d[s.colorIdx] ? d[s.colorIdx] : 1,
          eventInfo
        ]
      })
      s.sizeMax = _.max(s.data, function (d) {
        return Number(d[2])
      })[2]
      s.sizeMin = _.min(s.data, function (d) {
        return Number(d[2])
      })[2]
      s.colorMax = _.max(s.data, function (d) {
        return Number(d[3])
      })[3]
      s.colorMin = _.min(s.data, function (d) {
        return Number(d[3])
      })[3]
      // s.label = {
      //   show: true,
      //   color: 'black',
      //   formatter: function(params){
      //       return params.name
      //   }
      // }
    })
    var sizeMax = _.max(series, function (s) {
      return Number(s.sizeMax)
    }).sizeMax
    var sizeMin = _.min(series, function (s) {
      return Number(s.sizeMin)
    }).sizeMin
    var colorMax = _.max(series, function (s) {
      return Number(s.colorMax)
    }).colorMax
    var colorMin = _.max(series, function (s) {
      return Number(s.colorMin)
    }).colorMin

    if (tunningOpt) {
      var labelInterval, labelRotate
      tunningOpt.ctgLabelInterval ? labelInterval = tunningOpt.ctgLabelInterval : 'auto'
      tunningOpt.ctgLabelRotate ? labelRotate = tunningOpt.ctgLabelRotate : 0
    }

    var echartOption = {
      legend: {
        data: _.map(series, function (v) {
          return v.name
        })
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          let param = BoardParamService.getAll()
          let value = ''
          var finalResult = ''
          for (let i in tooltip) {        //列维
            if (typeof tooltip[i] === undefined || tooltip[i].isShow !== false) {
              let index = _.findIndex(params.data[params.data.length - 1], function (item) {
                return item.col === i
              })
              if (index < 0) {
                return
              }
              // let value = ''
              // if (tooltip[i].formatter && tooltip[i].formatter.indexOf('{v}') != -1 ) {
              //   let repResult = ''
              //   if (typeof params.data[params.data.length-1][index].value === 'string') {
              //     repResult = tooltip[i].formatter.replace('{v}', '\'{v}\'')
              //   }
              //   repResult  = repResult.replace('{v}', params.data[params.data.length-1][index].value)
              //   value = eval(repResult)
              // } else {
              //   value = params.data[params.data.length-1][index].value
              // }
              value = params.data[params.data.length - 1][index].value
              let result = value
              if (tooltip[i].formatter) {
                result = eval(tooltip[i].formatter)
              }
              finalResult = finalResult + tooltip[i].col + ': ' + result + '<br/>'
            }
          }
          for (let i in tooltipGroups) {        //行维
            if (typeof tooltipGroups[i] === undefined || tooltipGroups[i].isShow !== false) {
              let obj = _.where(params.value[params.value.length - 1], {col: i})
              if (obj.length === 0) {
                return
              }
              // let value = ''
              // if (tooltipGroups[i].formatter && tooltipGroups[i].formatter.indexOf('{v}') != -1 ) {
              //   let repResult = ''
              //   if (typeof obj[0].value === 'string') {
              //     repResult = tooltipGroups[i].formatter.replace('{v}', '\'{v}\'')
              //   }
              //   repResult  = repResult.replace('{v}', obj[0].value)
              //   value = eval(repResult)
              // } else {
              //   value = obj[0].value
              // }
              value = obj[0].value
              let result = value
              if (tooltipGroups[i].formatter) {
                result = eval(tooltipGroups[i].formatter)
              }
              finalResult = finalResult + tooltipGroups[i].col + ': ' + result + '<br/>'
            }
          }
          for (let i in tooltipTarget) {  //指标
            if ((typeof tooltipTarget[i]) === undefined || tooltipTarget[i].isShow !== false) {
              // let value = ''
              var arr = []
              for (let j = 0; j < data.length; j++) {
                arr.push(_.difference(data[j], [undefined, 'undefined']))
              }
              let targetArray = _.keys(tooltipTarget)
              // if (tooltipTarget[i].formatter && tooltipTarget[i].formatter.indexOf('{v}') != -1 ) {
              //   let repResult = ''
              //   if (typeof arr[params.dataIndex][_.indexOf(targetArray, i)] === 'string') {
              //     repResult = tooltipTarget[i].formatter.replace('{v}', '\'{v}\'')
              //   } else {
              //     repResult = tooltipTarget[i].formatter
              //   }
              //   repResult  = repResult.replace('{v}', arr[params.dataIndex][_.indexOf(targetArray, i)])
              //   value = eval(repResult)
              // } else {
              //   value = arr[params.dataIndex][_.indexOf(targetArray, i)]
              // }
              value = arr[params.dataIndex][_.indexOf(targetArray, i)]
              let result = value
              if (tooltipTarget[i].formatter) {
                result = eval(tooltipTarget[i].formatter)
              }
              finalResult = finalResult + tooltipTarget[i].col + ': ' + result + '<br/>'
            }
          }
          return finalResult
        }
      },
      xAxis: {
        data: string_keys,
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          interval: labelInterval,
          rotate: labelRotate
        }
      },
      yAxis: {
        axisLabel: {
          formatter: function (value) {
            return numbro(value).format("0a.[0000]")
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        scale: true
      },
      visualMap: [
        {
          dimension: 2,
          show: false,
          min: sizeMin * 0.8,
          max: sizeMax * 1.5,
          calculable: true,
          precision: 0.1,
          textStyle: {
            color: 'white'
          },
          inRange: {
            symbolSize: [5, 70]
          }
        },
        {
          dimension: 3,
          show: false,
          min: colorMin,
          max: colorMax,
          inRange: {
            opacity: [0.2, 1]
          }

        }],
      targetData: chartConfig.values,
      series: _.map(series, function (v) {
        return {
          name: v.name,
          data: v.data,
          type: 'scatter',
          label: v.label
        }
      })
    }
    updateEchartOptions(chartConfig.option, echartOption)
    return echartOption
  }
})
