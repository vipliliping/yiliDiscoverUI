'use strict'
discovery.service('chartPieService', function (BoardParamService, EventService) {
  'ngInject'
  this.instance = null

  this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined,
      themeFunList)
    return this.instance.chart(null, persist, EventService)
  }

  this.parseOption = function (data) {
    var chartConfig = data.chartConfig
    var casted_keys = data.keys
    var casted_values = data.series
    var aggregate_data = data.data

    let tooltip = {}
    let Levi = data.chartConfig.option.tooltip ? data.chartConfig.option.tooltip : {}
    let keys = data.chartConfig.keys

    console.log('keys', keys)
    console.log('data', data)
    for (let i in keys) {
      if (!_.isUndefined(Levi)) {
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
    }

    let tooltipTarget = {}
    let Target = data.chartConfig.option.tooltipTarget ? data.chartConfig.option.tooltipTarget : {}
    let targetValue = {}
    for (let j = 0; j < data.chartConfig.values.length; j++) {
      for (let k = 0; k < data.chartConfig.values[j].cols.length; k++) {
        targetValue[data.chartConfig.values[j].cols[k].alias] = {
          col: data.chartConfig.values[j].cols[k].alias
        }
      }
    }
    if (!_.isUndefined(Target)) {
      for (let i in targetValue) {
        tooltipTarget[i] = Target[i]
        if (Target[i]) {
          tooltipTarget[i] = {
            col: Target[i].col ? Target[i].col : i,
            isShow: Target[i] ? Target[i].isShow : true,
            formatter: Target[i] && Target[i].formatter ? Target[i].formatter : ''
          }
        } else {
          tooltipTarget[i] = {
            col: i,
            isShow: Target[i] ? Target[i].isShow : true,
            formatter: ''
          }
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

    var series = new Array()
    var string_keys = _.map(casted_keys, function (key) {
      return key.join('-')
    })
    var string_value = _.map(casted_values, function (value) {
      return value.join('-')
    })
    var b = 100 / (casted_values.length * 9 + 1)
    var titles = []
    var s = {
      name: string_value[0],
      type: 'pie',
      center: [
        chartConfig.centerX ? chartConfig.centerX : '50%',
        chartConfig.centerY ? chartConfig.centerY : '50%'],
      xRadius: [
        chartConfig.radiusX ? chartConfig.radiusX : '0',
        chartConfig.radiusY ? chartConfig.radiusY : '70%'],
      data: [],
      label: {},
      itemStyle: {
        normal: {
          label: {
            show: true,
            //position:'inside',
            formatter: '{b}: {d}%'
          }
        },
        labelLine: {show: true}
      }
    }
    if (chartConfig && chartConfig.roseType) {
      s.roseType = 'area'
      s.itemStyle = {
        normal: {
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
      s.animationType = 'scale'
      s.animationEasing = 'elasticOut'
      s.animationDelay = function (idx) {
        return Math.random() * 200
      }
    }
    for (var i = 0; i < aggregate_data.length; i++) {
      for (var j = 0; j < aggregate_data[i].length; j++) {
        if(i === 0){
          s.data[j] = {
            eventInfo: CBoardEChartRenderEventInfo(data, i, j),
            name: string_keys[j] ? string_keys[j]: '',
            value: [aggregate_data[i][j]]
          }
        } else {
          s.data[j].value = s.data[j].value.concat(aggregate_data[i][j])
        }
      }
    }
    series.push(s)

    //label显示隐藏
    for (var i = 0; i < series.length; i++) {
      if (!_.isUndefined(chartConfig.series_label)) {
        if (chartConfig.series_label === true) {
          series[i].label = {
            normal: {
              show: true
            }
          }
        } else {
          series[i].label = {
            normal: {
              show: false
            }
          }
        }
      }
    }

    /*制指定某指标系列变颜色  &&  指定某指标和某维度变颜色*/
    var colorList = []
    var dataNameList = []
    var seriesNameList = []
    if (chartConfig.option.itemStyle && chartConfig.option.itemStyle.color) {
      colorList = chartConfig.option.itemStyle.color.split(',')
    }
    if (chartConfig.option.itemStyle && chartConfig.option.itemStyle.dataName) {
      dataNameList = chartConfig.option.itemStyle.dataName.split(',')
    }
    if (chartConfig.option.itemStyle &&
      chartConfig.option.itemStyle.seriesName) {
      seriesNameList = chartConfig.option.itemStyle.seriesName.split(',')
    }
    if (chartConfig.option.itemStyle) {
      if (chartConfig.option.itemStyle && chartConfig.option.itemStyle.color &&
        chartConfig.option.itemStyle.color != '') {
        for (var e = 0; e < colorList.length; e++) {
          if (chartConfig.option.itemStyle.dataName &&
            (_.isUndefined(chartConfig.option.itemStyle.seriesName) ||
              chartConfig.option.itemStyle.seriesName == '')) {
            for (var i = 0; i < series.length; i++) {
              if (dataNameList[e] == series[i].name) {
                for (var j = 0; j < series[i].data.length; j++) {
                  series[i].data[j] = _.extend(series[i].data[j], {
                    itemStyle: {
                      normal: {
                        color: colorList[e]
                      }
                    }
                  })
                }
              }
            }
          }
          else if (chartConfig.option.itemStyle.dataName &&
            chartConfig.option.itemStyle.seriesName) {
            for (var i = 0; i < series.length; i++) {
              if (dataNameList[e] == series[i].name) {
                for (var j = 0; j < series[i].data.length; j++) {
                  for (var k = 0; k < series[i].data[j].eventInfo.length; k++) {
                    if (seriesNameList[e] ==
                      series[i].data[j].eventInfo[k].value) {
                      series[i].data[j] = _.extend(series[i].data[j], {
                        itemStyle: {
                          normal: {
                            color: colorList[e]
                          }
                        }
                      })
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    var echartOption = {
      title: titles,
      legend: {
        orient: 'vertical',
        left: 'left',
        data: string_keys
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var finalResult = ''
          var value = ''
          for (let i in tooltip) {        //列维
            if (typeof tooltip[i] === undefined ||
              tooltip[i].isShow !== false) {
              let index = _.findIndex(params.data.eventInfo, function (item) {
                return item.col === tooltip[i].col
              })
              if (index < 0) {
                return
              }
              value = params.data.eventInfo[index].value
              let result = value
              if (tooltip[i].formatter) {
                result = eval(tooltip[i].formatter)
              }
              finalResult = finalResult + tooltip[i].col + ': ' + result +
                '<br/>'
            }
          }
          for (let i in tooltipGroups) {        //行维
            if (tooltipGroups[i].isShow !== false) {
              let index = _.findIndex(params.data.eventInfo, function (item) {
                return item.col === tooltipGroups[i].col
              })
              if (index < 0) {
                return
              }
              value = params.data.eventInfo[index].value
              let result = value
              if (tooltipGroups[i].formatter) {
                result = eval(tooltipGroups[i].formatter)
              }
              finalResult = finalResult + tooltipGroups[i].col + ': ' + result +
                '<br/>'
            }
          }
          for (let i in tooltipTarget) {  //指标
            if (tooltipTarget[i]) {
              if (tooltipTarget[i].isShow !== false) {
                let index = _.findIndex(data.chartConfig.values[0].cols,
                  function (item) {
                    return item.alias === i
                  })
                if (index < 0) {
                  continue
                }
                let dataIndex = _.findIndex(aggregate_data[params.seriesIndex],
                  function (item) {
                    if(typeof params.value === 'object'){
                      return item === params.value[0]
                    } else {
                      return item === params.value
                    }
                  })
                if (dataIndex < 0) {
                  continue
                }
                value = aggregate_data[index][dataIndex]
                let result = value
                if (tooltipTarget[i].formatter) {
                  result = eval(tooltipTarget[i].formatter)
                }
                finalResult = finalResult + tooltipTarget[i].col + ': ' + result +
                  '<br/>'
              }
            }
          }
          finalResult += '占比：' + params.percent + '%'
          return finalResult
        }
      },
      targetData: chartConfig.values,
      series: series
    }

    updateEchartOptions(chartConfig.option, echartOption)
    return echartOption
  }
})
