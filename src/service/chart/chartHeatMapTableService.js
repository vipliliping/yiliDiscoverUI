/**
 * Created by Junjie.M on 2017/07/26.
 */
'use strict';
discovery.service('chartHeatMapTableService', function (EventService) {
    "ngInject";
    this.instance = null;

    this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight - 20 : null;
        this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList);
        return this.instance.chart(height, persist, EventService);
    };

    this.parseOption = function (data) {
        var chartConfig = data.chartConfig;
        var aggregate_data = data.data;
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
                        formatter: Target[i].formatter ? Target[i].formatter : ''
                    }
                }else{
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
      for (let i = 0; i < targetGroups.length; i ++) {
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
        var grid = data.chartConfig.option;
        var preferredLanguage = settings.preferredLanguage;

        var config = data.chartConfig;
        var xAxisName = "";
        for (var i in config.keys) {
            xAxisName += i == 0 ? config.keys[i].col : "-" + config.keys[i].col;
        }
        var yAxisName = "";
        for (var i in config.groups) {
            yAxisName += i == 0 ? config.groups[i].col : "-" + config.groups[i].col;
        }

        var xAxisData = data.keys.map(function (item) {
            return item.join('-');
        });
        var yAxisData = data.series.map(function (item) {
            var newItem = [];
            for (var i in item) {
                if (i != item.length - 1) {
                    newItem.push(item[i]);
                }
            }
            return newItem.join('-');
        });

        var min = 0;
        var max = 0;
        var datas = [];
        for (var i in data.data) {
            for (var j in data.data[i]) {
                var value = isNaN(data.data[i][j]) ? 0 : parseFloat(data.data[i][j]);
                min = value < min ? value : min;
                max = value > max ? value : max;
                var eventInfo = CBoardEChartRenderEventInfo(data, i, j);
                datas.push({
                    eventInfo: eventInfo,
                    value: [parseInt(j), parseInt(i), value]
                });
            }
        }
        var style = config.values[0].styles ? config.values[0].styles : ["#eee", "blue"];

        var option = {
            tooltip: {
                //position: 'top',
                /*axisPointer: { // 坐标轴指示器，坐标轴触发有效
                 type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                 },*/
                trigger: 'item',
                axisPointer: {
                    show: false,
                    type: 'shadow'
                },
                formatter: function (params) {
                    var finalResult = ''
                    for (let i in tooltip) {        //列维
                        if (tooltip[i].isShow !== false) {
                          let index = _.findIndex(data.chartConfig.keys, function (item) {
                            return item.col === i
                          })
                          if (index < 0) {
                              return
                          }
                          let value = ''
                          if (tooltip[i].formatter && tooltip[i].formatter.indexOf('{v}') != -1 ) {
                                let repResult = ''
                                if (typeof data.keys[params.value[0]][index] === 'string') {
                                    repResult = tooltip[i].formatter.replace('{v}', '\'{v}\'')
                                }
                                repResult  = repResult.replace('{v}', data.keys[params.value[0]][index])
                                value = eval(repResult)
                          } else {
                              value = data.keys[params.value[0]][index]
                          }
                          finalResult = finalResult + tooltip[i].col + ': ' + value + '<br/>'
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
                        let value = ''
                        if (tooltipGroups[i].formatter && tooltipGroups[i].formatter.indexOf('{v}') != -1 ) {
                          let repResult = ''
                          if (typeof params.data.eventInfo[index].value === 'string') {
                            repResult = tooltipGroups[i].formatter.replace('{v}', '\'{v}\'')
                          }
                          repResult  = repResult.replace('{v}', params.data.eventInfo[index].value)
                          value = eval(repResult)
                        } else {
                          value = params.data.eventInfo[index].value
                        }
                        finalResult = finalResult + tooltipGroups[i].col + ': ' + value + '<br/>'
                      }
                    }
                    for (let i in tooltipTarget) {  //指标
                      if (tooltipTarget[i].isShow !== false) {
                        let index = _.findIndex(data.chartConfig.values[0].cols, function (item) {
                          return item.alias === i
                        })
                        if (index < 0) {
                          return
                        }
                        // let dataIndex = _.findIndex(aggregate_data[params.seriesIndex],
                        //     function (item) {
                        //         return item === params.value
                        //     })
                        // if (dataIndex < 0) {
                        //     return
                        // }
                        let value = ''
                        if (tooltipTarget[i].formatter && tooltipTarget[i].formatter.indexOf('{v}') != -1 ) {
                          let repResult = ''
                          if (typeof data.keys[params.value[0]][index] === 'string') {
                            repResult = tooltipTarget[i].formatter.replace('{v}', '\'{v}\'')
                          } else {
                            repResult = tooltipTarget[i].formatter
                          }
                          repResult  = repResult.replace('{v}', params.value[params.value.length-1])
                          value = eval(repResult)
                        } else {
                          value = params.value[params.value.length-1]
                        }
                        finalResult = finalResult + tooltipTarget[i].col + ': ' + value + '<br/>'
                      }
                    }
                    return finalResult
                }
            },
            grid: angular.copy(echartsBasicOption.grid),
            animation: false,
            toolbox: {
                show: false,
                feature: {
                    mark: {show: false},
                    dataView: {show: true, readOnly: true},
                    restore: {show: false},
                    saveAsImage: {show: true}
                }
            },
            xAxis: {
                name: xAxisName,
                type: 'category',
                data: xAxisData,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                name: yAxisName,
                type: 'category',
                data: yAxisData,
                splitArea: {
                    show: true
                }
            },
            // dataZoom: [
            //     {
            //         type: 'slider',
            //         show: true,
            //         xAxisIndex: [0],
            //         start: 0,
            //         end: 100
            //     }
            // ],
            visualMap: {
                min: min,
                max: max,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '0%',
                inRange: {
                    color: style
                }
            },
            targetData: chartConfig.values,
            series: [{
                type: 'heatmap',
                data: datas
            }]
        };

        if (grid.gridCustom) {
            if (grid.gridBottom) {
                option.grid.bottom = grid.gridBottom
            }
            if (grid.gridTop) {
                option.grid.top = grid.gridTop
            }
            if (grid.gridLeft) {
                option.grid.left = grid.gridLeft
            }
            if (grid.gridRight) {
                option.grid.right = grid.gridRight
            }
        }

        return option;
    };

});
