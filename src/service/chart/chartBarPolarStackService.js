/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartBarPolarStackService', function (EventService) {
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
          formatter: Target[i] ? Target[i].formatter : ''
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
    var chartConfig = data.chartConfig
    var casted_keys = data.keys
    var casted_values = data.series
    var aggregate_data = data.data
    var newValuesConfig = data.seriesConfig

    var series = new Array()
    var string_keys = _.map(casted_keys, function (key) {
      return key.join('-')
    })
    var string_value = _.map(casted_values, function (value) {
      return value.join('-')
    })
    var titles = []

    for (var i = 0; i < aggregate_data.length; i++) {
      var s = {
        type: 'bar',
        coordinateSystem: 'polar',
        stack: 'a',
        name: string_value[i],
        data: []
      }
      for (var j = 0; j < aggregate_data[i].length; j++) {
        var eventInfo = CBoardEChartRenderEventInfo(data, i, j)
        var dataItem = {
          eventInfo: eventInfo,
          name: string_keys[j],
          value: _.isUndefined(aggregate_data[i][j]) ? 0 : aggregate_data[i][j]
        }
        if (chartConfig.config && chartConfig.config.events.length > 0) {
        }
        s.data.push(dataItem)
      }
      series.push(s)
    }

    var echartOption = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var finalResult = ''
          for (let i in tooltip) {        //列维
            if (tooltip[i].isShow !== false) {
              let index = _.findIndex(data.chartConfig.keys, function (item) {
                return item.col === i
              })
              if (index < 0) {
                return
              }
              let value = ''
              if (tooltip[i].formatter && tooltip[i].formatter.indexOf('{v}') != -1) {
                let repResult = ''
                if (typeof params.data.eventInfo[index].value === 'string') {
                  repResult = tooltip[i].formatter.replace('{v}', '\'{v}\'')
                }
                repResult = repResult.replace('{v}', params.data.eventInfo[index].value)
                value = eval(repResult)
              } else {
                value = params.data.eventInfo[index].value
              }
              finalResult = finalResult + tooltip[i].col + ': ' + value + '<br/>'
            }
          }
          for (let i in tooltipGroups) {        //行维
            if (typeof tooltipGroups[i] === undefined || tooltipGroups[i].isShow !== false) {
              let obj = _.where(params.data.eventInfo, {col: i})
              if (obj.length === 0) {
                return
              }
              let value = ''
              if (tooltipGroups[i].formatter && tooltipGroups[i].formatter.indexOf('{v}') != -1) {
                let repResult = ''
                if (typeof obj[0].value === 'string') {
                  repResult = tooltipGroups[i].formatter.replace('{v}', '\'{v}\'')
                }
                repResult = repResult.replace('{v}', obj[0].value)
                value = eval(repResult)
              } else {
                value = obj[0].value
              }
              finalResult = finalResult + tooltipGroups[i].col + ': ' + value + '<br/>'
            }
          }
          for (let i in tooltipTarget) {  //指标
            if (tooltipTarget[i].isShow !== false) {
              // if (params.data.name === i) {
              let index = _.findIndex(data.chartConfig.values[0].cols, function (item) {
                return item.alias === i
              })
              if (index < 0) {
                return
              }
              let dataIndex = _.findIndex(aggregate_data[params.seriesIndex],
                function (item) {
                  return item === params.value
                })
              if (dataIndex < 0) {
                return
              }
              let value = ''
              if (tooltipTarget[i].formatter && tooltipTarget[i].formatter.indexOf('{v}') != -1) {
                let repResult = ''
                if (typeof params.value === 'string') {
                  repResult = tooltipTarget[i].formatter.replace('{v}', '\'{v}\'')
                } else {
                  repResult = tooltipTarget[i].formatter
                }
                repResult = repResult.replace('{v}', aggregate_data[index][dataIndex])
                value = eval(repResult)
              } else {
                value = aggregate_data[index][dataIndex]
              }
              finalResult = finalResult + tooltipTarget[i].col + ': ' + value + '<br/>'
              // }
            }
          }
          return finalResult
        }
      },
      angleAxis: {},
      radiusAxis: {
        type: 'category',
        data: string_keys,
        z: 10
      },
      polar: {},
      series: series,
      legend: {
        show: true,
        data: string_value
      }
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
