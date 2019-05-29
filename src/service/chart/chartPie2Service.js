'use strict'
discovery.service('chartPie2Service', function (BoardParamService, EventService) {
  "ngInject"
  this.instance = null

  this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
    this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList)
    return this.instance.chart(null, persist, EventService)
  }

  this.parseOption = function (data) {
    /* starting from this data */
    // var data = [
    //   { name: "Barack Obama", pres: 44 },
    //   { name: "Donald Trump", pres: 45 }
    // ];

    /* generate a worksheet */
    // var ws = XLSX.utils.json_to_sheet(data);

    /* add to workbook */
    // var wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Presidents");

    /* write workbook and force a download */
    // XLSX.writeFile(wb, "sheetjs.xlsx");

    var chartConfig = data.chartConfig
    var casted_values = data.series
    var aggregate_data = data.data
    var legend = []
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
            formatter: Target[i]&&Target[i].formatter ? Target[i].formatter : ''
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

    var series = []
    var series_data = []

    if (_.isArray(casted_values) && casted_values.length) {
      for (var i = 0; i < casted_values.length; i++) {
        legend.push(casted_values[i][0])
        series_data.push({
          name: casted_values[i][0],
          value: aggregate_data[i][0]
        })
      }
    }
    series = [
      {
        type: 'pie',
        center: [chartConfig.centerX ? chartConfig.centerX : '50%',
          chartConfig.centerY ? chartConfig.centerY : '50%'],
        xRadius: [chartConfig.radiusX ? chartConfig.radiusX : '0',
          chartConfig.radiusY ? chartConfig.radiusY : '75%'],
        data: series_data
      }
    ]


    //label显示隐藏
    for (var i = 0; i < series.length; i++) {
      if (!_.isUndefined(chartConfig.series_label)) {
        if (chartConfig.series_label === true) {
          series[i].label = {
            normal: {
              show: true
            }
          }
        } else {
          series[i].label = {
            normal: {
              show: false
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
            for (var i = 0; i < series.length; i++) {
              for (var j = 0; j < series[i].data.length; j++) {
                if (dataNameList[e] == series[i].data[j].name) {
                  series[i].data[j] = _.extend(series[i].data[j], {
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

    var echartOption = {
      legend: {
        orient: 'vertical',
        left: 'left',
        data: legend
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var finalResult = ''
          let value = ''
          let param = BoardParamService.getAll()
          for (let i in tooltipTarget) {  //指标
            if (tooltipTarget[i].isShow !== false) {
              let index = _.findIndex(data.chartConfig.values[0].cols, function (item) {
                return item.alias === i
              })
              if (index < 0) {
                return
              }
              // let value = ''
              // if (tooltipTarget[i].formatter && tooltipTarget[i].formatter.indexOf('{v}') != -1) {
              //   let repResult = ''
              //   if (typeof params.value === 'string') {
              //     repResult = tooltipTarget[i].formatter.replace('{v}', '\'{v}\'')
              //   } else {
              //     repResult = tooltipTarget[i].formatter
              //   }
              //   repResult = repResult.replace('{v}', aggregate_data[index][0])
              //   value = eval(repResult)
              // } else {
              //   value = aggregate_data[index][0]
              // }
              value = aggregate_data[index][0]
              let result = value
              if (tooltipTarget[i].formatter){
                result = eval(tooltipTarget[i].formatter)
              }
              if (i === params.name) {
                finalResult = finalResult + tooltipTarget[i].col + ': ' + result + '<br/>'
              }
            }
          }
          finalResult += '占比：' + params.percent + '%'
          return finalResult
        }
      },
      //toolbox: false,
      targetData: chartConfig.values,
      series: series
    }

    updateEchartOptions(chartConfig.option, echartOption)

    return echartOption
  }
})
