/**
 * Created by zyong on 2016/7/25.
 */

var echartsBasicOption = {
  title: {},
  grid: {
    left: '50',
    right: '20',
    bottom: '15%',
    top: '15%',
    containLabel: false
  },
  toolbox: {
    showTitle: false,
    feature: {
      myTool1: {
        show: true,
        title: '',
        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
        onclick: function (params, param) {
          if (!_.isUndefined(window.$$dlut_echart_timeout)) {
            window.$$dlut_echart_timeout = true
          }
          var option = params.getOption()
          var wName = option.wName
          if ($$dlut_renders[wName]) {
            for (var s = 0; s < option.series.length; s++) {
              if (!option.series[s].label) {
                option.series[s].label = {}
              }
              if (!option.series[s].labelLine) {
                option.series[s].labelLine = {}
              }
              if (option.series[s].label.ignore) {
              } else {
                if(_.isUndefined(option.series[s].label.position)){
                  option.series[s].label.position = 'top'
                }
                if(!option.series[s].emphasis) {
                  option.series[s].emphasis = {}
                  option.series[s].emphasis.label = {}
                  option.series[s].emphasis.labelLine = {}
                }
                if(!option.series[s].emphasis.label) {
                  option.series[s].emphasis.label = {}
                }
                if(!option.series[s].emphasis.labelLine) {
                  option.series[s].emphasis.labelLine = {}
                }
                var show = !option.series[s].label.show
                option.series[s].label.show = show
                option.series[s].labelLine.show = show
                option.series[s].emphasis.label.show = show
                option.series[s].emphasis.labelLine.show = show
              }
            }
            echarts.init(param.getDom()).setOption(option)
          }
        }
      },
      myExcelDownload: {
        show: false,
        title: '',
        icon: 'path://M102.745,48.964h-2.449V37.146c0-0.074-0.012-0.148-0.021-0.223c-0.004-0.469-0.154-0.93-0.475-1.295L80.133,13.163  c-0.006-0.006-0.012-0.008-0.016-0.014c-0.117-0.131-0.254-0.24-0.398-0.334c-0.043-0.029-0.086-0.053-0.131-0.078  c-0.125-0.068-0.258-0.125-0.395-0.166c-0.037-0.01-0.07-0.025-0.107-0.035c-0.148-0.035-0.303-0.057-0.459-0.057H30.295  c-2.207,0-4,1.795-4,4v32.484h-2.449c-3.157,0-5.717,2.559-5.717,5.717v29.73c0,3.156,2.56,5.717,5.717,5.717h2.449v20.352  c0,2.205,1.793,4,4,4h66c2.205,0,4-1.795,4-4V90.128h2.449c3.157,0,5.717-2.561,5.717-5.717v-29.73  C108.461,51.522,105.902,48.964,102.745,48.964z M30.295,16.479h46.332v20.465c0,1.105,0.896,2,2,2h17.668v10.02h-66V16.479z   M75.177,78.098v5.801H56.093V53.35h6.937v24.748H75.177z M26.045,83.898l8.839-15.455L26.362,53.35h7.932l2.674,5.574  c0.907,1.857,1.587,3.355,2.313,5.076h0.089c0.727-1.949,1.315-3.309,2.085-5.076l2.584-5.574h7.887l-8.613,14.912l9.067,15.637  h-7.978l-2.765-5.529c-1.132-2.131-1.858-3.717-2.719-5.484h-0.091c-0.635,1.768-1.404,3.354-2.356,5.484l-2.539,5.529H26.045z   M96.295,109.396h-66V90.128h66V109.396z M86.733,84.354c-3.489,0-6.935-0.908-8.656-1.859l1.404-5.711  c1.859,0.951,4.715,1.904,7.661,1.904c3.174,0,4.85-1.314,4.85-3.309c0-1.904-1.45-2.992-5.122-4.307  c-5.076-1.768-8.386-4.578-8.386-9.021c0-5.213,4.352-9.201,11.561-9.201c3.443,0,5.982,0.727,7.795,1.541l-1.541,5.576  c-1.224-0.59-3.4-1.451-6.391-1.451s-4.441,1.359-4.441,2.947c0,1.949,1.721,2.811,5.665,4.307c5.393,1.994,7.932,4.803,7.932,9.109  C99.063,80.002,95.12,84.354,86.733,84.354z',
        onclick: function (params, api) {
          if (!_.isUndefined(window.$$dlut_echart_timeout)) {
            window.$$dlut_echart_timeout = true
          }
          var widget = $(api.getDom()).attr('name')
          var data = transForEXCEL(window.$$EXCEL[widget])
          var ws = XLSX.utils.json_to_sheet(data)
          var wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, "sheet1")
          XLSX.writeFile(wb, widget + ".xlsx")
        }
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    confine: true,
    // extraCssText: 'z-index: 999999 !important;position:absolute !important;background:red;'
  },
  legend: {
    x: 'left',
    itemWidth: 15,
    itemHeight: 10
  }
}

var CBoardEChartRender = function (jqContainer, options, isDeepSpec, themeFunList) {
  this.container = jqContainer // jquery object
  var wName = this.container.attr('name')
  this.ecc = echarts.init(jqContainer.get(0), this.theme)
  if (!window.$$dlut_renders) window.$$dlut_renders = {}
  if (typeof wName === 'undefined' && options && typeof options.wName !== 'undefined')
    wName = options.wName
  window.$$dlut_renders[wName] = this
  this.isDeppSpec = isDeepSpec
  this.basicOption = echartsBasicOption
  if (options) options.wName = wName
  this.wName = wName
  this.options = options
  this.themeFunList = themeFunList
}

CBoardEChartRender.prototype.theme = "theme-fin1" // 主题
// CBoardEChartRender.prototype.theme = "walden"; // 主题
// CBoardEChartRender.prototype.theme = "macarons"; // 主题

CBoardEChartRender.prototype.chart = function (group, persist, EventService) {
  var self = this
  var options = this.isDeppSpec == true ? self.options : $.extend(true, {}, self.basicOption, self.options)
  if (options.visualMap != undefined) {
    $(this.jqContainer).css({
      height: 500 + "px",
      width: '100%'
    })
  }
  if (options.legend.data && options.legend.data.length > 35) {
    options.grid.top = '5%'
    options.legend.show = false
  }
  if (persist) {
    options.animation = false
  }
  //theme
  // options = theme(options, this.themeFunList)
  // if (self.container.parents(".panelTheme").hasClass("maximize")
  //   && _.isFunction(chartOptionList["maximize"])) {
  //   options = chartOptionList["maximize"](options)
  // }
  // 阈值
  // options = threshold(options, self.ecc._theme)
  self.ecc.setOption(options)
  options.wName = self.wName
  self.options = options
  self.changeSize(self.ecc)
  self.container.resize(function (e) {
    self.ecc.resize()
    self.changeSize(self.ecc)
  }) // 图表大小自适应

  // 获取百度地图对象,处理初始化时地图中心错位
  // if (options.isBmap)
  //   resetBmap(self)

  if (group) {
    self.ecc.group = group
    echarts.connect(group)
  }
  if (persist) {
    setTimeout(function () {
      self.container.css('background', '#fff')
      html2canvas(self.container[0], {
        onrendered: function (canvas) {
          persist.data = canvas.toDataURL("image/jpeg")
          persist.type = "jpg"
        }
      })
    }, 1000)
  }
  EventService.trigger('$ready', {wName: self.wName})
  return function (o) {
    o = $.extend(true, {}, self.basicOption, o)
    // o = theme(o, self.themeFunList)
    // o = threshold(o, self.ecc._theme)
    self.options = o
    o.wName = self.wName
    self.ecc.setOption(o, true)
    EventService.trigger('$ready', {wName: self.wName})
    // 刷新地圖
    // if (o.isBmap)
    //   resetBmap(self)
  }
}

function resetBmap(self) {
  // 获取百度地图对象,处理初始化时地图中心错位
  var ecModel = self.ecc._model
  var bmap = null
  ecModel.eachComponent('bmap', function (bmapModel) {
    if (bmap == null) {
      bmap = bmapModel.__bmap
    }
  })
  if (bmap) {
    setTimeout(function () {
      bmap.setZoom(4)   //更改地图层级
    }, 500)
  }
}

function threshold(options, theme) {
  var markLineList = []
  var visualMapList = []
  if (!_.isUndefined(options.targetData)) {
    for (let i = 0; i < options.targetData.length; i++) {
      let markLine = {
        silent: true,
        data: []
      }
      for (let j = 0; j < options.targetData[i].cols.length; j++) {
        let visualMap = {
          show: false,
          top: 10,
          right: 10,
          pieces: [],
          orient: 'horizontal',                        //图例排列方向
          padding: 35,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
          left: '15'
        }
        if (!_.isUndefined(options.targetData[i].cols[j].thresholds)) {
          for (let k in options.targetData[i].cols[j].thresholds) {
            for (let h = 0; h < options.targetData[i].cols[j].thresholds[k].length; h++) {
              let pieceObj = {
                gt: options.targetData[i].cols[j].thresholds[k][h].t_min_values,
                lte: options.targetData[i].cols[j].thresholds[k][h].t_max_values,
                color: options.targetData[i].cols[j].thresholds[k][h].t_color,
                label: options.targetData[i].cols[j].thresholds[k][h].t_key
              }
              let min_yAxis = {
                yAxis: options.targetData[i].cols[j].thresholds[k][h].t_min_values,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'start',
                      formatter: options.targetData[i].cols[j].thresholds[k][h].t_key
                    }
                  }
                }
              }
              let max_yAxis = {
                yAxis: options.targetData[i].cols[j].thresholds[k][h].t_max_values,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'start',
                      formatter: options.targetData[i].cols[j].thresholds[k][h].t_key
                    }
                  }
                }
              }
              visualMap.pieces.push(pieceObj)
              visualMap.show = true
              markLine.data.push(min_yAxis)
              markLine.data.push(max_yAxis)
            }
          }
        }
        visualMapList.push(visualMap)
      }
      markLineList.push(markLine)
      var seriesData = _.filter(options.series, function (item) {
        return item.yAxisIndex == i
      })
      for (let g = 0; g < seriesData.length; g++) {
        seriesData[g]['markLine'] = markLineList[i]
      }
    }
    if (options.series[0].type == 'scatter') {
      let sampleVisual = visualMapList[0]
      visualMapList = []
      for (let scatterNum = 0; scatterNum < options.series.length; scatterNum++) {
        for (let pieNum = 0; pieNum < sampleVisual.pieces.length; pieNum++) {
          if (sampleVisual.pieces[pieNum].gt) {
            let markLine = {
              silent: true,
              data: []
            }
            let min_yAxis = {
              yAxis: sampleVisual.pieces[pieNum].gt,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'start',
                    formatter: sampleVisual.label
                  }
                }
              }
            }
            let max_yAxis = {
              yAxis: sampleVisual.pieces[pieNum].lte,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'start',
                    formatter: sampleVisual.label
                  }
                }
              }
            }
            markLine.data.push(min_yAxis, max_yAxis)
            options.series[pieNum]['markLine'] = markLine
          }
        }
        visualMapList.push(angular.copy(sampleVisual))
      }
      for (let scatterNum = 0; scatterNum < options.series.length; scatterNum++) {
        if (!_.isUndefined(options.color) && (scatterNum < 5)) {
          visualMapList[scatterNum].outOfRange.color = options.color[scatterNum]
          visualMapList[scatterNum].color.push(options.color[scatterNum])
        } else {
          visualMapList[scatterNum].outOfRange.color = theme.color[scatterNum]
          visualMapList[scatterNum].color.push(theme.color[scatterNum])
        }
        visualMapList[scatterNum]['dimension'] = 1
        visualMapList[scatterNum]['seriesIndex'] = scatterNum
        visualMapList[scatterNum].show = false
        visualMapList[scatterNum].top = 15 * scatterNum
      }
      sampleVisual['dimension'] = 1
      visualMapList = sampleVisual
    } else if (options.series[0].type == 'pie') {
      let sampleVisual = visualMapList[0]
      visualMapList = []
      for (let pieNum = 0; pieNum < options.series.length; pieNum++) {
        sampleVisual['outOfRange'] = {
          color: []
        }
        sampleVisual.color = []
        for (let dataNum = 0; dataNum < options.series[pieNum].data.length; dataNum++) {
          if (!_.isUndefined(options.color) && (pieNum < 5)) {
            sampleVisual.outOfRange.color = options.color[pieNum]
            sampleVisual.color.push(options.color[pieNum])
          } else {
            sampleVisual['outOfRange'].color.push(theme.color[dataNum])
            sampleVisual.color.push(theme.color[dataNum])
          }
        }
        visualMapList.push(sampleVisual)
      }
    } else {
      if (visualMapList.length === options.series.length) {
        for (let o = 0; o < visualMapList.length; o++) {
          visualMapList[o]['seriesIndex'] = o
          visualMapList[o].top = 3 * o + '%'
          visualMapList[o]['outOfRange'] = {
            color: []
          }
          visualMapList[o]['color'] = []
          if (!_.isUndefined(options.color) && (o < 5)) {
            visualMapList[o].outOfRange.color = options.color[o]
            visualMapList[o].color.push(options.color[o])
          } else {
            visualMapList[o].outOfRange.color = theme.color[o]
            visualMapList[o].color.push(theme.color[o])
          }
        }
      } else {
      }
    }
    options['visualMap'] = visualMapList
  }
  return options
}

