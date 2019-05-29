/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartLineService', function (BoardParamService, EventService) {
  "ngInject"
  this.instance = null

  this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList)
    return this.instance.chart(null, persist, EventService)
  }

  this.parseOption = function (data) {
    for (var i = 0; i < data.data.length; i++) {
      var itemData = data.data[i]
      for (let j = 0; j < itemData.length; j++) {
        if (_.isNaN(itemData[j]) || itemData[j] === Infinity) {
          itemData[j] = '-'
        }
      }
    }
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
    // 这里处理瀑布图
    var pubuArr = []
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
      } else if (s.type == 'oneLineBar') {
        s.type = 'custom'
        s.renderItem = renderAverageItem
      } else if (s.type == 'waterFall') {
        s.type = 'bar'
        s.waterFall = true
        s.stack = s.valueAxisIndex.toString()
      }
      if (chartConfig.valueAxis == 'horizontal') {
        s.xAxisIndex = s.valueAxisIndex
      } else {
        s.yAxisIndex = s.valueAxisIndex
      }
      var newData = []
      var unit = newunitList[i]
      var newUnit = ''
      for (var j = 0; j < s.data.length; j++) {
        var eventInfo = CBoardEChartRenderEventInfo(data, i, j)
        var obj = {
          // name: eventInfo[chartConfig.keyIndex ? chartConfig.keyIndex : 0].value,
          eventInfo: eventInfo,
          "value": s.data[j],
          unit: newUnit == '' ? unit : newUnit
        }
        newData.push(obj)
      }
      s.data = newData
      // 这里处理瀑布图
      if (s.waterFall) {
        pubuArr.push(s)
      } else {
        series_data.push(s)
      }
    }
    // 处理瀑布辅助series
    if (pubuArr.length > 0) {
      var serie = {
        name: '辅助isAssist',
        isAssist: true,
        type: 'bar',
        stack: '',
        itemStyle: {
          normal: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          }
        },
        data: []
      }
      var dataArr = []
      // 辅助bar的数据，复制了原始数据
      for (var i in pubuArr) {
        serie.stack = pubuArr[i].stack
        serie.yAxisIndex = pubuArr[i].yAxisIndex
        for (var j in pubuArr[i].data) {
          if (dataArr[j] === undefined) {
            dataArr[j] = pubuArr[i].data[j].value
          }
        }
      }
      // 辅助柱的数据
      for (var i = 0; i < dataArr.length; i++) {
        if(i === 0){
          serie.data[i] = 0
        } else {
          serie.data[i] = serie.data[i-1] +  dataArr[i-1]
          if(dataArr[i] < 0){
            serie.data[i] = serie.data[i-1] + dataArr[i]
          }
        }
        // for (var j = 0; j <= i; j++) {
        //   if (serie.data[i] === undefined) {
        //     serie.data[i] = 0
        //   }
        //   if(i !== 0 && j > 0){
        //     serie.data[i] += dataArr[j-1]
        //     if(dataArr[j] < 0 && dataArr[j-1] > 0){
        //       serie.data[i] += dataArr[j]
        //     }
        //   }
        // }
      }
      // 瀑布图除外
      for(var i = 0; i < series_data.length; i++){
        var totalData = {}
        if(series_data[i].data.length > 0){
          totalData = angular.copy(series_data[i].data[0])
          totalData.eventInfo[0].value = '总计'
        }
        totalData.value = 0
        for(var j = 0; j < series_data[i].data.length; j++){
          totalData.value += series_data[i].data[j].value
        }
        series_data[i].data.push(totalData)
      }
      //瀑布图原始数据负数变正数
      for(var i = 0; i < pubuArr.length; i++){
        var total = 0
        for(var j = 0; j < pubuArr[i].data.length; j++){
          total += pubuArr[i].data[j].value
          if(pubuArr[i].data[j].value < 0){
            pubuArr[i].data[j].value = Math.abs(pubuArr[i].data[j].value)
            if(_.isUndefined(pubuArr[i].data[j].itemStyle)){
              pubuArr[i].data[j].itemStyle = {
                color: 'red'
              }
            } else {
              pubuArr[i].data[j].itemStyle.color = 'red'
            }
          } else {
            pubuArr[i].data[j].isPositive = true
          }
        }
        // 总计的值
        pubuArr[i].data[pubuArr[i].data.length] = angular.copy(pubuArr[i].data[pubuArr[i].data.length - 1])
        pubuArr[i].data[pubuArr[i].data.length-1].value = total
        // pubuArr[i].data[pubuArr[i].data.length-1].value = serie.data[serie.data.length - 1]
        // if(pubuArr[i].data[pubuArr[i].data.length-2].isPositive){
        //   pubuArr[i].data[pubuArr[i].data.length-1].value += pubuArr[i].data[pubuArr[i].data.length-2].value
        // }
        pubuArr[i].data[pubuArr[i].data.length-1].eventInfo[0].value = '总计'
        if(pubuArr[i].data[pubuArr[i].data.length-1].itemStyle){
          pubuArr[i].data[pubuArr[i].data.length-1].itemStyle.color = '#59A14F'
        } else {
          pubuArr[i].data[pubuArr[i].data.length-1].itemStyle = {
            color: '#59A14F'
          }
        }
        string_keys.push('总计')
      }
      series_data.push(serie)
      series_data = series_data.concat(pubuArr)
    }
    //label显示位置设置
    var position = {}
    if (!_.isUndefined(chartConfig.option.label)) {
    }

    var top_bottom = {top: 'top', bottom: 'insideBottom'}
    var left_right = {top: 'right', bottom: 'insideLeft'}
    var settingPosition = chartConfig.option.label ? chartConfig.option.label.position : 'top'
    if (chartConfig.valueAxis == 'horizontal') {
      position = {position: left_right[settingPosition]}
    }
    else {
      position = {position: top_bottom[settingPosition]}
    }
    if (!_.isUndefined(chartConfig.option.label) && !_.isUndefined(chartConfig.option.label.offset)) {
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

    // label显示or不显示
    for (var i = 0; i < chartConfig.values.length; i++) {
      for (var j = 0; j < series_data.length; j++) {
        for (var c = 0; c < chartConfig.values[i].cols.length; c++) {
          if (series_data[j].name == chartConfig.values[i].cols[c].alias) {
            if (chartConfig.values[i].series_type == 'percentbar') {
              series_data[j].label = {
                show: chartConfig.values[i].series_label,
                color: '#fff',
                formatter: function (param) {
                  return param.data.value + '%'
                },
                series_type: 'percentbar'
              }
            } else {
              series_data[j].label = {
                show: chartConfig.values[i].series_label,
                color: 'auto',
                formatter: function (param) {
                  return (param.data.value == 0 ? '' : param.data.value) + param.data.unit
                }
              }
            }
            series_data[j].label = $.extend({}, series_data[j].label, position)
          }
        }
      }
      if (!_.isUndefined(chartConfig.values[i].series_label)) {
        // if (chartConfig.values[i].series_label === 'true') {
        // } else {
        //   series_data[i].label = {
        //     normal: {
        //       show: false
        //     }
        //   }
        // }
      }
    }

    var valueAxis = angular.copy(chartConfig.values)
    _.each(valueAxis, function (axis, index) {
      axis.axisLabel = {
        formatter: function (value) {
          return numbro(value).format("0a.[0000]")
        }
      }
      axis.splitLine = {show: false}
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
    // var axis
    // for (var m = 0; m < series_data.length; m++) {
    //   var s_ml = series_data[m]
    //   if (axis != s_ml.valueAxisIndex) {
    //     axis = s_ml.valueAxisIndex
    //     if (!_.isUndefined(chartConfig.values[axis].markLine)) {
    //       var axis_ml_v = {}
    //       if (_.isUndefined(s_ml.xAxisIndex)) axis_ml_v.yAxis = parseInt(chartConfig.values[axis].markLine)
    //       else axis_ml_v.xAxis = parseInt(chartConfig.values[axis].markLine)
    //       s_ml.markLine = {
    //         data: [axis_ml_v],
    //         label: {
    //           normal: {
    //             position: 'middle'
    //           }
    //         },
    //         lineStyle: {
    //           color: 'white'
    //         }
    //       }
    //     }
    //   }
    // }

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
      show: true,
      splitLine: {show: true},
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
    var tooltipFormatter = function (params) {
      if(params.seriesName === '辅助isAssist'){  // 瀑布图的辅助bar
        return
      }
      var finalResult = ''
      let value = ''
      let info = params.data ? params.data.eventInfo : ''
      let param = BoardParamService.getAll()
      if (params.data && params.data.tooltipCache) return params.data.tooltipCache
      let tooltipIndex = -1
      for (let i in tooltip) {        //列维
        if (typeof tooltip[i] === undefined ||
          tooltip[i].isShow !== false) {
          tooltipIndex++
          let index = _.findIndex(params.data.eventInfo, function (item) {
            if (item.alias === i || item.col === i) {
              return true
            }
          })
          if (index < 0) {   // 可下钻维度
            value = params.data.eventInfo[tooltipIndex].value
            let result = value
            if (tooltip[i].formatter) {
              result = eval(tooltip[i].formatter)
            }

            let itemCol = params.data.eventInfo[tooltipIndex].col
            if (params.data.eventInfo[tooltipIndex].alias) {
              itemCol = params.data.eventInfo[tooltipIndex].alias
            }
            finalResult = finalResult + itemCol + ': ' + result +
              '<br/>'
          } else {     // 正常情况
            value = params.data.eventInfo[index].value
            let result = value
            if (tooltip[i].formatter) {
              result = eval(tooltip[i].formatter)
            }
            finalResult = finalResult + tooltip[i].col + ': ' + result +
              '<br/>'
          }
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
          if (tooltipGroups[i].formatter) {
            result = eval(tooltipGroups[i].formatter)
          }
          finalResult = finalResult + tooltipGroups[i].col + ': ' + result +
            '<br/>'
        }
      }
      let targetIndex = -1
      for (let i in tooltipTarget) {  //指标
        if (tooltipTarget[i]) {
          if (tooltipTarget[i].isShow !== false) {
            for (var m = 0; m < data.chartConfig.values.length; m++) {
              var itemValue = data.chartConfig.values[m]
              for (var n = 0; n < itemValue.cols.length; n++) {
                if (itemValue.cols[n].alias === i) {
                  targetIndex += 1
                  if (targetIndex < 0) {
                    continue
                  }
                  if (itemValue.series_type === 'waterFall' && params.dataIndex >= aggregate_data[targetIndex].length) {   // 瀑布图特殊
                    value = params.data.value
                  } else {
                    value = aggregate_data[targetIndex][params.dataIndex]
                  }
                  if(_.isUndefined(value)){
                    continue
                  }
                  // 一个堆叠和一个折现的处理方案， 正确性有待验证
                  if (aggregate_data.length > _.keys(tooltipTarget).length) {
                    if (params.seriesIndex % 2 === 0) {
                      if (targetIndex % 2 === 0) {
                        value = aggregate_data[params.seriesIndex][params.dataIndex]
                      } else {
                        let dataIndex = params.seriesIndex + 1
                        if (dataIndex < aggregate_data.length) {
                          value = aggregate_data[dataIndex][params.dataIndex]
                        }
                      }
                    } else {
                      if (targetIndex % 2 === 0) {
                        let dataIndex = params.seriesIndex - 1
                        if (dataIndex > -1) {
                          value = aggregate_data[dataIndex][params.dataIndex]
                        }
                      } else {
                        value = aggregate_data[params.seriesIndex][params.dataIndex]
                      }
                    }
                  }
                  let result = value
                  if (tooltipTarget[i].formatter) {
                    result = eval(tooltipTarget[i].formatter)
                  }
                  finalResult = finalResult + tooltipTarget[i].col + ': ' + result +
                    '<br/>'
                  // 处理y轴刻度label
                  if( !_.isUndefined(series_data[params.seriesIndex].yAxisIndex)
                    && (!valueAxis[series_data[params.seriesIndex].yAxisIndex].axisLabel.isFormatter)
                    && tooltipTarget[i].formatter
                    && valueAxis[series_data[params.seriesIndex].yAxisIndex].cols.length > 0
                    && (valueAxis[series_data[params.seriesIndex].yAxisIndex].cols[0].col === i || valueAxis[series_data[params.seriesIndex].yAxisIndex].cols[0].alias === i)){
                    valueAxis[series_data[params.seriesIndex].yAxisIndex].axisLabel.formatter = function (fValue, fIndex) {
                      let yLabel = tooltipTarget[i].formatter.replace('value','fValue')
                      let labelResult = eval(yLabel)
                      return labelResult
                    }
                    valueAxis[series_data[params.seriesIndex].yAxisIndex].axisLabel.isFormatter = true
                  }
                }
              }
            }
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
      params.data.tooltipCache = finalResult
      return finalResult
    }
    //增加labelFormatter
    for (var i = 0; i < series_data.length; i++) {
      var name = series_data[i].name
      var formatterObj = tooltipTarget[name]
      if (formatterObj && formatterObj.formatter) {
        for (var j = 0; j < series_data[i].data.length; j++) {
          series_data[i].data[j].laberFormatter = formatterObj.formatter
        }
        if (!series_data[i].label) {
          series_data[i].label = {}
        }
        if (series_data[i].label && series_data[i].label && series_data[i].label.series_type !== 'percentbar') {
          series_data[i].label.formatter = dlut.echart.labelFormatter
        }
      }
      for (var j = 0; j < series_data[i].data.length; j++) {
        if (!series_data[i].isAssist) {
          series_data[i].data[j].tooltipCache = tooltipFormatter({
            data: series_data[i].data[j],
            dataIndex: j,
            seriesIndex: i
          })
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
        formatter: tooltipFormatter
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
    // x轴的位置
    if (!_.isUndefined(tunningOpt.xAxisPosition)) {
      if (_.isArray(echartOption.xAxis)) echartOption.xAxis[0].position = tunningOpt.xAxisPosition
      else echartOption.xAxis.position = tunningOpt.xAxisPosition
    }
    // 缩放
    echartOption.dataZoom = []
    if (tunningOpt.dataZoom) {
        echartOption.dataZoom.push({
          type: 'slider',
          xAxisIndex: [0],
          startValue: tunningOpt.dataZoomStart ? parseInt(tunningOpt.dataZoomStart) : 0,
          endValue: tunningOpt.dataZoomEnd ? parseInt(tunningOpt.dataZoomEnd) : 100
      })
    }
    if (tunningOpt.dataZoomY){
        echartOption.dataZoom.push({
            type: 'slider',
            yAxisIndex: [0],
            startValue: tunningOpt.dataZoomStartY ? parseInt(tunningOpt.dataZoomStartY) : 0,
            endValue: tunningOpt.dataZoomEndY ? parseInt(tunningOpt.dataZoomEndY) : 100
        })
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
    if (data.chartConfig.optionCode) {
      var optionCode = data.chartConfig.optionCode
      try {
        var param = angular.copy(window.$$dlut_param)
        echartOption = (new Function('option,param,config',
          'return (' + optionCode + ')(option,param,config)'))
        (echartOption, param, chartConfig)
      } catch (e) {
        console.error('option自定义计算错误', echartOption, e)
      }
    }
    updateEchartOptions(tunningOpt, echartOption)
    return echartOption
  }
})

const renderAverageItem = function (param, api) {
  var categoryIndex = api.value(0)
  var bandWidth = api.size([0, 0])[0] * 0.85
  var point = api.coord([api.value(0), api.value(1)])

  return {
    type: 'group',
    // 如果 diffChildrenByName 设为 true，则会使用 child.name 进行 diff，
    // 从而能有更好的过度动画，但是降低性能。缺省为 false。
    // diffChildrenByName: true,
    children: [{
      type: 'rect',
      shape: {
        x: point[0] - bandWidth / 2, y: point[1],
        width: bandWidth / 2, height: -20
      },
      style: api.style()
    }, {
      type: 'line',
      shape: {
        x1: point[0] - bandWidth / 2,
        x2: point[0] + bandWidth / 2,
        y1: point[1],
        y2: point[1]
      },
      style: api.style({
        fill: null,
        stroke: api.visual('color'),
        lineWidth: 2,
        text: ''
      })
    }]
  }
}
