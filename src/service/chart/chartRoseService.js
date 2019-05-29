'use strict'
discovery.service('chartRoseService', function (EventService) {
  'ngInject'
  this.instance = null

  this.render = function (
    containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined,
      themeFunList)
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
        targetValue[data.chartConfig.values[j].cols[k].col] = {
          col: data.chartConfig.values[j].cols[k].col
        }
      }
    }
    for (let i in targetValue) {
      tooltipTarget[i] = Target[i]
      if (Target[i]&&Target[i].col) {
      } else {
        tooltipTarget[i] = {
          col: i,
          isShow: Target[i]?Target[i].isShow:true,
          formatter: ''
        }
      }
    }
    let tooltipGroups = {}
    let Groups = data.chartConfig.option.tooltipGroups
    let targetGroups = data.chartConfig.groups
    for (let i = 0; i < targetGroups.length; i ++) {
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
    var series_data = new Array()
    var string_keys = _.map(casted_keys, function (key) {
      return key.join('-')
    })
    var tunningOpt = chartConfig.option

    var sum_data = []
    for (var j = 0; aggregate_data[0] && j < aggregate_data[0].length; j++) {
      var sum = 0
      for (var i = 0; i < aggregate_data.length; i++) {
        sum += aggregate_data[i][j] ? Number(aggregate_data[i][j]) : 0
        aggregate_data[i][j] = aggregate_data[i][j] ? Number(
          aggregate_data[i][j]) : 0
      }
      sum_data[j] = sum
    }
    var unitList = []
    for (var i = 0; i < chartConfig.values.length; i++) {
      var unit = chartConfig.values[i].unit ? chartConfig.values[i].unit : ''
      for (var j = 0; j < chartConfig.values[i].cols.length; j++) {
        unitList.push(unit)
      }
    }
    var newunitList = []
    var length = data.series.length / unitList.length
    for (var i = 0; i < length; i++) {
      newunitList = newunitList.concat(unitList)
    }
    for (var i = 0; i < aggregate_data.length; i++) {
      var joined_values = casted_values[i].join('-')
      var s = angular.copy(newValuesConfig[joined_values])
      s.name = joined_values
      s.data = aggregate_data[i]
      s.barMaxWidth = 40
      if (!_.isUndefined(chartConfig.option.barWidth) &&
        chartConfig.option.barWidth != '') {
        s.barWidth = chartConfig.option.barWidth
      }
      s.type = 'bar'
      s.stack = s.valueAxisIndex.toString()
      s.coordinateSystem = 'polar'
      if (chartConfig.valueAxis == 'horizontal') {
        s.xAxisIndex = s.valueAxisIndex
      } else {
        s.yAxisIndex = s.valueAxisIndex
      }
      var newData = []
      var unit = newunitList[i]
      var newUnit = ''
      var strData = ''
      for (var j = 0; j < s.data.length; j++) {
        if (unit == '元' || unit == '万' || unit == '亿') {
          unit = dlut.utils.convertMoney(s.data[j], unit)
          newUnit = unit.substr(unit.length - 1, unit.length)
          strData = unit.substr(0, unit.length - 1)
        } else if (unit == '100%') {
          strData = Math.floor(s.data[j] * 100)
          newUnit = '%'
        } else if (unit == '100.00%') {
          strData = (s.data[j] * 100).toFixed(2)
          newUnit = '%'
        } else if (unit == '100.0%') {
          strData = (s.data[j] * 100).toFixed(1)
          newUnit = '%'
        }
        var eventInfo = CBoardEChartRenderEventInfo(data, i, j)
        var obj = {
          eventInfo: eventInfo,
          'value': strData == '' ? s.data[j] : strData,
          unit: newUnit == '' ? unit : newUnit,
        }
        newData.push(obj)
      }
      s.data = newData
      series_data.push(s)
    }

    //label显示位置设置
    var position = {}
    if (!_.isUndefined(chartConfig.option.label)) {
      var top_bottom = {top: 'insideTop', bottom: 'insideBottom'}
      var left_right = {top: 'insideRight', bottom: 'insideLeft'}
      if (!_.isUndefined(chartConfig.option.label.position)) {
        if (chartConfig.valueAxis ==
          'horizontal') position = {position: left_right[chartConfig.option.label.position]}
        else position = {position: top_bottom[chartConfig.option.label.position]}
      }
      if (!_.isUndefined(chartConfig.option.label.offset)) {
        var offset = [0, 0]
        if (!_.isUndefined(chartConfig.option.label.offset.top)) {
          offset[1] = -chartConfig.option.label.offset.top
        }
        if (!_.isUndefined(chartConfig.option.label.offset.bottom)) {
          offset[1] = Number(chartConfig.option.label.offset.bottom)
        }
        if (!_.isUndefined(chartConfig.option.label.offset.left)) {
          offset[0] = -chartConfig.option.label.offset.left
        }
        if (!_.isUndefined(chartConfig.option.label.offset.right)) {
          offset[0] = Number(chartConfig.option.label.offset.right)
        }
        position.offset = offset
      }
    }

    var valueAxis = angular.copy(chartConfig.values)
    _.each(valueAxis, function (axis, index) {
      axis.axisLabel = {
        formatter: function (value) {
          return numbro(value).format('0a.[0000]')
        },
      }
      axis.nameGap = 0
      if (axis.series_type == 'percentbar') {
        axis.min = 0
        axis.max = 100
      } else {
        axis.min = axis.min ? axis.min : null
        axis.max = axis.max ? axis.max : null
      }
      if (index > 0) {
        axis.splitLine = false
      }
      axis.scale = true
    })

    //对数轴or不对数轴
    for (var i = 0; i < valueAxis.length; i++) {
      if (chartConfig.values[i].series_label) {
        if (chartConfig.values[i].series_logarithm == 'true') {
          valueAxis[i] = {
            type: 'log',
          }
        } else if (chartConfig.values[i].series_logarithm == 'false') {
          valueAxis[i] = {
            type: 'value',
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
            for (var i = 0; i < series_data.length; i++) {
              if (dataNameList[e] == series_data[i].name) {
                for (var j = 0; j < series_data[i].data.length; j++) {
                  series_data[i].data[j] = _.extend(series_data[i].data[j], {
                    itemStyle: {
                      normal: {
                        color: colorList[e],
                      },
                    },
                  })
                }
              }
            }
          }
          else if (chartConfig.option.itemStyle.dataName &&
            chartConfig.option.itemStyle.seriesName) {
            for (var i = 0; i < series_data.length; i++) {
              if (dataNameList[e] == series_data[i].name) {
                for (var j = 0; j < series_data[i].data.length; j++) {
                  for (var k = 0; k <
                  series_data[i].data[j].eventInfo.length; k++) {
                    if (seriesNameList[e] ==
                      series_data[i].data[j].eventInfo[k].value) {
                      series_data[i].data[j] = _.extend(series_data[i].data[j],
                        {
                          itemStyle: {
                            normal: {
                              color: colorList[e],
                            },
                          },
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
      angleAxis: {
        type: 'category',
        data: string_keys,
        z: 10,
      },
      radiusAxis: {},
      polar: {},
      grid: angular.copy(echartsBasicOption.grid),
      legend: {
        data: _.map(casted_values, function (v) {
          return v.join('-')
        }),
      },
      tooltip: {
        formatter: function (params) {
          var name = params[0].name
          var s = ''
          if (params[0].name != '') {
            s += name + '</br>'
          }
          for (var i = 0; i < chartConfig.values.length; i++) {
            if (chartConfig.values[i].series_type == 'percentbar') {
              for (var j = 0; j < params.length; j++) {
                s += params[j].seriesName + ' : ' + params[j].data.value[2] +
                  params[j].data.unit + '(' + params[j].data.value[1] + '%)' +
                  '</br>'
              }
            } else {
              for (var i = 0; i < params.length; i++) {
                s += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                  params[i].color + '"></span>'
                s += params[i].seriesName + ' : ' + params[i].value +
                  (params[i].data.unit ? params[i].data.unit : '')
                s += '<br>'
              }
            }
            return s
          }
        },
      },
      series: series_data,
    }

    // Apply tunning options
    updateEchartOptions(tunningOpt, echartOption)

    return echartOption
  }
})
