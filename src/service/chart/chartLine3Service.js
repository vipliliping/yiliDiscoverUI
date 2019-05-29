/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartLine3Service', function (BoardParamService, EventService) {
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
    let tooltip = {}
    let Levi = data.chartConfig.option.tooltip ? data.chartConfig.option.tooltip : {}
    let keys = data.chartConfig.keys
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
            formatter: Target[i]&&Target[i].formatter ? Target[i].formatter : ''
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
        aggregate_data[i][j] = aggregate_data[i][j] ? Number(aggregate_data[i][j]) : 0
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
      if (!_.isUndefined(chartConfig.option.barWidth) && chartConfig.option.barWidth != '') {
        s.barWidth = chartConfig.option.barWidth
      }
      if (s.type == 'stackbar') {
        s.type = 'bar'
        s.stack = s.valueAxisIndex.toString()
      } else if (s.type == 'percentbar') {
        s.data = _.map(aggregate_data[i], function (e, i) {
          return [i, parseFloat((e / sum_data[i] * 100).toFixed(2)), e]
        })
        s.type = 'bar'
        s.stack = s.valueAxisIndex.toString()
      } else if (s.type == 'stackline') {
        s.type = 'line'
        s.stack = 'normal'
        // s.stack = s.valueAxisIndex.toString();
        s.areaStyle = {normal: {}}
      }
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
          "value": strData == '' ? s.data[j] : strData,
          unit: newUnit == '' ? unit : newUnit
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
        if (chartConfig.valueAxis == 'horizontal') position = {position: left_right[chartConfig.option.label.position]}
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

    // label显示or不显示
    for (var i = 0; i < chartConfig.values.length; i++) {
      if (!_.isUndefined(chartConfig.values[i].series_label)) {
        for (var j = 0; j < series_data.length; j++) {
          if (chartConfig.values[i].series_label === 'true') {
            for (var c = 0; c < chartConfig.values[i].cols.length; c++) {
              if (series_data[j].name == chartConfig.values[i].cols[c].alias) {
                if (chartConfig.values[i].series_type == 'percentbar') {
                  series_data[j].label = {
                    normal: {
                      show: true,
                      formatter: function (param) {
                        return (param.data.value[2] == 0 ? '' : param.data.value[2]) + param.data.unit
                      }
                    }
                  }
                } else {
                  series_data[j].label = {
                    normal: {
                      show: true,
                      formatter: function (param) {
                        return (param.data.value == 0 ? '' : param.data.value) + param.data.unit
                      }
                    }
                  }
                }
                series_data[j].label.normal = $.extend({}, series_data[j].label.normal, position)
              }
            }
          } else {
            series_data[i].label = {
              normal: {
                show: false
              }
            }
          }
        }
      }
    }

    var valueAxis = angular.copy(chartConfig.values)
    _.each(valueAxis, function (axis, index) {
      axis.axisLabel = {
        formatter: function (value) {
          return numbro(value).format("0a.[0000]")
        }
      }
      axis.nameGap = 0
      if (axis.series_type == "percentbar") {
        axis.min = 0
        axis.max = 100
      } else {
        axis.min = axis.min ? axis.min : null
        axis.max = axis.max ? axis.max : null
      }
      if (index > 0) {
        axis.splitLine = false
      }
      // axis.scale = true
    })

    //对数轴or不对数轴
    for (var i = 0; i < valueAxis.length; i++) {
      if (chartConfig.values[i].series_label) {
        if (chartConfig.values[i].series_logarithm == "true") {
          valueAxis[i] = {
            type: "log"
          }
        } else if (chartConfig.values[i].series_logarithm == "false") {
          valueAxis[i] = {
            type: "value"
          }
        }
      }
    }

    //增加markLine
    var axis
    for (var m = 0; m < series_data.length; m++) {
      var s_ml = series_data[m]
      if (axis != s_ml.valueAxisIndex) {
        axis = s_ml.valueAxisIndex
        if (!_.isUndefined(chartConfig.values[axis].markLine)) {
          var axis_ml_v = {}
          if (_.isUndefined(s_ml.xAxisIndex)) axis_ml_v.yAxis = parseInt(chartConfig.values[axis].markLine)
          else axis_ml_v.xAxis = parseInt(chartConfig.values[axis].markLine)
          s_ml.markLine = {
            data: [axis_ml_v],
            label: {
              normal: {
                position: 'middle'
              }
            },
            lineStyle: {
              color: 'white'
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
      colorList = chartConfig.option.itemStyle.color.split(",")
    }
    if (chartConfig.option.itemStyle && chartConfig.option.itemStyle.dataName) {
      dataNameList = chartConfig.option.itemStyle.dataName.split(",")
    }
    if (chartConfig.option.itemStyle && chartConfig.option.itemStyle.seriesName) {
      seriesNameList = chartConfig.option.itemStyle.seriesName.split(",")
    }
    if (chartConfig.option.itemStyle) {
      if (chartConfig.option.itemStyle && chartConfig.option.itemStyle.color && chartConfig.option.itemStyle.color != '') {
        for (var e = 0; e < colorList.length; e++) {
          if (chartConfig.option.itemStyle.dataName && (_.isUndefined(chartConfig.option.itemStyle.seriesName) || chartConfig.option.itemStyle.seriesName == '')) {
            for (var i = 0; i < series_data.length; i++) {
              if (dataNameList[e] == series_data[i].name) {
                for (var j = 0; j < series_data[i].data.length; j++) {
                  series_data[i] = _.extend(series_data[i], {
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
          else if (chartConfig.option.itemStyle.dataName && chartConfig.option.itemStyle.seriesName) {
            for (var i = 0; i < series_data.length; i++) {
              if (dataNameList[e] == series_data[i].name) {
                for (var j = 0; j < series_data[i].data.length; j++) {
                  for (var k = 0; k < series_data[i].data[j].eventInfo.length; k++) {
                    if (seriesNameList[e] == series_data[i].data[j].eventInfo[k].value) {
                      series_data[i] = _.extend(series_data[i], {
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


    if (tunningOpt) {
      var labelInterval, labelRotate
      tunningOpt.ctgLabelInterval ? labelInterval = tunningOpt.ctgLabelInterval : 'auto'
      tunningOpt.ctgLabelRotate ? labelRotate = tunningOpt.ctgLabelRotate : 0
    }


    var categoryAxis = {
      type: 'category',
      data: string_keys,
      nameGap: 0,
      axisLabel: {
        show: true,
        interval: labelInterval,
        rotate: labelRotate
      }
    }

    var thresholdCode = data.chartConfig.thresholdCode
    var params = angular.copy(window.$$dlut_param)
    if (thresholdCode) {
      var seriesIndexObj = {}
      for (let j in data.seriesConfig) {
        seriesIndexObj[j] = data.seriesConfig[j].valueAxisIndex
      }
      var evalColor = function (series_data) {
        for (let i in series_data) {
          for (let j in series_data[i].data) {
            // var data = series_data[i].data[j]
            try {
              series_data[i].data[j] = (new Function('data,params,seriesIndex,dataIndex',
                'return (' + thresholdCode + ')(data,params,seriesIndex,dataIndex)'))
              (series_data[i].data[j], params, i, j)
            } catch (e) {
              console.error('data自定义计算公式错误', thresholdCode, params, series_data[i].data[j], i, j, e)
            }
          }
        }
      }
      evalColor(series_data)
    }

    if (data.chartConfig.markLineCode) {
      var markLineCode = data.chartConfig.markLineCode
      for (let i in series_data) {
        // var data = series_data[i]
        try {
          series_data[i] = (new Function('serie,params,seriesIndex',
            'return (' + markLineCode + ')(serie,params,seriesIndex)'))
          (series_data[i], params, i)
        } catch (e) {
          console.error('series自定义计算错误', markLineCode, series_data[i], params, i, e)
        }
      }
    }
    var echartOption = {
      grid: angular.copy(echartsBasicOption.grid),
      legend: {
        data: _.map(casted_values, function (v) {
          return v.join('-')
        })
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var finalResult = ''
          let param = BoardParamService.getAll()
          let value = ''
          for (let i in tooltip) {        //列维
            if (typeof tooltip[i] === undefined ||
              tooltip[i].isShow !== false) {
              let index = _.findIndex(params.data.eventInfo, function (item) {
                return item.col === i
              })
              if (index < 0) {
                return
              }
              // let value = ''
              // if (tooltip[i].formatter &&
              //   tooltip[i].formatter.indexOf('{v}') != -1) {
              //   let repResult = ''
              //   if (typeof params.data.eventInfo[index].value === 'string') {
              //     repResult = tooltip[i].formatter.replace('{v}', '\'{v}\'')
              //   }
              //   repResult = repResult.replace('{v}',
              //     params.data.eventInfo[index].value)
              //   value = eval(repResult)
              // } else {
              //   value = params.data.eventInfo[index].value
              // }
              value = params.data.eventInfo[index].value
              let result = value
              if (tooltip[i].formatter){
                result = eval(tooltip[i].formatter)
              }
              finalResult = finalResult + tooltip[i].col + ': ' + result +
                '<br/>'
            }
          }
          for (let i in tooltipGroups) {        //行维
            if (tooltipGroups[i].isShow !== false) {
              let index = _.findIndex(params.data.eventInfo, function (item) {
                return item.col === i
              })
              if (index < 0) {
                return
              }
              // let value = ''
              // if (tooltipGroups[i].formatter &&
              //   tooltipGroups[i].formatter.indexOf('{v}') != -1) {
              //   let repResult = ''
              //   if (typeof params.data.eventInfo[index].value === 'string') {
              //     repResult = tooltipGroups[i].formatter.replace('{v}',
              //       '\'{v}\'')
              //   }
              //   repResult = repResult.replace('{v}',
              //     params.data.eventInfo[index].value)
              //   value = eval(repResult)
              // } else {
              //   value = params.data.eventInfo[index].value
              // }
              value = params.data.eventInfo[index].value
              let result = value
              if (tooltipGroups[i].formatter){
                result = eval(tooltipGroups[i].formatter)
              }
              finalResult = finalResult + tooltipGroups[i].col + ': ' + result +
                '<br/>'
            }
          }
          for (let i in tooltipTarget) {  //指标
            if (tooltipTarget[i]) {
              if (tooltipTarget[i].isShow !== false) {
                let index = _.findIndex(data.chartConfig.values,
                  function (item) {
                    return item.cols[0].alias === i
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
                // let value = ''
                // if (tooltipTarget[i].formatter &&
                //   tooltipTarget[i].formatter.indexOf('{v}') != -1) {
                //   let repResult = ''
                //   if (typeof data.keys === 'string') {
                //     repResult = tooltipTarget[i].formatter.replace('{v}',
                //       '\'{v}\'')
                //   } else {
                //     repResult = tooltipTarget[i].formatter
                //   }
                //   repResult = repResult.replace('{v}', aggregate_data[index][dataIndex])
                //   value = eval(repResult)
                // } else {
                //   value = aggregate_data[index][dataIndex]
                // }
                value = aggregate_data[index][dataIndex]
                let result = value
                if (tooltipTarget[i].formatter){
                  result = eval(tooltipTarget[i].formatter)
                }
                finalResult = finalResult + tooltipTarget[i].col + ': ' + result +
                  '<br/>'
              }
            }
          }
          // let value = ''
          // if (tooltipTarget[params.seriesName].formatter &&
          //     tooltipTarget[params.seriesName].formatter.indexOf('{v}') != -1) {
          //     let repResult = ''
          //     if (typeof data.keys === 'string') {
          //         repResult = tooltipTarget[params.seriesName].formatter.replace('{v}',
          //             '\'{v}\'')
          //     } else {
          //         repResult = tooltipTarget[params.seriesName].formatter
          //     }
          //     repResult = repResult.replace('{v}', params.value)
          //     value = eval(repResult)
          // } else {
          //     value = params.value
          // }
          // finalResult = finalResult + tooltipTarget[params.seriesName].col + ': ' + value
          return finalResult
        }
      },
      xAxis: chartConfig.valueAxis == 'horizontal' ? valueAxis : categoryAxis,
      yAxis: chartConfig.valueAxis == 'horizontal' ? categoryAxis : valueAxis,
      targetData: chartConfig.values,
      series: series_data
    }
    if (!_.isUndefined(tunningOpt.xAxisName)) {
      if (_.isArray(echartOption.xAxis)) echartOption.xAxis[0].name = tunningOpt.xAxisName
      else echartOption.xAxis.name = tunningOpt.xAxisName
    }

    if (!_.isUndefined(tunningOpt.yAxisName)) {
      if (_.isArray(echartOption.yAxis)) echartOption.yAxis[0].name = tunningOpt.yAxisName
      else echartOption.yAxis.name = tunningOpt.yAxisName
    }

    if (chartConfig.valueAxis === 'horizontal') {
      echartOption.grid.left = 'left'
      echartOption.grid.containLabel = true
      echartOption.grid.bottom = '5%'
    }
    if (chartConfig.valueAxis === 'vertical' && chartConfig.values.length > 1) {
      echartOption.grid.right = 40
    }
    // Apply tunning options
    updateEchartOptions(tunningOpt, echartOption)
    return echartOption
  }
})
