/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartEchart3dMapLineService', function (EventService) {
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


    var keyNameList = ["startLongitude", "startLatitude", "startLabel", "startMeans", "startType"],
      groupNameList = ["endLongitude", "endLatitude", "endLabel", "endMeans", "endType", "lineMeans", "lineType"],
      valueNameList = ["startValue", "endValue", "lineValue"],
      keyList = chartConfig.keys,
      groupList = chartConfig.groups,
      valueList = chartConfig.values[0].cols,
      dataMatrix = data.originalData.data
    var newList = []
    for (var i = 0; i < dataMatrix.length; i++) {
      var item = {}, dataItem = dataMatrix[i], index = 0
      for (var j = 0; j < groupList.length; j++) {
        if (dataItem[index] != "-")
          item[groupNameList[j]] = dataItem[index]
        index++
      }
      for (var k = 0; k < keyList.length; k++) {
        if (dataItem[index] != "-")
          item[keyNameList[k]] = dataItem[index]
        index++
      }
      for (var l = 0; l < valueList.length; l++) {
        if (dataItem[index] != "-")
          item[valueNameList[l]] = dataItem[index]
        index++
      }
      newList.push(item)
    }


    var color = ['#ffad3d', '#00ac57', '#d3133e', '#2489b0', '#5bc0de', "#c2ced1"]
    var pointSize = []
    var startElevation = undefined
    var endElevation = undefined
    var lineStyleList = {
      default: {
        color: color[5],
        opacity: 1,
        width: 3
      },
      '试验': {
        color: color[0],
        opacity: 1,
        width: 3
      },
      '任务': {
        color: color[1],
        opacity: 1,
        width: 3
      },
      '事件': {
        color: color[2],
        opacity: 1,
        width: 3
      },
      '国际大事': {
        color: color[3],
        opacity: 1,
        width: 3
      },
      '装备调配': {
        color: color[4],
        opacity: 1,
        width: 3
      }
    }
    var pointStyleList = {
      default: {
        color: color[5]
      },
      '试验': {
        color: color[0]
      },
      '任务': {
        color: color[1]
      },
      '事件': {
        color: color[2]
      },
      '国际大事': {
        color: color[3]
      },
      '装备调配': {
        color: color[4]
      },
      'red': {
        color: "red"
      },
      'green': {
        color: "green"
      }
    }
    var lineList = _.groupBy(newList, 'lineMeans')
    var series = []

    for (var l in lineList) {
      var fromToSize = []

      for (var m = 0; m < lineList[l].length; m++) {
        var line = lineList[l][m]
        if (line.endMeans != undefined && line.endMeans != '') {
          var lineVS = lineStyleList[line.lineType != undefined ? line.lineType : 'default']
          if (line.lineType != '' && line.lineType != undefined) {
            // lineVS.width = line.lineValue != undefined ? line.lineValue / 8 : lineVS.width;
            lineVS.width = 2
          }
          fromToSize.push({
            lineStyle: lineVS,
            coords: [[line.startLongitude, line.startLatitude],
              [line.endLongitude ? line.endLongitude : undefined, line.endLatitude ? line.endLatitude : undefined]]
          })
        }
      }

      series.push(
        {
          type: 'lines3D',
          name: l,
          effect: {
            show: true,
            period: 6,
            trailWidth: 3,
            trailLength: 0.15,
            trailOpacity: 0.7,
            trailColor: '#fff'
          },
          blendMode: 'lighter',
          data: fromToSize
        }
      )
    }

    for (var i = 0; i < newList.length; i++) {
      var l = newList[i]

      pointSize.push({
        name: l.endMeans ? l.endMeans : undefined,
        value: [l.endLongitude, l.endLatitude, endElevation, parseInt(l.endValue), l.endLabel],
        itemStyle: pointStyleList[l.endType != undefined ? l.endType : 'default']
      })

      pointSize.push({
        name: l.startMeans ? l.startMeans : undefined,
        value: [l.startLongitude, l.startLatitude, startElevation, parseInt(l.startValue), l.startLabel],
        itemStyle: pointStyleList[l.startType != undefined ? l.startType : 'default']
      })
    }

    series.push({
      type: 'scatter3D',
      coordinateSystem: 'globe',
      label: {
        show: true,
        position: 'right',
        formatter: function (params) {
          var rtnStr = ''
          if (params.data.value[4] !== undefined && params.data.value[4]) {
            rtnStr = params.data.value[4]
          }
          return rtnStr
        }
      },
      emphasis: {
        label: {
          show: false
          // distance: 100,
          // formatter: function (params) {
          //     var arr = params.name.split('<br>');
          //     var str = '';
          //     for (var i = 0; i < arr.length; i++) {
          //         str += arr[i] + '\n';
          //     }
          //     return str;
          // }
        }
      },
      blendMode: 'lighter',
      symbolSize: function (val) {
        if (val[3]) {
          return val[3] / 8
        } else {
          return 20
        }
      },
      data: pointSize
    })

    var echartOption = {
      backgroundColor: null,
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: function (params) {
          return params.name
        },
        extraCssText: 'text-align: left'
      },
      globe: {
        baseTexture: "../imgs/base.jpg",
        // baseTexture: "../imgs/base2.gif",
        displacementScale: 0.04,
        displacementQuality: 'low',
        heightTexture: "../imgs/height.jpg",
        // environment: '../imgs/en.jpg',
        environment: null,

        shading: 'realistic',
        realisticMaterial: {
          roughness: 0.2,
          metalness: 0
        },

        postEffect: {
          enable: true,
          depthOfField: {
            enable: false,
            focalDistance: 150
          }
        },
        temporalSuperSampling: {
          enable: true
        },
        light: {
          ambient: {
            intensity: 0.2
          },
          main: {
            intensity: 2,
            shadow: true
          },
          ambientCubemap: {
            texture: '../imgs/echart3dMap.hdr',
            exposure: 1,
            diffuseIntensity: 0.5,
            specularIntensity: 2
          }
        },
        viewControl: {
          autoRotate: false,
          targetCoord: [116.46, 39.92]
        }
      },
      series: series
    }

    var tunningOpt = chartConfig.option
    if (tunningOpt) {
      if (tunningOpt.autoRotate == undefined) {
        tunningOpt.autoRotate = false
      }
      echartOption.globe.viewControl.autoRotate = tunningOpt.autoRotate
      if (tunningOpt.dye != undefined) {
        echartOption.globe.shading = tunningOpt.dye
      }
      if (tunningOpt.height == true) {
        echartOption.globe.heightTexture = null
      }
      if (tunningOpt.height == false) {
        echartOption.globe.heightTexture = "../imgs/height.jpg"
      }
      if (tunningOpt.legendShow == false) {
        echartOption.grid = echartsBasicOption.grid
        echartOption.grid.top = '5%'
        echartOption.legend.show = false
      }
      if (tunningOpt.bgImg != undefined) {
        echartOption.globe.baseTexture = tunningOpt.bgImg
      }
    }

    return echartOption
  }
})
