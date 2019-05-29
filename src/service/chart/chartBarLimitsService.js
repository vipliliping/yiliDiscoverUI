/**
 * Created by yfyuan on 2017/03/03.
 */
'use strict'
discovery.service('chartBarLimitsService', function (dataService, EventService) {
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
    var tunningOpt = chartConfig.option

    var sum_data = []
    for (var j = 0; aggregate_data[0] && j < aggregate_data[0].length; j++) {
      var sum = 0
      for (var i = 0; i < aggregate_data.length; i++) {
        sum += aggregate_data[i][j] ? Number(aggregate_data[i][j]) : 0
        // change undefined to 0
        aggregate_data[i][j] = aggregate_data[i][j] ? Number(aggregate_data[i][j]) : 0
      }
      sum_data[j] = sum
    }

    for (var i = 0; i < aggregate_data.length; i++) {
      var joined_values = casted_values[i].join('-')
      var s = angular.copy(newValuesConfig[joined_values])
      s.name = joined_values
      s.data = aggregate_data[i]
      s.barMaxWidth = 40
      s.type = 'bar'
      // s.stack = "1";
      s.stack = 'stack' + i % (aggregate_data.length / 2)
      // if (s.type == 'stackbar') {
      //     s.type = 'bar';
      //     s.stack = s.valueAxisIndex.toString();
      // } else if (s.type == 'percentbar') {
      //     s.data = _.map(aggregate_data[i], function (e, i) {
      //         return [i, (e / sum_data[i] * 100).toFixed(2), e];
      //     });
      //     s.type = 'bar';
      //     s.stack = s.valueAxisIndex.toString();
      // } else if (s.type == 'stackline') {
      //     s.type = 'line';
      //     s.stack = 'normal';
      //     // s.stack = s.valueAxisIndex.toString();
      //     s.areaStyle = {normal: {}};
      // }
      // if (chartConfig.valueAxis == 'horizontal') {
      //     s.xAxisIndex = s.valueAxisIndex;
      // } else {
      //     s.yAxisIndex = s.valueAxisIndex;
      // }
      var newData = []
      for (var j = 0; j < s.data.length; j++) {
        var eventInfo = CBoardEChartRenderEventInfo(data, i, j)
        newData.push({
          eventInfo: eventInfo,
          "value": s.data[j]
        })
      }
      s.data = newData
      if (i < aggregate_data.length / 2) {
        s.itemStyle = {
          normal: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          }
        }
      }
      series_data.push(s)
    }


    //label显示or不显示
    for (var i = 0; i < chartConfig.values.length; i++) {
      if (!_.isUndefined(chartConfig.values[i].series_label)) {
        if (chartConfig.values[i].series_label == "true") {
          series_data[i].label = {
            normal: {
              show: true
            }
          }
        } else if (chartConfig.values[i].series_label == "false") {
          series_data[i].label = {
            normal: {
              show: false
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
      axis.min = 0
      // if (axis.series_type == "percentbar") {
      //     axis.min = 0;
      //     axis.max = 100;
      // } else {
      //     axis.min = axis.min ? axis.min : null;
      //     axis.max = axis.max ? axis.max : null;
      // }
      if (index > 0) {
        axis.splitLine = false
      }
      axis.scale = true
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
                  series_data[i].data[j] = _.extend(series_data[i].data[j], {
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
                      series_data[i].data[j] = _.extend(series_data[i].data[j], {
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
      axisLabel: {
        interval: labelInterval,
        rotate: labelRotate
      }
    }

    var echartOption = {
      type: 'bar',
      grid: angular.copy(echartsBasicOption.grid),
      legend: {
        data: _.map(casted_values, function (v) {
          return v.join('-')
        })
      },
      tooltip: {
        formatter: function (params) {

          var name = params[0].name
          var s = name + "</br>"
          /*for (var i = 0; i < params.length; i++) {
              s += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + params[i].color + '"></span>';
              if (params[i].value instanceof Array) {
                  s += params[i].seriesName + " : " + params[i].value[1] + "% (" + params[i].value[2] + ")<br>";
              } else {
                  s += params[i].seriesName + " : " + params[i].value + "<br>";
              }
          }
          return s;*/
          return "最小值:" + params[0].value + "<br>" + "最大值:" + params[1].value
        }
      },
      xAxis: chartConfig.valueAxis == 'horizontal' ? valueAxis : categoryAxis,
      yAxis: chartConfig.valueAxis == 'horizontal' ? categoryAxis : valueAxis,

      series: series_data
    }

    /*echartOption.yAxis = {
        type: "log"
    }*/

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
