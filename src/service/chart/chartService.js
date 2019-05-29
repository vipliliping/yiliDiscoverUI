/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartService',
  function ($q, $interpolate, EventService, dataService,
            chartPieService, chartLineService, chartLine2Service, chartLine3Service, chartFunnelService,
            chartSankeyService, chartTableService, chartKpiService,
            chartRadarService, chartMapService, chartScatterService,
            chartScatter2Service,
            chartGaugeService, chartWordCloudService,
            chartEchart3dMapLineService, chartEchartCityMapService,
            chartEchart3dBarService, chartEchart3dAreaService,
            chartTreeMapService, chartAreaMapService,
            chartHeatMapCalendarService, chartHeatMapTableService,
            chartLiquidFillService, chartMarkLineMapService,
            chartBarPolarStackService, chartPieProportionService,
            chartCircularService, chartEchart3dMapService,
            chartCodeFlowerService,
            chartD3DemoService, chartFlexService, chartFlex2Service,
            chartBarLimitsService, chartDataLineTableService, chartGanttService
    , chartLineMapService, chartPie2Service, chartFlexChartService,
            chartRoseService, chartFlexD3ChartService, chartD3ChordService,
            chartCrossTableService, chartCrossTableGreatService,
            chartSelectorService, chartEchartBmapService, chartEchartZoneMapService, chartTreeGridService) {
    'ngInject'

    this.render = function (containerDom, widget, optionFilter, scope, reload, persist, theme,
                            isPreview) {
      var deferred = $q.defer()
      var chart = getChartServices(widget.config)
      var config = getDataTableConfig(widget.config)
      dataService.getDataSeries(widget.datasource, widget,
        widget.datasetId, config, function (data) {
          widget.noData = false
          if (data.originalData.data.length === 0) {
            widget.noData = true
          }
          try {
            var option = chart.parseOption(data)
            if (optionFilter) {
              optionFilter(option)
            }
            if (data.drill) {
              data.drill.drillDown = function (id, render) {
                dataService.getDrillPath(widget.datasetId, id)
                  .then(function (path) {
                    var selectedKey = _.find(path, function (p) {
                      return p.id == id
                    })
                    EventService.trigger('$drillDown', {
                      widget: scope ? scope.widget : null,
                      param: {
                        data: {
                          eventInfo: [{
                            col: selectedKey.col ? selectedKey.col : selectedKey.column
                            // value: value
                          }]
                        }
                      },
                      type: 'table'
                    })
                    var i = 0
                    _.each(path, function (e, _i) {
                      if (e.id == id) {
                        i = _i
                      }
                    })
                    var node = path[++i]
                    _.find(widget.config.keys, function (e, _i) {
                      if (e.id == id) {
                        e.type = '='
                        e.values = []
                        if (!_.find(widget.config.keys, function (e) {
                            return e.id == node.id
                          })) {
                          widget.config.keys.splice(_i + 1, 0, node)
                        }
                        return true
                      }
                    })
                    _.find(widget.config.groups, function (e, _i) {
                      if (e.id == id) {
                        e.type = '='
                        e.values = []
                        if (!_.find(widget.config.groups, function (e) {
                            return e.id == node.id
                          })) {
                          widget.config.groups.splice(_i + 1, 0, node)
                        }
                        return true
                      }
                    })
                    dataService.getDataSeries(widget.datasource, widget,
                      widget.datasetId, widget.config, function (data) {
                        var option = chart.parseOption(data)
                        if (optionFilter) {
                          optionFilter(option)
                        }
                        render(option, data.drill.config, 'down')
                      })
                  })
              }
              data.drill.drillUp = function (id, render) {
                var column = null
                var datasetMap = dataService.getDatasetListMap()
                var dimension = datasetMap[widget.datasetId].data.schema.dimension
                var keyIndex, keySpliceLength = 0, keyOtherLength = -1
                var groupIndex, groupSpliceLength = 0, groupOtherLength = 0
                var dimensionId, dimColumns = []
                _.find(dimension, function (dim) {
                  keyOtherLength++
                  if (dim.type === 'level') {
                    var level = _.find(dim.columns, function (col, c_i) {
                      if (col.id === id) {
                        dimensionId = dim.id
                        dimColumns = dim.columns
                        return true
                      }
                    })
                    return level
                  }
                })
                if (widget.config.keys.length) {
                  _.each(widget.config.keys, function (e, _i) {
                    if (_.find(dimColumns, function (col) {
                        if (col.id === e.id) return true
                      })) {
                      keySpliceLength++
                    }
                    if (e.id == id) {
                      keyIndex = _i
                      column = widget.config.keys[_i - 1].col ? widget.config.keys[_i - 1].col : widget.config.keys[_i - 1].column
                    }
                  })
                  console.log('keyIndex', keyIndex)
                  console.log('keySpliceLength', keySpliceLength)
                  console.log('keyOtherLength', keyOtherLength)
                  if (keyIndex) {
                    widget.config.keys[keyIndex - 1].values = []
                    widget.config.keys.splice(keyIndex, keySpliceLength - keyIndex + keyOtherLength)
                  }
                }

                if (widget.config.groups.length) {
                  _.each(widget.config.groups, function (e, _i) {
                    if (_.find(dimColumns, function (col) {
                        if (col.id === e.id) return true
                      })) {
                      groupSpliceLength++
                    }
                    if (e.id == id) {
                      groupIndex = _i
                      column = widget.config.groups[_i - 1].col ? widget.config.groups[_i - 1].col : widget.config.groups[_i - 1].column
                    }
                  })
                  if (groupIndex) {
                    widget.config.groups[groupIndex - 1].values = []
                    widget.config.groups.splice(groupIndex, groupSpliceLength - groupIndex + keyOtherLength)
                  }
                }
                EventService.trigger('$drillUp', {
                  widget: scope ? scope.widget : null,
                  param: {
                    data: {
                      eventInfo: [{
                        col: column
                      }]
                    }
                  },
                  type: 'table'
                })
                dataService.getDataSeries(widget.datasource, widget,
                  widget.datasetId, widget.config, function (data) {
                    var option = chart.parseOption(data)
                    if (optionFilter) {
                      optionFilter(option)
                    }
                    render(option, data.drill.config, 'up')
                  })
              }
            }
          }
          catch (e) {
            console.log('chartService function-this.render row-27', e)
          } finally {
            deferred.resolve(
              chart.render(containerDom, option, scope, persist, data.drill,
                theme))
            //绑定事件
            if (!_.isUndefined(chart.type) && chart.type == 'table') {
              $(document).off('click', '.self-table-sort').on('click', '.self-table-sort', function (e) {
                function sortType(className) {
                  switch (className) {
                    case 'fa fa-sort':
                      return 'asc'
                      break
                    case 'fa fa-sort-asc':
                      return 'desc'
                      break
                    case 'fa fa-sort-desc':
                      return null
                      break
                  }
                }

                $.widgets.sort($(this).parents('table').attr('widget'), $.trim($(this).data('column')), sortType($(this).children().children().attr('class')))
                $.widgets.reload([$(this).parents('table').attr('widget')])
              })
              $(document).off('click', '.self-table-tbody').on('click', '.self-table-tbody', function (event) {
                var $target
                var $td
                if (event.target.tagName === 'DIV' || event.target.tagName === 'A' || event.target.tagName === 'SPAN') {
                  $target = $(event.target).parents('tr')
                  $td = $(event.target).parents('td')
                }
                else if (event.target.tagName === 'TD') {
                  $target = $(event.target).parents('tr')
                  $td = $(event.target)
                }
                var data = $(this).data('eventData')
                var i = $target.data('i')
                var j = $td.data('j')
                if (data && data[i])
                  EventService.trigger('$click', {
                    wName: $target.parents('table').attr('widget'),
                    param: {
                      this_tr: $target,
                      this_td: $td,
                      td_index: j,
                      data: {
                        eventInfo: data[i]
                      }
                    },
                    isActive: $target.hasClass('highlight_tr'),
                    type: 'table'
                  })
              })
            }
            if (chart.instance && !_.isUndefined(chart.instance) &&
              !_.isUndefined(chart.instance.render) &&
              chart.instance.render.chartType == 'crossTable') {
              document.oncontextmenu = function () {
                return false
              }
              $(document).off('click', 'table th,td').on('click', 'table th,td', function (e) {
                EventService.trigger('CE:drillDown', {
                  widget: scope ? scope.widget : null,
                  param: {
                    name: $(this).data('name'),
                    drillType: $(this).data('type') ? $(this).data('type') : ''
                  }
                })
              })
              $(document).off('mousedown', 'table th,td').on('mousedown', 'table th,td', function (e) {
                if (e.which == 3) {
                  EventService.trigger('CE:drillUp', {
                    widget: scope ? scope.widget : null,
                    param: {
                      name: $(this).data('name'),
                      drillType: $(this).data('type')
                        ? $(this).data('type')
                        : ''
                    }
                  })
                }
              })
            }
            if (chart.instance && !_.isUndefined(chart.instance) &&
              !_.isUndefined(chart.instance.render) &&
              chart.instance.render.chartType == 'crossGreatTable') {
              $(document).off('click', 'table th a').on('click', 'table th a', function (e) {
                EventService.trigger('CE:' + $(this).data('type'), {
                  widget: scope ? scope.widget : null,
                  param: {
                    index: $(this).data('index'),
                    name: $(this).data('name'),
                    drillType: 'key',
                    key: $(this).data('key') ? $(this).data('key') : '',
                    isGreat: true
                  }
                })
              })
            }
            if (chart.instance && chart.instance.render && scope) {
              chart.instance.render.setWidget(scope.widget)
            }
            if (chart.instance && chart.instance.ecc) {
              window.$$dlut_echart_timeout = false
              document.oncontextmenu = function () {
                return false
              }
              // 监听echarts-canvas全部区域
              chart.instance.ecc.getZr().on('click', function (params) {
                if (window.$$dlut_echart_timeout) {
                  window.$$dlut_echart_timeout = false
                } else {
                  params.trigger = 'blank'
                  EventService.trigger('CE:click', {
                    widget: scope.widget,
                    param: params,
                    type: 'chart'
                  })
                }
              })
              var processflag
              chart.instance.ecc.on("click", function (params) {
                processflag = true
                window.$$dlut_echart_timeout = true
                setTimeout(function () {
                  if (processflag) {
                    // CE = chart events
                    window.$$dlut_echart_timeout = true
                    // debugger
                    if (scope) {
                      EventService.trigger('CE:click', {
                        widget: scope.widget,
                        param: params,
                        type: 'chart'
                      })
                    }
                    // if (typeof params.region === 'undefined')
                    //   EventService.trigger('CE:drillDown', {
                    //     widget: scope ? scope.widget : null,
                    //     param: params,
                    //     type: 'chart'
                    //   })
                  }
                }, 250)
              })
              chart.instance.ecc.on("dblclick", function (params) {
                processflag = false
                window.$$dlut_echart_timeout = true
                // EventService.trigger('CE:dblclick', {
                //   widget: scope.widget,
                //   param: params,
                //   type: 'chart'
                // })
                if (typeof params.region === 'undefined')
                  EventService.trigger('CE:drillDown', {
                    widget: scope ? scope.widget : null,
                    param: params,
                    type: 'chart'
                  })
                setTimeout(function () {
                  processflag = true
                }, 300)
              })
              // chart.instance.ecc.on('click', function (params) {
              //
              // })
              chart.instance.ecc.on('mousedown', function (params, e) {
                if (params.event.which == 3) {
                  EventService.trigger('CE:drillUp', {
                    widget: scope ? scope.widget : null,
                    param: params,
                    type: 'chart'
                  })
                }
              })
            }
            if (chart.instance && !_.isUndefined(chart.instance) &&
              !_.isUndefined(chart.instance.render) &&
              chart.instance.render.chartType == 'treeGrid') {
              chart.instance.render.treeGrid.on('expand', function (event, params) {
                params.name = params.record[params.option.root]
                EventService.trigger('CE:drillDown', {
                  widget: scope ? scope.widget : null,
                  param: params,
                  type: 'treeGrid',
                  tier: params.tier,
                  filters: params.filters
                })
              })
            }
          }
        }, reload, isPreview)
      return deferred.promise
    }

    this.realTimeRender = function (realTimeTicket, widget, optionFilter, scope, callback) {
      if (!realTimeTicket) {
        return
      }
      var chart = getChartServices(widget.config)
      dataService.getDataSeries(widget.datasource, widget,
        widget.datasetId, widget.config, function (data) {
          widget.noData = false
          if (data.originalData.data.length === 0) {
            widget.noData = true
          }
          var option = chart.parseOption(data)
          if (optionFilter) {
            optionFilter(option)
          }
          realTimeTicket(option, data.drill ? data.drill.config : null, widget)
          if (callback) callback(option, widget, data)
        })
    }

    var getChartServices = function (chartConfig) {
      var chart
      switch (chartConfig.chart_type) {
        case 'cityMap':
          chart = chartEchartBmapService
          break
        case 'zoneMap':
          chart = chartEchartZoneMapService
          break
        case 'line':
          chart = chartLineService
          break
        case 'line2':
          chart = chartLine2Service
          break
        case 'line3':
          chart = chartLine3Service
          break
        case 'pie':
          chart = chartPieService
          break
        case 'kpi':
          chart = chartKpiService
          break
        case 'table':
          chart = chartTableService
          break
        case 'crossTable':
          chart = chartCrossTableService
          break
        case 'treeGrid':
          chart = chartTreeGridService
          break
        case 'crossGreatTable':
          chart = chartCrossTableGreatService
          break
        case 'selector':
          chart = chartSelectorService
          break
        case 'funnel':
          chart = chartFunnelService
          break
        case 'sankey':
          chart = chartSankeyService
          break
        case 'circular':
          chart = chartCircularService
          break
        case 'echart3dMap':
          chart = chartEchart3dMapService
          break
        case 'echart3dMapLine':
          chart = chartEchart3dMapLineService
          break
        case 'echart3dBar':
          chart = chartEchart3dBarService
          break
        case 'echart3dArea':
          chart = chartEchart3dAreaService
          break
        case 'barPolarStack':
          chart = chartBarPolarStackService
          break
        case 'pieProportion':
          chart = chartPieProportionService
          break
        case 'radar':
          chart = chartRadarService
          break
        case 'map':
          chart = chartMapService
          break
        case 'scatter':
          chart = chartScatterService
          break
        case 'scatter2':
          chart = chartScatter2Service
          break
        case 'gauge':
          chart = chartGaugeService
          break
        case 'wordCloud':
          chart = chartWordCloudService
          break
        case 'treeMap':
          chart = chartTreeMapService
          break
        case 'areaMap':
          chart = chartAreaMapService
          break
        case 'heatMapCalendar':
          chart = chartHeatMapCalendarService
          break
        case 'heatMapTable':
          chart = chartHeatMapTableService
          break
        case 'markLineMap':
          chart = chartMarkLineMapService
          break
        case 'liquidFill':
          chart = chartLiquidFillService
          break
        case 'd3Demo':
          chart = chartD3DemoService
          break
        case 'codeFlower':
          chart = chartCodeFlowerService
          break
        case 'flex':
          chart = chartFlexService
          break
        case 'flex2':
          chart = chartFlex2Service
          break
        case 'barLimits':
          chart = chartBarLimitsService
          break
        case 'lineMap':
          chart = chartLineMapService
          break
        case 'dataLineTable':
          chart = chartDataLineTableService
          break
        case 'gantt':
          chart = chartGanttService
          break
        case 'pie2':
          chart = chartPie2Service
          break
        case 'flexChart':
          chart = chartFlexChartService
          break
        case 'rose':
          chart = chartRoseService
          break
        case 'flexD3Chart':
          chart = chartFlexD3ChartService
          break
        case 'chord':
          chart = chartD3ChordService
          break
      }
      return chart
    }

    var getDataTableConfig = function (chartConfig) {
      chartConfig = angular.copy(chartConfig)
      var config
      switch (chartConfig.chart_type) {
        case 'xxxxxxx':
          var groups = [chartConfig.groups[0]]
          var keys = [chartConfig.keys[0]]
          chartConfig.groups = groups
          chartConfig.keys = keys
          config = chartConfig
          break
        default:
          config = chartConfig
          break
      }
      return config
    }
  }
)