function theme(options, themeFunList) {
  return options
  var chartOptionList = window.chartOptionList
  if (!_.isUndefined(chartOptionList) && chartOptionList["default"] && _.isFunction(chartOptionList["default"])) {
    options = chartOptionList["default"](options)
  }
  if (!_.isUndefined(themeFunList) && _.isArray(themeFunList.options)) {
    var chartOptionsNameList = themeFunList.options
    for (var i = 0; i < chartOptionsNameList.length; i++) {
      var chartOptionName = chartOptionsNameList[i]
      if (chartOptionList[chartOptionName])
        options = chartOptionList[chartOptionName](options)
    }
  }
  return options
}

CBoardEChartRender.prototype.changeSize = function (instance) {
  var o = instance.getOption()
  var seriesType = o.series[0] ? o.series[0].type : null
  if (seriesType == 'pie') {
    var l = o.series.length
    // if (o.series[0].beiliHuan) {return};
    var b = instance.getWidth() / (l + 1 + l * 8)
    for (var i = 0; i < l; i++) {
      /*if ((b * 8) < (instance.getHeight() * 0.75)) {
        if (o.series[i].xRadius)
          o.series[i].radius = [o.series[i].xRadius[0] * b * 4 / 100, o.series[i].xRadius[1] * b * 4 / 100]
        else if (o.series[i].beiliHuan)
          o.series[i].radius = [b * 4 * 0.5 / 0.75, b * 4]
        else
          o.series[i].radius = [0, b * 4]
      } else {
        if (o.series[i].xRadius)
        // o.series[i].radius = [o.series[i].xRadius[0] * 0.75, o.series[i].xRadius[1] * 0.75];
          o.series[i].radius = [0, o.series[i].xRadius[1] + "%"]
        else if (o.series[i].beiliHuan)
          o.series[i].radius = ['50%', '75%']
        else
          o.series[i].radius = [0, '75%']
      }*/
      if (o.series[i].xRadius) {
        o.series[i].radius = [o.series[i].xRadius[0], o.series[i].xRadius[1]]
      } else {
        o.series[i].radius = [0, '75%']
      }
    }
    instance.setOption(o)
  }

}

