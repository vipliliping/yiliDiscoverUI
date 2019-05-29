'use strict'
discovery.service('chartEchartBmapService', function (BoardParamService, EventService) {
  'ngInject'
  this.instance = null

  this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList)
    this.instance.type = 'bMap'
    return this.instance.chart(null, persist, EventService)
  }

  this.parseOption = function (data) {
    let tooltip = {}
    let Levi = data.chartConfig.option.tooltip
    let keys = data.chartConfig.keys
    let drill = data.chartConfig.drillTier
    let ops = data.chartConfig.option
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


    var originalData = data.originalData.data

    var minColor = '#006edd'
    if (data.chartConfig.option.maxColor) {
      minColor = data.chartConfig.option.maxColor
    }
    var maxColor = '#e0ffff'
    if (data.chartConfig.option.minColor) {
      maxColor = data.chartConfig.option.minColor
    }
    var cityMaxRadius = 20
    if (data.chartConfig.option.cityMaxRadius) {
      cityMaxRadius = data.chartConfig.option.cityMaxRadius
    }
    var cityMinRadus = 10
    if (data.chartConfig.option.cityMinRadus) {
      cityMinRadus = data.chartConfig.option.cityMinRadus
    }
    var series_data = convertCityData(data)  // 城市坐标及数值
    var maxCity = _.max(series_data, function (sData) {
      if (typeof sData.value[2] === 'string') {
        return parseInt(sData.value[2])
      } else {
        return parseInt(sData.value[2])
      }
    })  //数值最大的城市坐标和数值
    /* 先解决，等再改 */
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
    var seriesArr = [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: series_data,
        label: {
          show: true,
          color: 'auto',
          position: 'top',
          formatter: function (params) {
            return params.name
          }
        },
        symbolSize: (value, params) => {
          let radus = 0
          if (_.isUndefined(maxCity.value) || _.isNaN(maxCity.value[2]) || _.isUndefined(maxCity.value[2]) || maxCity.value[2] === Infinity) {
          } else {
            var fenzi = parseFloat(value[2])
            var fenmu = parseFloat(maxCity.value[2])
            if (_.isNaN(fenzi)) {
              radus = cityMinRadus
            } else if (_.isNaN(fenmu)) {
              radus = cityMaxRadius
            } else {
              radus = (fenzi / fenmu) * cityMaxRadius
            }
          }
          if (radus < cityMinRadus || _.isNaN(radus)) {
            return cityMinRadus
          }
          if (radus > cityMaxRadius) {
            return cityMaxRadius
          }
          return radus
        }
      }
    ]
    if (data.chartConfig.markLineCode) {
      var markLineCode = data.chartConfig.markLineCode
      for (let i in seriesArr) {
        // var data = series[i]
        try {
          seriesArr[i] = (new Function('serie,params,seriesIndex',
            'return (' + markLineCode + ')(serie,params,seriesIndex)'))
          (seriesArr[i], params, i)
        } catch (e) {
          console.error('series自定义计算错误', markLineCode, seriesArr[i], params, i, e)
        }
      }
    }
    var echartOption = {}
    // var url = 'china.json'
    // $.ajax({
    //   type: "get",
    //   url: url,
    //   async: false,
    //   success: function (cityJson) {
    //     echarts.registerMap('china', cityJson)
    echartOption = {
      backgroundColor: "#D1D1D1",
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var finalResult = ''
          let value = ''
          let param = BoardParamService.getAll()
          for (let i in tooltip) {        //列维
            if (typeof tooltip[i] === undefined || tooltip[i].isShow !== false) {
              var index = _.findIndex(params.data.eventInfo, function (item) {
                return item.col === i
              })
              if (index > -1) {    // 单个列维
                if (params.data.eventInfo[index].value) {
                  value = params.data.eventInfo[index].value
                  let result = params.data.eventInfo[index].value
                  if (tooltip[i].formatter) {
                    result = eval(tooltip[i].formatter)
                  }
                  finalResult = finalResult + tooltip[i].col + ': ' + result + '<br/>'
                }
              } else {        // 多个列维
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
          }
          for (let i in tooltipTarget) {  //指标
            if ((typeof tooltipTarget[i]) === undefined || tooltipTarget[i].isShow !== false) {
              let targetArray = _.keys(tooltipTarget)
              if (params.data && params.data.value) {
                value = params.data.value[_.indexOf(targetArray, i) + 2]
                let result = params.data.value[_.indexOf(targetArray, i) + 2]
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
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#F4F4F4',
            borderColor: 'white',
            borderWidth: 1
            //shadowColor: 'black'
          },
          emphasis: {
            areaColor: '#F4F4F4'
            // areaColor: '#696c74'
          }
        },
        zoom: ops.isEnLarge&&drill.keyTier==1||drill.keyTier==2 ? (ops.zoom?ops.zoom:1) : 1,
        center: ops.isEnLarge&&drill.keyTier==1||drill.keyTier==2 ? [city[drill.filters.key[0]][0],city[drill.filters.key[0]][1]] : []
      },
      series: seriesArr
    }
    //   }
    // })
    // var echartOption = {
    //   isBmap:true,
    //   animation: false,
    //   tooltip: {
    //         trigger: 'item',
    //         formatter: function (params) {
    //             var finalResult = ''
    //             let value = ''
    //             let param = BoardParamService.getAll()
    //             for (let i in tooltip) {        //列维
    //                 if (typeof tooltip[i] === undefined || tooltip[i].isShow !== false) {
    //                     // let value = ''
    //                     // if (tooltip[i].formatter && tooltip[i].formatter.indexOf('{v}') != -1 ) {
    //                     //     let repResult = ''
    //                     //     if (typeof params.name === 'string') {
    //                     //         repResult = tooltip[i].formatter.replace('{v}', '\'{v}\'')
    //                     //     }
    //                     //     repResult  = repResult.replace('{v}', params.name)
    //                     //     value = eval(repResult)
    //                     // } else {
    //                     //     value = params.name
    //                     // }
    //                     value = params.name
    //                     let result = params.name
    //                     if (tooltip[i].formatter){
    //                       result = eval(tooltip[i].formatter)
    //                     }
    //                     finalResult = finalResult + tooltip[i].col + ': ' + result + '<br/>'
    //                 }
    //             }
    //             for (let i in tooltipTarget) {  //指标
    //                 if ((typeof tooltipTarget[i]) === undefined || tooltipTarget[i].isShow !== false) {
    //                     // let value = ''
    //                     // let targetArray = _.keys(tooltipTarget)
    //                     // if (tooltipTarget[i].formatter && tooltipTarget[i].formatter.indexOf('{v}') != -1 ) {
    //                     //     let repResult = ''
    //                     //     if (typeof params.data.target[_.indexOf(targetArray, i)] === 'string') {
    //                     //         repResult = tooltipTarget[i].formatter.replace('{v}', '\'{v}\'')
    //                     //     } else {
    //                     //         repResult = tooltipTarget[i].formatter
    //                     //     }
    //                     //     repResult  = repResult.replace('{v}', params.data.target[_.indexOf(targetArray, i)])
    //                     //     value = eval(repResult)
    //                     // } else {
    //                     //     value = params.data.target[_.indexOf(targetArray, i)]
    //                     // }
    //                     let targetArray = _.keys(tooltipTarget)
    //                     value = params.data.value[_.indexOf(targetArray, i)+2]
    //                     let result = params.data.value[_.indexOf(targetArray, i)+2]
    //                     if (tooltipTarget[i].formatter){
    //                       result = eval(tooltipTarget[i].formatter)
    //                     }
    //                     finalResult = finalResult + tooltipTarget[i].col + ': ' + result + '<br/>'
    //                 }
    //             }
    //             return finalResult
    //         }
    //     },
    //   visualMap: {
    //     min: 0,
    //     max: 1500,
    //     left: 'left',
    //     top: 'bottom',
    //     text: ['High', 'Low'],
    //     seriesIndex: [1],
    //     inRange: {
    //       color: [maxColor, minColor]
    //     },
    //     calculable: true
    //   },
    //   bmap: {
    //     center: [104.114129, 37.550339],
    //     zoom: 5,
    //     roam: false,
    //     mapStyle: {
    //         styleJson: [{
    //             'featureType': 'water',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'color': '#d1d1d1'
    //             }
    //         }, {
    //             'featureType': 'land',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'color': '#f3f3f3'
    //             }
    //         }, {
    //             'featureType': 'railway',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'visibility': 'off'
    //             }
    //         }, {
    //             'featureType': 'highway',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'color': '#fdfdfd'
    //             }
    //         }, {
    //             'featureType': 'highway',
    //             'elementType': 'labels',
    //             'stylers': {
    //                 'visibility': 'off'
    //             }
    //         }, {
    //             'featureType': 'arterial',
    //             'elementType': 'geometry',
    //             'stylers': {
    //                 'color': '#fefefe'
    //             }
    //         }, {
    //             'featureType': 'arterial',
    //             'elementType': 'geometry.fill',
    //             'stylers': {
    //                 'color': '#fefefe'
    //             }
    //         }, {
    //             'featureType': 'poi',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'visibility': 'off'
    //             }
    //         }, {
    //             'featureType': 'green',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'visibility': 'off'
    //             }
    //         }, {
    //             'featureType': 'subway',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'visibility': 'off'
    //             }
    //         }, {
    //             'featureType': 'manmade',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'color': '#d1d1d1'
    //             }
    //         }, {
    //             'featureType': 'local',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'color': '#d1d1d1'
    //             }
    //         }, {
    //             'featureType': 'arterial',
    //             'elementType': 'labels',
    //             'stylers': {
    //                 'visibility': 'off'
    //             }
    //         }, {
    //             'featureType': 'boundary',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'color': '#fefefe'
    //             }
    //         }, {
    //             'featureType': 'building',
    //             'elementType': 'all',
    //             'stylers': {
    //                 'color': '#d1d1d1'
    //             }
    //         }, {
    //             'featureType': 'label',
    //             'elementType': 'labels.text.fill',
    //             'stylers': {
    //                 'color': '#999999'
    //             }
    //         }]
    //     }
    //   },
    //   series: [
    //     {
    //       type: 'scatter',
    //       coordinateSystem: 'bmap',
    //       data: series_data,
    //       symbolSize: (value, params) => {
    //         let radus = parseFloat(value[2])/parseFloat(maxCity.value[2])*cityMaxRadius
    //         if (radus < cityMinRadus) {
    //           return cityMinRadus
    //         }
    //         return radus
    //       },
    //       symbolRotate: 35,
    //       // 地图label暂时注掉
    //       // label: {
    //       //   normal: {
    //       //     formatter: '{b}',
    //       //     position: 'inside',
    //       //     show: true,
    //       //     color: 'black',
    //       //     textBorderColor: 'white'
    //       //   },
    //       // },
    //       // itemStyle: {
    //       //   normal: {
    //       //     color: '#F06C00'
    //       //   }
    //       // }
    //     },
    //     {
    //       name: 'categoryA',
    //       type: 'map',
    //       geoIndex: 0,
    //       data: convertProvinceData(originalData),
    //       label: {
    //         normal: {
    //           formatter: '{b}',
    //           position: 'right',
    //           show: false
    //         },
    //         emphasis: {
    //           show: true
    //         }
    //       },
    //     }
    //   ]
    // }
    if (data.chartConfig.optionCode) {
      var optionCode = data.chartConfig.optionCode
      try {
        var param = angular.copy(window.$$dlut_param)
        echartOption = (new Function('option,param,config',
          'return (' + optionCode + ')(option,param,config)'))
        (echartOption, param, data.chartConfig)
      } catch (e) {
        console.error('option自定义计算错误', echartOption, e)
      }
    }
    return echartOption
  }
})

