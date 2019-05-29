/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartLineMapService', function ($filter, EventService, uuid4) {
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
    var series_data = new Array()
    var string_keys = _.map(casted_keys, function (key) {
      return key.join('-')
    })
    /* 计算方法1
    var newList = [];
    //1. keyList
    var keyNameList = [];
    for (var i = 0; i < data.chartConfig.keys.length; i++) {
        keyNameList.push(data.chartConfig.keys[i].col)
    }
    //2. keys
    for (var i = 0; i < data.keys.length; i++) {
        var obj = {};
        for (var j = 0; j < keyNameList.length; j++) {
            obj[keyNameList[j]] = data.keys[i][j];
        }
        newList.push(obj)
    }
    //3. values
    for (var i = 0; i < data.series.length; i++) {
        for (var j = 0; j < data.keys.length; j++) {
            var valueName = data.series[i][0];
            var valueData = data.data[i];
            newList[j][valueName] = valueData[j];
        }
    }
    */
    /*计算方法2*/
    var keyNameList = ["startLongitude", "startLatitude", "startLabel", "startMeans", "startType", "pointId"],
      groupNameList = ["endLongitude", "endLatitude", "endLabel", "endMeans", "endType", "lineMeans", "lineType"],
      valueNameList = ["startValue", "endValue", "lineValue"],
      keyList = chartConfig.keys,
      groupList = chartConfig.groups,
      valueList = chartConfig.values,
      dataMatrix = data.originalData.data
    var newList = []
    for (var i = 0; i < dataMatrix.length; i++) {
      var item = {}, dataItem = dataMatrix[i], index = 0
      for (var j = 0; j < groupList.length; j++) {
        item[groupNameList[j]] = dataItem[index]
        index++
      }
      for (var k = 0; k < keyList.length; k++) {
        item[keyNameList[k]] = dataItem[index]
        index++
      }
      for (var l = 0; l < valueList.length; l++) {
        item[valueNameList[l]] = dataItem[index]
        index++
      }
      newList.push(item)
    }

    var color = ['#ffad3d', '#00ac57', '#d3133e', '#2489b0', '#5bc0de', "#c2ced1", 'rgba(255, 26, 0, 0.5)', 'rgba(36, 128, 0, 0.6)']
    var anmateFromToSize = []
    var fromToSize = []
    var lineStyleList = {
      default: {
        color: color[5],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '试验': {
        color: color[0],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '任务': {
        color: color[1],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '事件': {
        color: color[2],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '国际大事': {
        color: color[3],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '装备调配': {
        color: color[4],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      'red': {
        color: "red",
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      'green': {
        color: "#1ed107",
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      }
    }
    var anmateLineStyleList = {
      default: {
        color: color[5],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '试验': {
        color: color[0],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '任务': {
        color: color[1],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '事件': {
        color: color[2],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '国际大事': {
        color: color[3],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      '装备调配': {
        color: color[4],
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      }
    }

    for (var i = 0; i < newList.length; i++) {
      var l = newList[i]

      if (l.endMeans != '-' && l.endMeans != '') {
        fromToSize.push({
          lineStyle: {
            normal: lineStyleList[l.lineType != '-' ? l.lineType : 'default']
          },
          fromName: l.startMeans,
          toName: l.endMeans ? l.endMeans : '-',
          coords: [[l.startLongitude, l.startLatitude], [l.endLongitude ? l.endLongitude : '-', l.endLatitude ? l.endLatitude : '-']]
        })

        anmateFromToSize.push({
          lineStyle: {
            normal: anmateLineStyleList[l.lineType != '-' ? l.lineType : 'default']
          },
          fromName: l.startMeans,
          toName: l.endMeans ? l.endMeans : '-',
          coords: [[l.startLongitude, l.startLatitude], [l.endLongitude ? l.endLongitude : '-', l.endLatitude ? l.endLatitude : '-']]
        })
      }
      // var pointStyle = pointStyleList[l.endType != '-' ? l.endType : 'default'];
      // endPointSize.push($.extend({
      //     name: l.endMeans ? l.endMeans : '-',
      //     value: [l.endLongitude, l.endLatitude, parseInt(l.endValue), l.endLabel]
      // }, pointStyle));
      //
      // pointStyle = pointStyleList[l.startType != '-' ? l.startType : 'default'];
      // startPointSize.push($.extend({
      //     name: l.startMeans ? l.startMeans : '-',
      //     value: [l.startLongitude, l.startLatitude, parseInt(l.startValue), l.startLabel]
      // }, pointStyle));
    }

    var getPointLists = function () {
      var pointSeries = []
      var pointStyleList = {
        'default': {
          symbol: null
        },
        '试验': {
          itemStyle: {
            normal: {
              color: color[0]
            }
          }
        },
        '低完好率': {
          itemStyle: {
            normal: {
              color: color[5]
            }
          }
        },
        '高完好率': {
          itemStyle: {
            normal: {
              color: color[6]
            }
          }
        },
        '任务': {
          itemStyle: {
            normal: {
              color: color[1]
            }
          }
        },
        '事件': {
          itemStyle: {
            normal: {
              color: color[2]
            }
          }
        },
        '国际大事': {
          itemStyle: {
            normal: {
              color: color[3]
            }
          }
        },
        '装备调配': {
          itemStyle: {
            normal: {
              color: color[4]
            }
          }
        },
        'red': {
          symbol: "image://theme/theme_Beili01/images/red.png",
          symbolSize: 20,
          label: {
            normal: {
              textStyle: {
                color: 'red'
              }
            }
          }
        },
        'green': {
          symbol: "image://theme/theme_Beili01/images/green.png",
          symbolSize: 10,
          label: {
            normal: {
              textStyle: {
                color: '#1ed107'
              }
            }
          }
        },
        'yellow': {
          symbol: 'image://theme/theme_Beili01/images/yellow.png',
          symbolSize: 15,
          label: {
            normal: {
              textStyle: {
                color: 'yellow'
              }
            }
          }
        }
      }
      var pointListDataByType = _.groupBy(newList, 'startType')
      var pointTypeList = {
        red: '告警',
        green: '良好',
        yellow: '关注'
      }
      for (var p in pointListDataByType) {
        var effectScatter = {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: function (params) {
                var rtnStr = ''
                if (params.data.value[3] !== '-' && params.data.value[3]) {
                  rtnStr = params.data.value[3]
                }
                return rtnStr
              },
              textStyle: {
                fontSize: 18
              }
            }
          },
          symbolSize: 15
        }
        var data = []
        for (var v = 0; v < pointListDataByType[p].length; v++) {
          var pointItem = pointListDataByType[p][v]
          var eventInfo = []
          for (var w = 0; w < keyNameList.length; w++) {
            var keyName = keyNameList[w]
            var keyDefine = keyList[w]
            if (keyDefine) {
              eventInfo.push({
                col: keyDefine.col,
                alias: keyDefine.alias,
                value: pointItem[keyName]
              })
            }
          }
          data.push(
            $.extend(
              {
                eventInfo: eventInfo,
                name: pointItem.startMeans ? pointItem.startMeans : '-',
                value: [pointItem.startLongitude, pointItem.startLatitude,
                  parseInt(pointItem.startValue), pointItem.startLabel]
              },
              pointStyleList[p != '-' ? p : 'default']
            )
          )
        }
        effectScatter.data = data
        effectScatter.name = pointTypeList[p != '-' ? p : 'default']
        if (p != 'red') {
          effectScatter.rippleEffect = {
            scale: 0
          }
        }
        pointSeries.push(effectScatter)
      }

      return pointSeries
    }

    var getAreaLineLists = function () {
      var areaLineLists = []
      var linsCoords = []

      for (var l = 0; l < linsCoords.length; l++) {
        areaLineLists.push(
          {
            type: 'lines',
            coordinateSystem: 'geo',
            data: [{
              coords: linsCoords[l]
            }],
            polyline: true,
            lineStyle: {
              normal: {
                color: 'white',
                opacity: 1,
                width: 3
              }
            }
          }
        )
      }

      return areaLineLists
    }

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

    var series = [
      {
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 3
        },
        data: anmateFromToSize
      },
      {
        type: 'lines',
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 30
        },
        data: fromToSize
      }
    ]

    series = series.concat(series, getPointLists(), getAreaLineLists())

    var tunningOpt = chartConfig.option
    if (tunningOpt) {
      var labelInterval, labelRotate
      tunningOpt.ctgLabelInterval ? labelInterval = tunningOpt.ctgLabelInterval : 'auto'
      tunningOpt.ctgLabelRotate ? labelRotate = tunningOpt.ctgLabelRotate : 0
    }

    var imgBase64 = 'data:image/png;base64,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'
    var mapImg = new Image()
    mapImg.src = imgBase64

    var echartOption = {
      backgroundColor: 'rgba(0,0,0,0)',
      legend: {
        show: true,
        orient: 'vertical',
        top: 'top',
        left: 'left',
        data: [{
          name: '告警',
          icon: 'image://theme/theme_Beili01/images/red.png'
        }, {
          name: '关注',
          icon: 'image://theme/theme_Beili01/images/yellow.png'
        }, {
          name: '良好',
          icon: 'image://theme/theme_Beili01/images/green.png'
        }],
        itemWidth: 20,
        itemHeight: 20
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (params.seriesType == 'effectScatter') {
            var str = ''
            str += params.data.name + '<br>' +
              '经度：' + params.data.value[0] + '<br>' +
              '纬度：' + params.data.value[1]

            return str
          } else if (params.seriesType == 'lines') {
            var str = ''
            if (params.data.fromName && params.data.toName) {
              str += params.data.fromName + '->' + params.data.toName
            }

            return str
          }
        },
        extraCssText: 'text-align: left'
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            /*areaColor: {
                image: mapImg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
            },*/
            areaColor: '#06535f',
            // areaColor: 'rgba(34,136,179,0.3)',
            // areaColor:'rgba(0,0,0,0)',
            borderColor: "#e0ffff",
            borderWidth: 1
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: series
    }


    // Apply tunning options
    updateEchartOptions(tunningOpt, echartOption)

    return echartOption
  }

})