var CBoardEChartRenderEventInfo = function (data, i, j) {
  if (data.length == 0) return []
  var chartConfig = data.chartConfig
  var casted_keys = data.keys
  var originalData = data.originalData.data
  var originalColumn = data.originalData.columnList
  var drillTier = data.chartConfig.drillTier
  var eventInfo = []
  if (j != undefined && chartConfig.keys != undefined)
    for (var k = 0; k < chartConfig.keys.length; k++) {
      if (chartConfig.keys[k].drillDown && casted_keys[j]) {
        eventInfo.push({
          col: chartConfig.keys[k].drillDown[drillTier.keyTier].col,
          alias: chartConfig.keys[k].drillDown[drillTier.keyTier].alias,
          value: casted_keys[j][k]
        })
      } else if (casted_keys[j]) {
        eventInfo.push({
          col: chartConfig.keys[k].col,
          alias: chartConfig.keys[k].alias,
          value: casted_keys[j][k]
        })
      }
    }
  if (i != undefined && chartConfig.groups != undefined)
    for (var k = 0; k < chartConfig.groups.length; k++) {
      if (chartConfig.groups[k].drillDown && data.series[i]) {
        eventInfo.push({
          col: chartConfig.groups[k].drillDown[drillTier.groupTier].col,
          alias: chartConfig.groups[k].drillDown[drillTier.groupTier].alias,
          value: casted_keys[j][k]
        })
      } else if (data.series[i])
        eventInfo.push({
          col: chartConfig.groups[k].col,
          alias: chartConfig.groups[k].alias,
          value: data.series[i][k]
        })
    }
  if (i != undefined && chartConfig.events != undefined && eventInfo.length > 0) {
    var firstColumn = eventInfo[0]
    for (var k = 0; k < chartConfig.events.length; k++) {
      var eventName = chartConfig.events[k].col
      // if (data.series[i]) {
      var value = undefined,
        index = 0, firstColumnIndex = 0
      for (var l = 0; l < originalColumn.length; l++) {
        if (originalColumn[l].name == eventName) {
          index = l
          break
        }
      }
      for (var l = 0; l < originalColumn.length; l++) {
        if (originalColumn[l].name == firstColumn.col) {
          firstColumnIndex = l
          break
        }
      }
      for (var l = 0; l < originalData.length; l++) {
        var item = originalData[l]
        if (item[firstColumnIndex] == firstColumn.value) {
          eventInfo.push({
            col: chartConfig.events[k].col,
            alias: chartConfig.events[k].alias,
            value: item[index]
          })
          break
        }
      }

      // }
    }
  }
  return eventInfo
}

function transForEXCEL(o) {
  var result = []
  var map = {}
  for (var i in o.columnList) {
    map[i] = o.columnList[i].name
  }
  for (var i in o.data) {
    var obj = {}
    for (var j in o.data[i]) {
      obj[map[j]] = o.data[i][j]
    }
    result.push(obj)
  }
  return result
}

//CBoardEChartRender.prototyp.
