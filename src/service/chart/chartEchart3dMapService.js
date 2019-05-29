/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartEchart3dMapService', function (EventService) {
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
    var pointData = []
    var serie = {}
    var series = []
    var max = 0
    var multiple = 1
    if (!_.isUndefined(chartConfig.option.multiple)) {
      // debugger;
      multiple = chartConfig.option.multiple//倍数
    }
    for (var i = 0; i < casted_keys.length; i++) {
      if (parseInt(aggregate_data[0][i]) > max) {
        max = aggregate_data[0][i]
      }
    }

    if (chartConfig.values[0].series_type == "scatter3D") {
      for (var i = 0; i < casted_keys.length; i++) {
        var point = $.extend([], casted_keys[i])
        if (point.length == 2) {
          point.push(undefined, aggregate_data[0][i])
          pointData.push({
            eventInfo: CBoardEChartRenderEventInfo(data, undefined, i),
            value: point,
            symbolSize: aggregate_data[0][i] / max * (multiple * 100)
          })
        } else if (point.length == 3) {
          var name = point.pop()
          point.push(undefined, aggregate_data[0][i], name)
          pointData.push({
            eventInfo: CBoardEChartRenderEventInfo(data, undefined, i),
            value: point,
            symbolSize: aggregate_data[0][i] / max * (multiple * 100)
          })
        }
      }
    }
    else if (chartConfig.values[0].series_type == "bar3D") {
      for (var i = 0; i < casted_keys.length; i++) {
        var bar = $.extend([], casted_keys[i])
        if (bar.length == 2) {
          bar.push(aggregate_data[0][i], aggregate_data[0][i])
          pointData.push({
            eventInfo: CBoardEChartRenderEventInfo(data, undefined, i),
            value: bar,
            symbolSize: 5
          })
        } else if (bar.length == 3) {
          var name = bar.pop()
          bar.push(aggregate_data[0][i], aggregate_data[0][i], name)
          pointData.push({
            eventInfo: CBoardEChartRenderEventInfo(data, undefined, i),
            value: bar,
            symbolSize: 5
          })
        }
      }
    }
    _.each(chartConfig.values, function (values) {
      var itemStyle = {
        color: values.series_color,
        opacity: 0.5
      }
      if (values.series_type == "scatter3D") {
        serie = {
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            }
          },
          type: values.series_type,
          coordinateSystem: 'globe',
          blendMode: 'lighter',
          itemStyle: itemStyle,
          data: pointData,
          distanceToGlobe: 0,
          distanceToGeo3D: 0
          // silent: true
          //name: 'aaaaa'
        }
        series.push(serie)
      }
      else if (values.series_type == "bar3D") {
        serie = {
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            }
          },
          type: values.series_type,
          coordinateSystem: 'globe',
          blendMode: 'lighter',
          itemStyle: itemStyle,
          data: pointData
          // silent: true
        }
        series.push(serie)
      }

    })
    var echartOption = {
      // backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        // axisPointer : {
        //     type : 'shadow'
        // },
        formatter: function (params) {
          var jwd = "经度：" + params.data.value[0] + "<br>纬度：" + params.data.value[1]
          var tooltip = ""
          if (params.data.value.length == 5) {
            tooltip = params.data.value[4] + "<br>" + casted_values[0] + "：" + params.data.value[3]
          } else if (params.data.value.length == 4) {
            tooltip = casted_values[0] + "：" + params.data.value[3]
          }
          return tooltip
        }
      },
      backgroundColor: null,
      viewControl: {
        targetCoord: [116.46, 39.92]
      },
      globe: {
        // baseTexture: "../imgs/base.jpg",
        // baseTexture: "../imgs/base2.jpg",
        baseTexture: "../imgs/base2.gif",
        // heightTexture: "../imgs/height.jpg",
        displacementScale: 0.04,
        displacementQuality: 'normal',
        shading: 'realistic',
        // environment: '../imgs/en.jpg',
        environment: null,
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
            intensity: 0
          },
          main: {
            intensity: 5,
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
          autoRotate: false
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
