/**
 * Created by yfyuan on 2017/03/03.
 */
'use strict'
discovery.service('chartScatter2Service', function (dataService, BoardParamService, EventService) {
  "ngInject"
  this.instance = null

  this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList)
    return this.instance.chart(null, persist, EventService)
  }

  this.parseOption = function (data) {
    var scatterData = data
    var markLineCode = data.chartConfig.markLineCode
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
    var cityMaxRadius = 20
    if (data.chartConfig.option.cityMaxRadius) {
      cityMaxRadius = data.chartConfig.option.cityMaxRadius
    }
    var cityMinRadus = 10
    if (data.chartConfig.option.cityMinRadus) {
      cityMinRadus = data.chartConfig.option.cityMinRadus
    }
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
        s.xIdx = i
      }
      if (valueAxisIndex == 1) {
        s.yIdx = i
      }
      if (valueAxisIndex == 2) {
        s.sizeIdx = valueAxisIndex
      }
      if (valueAxisIndex == 3) {
        s.colorIdx = i
      }
      s.type = 'scatter'
      valueName[valueAxisIndex] = casted_values[i][casted_values[i].length - 1]
    }
    var data = _.unzip(aggregate_data)
    _.each(series, function (s, i) {
      s.data = _.map(data, function (d, j) {
        var eventInfo = CBoardEChartRenderEventInfo(data_copy, i, j)
        var reArr = []
        for (var i in d) {
          reArr.push(d[i])
        }
        reArr.push(string_keys)
        reArr.push(eventInfo)
        return {value: reArr, eventInfo: eventInfo}
      })
      if (s.data && s.data.length > 0&& s.data[0].value && !$.isNumeric(s.data[0].value[2])) {
        for (var m = 0; m < s.data.length; m++) {
          s.data[m].value.splice(2, 0, 50)
        }
        // s.sizeMax = 50
        // s.sizeMin = 50
      }
      var isSize = _.max(s.data, function (d) {
        return Number(d.value[2])
      })
      if (isSize.length < 3) {
        ModalUtils.alert('请拖入大小的指标', 'modal-warning', 'sm')
      }
      var maxCity = _.max(s.data, function (sData) {
        if (typeof sData.value[2] === 'string') {
          return parseFloat(sData.value[2])
        } else {
          return sData.value[2]
        }
      })  //数值最大的城市坐标和数值
      s.symbolSize = (value, params) => {
        let radus = 0
        if (_.isUndefined(maxCity.value) || _.isNaN(maxCity.value[2]) || _.isUndefined(maxCity.value[2]) || maxCity.value[2] === Infinity) {
        } else {
          radus = (parseFloat(value[2]) / parseFloat(maxCity.value[2])) * cityMaxRadius
        }
        if (radus < cityMinRadus || _.isNaN(radus)) {
          return cityMinRadus
        }
        return radus
      }
      // s.colorMax = _.max(s.data, function (d) {
      //   return Number(d.value[3])
      // }).value[3]
      // s.colorMin = _.min(s.data, function (d) {
      //   return Number(d.value[3])
      // }).value[3]
      // 散点的圆圈显示名称
      s.label = {
        show: false,
        color: 'black',
        formatter: function(params){
          if(params.data.eventInfo && params.data.eventInfo.length > 0){
            return params.data.eventInfo[0].value
          } else {
            return
          }
        }
      }
    })
    // var colorMax = _.max(series, function (s) {
    //   return Number(s.colorMax)
    // }).colorMax
    // var colorMin = _.max(series, function (s) {
    //   return Number(s.colorMin)
    // }).colorMin

    if (tunningOpt) {
      var labelInterval, labelRotate
      tunningOpt.ctgLabelInterval ? labelInterval = tunningOpt.ctgLabelInterval : 'auto'
      tunningOpt.ctgLabelRotate ? labelRotate = tunningOpt.ctgLabelRotate : 0
    }
    var params = angular.copy(window.$$dlut_param)
    if (markLineCode) {
      for (let i in series) {
        try {
          series[i] = (new Function('serie,params,seriesIndex',
            'return (' + markLineCode + ')(serie,params,seriesIndex)'))
          (series[i], params, i)
        } catch (e) {
          console.error('series自定义计算错误', markLineCode, series[i], params, i, e)
        }
        // var data = series[i]
        // series[i] = eval(markLineCode)
      }
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
          var finalResult = ''
          let value = ''
          let param = BoardParamService.getAll()
          for (let i in tooltip) {        //列维
            if (typeof tooltip[i] === undefined || tooltip[i].isShow !== false) {
              let index = _.findIndex(params.data.value[params.data.value.length - 1], function (item) {
                return item.col === i
              })
              if (index < 0) {
                return
              }
              // let value = ''
              // if (tooltip[i].formatter && tooltip[i].formatter.indexOf('{v}') != -1 ) {
              //     let repResult = ''
              //     if (typeof params.data[params.data.length-1][index].value === 'string') {
              //         repResult = tooltip[i].formatter.replace('{v}', '\'{v}\'')
              //     }
              //     repResult  = repResult.replace('{v}', params.data[params.data.length-1][index].value)
              //     value = eval(repResult)
              // } else {
              //     value = params.data[params.data.length-1][index].value
              // }
              value = params.data.value[params.data.value.length - 1][index].value
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
              //     let repResult = ''
              //     if (typeof params.seriesName === 'string') {
              //         repResult = tooltipGroups[i].formatter.replace('{v}', '\'{v}\'')
              //     }
              //     repResult  = repResult.replace('{v}', params.seriesName)
              //     value = eval(repResult)
              // } else {
              //     value = params.seriesName
              // }
              value = params.seriesName
              let result = value
              if (tooltipGroups[i].formatter) {
                result = eval(tooltipGroups[i].formatter)
              }
              finalResult = finalResult + tooltipGroups[i].col + ': ' + result + '<br/>'
            }
          }
          for (let i in tooltipTarget) {  //指标
            if ((typeof tooltipTarget[i]) === undefined || tooltipTarget[i].isShow !== false) {
              // var arr = []
              // for (let j = 0; j < data.length; j++) {
              //   arr.push(_.difference(data[j], [undefined, 'undefined']))
              // }
              // let value = ''
              let targetArray = _.keys(tooltipTarget)
              // if (tooltipTarget[i].formatter && tooltipTarget[i].formatter.indexOf('{v}') != -1) {
              //   let repResult = ''
              //   if (typeof params.data[_.indexOf(targetArray, i)] === 'string') {
              //     repResult = tooltipTarget[i].formatter.replace('{v}', '\'{v}\'')
              //   } else {
              //     repResult = tooltipTarget[i].formatter
              //   }
              //   repResult = repResult.replace('{v}', params.data[_.indexOf(targetArray, i)])
              //   value = eval(repResult)
              // } else {
              //   value = params.data[_.indexOf(targetArray, i)]
              // }
              value = params.data.value[_.indexOf(targetArray, i)]
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
      // visualMap: [
      //   {
      //     dimension: 2,
      //     show: false,
      //     min: sizeMin * 0.8,
      //     max: sizeMax * 1.5,
      //     calculable: true,
      //     precision: 0.1,
      //     textStyle: {
      //       color: 'white'
      //     },
      //     inRange: {
      //       symbolSize: [5, 70]
      //     }
      //   }
      // ],
      targetData: chartConfig.values,
      series: series
    }

    if (chartConfig.optionCode) {
      var optionCode = chartConfig.optionCode
      try {
        var param = angular.copy(window.$$dlut_param)
        echartOption = (new Function('option,param,config',
          'return (' + optionCode + ')(option,param,config)'))
        (echartOption, param, chartConfig)
      } catch (e) {
        console.error('option自定义计算错误', echartOption, e)
      }
    }
    updateEchartOptions(chartConfig.option, echartOption)
    echartOption.wName = scatterData.wName
    return echartOption
  }
})
