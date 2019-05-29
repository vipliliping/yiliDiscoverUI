discovery
//图表项
  .controller('CustomWidgetCtrl', [
    '$scope',
    function ($scope, $modal, $timeout) {
      'ngInject'
      $scope.remove = function (row, $index) {
        if (row.widgets)
          row.widgets.splice($index, 1)
      }
      $scope.config = function (widget) {
        $state.go('config.widget', {id: widget.widget.id})
      }
      // 根据chart_type计算返回样式
      $scope.widgetBoxStyleByType = function (widget) {
        switch (widget.widget.data.config.chart_type) {
          case 'table':
          case 'crossTable':
          case 'crossGreatTable':
          case 'dataLineTable':
          case 'treeGrid':
            return true
            break
          default:
            return false
            break
        }
      }
      $scope.selectorState = 1
      $scope.selectParam = function (e) {
        $scope.selectorState = e
      }
      $scope.enterParam = function (e) {
        $scope.selectorState = e
      }
    }
  ])
  //面板
  .controller('NvDashboardViewCtrl',
    function ($timeout, $interpolate, $rootScope, $scope, EventService, $state,
              $stateParams, $http, ModalUtils, chartService, $interval,
              $uibModal, dataService, $filter, $q, BoardParamService, $sce) {
      'ngInject'

      /*---------------------一. 每个面板刚进来执行的一些方法和初始化变量-------------------------*/
      BoardParamService.clear()

      var drillCallbackMap = {}
      var updateUrl = 'dashboard/updateBoard.do'
      var translate = $filter('translate')
      var paramInitListener

      $scope.started = false
      $scope.isPreview = isPreview
      $scope.selectColumnHTML = ''

      // tabs
      $scope.tabs = []
      $scope.curTab = null

      if ($stateParams.history)
        $scope.history = $stateParams.history
      else
        $scope.history = []
      if ($stateParams.screenHistory)
        $scope.screenHistory = $stateParams.screenHistory
      else
        $scope.screenHistory = []
      if ($stateParams.role) $rootScope.role = $stateParams.role

      $scope.stateParams = $stateParams
      $scope.gridsterOptions = {
        margins: [5, 5],
        columns: 36,
        draggable: {
          handle: '.drag-handler'
        },
        rowHeight: 35
      }

      //如果是admin
      if (!isPreview) {
        $http.get('admin/isAdmin.do').success(function (response) {
          $scope.isAdmin = response
          //获得3屏联动
          $http.get('screens/getScreenIdTitleList.do')
            .success(function (response) {
              $scope.screenList = response
            })
        })

        $http.get('dashboard/getBoardParam.do?boardId=' + $stateParams.id)
          .success(function (response) {
            if (response) {
              $scope.boardParams = JSON.parse(response.config)
            } else {
              $scope.boardParams = []
            }
          })
      }
      else
        $scope.isAdmin = true

      var utils = {
        filter: {
          injectFilter: function (widget) {
            if (widget.widget) {
              widget = widget.widget
            }
            if (widget.data.config.boardFiltersByInit) {
              delete(widget.data.config.boardFiltersByInit)
            } else {
              widget.data.config.boardFilters = []
              if (_.isUndefined(widget.data.datasetId)) {
                widget.data.config.boardFilters = $scope.widgetFilters[widget.id]
              } else {
                widget.data.config.boardFilters = $scope.datasetFilters[widget.data.datasetId]
              }
            }
            return widget
          }
        },
        widget: {
          // 为路由跳转的情况下，相应的widget标记初始值, 调用链的开头事件名
          // ！！！后来可能没有再用，使用了原来的
          initUrlParams: function (widget) {
            // 这里处理url传参问题
            var theRequest = {}, wConfig = widget.widget.data.config
            var url = decodeURI(window.location.search)
            if (url.indexOf('?') !== -1) {
              var str = url.substring(url.indexOf('?') + 1)
              var strs = str.split('&')
              for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(
                  strs[i].split('=')[1])
              }
            }
            for (var param in theRequest) {// 重新组装params，如果是','分隔的，重新变成数组
              var p = theRequest[param], p_split
              if (p.length > 0) {// 如果有值
                p_split = p.split(',')
              }
              if (typeof p_split === 'object' &&
                !_.isUndefined(p_split.length) && p_split.length > 1) {
                theRequest[param] = p_split
              }
            }
            if (wConfig.chart_type === 'selector') {
              wConfig.initParamsValue = theRequest[wConfig.keys[0].eventName]
            }
          },
          addButton: function (treeItemData) {
            var widget = {
              name: treeItemData.name,
              widgetId: treeItemData.id,
              sizeX: 5,
              sizeY: 5,
              widget: treeItemData,
              tab: $scope.curTab
            }
            utils.widget.rendWidget(widget, false)
            $scope.board.layout.rows.push({
              type: 'widget',
              widgets: [widget]
            })
          },
          addWidget: function (treeItemData) {
            var widget = {
              name: treeItemData.name,
              widgetId: treeItemData.id,
              sizeX: 5,
              sizeY: 5,
              widget: treeItemData,
              tab: $scope.curTab
            }
            utils.widget.rendWidget(widget, false)
            $scope.board.layout.rows.push({
              type: 'widget',
              widgets: [widget]
            })
          },
          rendWidget: function (widget, reload) {
            // 这里是刚进页面会执行的方法，以后的联动reload方法不会调用这里
            // 这里处理url传参问题
            var theRequest = {}, wConfig = widget.widget.data.config
            var url = decodeURI(window.location.search)
            if (url.indexOf('?') !== -1) {
              var str = url.substring(url.indexOf('?') + 1)
              var strs = str.split('&')
              for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
              }
            }
            for (var param in theRequest) {// 重新组装params，如果是','分隔的，重新变成数组
              var p = theRequest[param], p_split
              if (p.length > 0) {// 如果有值
                p_split = p.split(',')
              }
              if (typeof p_split === 'object' && !_.isUndefined(p_split.length) && p_split.length > 1) {
                theRequest[param] = p_split
              }
            }

            if (wConfig.chart_type === 'selector') {
              wConfig.temporaryParam = theRequest[wConfig.keys[0].eventName]
            }

            utils.widget.temporaryParam = theRequest
            utils.widget.buildRender(widget, reload)
            widget.loading = true
            if ($scope.board.layout.type == 'timeline') {
              if (row.show) {
                widget.show = true
              }
            } else {
              widget.show = true
            }
            //real time load task
            var w = widget.widget.data
            var ds = _.find($scope.datasetList, function (e) {
              return e.id == w.datasetId
            })
            if (ds && ds.data.interval && ds.data.interval > 0) {
              if (!$scope.intervalGroup[w.datasetId]) {
                $scope.intervalGroup[w.datasetId] = []
                $scope.intervals.push($interval(function () {
                  _.each($scope.intervalGroup[w.datasetId], function (e) {
                    e()
                  })
                }, ds.data.interval * 1000))
              }
              $scope.intervalGroup[w.datasetId].push(function () {
                try {

                  if (widget.show) {
                    chartService.realTimeRender(widget.realTimeTicket,
                      utils.filter.injectFilter(widget.widget).data)
                    if (widget.modalRealTimeTicket) {
                      chartService.realTimeRender(widget.modalRealTimeTicket,
                        utils.filter.injectFilter(widget.widget).data,
                        widget.modalRealTimeOption.optionFilter, null)
                    }
                  }
                } catch (e) {
                  console.error(e)
                }
              })
            }
          },
          clearRotateFilter: function (widget) {
            if (widget.interval)
              $interval.cancel(widget.interval)
          },
          clearAllRouteFilter: function () {
            _.each($scope.board.layout.rows, function (row) {
              _.each(row.widgets, function (widget) {
                try {
                  utils.widget.clearRotateFilter(widget)
                } catch (e) {
                  console.error(e)
                }
              })
            })
          },
          setBoardFilter: function (widget) {
            if (widget.config) {
              var config = widget.config
              //初始化filter
              if (widget.config.filters) {
                if (_.isUndefined(widget.filters_copy))
                  widget.filters_copy = angular.copy(
                    widget.widget.data.config.filters)
                widget.widget.data.config.filters = angular.copy(
                  widget.filters_copy)
                if (widget.config.rotateFilters &&
                  widget.config.rotateFilters.enable &&
                  widget.config.rotateFilters.interval > 0) {
                  //轮换的代码
                  utils.widget.clearRotateFilter(widget)
                  widget.widget.data.config.filters = angular.copy(
                    widget.filters_copy)
                  widget.widget.data.config.filters.push(
                    widget.config.filters[0])
                  widget.filterName = widget.config.filters[0].group
                  widget.config.rotateFilters.index = 1
                  widget.interval = $interval(function () {
                    if (widget.realTimeTicket) {
                      if (widget.config.rotateFilters.index ==
                        widget.config.filters.length)
                        widget.config.rotateFilters.index = 0
                      // return;
                      widget.widget.data.config.filters = angular.copy(
                        widget.filters_copy)
                      widget.widget.data.config.filters.push(
                        widget.config.filters[widget.config.rotateFilters.index])
                      widget.filterName = widget.config.filters[widget.config.rotateFilters.index].group
                      chartService.realTimeRender(widget.realTimeTicket,
                        utils.filter.injectFilter(widget.widget).data)
                      widget.config.rotateFilters.index++
                    }
                  }, widget.config.rotateFilters.interval)

                } else {
                  widget.widget.data.config.filters = widget.widget.data.config.filters.concat(
                    widget.config.filters)
                }
              }
            }
          },
          // 让没有初始化的widget初始化
          loadDelayWidget: function (reload) {
            if (_.isUndefined(reload)) reload = false
            _.each($scope.board.layout.rows, function (row) {
              _.each(row.widgets, function (widget) {
                var $dom = $('div[widget="' + widget.name + '_' +
                  widget.widget.data.config.chart_type + '"]')
                // 如果是页面初始化就加载完毕的widget，则不再加载
                // if($dom.hasClass('rendered')) return
                if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                  return
                }
                if (row.type === 'widget' && widget.config &&
                  !widget.realTimeTicket) {
                  $scope.reloadWidget(widget, false, true)
                }
              })
            })
          },
          loadWidgetNum: 0,       // 已加载
          widgetNum: 0,            // 总数
          widgetInitNum: 0,       // 需要初始化
          boardParamKeyArr: [],   // 时间选择器和字段的事件名
          temporaryParam: null,   // 带参数跳转页面解析
          loadWidget: function (reload) {
            // 自定义的代码;
            if ($scope.board.config && $scope.board.config.customStartCode) {
              try {
                eval($scope.board.config.customStartCode)
              } catch (e) {
                console.error('board eval页面最初始调用的代码出错',
                  $scope.board.config.customStartCode, e)
              }
            }
            if (_.isUndefined(reload)) reload = false
            _.each($scope.board.layout.rows, function (row) {
              if (row.type === 'widget') {
                _.each(row.widgets, function (widget) {
                  widget.widget.data.wName = widget.name
                  // 通过url有初值的widget标记值到config.initParamsValue
                  // utils.widget.initUrlParams(widget)
                  if (!widget.config) {
                    widget.config = {}
                  }
                  if (widget.config.isInit === true) {
                    utils.widget.widgetInitNum++
                  }
                  utils.widget.widgetNum++
                })
              } else {   // 初始化时，添加key,value到service
                if (row.sign === 'timePicker') {
                  //时间选择器
                  utils.widget.boardParamKeyArr.push(row.config.eventName)
                } else if (row.sign === 'columns' && row.config.columns &&
                  row.config.columns.length > 0) {
                  //下拉
                  if (parseInt(row.config.chooseType) ==
                    1) BoardParamService.set(row.config.eventName,
                    row.config.columns[0])
                  else BoardParamService.set(row.config.eventName, [])
                  utils.widget.boardParamKeyArr.push(row.config.eventName)
                } else if (row.sign === 'condition') {
                  //条件
                  row.params.forEach(function (item) {
                    utils.widget.boardParamKeyArr.push(item.name)
                  })
                } else if (row.sign === 'customTrigger') {
                } else if (row.sign === 'input') {
                  //输入框
                  BoardParamService.set(row.config.eventName,
                    row.config.showValue)
                  utils.widget.boardParamKeyArr.push(row.config.eventName)
                }
              }
            })
            utils.widget.boardParamKeyArr = _.uniq(
              utils.widget.boardParamKeyArr)
            _.each($scope.board.layout.rows, function (row) {
              _.each(row.widgets, function (widget) {
                if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                  return
                }
                if (row.type === 'widget' && widget.config) {
                  //config   初始化widget
                  if (widget.config.isInit === undefined) {
                    widget.config.isInit = true
                  }
                  var isInArr = true
                  if(utils.chainHeadParamsArr) {
                    isInArr = utils.chainHeadParamsArr.indexOf(
                      widget.widget.data.config.keys[0].eventName) > -1
                      ? true
                      : false
                  }
                  if (widget.config.isInit && !widget.hide) {
                    if (isInArr) {
                      utils.widget.setBoardFilter(widget)
                      utils.widget.rendWidget(widget, reload)
                    }
                  }
                } else {
                  utils.widget.setBoardFilter(widget)
                  utils.widget.rendWidget(widget, reload)
                }
              })
            })
            if (utils.widget.widgetInitNum === 0) {
              if ($scope.board && $scope.board.config &&
                $scope.board.config.customCode)
                try {
                  eval($scope.board.config.customCode)
                } catch (e) {
                  console.error('board eval初始化出错',
                    $scope.board.config.customCode, e)
                }
            }

          },
          buildRender: function (w, reload) {
            w.render = function (content, optionFilter, scope) {
              chartService.render(content, utils.filter.injectFilter(w).data,
                optionFilter, scope, reload, undefined, w.theme)
                .then(function (d) {
                  var $dom = $('div[widget="' + w.name + '_' +
                    w.widget.data.config.chart_type + '"]')
                  w.realTimeTicket = d
                  w.loading = false
                  utils.widget.loadWidgetNum++
                  if (!$dom.hasClass('rendered')) $dom.addClass('rendered')//加载完毕给加标记
                  _.each(w.widget.data.config.keys, function (key) {
                    var isInArr = true
                    if(utils.chainHeadParamsArr) {
                      isInArr = utils.chainHeadParamsArr.indexOf(
                        key.eventName) > -1 ? true : false
                    }
                    if (isInArr && key.change) {
                      try {
                        // $.params.setSelect(key.eventName, w.widget.data.config.initParamsValue)
                        eval(key.change)
                        // w.widget.data.config.initParamsValue = null
                      } catch {
                      }
                    }
                    // debugger
                    // if(w.widget.data.config.initParamsValue) {
                    //   try {
                    //     // $.params.setSelect(key.eventName, w.widget.data.config.initParamsValue)
                    //     eval(key.change)
                    //     // w.widget.data.config.initParamsValue = null
                    //   } catch {
                    //   }
                    // }
                  })
                  // if(w.name === '雷达图-下拉选择') $.params.setSelect('pg_城市', ['大连'])
                  if (utils.widget.loadWidgetNum ===
                    utils.widget.widgetInitNum) {  // 初始化的widget加载完，并且勾选了设置的初始化后搜索
                    if ($scope.board && $scope.board.config &&
                      $scope.board.config.customCode) {
                      try {
                        eval($scope.board.config.customCode)
                        var temporaryParam = utils.widget.temporaryParam
                        for (var tr in temporaryParam) {
                          var value = temporaryParam[tr]
                          var $target = $('[data-eventName="' + tr + '"]')

                          // 如果不是下拉筛选器，下拉筛选器不在这里处理，通过设置变量，在selectorRender.js中处理
                          if (!$target.hasClass('selector_multiple_simple')) {
                            // 如果是日期，进行一次判断
                            if (!isNaN(value) && !isNaN(Date.parse(value))) {
                            } else {
                              $.params.set(tr, value)
                            }
                          }
                        }
                      } catch (e) {
                        console.error('board eval初始化出错',
                          $scope.board.config.customCode, e)
                      }
                    }
                    $('body').removeClass()
                    $('#globalLoading').hide()
                  }
                  //等待修改；暂时注释掉，等有问题在来查找
                  // chartService.realTimeRender(w.realTimeTicket, w.widget.data);
                })
              w.realTimeOption = {optionFilter: optionFilter, scope: scope}
            }
            w.modalRender = function (content, optionFilter, scope) {
              w.modalRealTimeTicket = chartService.render(content,
                utils.filter.injectFilter(w.widget).data,
                optionFilter, scope, reload, undefined, w.theme)
              w.modalRealTimeOption = {
                optionFilter: optionFilter,
                scope: scope
              }
            }
          }
        },
        params: {
          addFlex: function () {
            $scope.board.layout.rows.push({
              name: 'FLEX',
              type: 'board',
              sizeX: 5,
              sizeY: 5,
              params: [],
              tab: $scope.curTab,
              sign: 'flex'
            })
          },
          addCustomButton: function () {
            $scope.board.layout.rows.push({
              name: '自定义按钮',
              type: 'board',
              sizeX: 5,
              sizeY: 5,
              params: [],
              tab: $scope.curTab,
              sign: 'customTrigger',
              customName: '自定义',
              customIcon: 'fa fa-search'
            })
          },
          addButton: function () {
            $scope.board.layout.rows.push({
              name: '搜索',
              type: 'board',
              sizeX: 5,
              sizeY: 5,
              params: [],
              tab: $scope.curTab,
              sign: 'trigger'
            })
          },
          addWidget: function () {
            $scope.board.layout.rows.push({
              name: '条件组',
              type: 'param',
              sizeX: 5,
              sizeY: 5,
              params: [],
              sign: 'condition',
              tab: $scope.curTab
            })
          },
          clearAllSelectParams: function () {
            _.each($scope.board.layout.rows, function (row) {
              _.each(row.params, function (param) {
                param.title = ''
                param.values = []
              })
            })
            $scope.applyParamFilter()
          },
          paramToFilter: function () {
            $scope.widgetFilters = []
            $scope.datasetFilters = []
            _.each($scope.board.layout.rows, function (row) {
              _.each(row.params, function (param) {
                if (param.values.length <= 0) {
                  _.each(param.col, function (col) {
                    if ($scope.globalParamTitleMap[col.column])
                      delete($scope.globalParamTitleMap[col.column])
                  })
                } else {
                  _.each(param.col, function (col) {
                    var p = {
                      col: col.column,
                      type: param.type,
                      values: param.values
                    }
                    if (_.isUndefined(col.datasetId)) {
                      if (!$scope.widgetFilters[col.widgetId]) {
                        $scope.widgetFilters[col.widgetId] = []
                      }
                      $scope.widgetFilters[col.widgetId].push(p)
                    } else {
                      if (!$scope.datasetFilters[col.datasetId]) {
                        $scope.datasetFilters[col.datasetId] = []
                      }
                      $scope.datasetFilters[col.datasetId].push(p)
                    }
                    $scope.globalParamTitleMap[col.column] = {
                      col: col.column,
                      type: param.type,
                      values: param.values
                    }
                  })
                }
              })
            })
            utils.params.updateGlobalParamTitle()
          },
          updateGlobalParamTitle: function () {
            var paramList = []
            for (var key in $scope.globalParamTitleMap) {
              var param = $scope.globalParamTitleMap[key],
                type = param.type,
                values = param.values
              if (type == 'like') {
                type = ''
                values = param.values[0].slice(1, param.values[0].length - 1)
              } else {
                values = param.values.join(',')
              }
              var title = param.col + type + '(' + values + ')'
              paramList.push(title)
            }
            $scope.globalParamTitle = paramList.join(',')
            return
            if ($scope.datasetFilters) {
              var paramList = []
              for (var key in $scope.datasetFilters) {
                var filterList = $scope.datasetFilters[key]
                for (var i = 0; i < filterList.length; i++) {
                  var param = filterList[i]
                  var paramObj
                  switch (param.type) {
                    case '=':
                    case '≠':
                      paramObj = param.col + ' ' + param.type + ' (' +
                        param.values + ')'
                      break
                    case '>':
                    case '<':
                    case '≥':
                    case '≤':
                      paramObj = param.col + ' ' + param.type + ' ' +
                        param.values
                      break
                    case '(a,b]':
                    case '[a,b)':
                    case '(a,b)':
                    case '[a,b]':
                      var leftBrackets = param.type.split('a')[0]
                      var rightBrackets = param.type.split('b')[1]
                      paramObj = param.col + ' between ' + leftBrackets +
                        param.values[0] + ',' + param.values[1] + rightBrackets
                      break
                    case 'like':
                      var str = param.values.slice(1, param.values.length - 2)
                      paramObj = param.col + ' search (' + str + ')'
                  }
                  paramList.push(
                    param.values.length > 0 ? paramObj : undefined)
                }
              }
              $scope.globalParamTitle = paramList.join(',')
            }
          },
          updateParamTitle: function () {
            _.each($scope.board.layout.rows, function (row) {
              _.each(row.params, function (param) {
                if ('slider' == param.paramType) {
                  return
                }
                var paramObj
                switch (param.type) {
                  case '=':
                  case '≠':
                    paramObj = param.name + ' ' + param.type + ' (' +
                      param.values + ')'
                    break
                  case '>':
                  case '<':
                  case '≥':
                  case '≤':
                    paramObj = param.name + ' ' + param.type + ' ' +
                      param.values
                    break
                  case '(a,b]':
                  case '[a,b)':
                  case '(a,b)':
                  case '[a,b]':
                    var leftBrackets = param.type.split('a')[0]
                    var rightBrackets = param.type.split('b')[1]
                    paramObj = param.name + ' between ' + leftBrackets +
                      param.values[0] + ',' + param.values[1] + rightBrackets
                    break
                }
                param.title = param.values.length > 0 ? paramObj : undefined
              })
            })
            utils.params.updateGlobalParamTitle()
          },
          loadBoardDataset: function (status) {
            var datasetIdArr = []
            var widgetArr = []
            _.each($scope.board.layout.rows, function (row) {
              _.each(row.widgets, function (widget) {
                var datasetId = null
                if (widget.widget && widget.widget.data)
                  datasetId = widget.widget.data.datasetId
                var w = _.find($scope.widgetList, function (w) {
                  return w.id == datasetId
                })
                if (w) {
                  if (w.data.datasetId) {
                    datasetIdArr.push(w.data.datasetId)
                  } else if (w.id) {
                    datasetIdArr.push(w.id)
                  }
                } else {
                  datasetIdArr.push(datasetId)
                }
              })
            })
            datasetIdArr = _.union(datasetIdArr)
            $scope.boardDataset = []
            _.each(datasetIdArr, function (d) {
              status.i++
              dataService.getColumnsByDatasetConfig({
                datasource: null,
                query: null,
                datasetId: d,
                callback: function (dps) {
                  $scope.alerts = []
                  $scope.boardDataset.push({
                    name: dps.name,
                    columns: dps.data.schema.dimension,
                    datasetId: dps.id
                  })
                  status.i--
                }
              })
            })
            _.each(widgetArr, function (w) {
              status.i++
              dataService.getColumnsByDatasetConfig({
                // dataService.getColumns({
                datasource: w.data.datasource,
                query: w.data.query,
                datasetId: null,
                callback: function (dps) {
                  if (dps.msg == '1') {
                    $scope.boardDataset.push(
                      {name: w.name, columns: dps.columns, widgetId: w.id})
                    status.i--
                  } else {
                    $scope.alerts = [{msg: dps.msg, type: 'danger'}]
                  }

                }
              })
            })
          },
          editParamRow: function (row, index) {
            var status = {i: 0}
            utils.params.loadBoardDataset(status)
            var parent = $scope
            var ok
            var param
            if (_.isUndefined(row)) {
              row = {
                type: 'param',
                params: []
              }
            }
            if (_.isUndefined(index)) {
              param = {col: []}
              ok = function (p) {
                if (!row.params) {
                  row.params = []
                }
                row.params.push(p)
              }
            } else {
              param = angular.copy(row.params[index])
              ok = function (p) {
                row.params[index] = p
              }
            }
            $uibModal.open({
              templateUrl: 'src/view/nv/dashboard/modal/cubeParam.html',
              windowTemplateUrl: 'src/view/util/modal/window.html',
              backdrop: false,
              size: 'lg',
              controller: function ($scope, $uibModalInstance) {
                'ngInject'
                $scope.param_types = [
                  {
                    name: translate('CONFIG.DASHBOARD.PARAM_TYPE_SELECTOR'),
                    value: 'selector'
                  },
                  {
                    name: translate('CONFIG.DASHBOARD.PARAM_TYPE_SLIDER'),
                    value: 'slider'
                  }
                ]
                $scope.status = status
                $scope.param = param
                if (!$scope.param.paramType) {
                  $scope.param.paramType = 'default'
                }
                $scope.boardDataset = parent.boardDataset
                $scope.add = function (selectedDataset, column, alias, type) {//alias 为维度层级判断用
                  if (column.type === 'level') return false
                  var v = angular.copy(selectedDataset)
                  if (_.isUndefined(v.datasetId) &&
                    !_.isUndefined(v.widgetId)) {
                    v.datasetId = v.widgetId
                    delete v.widgetId
                  }
                  delete v.columns
                  if (type === 'level') {
                    v.alias = alias + '-'
                    v.type = 'level'
                  }
                  v.column = column.column
                  var paramCol = $scope.param.col
                  var haveCol = null
                  for (var i = 0; i < paramCol.length; i++) {
                    (paramCol[i].column === v.column && paramCol[i].name ===
                      v.name)
                      ? haveCol = true
                      : null
                  }
                  (!haveCol || $scope.param.col == [])
                    ? $scope.param.col.push(v)
                    : null
                }
                $scope.close = function () {
                  $uibModalInstance.close()
                }
                $scope.deleteSelected = function (index, type) {
                  var select = $scope.param.col[index].column
                  var nodes = $('.cube>span')
                  for (var i = 0; i < nodes.length; i++) {
                    if (($(nodes[i]))[0].innerText == select ||
                      $(nodes[i]).data('column') == select) {
                      $(nodes[i]).removeClass('itemSelected')
                    }
                  }
                  if (type === 'level') {
                    var aNodes = $('.cube span.alias')
                    for (var i = 0; i < aNodes.length; i++) {
                      if ($(aNodes[i]).data('dh') == select) {
                        $(aNodes[i]).removeClass('itemSelected')
                      }
                    }
                  }
                  $scope.param.col.splice(index, 1)
                }
                $scope.ok = function () {
                  if ($scope.param.name) {
                    ok($scope.param)
                    $uibModalInstance.close()
                  } else {
                    ModalUtils.alert(
                      translate('CONFIG.DASHBOARD.ENTER_PARAMETER_NAME'),
                      'modal-warning', 'lg')
                  }
                }
                $scope.foldCube = function (cube, e) {
                  var node = (e.target.localName == 'img')
                    ? e.target.parentNode.parentNode
                    : e.target.parentNode
                  var imgNode = node.getElementsByTagName('img')
                  if (e.target.className == 'cubeName ng-binding' ||
                    e.target.localName == 'img') {
                    if (node.style.height == '25px' ||
                      node.style.height == '') {
                      // node.style.height = 25 * (cube.columns.length + 1) + "px";
                      node.style.height = 'unset'
                      imgNode[0].style.webkitTransform = 'rotate(90deg)'
                    } else {
                      node.style.height = '25px'
                      imgNode[0].style.webkitTransform = 'rotate(0deg)'
                    }
                  } else if ($(e.target)[0].localName == 'span') {
                    if ($($(e.target)[0]).data('column') === '') return false
                    $(e.target).addClass('itemSelected')
                  }
                  $scope.param.col.map(function (d) {
                    var columnSelect = d.column
                    var cubeName = d.name
                    var nodeList = $('.cube>span')
                    for (var i = 0; i < nodeList.length; i++) {
                      var name = nodeList[i].parentNode.firstElementChild.innerText
                      if (($(nodeList[i]))[0].innerText == columnSelect &&
                        cubeName == name ||
                        $(nodeList[i]).data('column') == columnSelect) {
                        $(nodeList[i]).addClass('itemSelected')
                      }
                    }
                  })
                }
              }
            })
          }
        },
        getBoardRows: function ($scope) {
          var rows = $scope.board.layout.rows,
            keys = [
              'widgetId',
              'name',
              'col',
              'row',
              'sizeX',
              'sizeY',
              'action',
              'screenAction',
              'tab',
              'theme',
              'config',
              'maximizeOption'],
            returnRows = []
          _.each($scope.board.layout.rows, function (row) {
            if (row.type == 'widget') {
              var alive = false
              var widgets = []
              _.each(row.widgets, function (widget) {
                if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                  return
                }
                for (var i = 0; i < row.widgets.length; i++) {
                  var widget = row.widgets[i],
                    clearWidget = {}
                  for (var j = 0; j < keys.length; j++) {
                    if (widget[keys[j]] != undefined)
                      clearWidget[keys[j]] = widget[keys[j]]
                  }
                  widgets.push(clearWidget)
                }
                if (tabAlive(widget.tab.id)) {
                  alive = true
                }
              })
              if (widgets.length > 0 && alive)
                returnRows.push({
                  type: 'widget',
                  widgets: widgets
                })
            } else if (row.type == 'param') {
              if (tabAlive(row.tab.id))
                returnRows.push(row)
            } else if (row.type == 'board') {
              if (tabAlive(row.tab.id))
                if (row.timePicker) {
                  row.timePicker = ''
                }
              if (row.config && row.config.selectColumn) {
                row.config.selectColumn = ''
              }
              returnRows.push(row)
            } else if (row.type == 'tabs') {
              if (tabAlive(row.tab.id))
                returnRows.push(row)
            }
          })
          return returnRows
        }
      }

      $scope.clearAllSelectParams = utils.params.clearAllSelectParams
      $scope.openConfigModel = utils.params.openConfigModel
      $scope.editParamRow = utils.params.editParamRow
      $scope.addParamWidget = utils.params.addWidget

      // Flex
      $scope.addFlex = utils.params.addFlex
      // 触发
      $scope.addButton = utils.params.addButton
      // 自定义触发
      $scope.addCustomButton = utils.params.addCustomButton
      // 面板初始化执行的方法
      $scope.addSignLine = function () {
        $('.addSignLine').prepend('<div class=\'signLine\'></div>')
        var height = $('.addSignLine').width() / 2
        $('.signLine').attr('style', 'top:' + height + 'px')
      }
      //
      $scope.loading = true
      $http.get('dashboard/getBoardData.do?id=' + $stateParams.id + '&token=' +
        getQueryString('yili-token'))
        .success(function (response) {
          var datasetList = []
          _.each(response.layout.rows, function (row) {
            if (row.type == 'widget') {
              datasetList.push(row.widgets[0].widget.data.datasetId)
            }
          })
          var readyCallback = function () {
            $scope.loading = false
            $scope.board = response
            $scope.deadline = null
            if ($scope.board.config && $scope.board.config.type) {
              if ($scope.board.config.type === 'day') {
                $scope.deadline = moment()
                  .subtract(1, 'days')
                  .format('YYYY年MM月DD日')
              } else if ($scope.board.config.type === 'month') {
                $scope.deadline = moment()
                  .subtract(1, 'month')
                  .format('YYYY年MM月')
              }
            }
            _.each($scope.board.layout.rows, function (row) {
              //初始化补充tab
              if (row.type == 'param' || row.type != 'widget') {
                initTabList(row)
              } else if (row.type === 'widget') {
                if (utils.widget.loadWidgetNum === utils.widget.widgetInitNum &&
                  utils.widget.widgetInitNum !== 0) {  // 初始化的widget加载完，并且勾选了设置的初始化后搜索
                  if ($scope.board && $scope.board.config &&
                    $scope.board.config.customCode) {
                    try {
                      eval($scope.board.config.customCode)
                    } catch (e) {
                      console.error('board eval初始化出错', config.customCode, e)
                    }
                  }
                  $('body').removeClass()
                  $('#globalLoading').hide()
                }
              }
              if (row.sign === 'flex' && row.config) {
                row.config.showHTML = ''
              }
              _.each(row.widgets, function (widget) {
                if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                  return
                }
                widget.loading = true
                if (widget.widget &&
                  widget.widget.data) widget.widget.data.loadingCircle = true
                // widget.loadingCircle = true
                widget.show = true
                //初始化补充tab
                initTabList(widget)
                //初始化filter
              })
              if (row.sign === 'columns') {
                if (row.config.chooseType === 1)
                  BoardParamService.set(row.config.eventName,
                    row.config.columns[0])
                else
                  BoardParamService.set(row.config.eventName, [])
              }
            })

            _.each($scope.board.layout.rows, function (row) {
              //初始化补充tab
              if (row.type == 'param')
                initTabList(row)
              _.each(row.widgets, function (widget) {
                if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                  return
                }
                widget.loading = true
                // widget.loadingCircle = true
                widget.show = true
                //初始化补充tab
                initTabList(widget)
                //初始化filter
              })
            })
            if ($scope.tabs.length == 0) {
              $scope.tabs[0] = {
                id: 0,
                name: '默认'
              }
            }
            $scope.tabs = _.sortBy($scope.tabs, 'id')
            //选取第一个tab
            if ($stateParams.tab == null)
              $scope.curTab = $scope.tabs[0]
            else if ($scope.tabs[$stateParams.tab] != undefined)
              $scope.curTab = $scope.tabs[$stateParams.tab]
            else
              $scope.curTab = {
                id: null,
                name: null
              }
            //param filter init
            var hasInitParam = false
            utils.params.clearAllSelectParams()
            utils.widget.loadWidget(false)
            if ($stateParams.param.length > 0) {
              directApplyParamFilter2($stateParams.param, true)
              hasInitParam = true
            }
            if (hasInitParam) {
              $scope.applyParamFilter()
              $stateParams.param = []
            }
          }
          if (datasetList.length)
            dataService.getDatasetList(datasetList).then(readyCallback)
          else
            readyCallback()
        })
      /*---------------------一. 结束--------------------------------------------------------*/

      /*---------------------二. 面板上添加高级功能和高级功能需要的辅助方法-----------------------*/
      /* 1.时间选择器 */
      // (1) 添加控件
      $scope.addTimePicker = function () {
        var addTimeModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addTimePickerWidget.html',
          size: 'sm',
          controller: 'AddTimePickerWidgetCtrl',
          resolve: {
            tab: function () {
              return angular.copy($scope.curTab)
            }
          }
        })
        addTimeModel.result.then(function (boardConfig) {
          $scope.board.layout.rows.push(boardConfig)
        })
      }
      // (2) 初始化控件
      $scope.initTime = function (row) {
        if (!BoardParamService.get(row.config.eventName)) {
          row.config.showValue = ''
        }
        let configArr = []
        if (row.config.initConfig) {
          configArr = row.config.initConfig.split(';')
        }
        // row.config.showValue = moment().format("YYYY-MM-DD") // 初始化为当前时间
        configArr.forEach(function (item) {
          const itemConfig = item.split(',')
          if (itemConfig.length === 3 && itemConfig[0] === 'now') {
            itemConfig[2] = parseInt(itemConfig[2])
            if (itemConfig[1] === 'DD') {
              row.showValue = moment()
                .add(itemConfig[2], 'days')
                .format('YYYY年MM月DD日')
            } else if (itemConfig[1] === 'YYYY') {
              row.showValue = moment()
                .add(itemConfig[2], 'years')
                .format('YYYY年')
            } else if (itemConfig[1] === 'MM') {
              row.showValue = moment()
                .add(itemConfig[2], 'months')
                .format('YYYY年MM月')
            } else {
              alert('初始化公式拼写错误！')
            }
          } else {
            alert('初始化公式拼写错误！')
          }
          row['defaultValue'] = row.showValue
          row['defaultValue'] = findNum(row.config.defaultValue).join('')
          BoardParamService.set(row.config.eventName, [row['defaultValue']])
        })

        if (row.config.initTime) {
          var initValue,
            temporaryParam = utils.widget.temporaryParam// 页面跳转传参的存储对象
          try {
            initValue = eval(row.config.initTime)// 先得到页面设置的初始值
          } catch (e) {
            console.log('初始化日期赋值出错！')
          }
          // 如果当前面板地址中有参数，并且和当前面板设置的初始值不相等，改变初始值
          if (!_.isUndefined(temporaryParam[row.config.eventName]) &&
            initValue !== temporaryParam[row.config.eventName]) {
            initValue = temporaryParam[row.config.eventName]
          }
          row['defaultValue'] = initValue
          BoardParamService.set(row.config.eventName, initValue)
          row.config.initValue = dlut.math.toDate(initValue)
        }
      }
      // (3) 下一年/月按钮方法
      $scope.stepTime = function (row, type) {
        if (!row.config.showValue) {
          return
        }
        var timeArr = findNum(row.config.showValue)
        // 年月日
        timeArr[0] = parseInt(timeArr[0])
        timeArr[1] = parseInt(timeArr[1]) - 1
        timeArr[2] = parseInt(timeArr[2])
        switch (type) {
          case 'forWard':
            if (row.config.timeType == 'year') {
              row.config.showValue = moment(timeArr)
                .add(1, 'years')
                .format('YYYY年')
            } else if (row.config.timeType == 'month') {
              row.config.showValue = moment(timeArr)
                .add(1, 'months')
                .format('YYYY年MM月')
            } else {
              row.config.showValue = moment(timeArr)
                .add(1, 'days')
                .format('YYYY年MM月DD日')
            }
            break
          case 'back':
            if (row.config.timeType == 'year') {
              row.config.showValue = moment(timeArr)
                .add(-1, 'years')
                .format('YYYY年')
            } else if (row.config.timeType == 'month') {
              row.config.showValue = moment(timeArr)
                .add(-1, 'months')
                .format('YYYY年MM月')
            } else {
              row.config.showValue = moment(timeArr)
                .add(-1, 'days')
                .format('YYYY年MM月DD日')
            }
            break
          default:
        }
        row.config['defaultValue'] = timeArr.join('')
        BoardParamService.set(row.config.eventName,
          [row.config['defaultValue']])
      }
      // (4) 时间选择器值改变时执行的方法
      $scope.changeTime = function (newValue, row, type) {
        row.config['defaultValue'] = findNum(row.config.showValue).join('')
        BoardParamService.set(row.config.eventName, row.config['defaultValue'])
        $timeout(function () {
          $scope.boardFunBtnClick(row.config)
        }, 300)
      }

      /* 2.胶囊按钮 */
      // (1) 初始化控件
      $scope.initCapsule = function (config) {
        config.activeName
          ? config.activeName
          : config.activeName = config.columns[0]
        BoardParamService.set(config.eventName, config.activeName)
      }
      // (2) 添加控件
      $scope.addCapsule = function () {
        var addCapsuleModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addCapsuleModal.html',
          size: 'sm',
          controller: 'addCapsuleCtrl',
          resolve: {
            tab: function () {
              return angular.copy($scope.curTab)
            }
          }
        })
        addCapsuleModel.result.then(function (boardConfig) {
          $scope.board.layout.rows.push(boardConfig)
        })
      }
      // (3) 点击按钮执行的方法
      $scope.switchCapsule = function (config, item) {
        config.activeName = item
        BoardParamService.set(config.eventName, item)

        if (config.functions.length) {
          try {
            eval(config.functions)
          } catch (e) {
            console.log('胶囊执行方法出错', e)
          }
        }
      }

      /* 3.自定义按钮 */
      // (1) 点击按钮执行的方法
      $scope.boardFunBtnClick = function (config) {
        if (_.isUndefined(window.$$orangle_param)) {
          getOrangleParam()
        }
        getParamByOrangle()
        //获得表达式
        if (config.customCode) {
          try {
            eval(config.customCode)
          } catch (e) {
            console.error('board eval语句出错', config.customCode, e)
          }
        }
      }

      /* 4.查询按钮 */
      // 提供给自动搜索按钮调用
      $scope.triggerTime = function (config) {
        $.filters.autoCalc()
        $.iframes.calcUrl()
        $.widgets.initAll()
        $.widgets.reloadAll()
        return
        let param = []
        let ignoreWidgetIdList = ['']
        for (let i in utils.widget.boardParamKeyArr) {
          let objParam = {
            column: utils.widget.boardParamKeyArr[i],
            datasetId: '',
            type: '=',
            values: []
          }
          let valueArr = BoardParamService.get(utils.widget.boardParamKeyArr[i])
          objParam.values = valueArr
          if (typeof valueArr === 'object' && valueArr.length >= 0) {
            param.push(objParam)
          }
        }
        directApplyParamFilter2(param, undefined, ignoreWidgetIdList)
        if (utils.widget.widgetNum !== utils.widget.loadWidgetNum) {     // 如果widget加载完，不再加载
          utils.widget.loadDelayWidget(false)
        }
        $.widgets.reloadAll()
        var argReg = /\[&[^\]]+/g // 查找预计算中的变量正则
        _.each($scope.board.layout.rows, function (row) {
          if (row.config && row.config.url && row.config.isExp &&
            row.config.exp) {
            argList = row.config.exp.match(argReg)
            var allHave = true
            var exp = row.config.exp
            for (var i = 0; i < argList.length; i++) {
              var argName = argList[i].substr(2)
              var argValue = BoardParamService.get(argName)
              if (typeof argValue !== 'undefined') {
                exp = exp.replace('[&' + argName + ']', '"' + argValue + '"')
              } else {
                allHave = false
                break
              }
            }
            if (allHave) {
              try {
                row.config.showUrl = false
                var value = eval(exp)
                row.config.showUrl = value
              } catch (e) {
                console.error(e)
              }
            }
          }
        })
      }

      /* 5.自定义输入框 */
      // (1) 添加控件
      $scope.addInput = function () {
        var addIframeModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addInputWidget.html',
          size: 'sm',
          controller: 'AddInputWidgetCtrl',
          resolve: {
            tab: function () {
              return angular.copy($scope.curTab)
            }
          }
        })
        addIframeModel.result.then(function (boardConfig) {
          $scope.board.layout.rows.push(boardConfig)
        }, function () {//cce

        })
      }
      // (2) 失焦后计算默认值
      $scope.changeColsDefault = function (row) {
        if (row && row.config) {
          var value = angular.copy(row.config.showValue).toString()
          if (value.indexOf('%') > -1) {
            value = value.replace('%', '')
          }
          $('#' + row.name + '_input').attr('data-value', value)
          BoardParamService.set(row.config.eventName, value)
          $timeout(function () {
            $scope.boardFunBtnClick(row.config)
          }, 300)
        }
      }
      // (3) 获得焦点后计算
      $scope.focusChangeColsDefault = function (row) {
        if (row && row.config) {
          BoardParamService.set(row.config.eventName, row.config.showValue)
          $scope.boardFocusFunBtnClick(row.config)
          if (row.config.customFocusCode) {
            try {
              eval(row.config.customFocusCode)
            } catch (e) {
              console.error('board eval语句出错', config.customFocusCode, e)
            }
          }
        }
      }

      /* 6.添加iframe */
      $scope.addIframeWidget = function () {
        var addIframeModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addIframeWidget.html',
          size: 'sm',
          controller: 'AddIframeWidgetCtrl',
          resolve: {
            tab: function () {
              return angular.copy($scope.curTab)
            }
          }
        })
        addIframeModel.result.then(function (boardConfig) {
          $scope.board.layout.rows.push(boardConfig)
        }, function () {//cce

        })
      }

      /* 7.自定义下拉框 */
      // (1) 初始化控件
      $scope.initMultipleSelect = function (row, index) {
        $scope.$applyAsync(function () {
          var id = 'select_' +
            (row.config.eventName ? row.config.eventName : row.name)
          var $selector = $('#' + id)
          var isSingle = parseInt(row.config.chooseType) == 1
          $selector.multipleSelect({
            single: isSingle,
            onClick: function (view) {
              if (isSingle) {
                BoardParamService.set(row.config.eventName, view.value)
                $selector.attr('data-selected', view.value)
              } else {
                var selected = view.instance.getSelects()
                if (selected.length === 0) selected = '-1'//"'none'"
                BoardParamService.set(row.config.eventName, selected)
                $selector.attr('data-selected', selected)
              }
            },
            onCheckAll: function () {
              BoardParamService.set(row.config.eventName, [])
              $selector.attr('data-selected', 'all')
            },
            onUncheckAll: function () {
              BoardParamService.set(row.config.eventName, '-1')//"'none'")
              $selector.attr('data-selected', -1)
            },
            onClose: function () {
              $timeout(function () {
                $scope.boardFunBtnClick(row.config)
              }, 300)// 给多选下拉执行时间
            }
          })
          if (!isSingle) {
            $selector.multipleSelect('checkAll')
            BoardParamService.set(row.config.eventName, [])
            $selector.attr('data-selected', 'all')
          } else {
            $selector.multipleSelect('setSelects', [row.config.columns[0]])
            BoardParamService.set(row.config.eventName, row.config.columns[0])
            $selector.attr('data-selected', row.config.columns[0])
          }
        })
      }
      // (2) 添加控件
      $scope.addCols = function () {
        var addIframeModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addColsWidget.html',
          size: 'sm',
          controller: 'AddColsWidgetCtrl',
          resolve: {
            tab: function () {
              return angular.copy($scope.curTab)
            }
          }
        })
        addIframeModel.result.then(function (boardConfig) {
          $scope.board.layout.rows.push(boardConfig)
        }, function () {//cce

        })
      }

      /* 8.静态文本 */
      // (1) 添加控件
      $scope.addStaticText = function (row) {
        var addStaticTextModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addStaticText.html',
          size: 'lg',
          controller: 'addStaticTextCtrl',
          resolve: {
            row: function () {
              return row ? angular.copy(row) : ''
            },
            tab: function () {
              return angular.copy($scope.curTab)
            }
          }
        })
        addStaticTextModel.result.then(function (boardConfig) {
          $scope.board.layout.rows.push(boardConfig)
        })
      }
      // (2) 显示面板小灯泡内容
      $scope.getAlertInfo = function () {
        var getAlertInfoModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/alertInfo.html',
          size: 'lg',
          controller: 'alertInfoCtrl',
          resolve: {
            config: function () {
              return angular.copy($scope.board.config)
            }
          }
        })
        getAlertInfoModel.result.then(function (boardConfig) {
          $scope.board.config.alertInfo = boardConfig.alertInfo
        })
      }

      /* 9.动态标题 */
      // (1) 添加控件
      $scope.addDynamicTitle = function (row) {
        var addDynamicTitleModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addDynamicTitleModel.html',
          size: 'sm',
          controller: 'addDynamicTitleCtrl',
          resolve: {
            tab: function () {
              return angular.copy($scope.curTab)
            },
            globalParamTitleMap: function () {
              return angular.copy($scope.globalParamTitleMap)
            },
            row: function () {
              return row ? angular.copy(row) : ''
            }
          }
        })
        addDynamicTitleModel.result.then(function (boardConfig) {
          if (!row) {
            $scope.board.layout.rows.push(boardConfig)
          } else {
            var title = boardConfig.config.dynamicTitle
            for (var key in $scope.globalParamTitleMap) {
              var paramTitle = $scope.globalParamTitleMap[key]
              title = title.replace('{{' + key + '}}', paramTitle.values[0])
            }
            if (title.indexOf('{{') > -1) {
              row.showTitle = boardConfig.config.dynamicDefault
              row.config.dynamicDefault = boardConfig.config.dynamicDefault
              row.config.dynamicTitle = boardConfig.config.dynamicTitle
            } else {
              row.showTitle = title
            }
          }
        })
      }
      // (2) 监听动态标题
      $scope.$watch('globalParamTitleMap', function () {
        $scope.dynamicTitleFun()
      }, true)
      // (3) 辅助方法
      $scope.dynamicTitleFun = function () {
        if ($scope.board)
          _.each($scope.board.layout.rows, function (row) {
            if (row.sign == 'title') {
              var title = row.config.dynamicTitle
              for (var key in $scope.globalParamTitleMap) {
                var paramTitle = $scope.globalParamTitleMap[key]
                title = title.replace('{{' + key + '}}', paramTitle.values[0])
              }
              if (title.indexOf('{{') > -1) {
                row.showTitle = row.config.dynamicDefault
              } else {
                row.showTitle = title
              }
            }
          })
      }

      /* 10.图片 */
      // (1) 添加控件
      $scope.addImgWidget = function () {
        var addImgModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addImgWidget.html',
          size: 'sm',
          controller: 'AddImgWidgetCtrl',
          resolve: {
            tab: function () {
              return angular.copy($scope.curTab)
            }
          }
        })
        addImgModel.result.then(function (imgWidget) {
          $scope.board.layout.rows.push(imgWidget)
        })
      }

      /* 11.tab */
      $scope.addTabGroupWidget = function () {
        $scope.board.layout.rows.push({
          name: 'Tab group',
          type: 'board',
          sign: 'tabs',
          sizeX: 5,
          sizeY: 5,
          tab: $scope.curTab
        })
      }
      $scope.addTab = function () {
        $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/tabModel.html',
          size: 'sm',
          controller: 'tabCtrl',
          resolve: {
            tab: function () {
              return undefined
            },
            tabs: function () {
              return $scope.tabs
            }
          }
        })
      }
      $scope.changeTabName = function (tab) {
        $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/tabModel.html',
          size: 'sm',
          controller: 'tabCtrl',
          resolve: {
            tab: function () {
              return tab
            },
            tabs: function () {
              return $scope.tabs
            }
          }
        })
      }
      $scope.deleteTab = function (index) {
        if (index == $scope.curTab.id)
          if (index > 0)
            $scope.curTab = $scope.tabs[index - 1]
          else
            $scope.curTab = $scope.tabs[index + 1]
        $scope.tabs.splice(index, 1)
      }
      $scope.goToTab = function (tab) {
        $scope.curTab = tab
      }
      var initTabList = function (widget) {
        if (widget.tab == undefined)
          widget.tab = {
            id: 0,
            name: '默认'
          }
        else if (widget.tab.id === true)
          return

        var willAdd = true
        for (var i = 0; i < $scope.tabs.length; i++) {
          if ($scope.tabs[i].id == widget.tab.id) {
            willAdd = false
          }
        }
        if (willAdd)
          $scope.tabs.push(widget.tab)
      }
      var tabAlive = function (id) {
        if (id == true) return true
        if ($scope.tabs.length == 0) {
          $scope.tabs = [
            {
              id: 0,
              name: '默认'
            }]
        }
        var alive = false
        for (var i = 0; i < $scope.tabs.length; i++) {
          if ($scope.tabs[i].id == id)
            alive = true
        }
        return alive
      }
      /*---------------------二. 结束--------------------------------------------------------*/

      /*---------------------三. 当前controller需要的辅助方法----------------------------------*/
      // 输出条件组的参数
      $scope.paramToString = function (row) {
        return _.filter(_.map(row.params, function (e) {
          return e.title
        }), function (e) {
          return e && e.length > 0
        }).join('; ')
      }
      // 返回当前面板筛选器的参数值
      $scope.paramsFun = function () {
        return $$dlut_param
      }
      // 去图表的配置页，修改配置
      $scope.goToEditPage = function (id) {
        window.open('#/nv/explore/' + id)
      }
      // 复制图表和高级功能插件的方法，type两种情况 row和widget
      $scope.openCopyWidgetModal = function (data, type) {
        var addWidgetModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/copyWidgetModal.html',
          size: 'lg',
          controller: function ($scope, $uibModalInstance) {
            'ngInject'
            if (type === 'widget') {
              $scope.widget = JSON.stringify(data.widget)
            } else {
              $scope.row = JSON.stringify(data)
            }

            $scope.ok = function () {
              $uibModalInstance.close()
            }
            $scope.cancel = function () {
              $uibModalInstance.close()
            }
          }
        })
      }
      // 粘贴图表或高级功能
      $scope.pasteWidgetModelOpen = function () {
        var addWidgetModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/copyWidgetModal.html',
          size: 'lg',
          controller: function ($scope, $uibModalInstance) {
            'ngInject'
            $scope.widget = ''
            $scope.row = ''
            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel')
            }
            $scope.ok = function () {
              let result = {
                type: '',
                data: null
              }
              if ($scope.widget) {
                result.type = 'widget'
                result.data = JSON.parse($scope.widget)
              } else if ($scope.row) {
                result.type = 'row'
                result.data = JSON.parse($scope.row)
              }

              $uibModalInstance.close(result)
            }
          }
        })
        addWidgetModel.result.then(function (result) {
          if (result.type === 'row') {
            delete result.data.$$hashKey
            $scope.board.layout.rows.push(result.data)
          } else {
            utils.widget.addWidget(result.data)
          }
        }, function () {//cce
        })
      }
      // 获取图表的描述
      $scope.goToDescribe = function (describe) {
        $scope.alert(describe)
      }
      // 添加图表到当前面板
      $scope.addWidgetModelOpen = function () {
        var addWidgetModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/addWidgetModel.html',
          size: 'sm',
          controller: 'AddWidgetModelCtrl'
        })

        addWidgetModel.result.then(function (treeItemData) {
          utils.widget.addWidget(treeItemData)
        }, function () {//cce
          console.info('Modal dismissed at: ' + new Date())
        })
      }
      // 保存当前面板
      $scope.save = function () {
        if ($scope.board.name && $scope.board.id) {
          var rows = utils.getBoardRows($scope)
          var params = {
            json: angular.toJson({
              'layout': {
                'rows': rows
              },
              'categoryId': $scope.board.categoryId,
              'name': $scope.board.name,
              'id': $scope.board.id,
              'config': $scope.board.config
            })
          }
          $http.post(updateUrl, params).success(function (serviceStatus) {
            if (serviceStatus.status == '1') {
              $scope.optFlag = 'edit'
              ModalUtils.alert(serviceStatus.msg, 'modal-success', 'sm')
            } else {
              ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'sm')
            }
          })
        }
      }
      // 清空面板
      $scope.clear = function () {
        $scope.board.layout.rows = []
      }
      // 删除图表
      $scope.removeParam = function ($index) {
        $scope.board.layout.rows.splice($index, 1)
      }
      // 刷新
      $scope.clearParams = function () {
        $scope.applyParamFilter(true)
      }
      // 另存面板
      $scope.newBoardParam = function (name) {
        if (name == '') {
          return
        }
        $scope.newBoardParamName = ''
        var params = {}
        _.each($scope.board.layout.rows, function (row) {
          _.each(row.params, function (param) {
            if ('slider' != param.paramType) {
              params[param.name] = {type: param.type, values: param.values}
            }
          })
        })
        $scope.boardParams.unshift({name: name, params: params})
        $http.post('dashboard/saveBoardParam.do', {
          boardId: $stateParams.id,
          config: angular.toJson($scope.boardParams)
        })
      }
      // 条件(1)
      $scope.deleteBoardParam = function (index) {
        $scope.boardParams.splice(index, 1)
        $http.post('dashboard/saveBoardParam.do', {
          boardId: $stateParams.id,
          config: angular.toJson($scope.boardParams)
        })
      }
      // 条件(2)
      $scope.applyBoardParam = function (param) {
        for (var name in param) {
          _.each($scope.board.layout.rows, function (row) {
            _.each(row.params, function (p) {
              if (p.name == name) {
                p.type = param[name].type
                p.values = param[name].values
              }
            })
          })
        }
        $scope.applyParamFilter()
      }
      // 返回(1)
      $scope.goBack = function () {
        if ($scope.history.length > 0) {
          var history = $scope.history.pop()
          // history = $scope.history.pop();
          if (!_.isUndefined(history.id))
            $state.go('nv.dashboard.view', {
              id: history.id,
              param: history.param,
              history: $scope.history,
              screenHistory: $scope.screenHistory,
              role: $rootScope.role
            }, {
              reload: true
            })
        }
      }
      // 返回(2)
      $scope.goBackAll = function () {
        EventService.trigger('WS:screenBack', {}, 'all')
      }
      // 面板各个图表的设置
      $scope.widgetConfigModelOpen = function (widget) {
        var addActionModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/widgetConfigModal.html',
          size: '',
          controller: 'widgetConfigModalControl',
          resolve: {
            widget: function () {
              return widget
            },
            screenList: function () {
              if ($scope.screenList)
                return $scope.screenList
              else return []
            },
            isAdmin: function () {
              return $scope.isAdmin
            },
            widgetThemeConfigGroups: function () {
              if (_.isUndefined($scope.themeConfigList))
                return undefined
              var widgetType = widget.type
              var widgetChartType = ''
              if (_.isUndefined(widgetType))
                widgetType = 'widget'
              if (widgetType != 'param' && widgetType != 'board') {
                widgetChartType = widget.widget.data.config.chart_type
              }
              return $scope.themeConfigList[widgetType + ':' + widgetChartType]
            },
            url: function () {
              if (widget.type == 'board') {
                var url = 'http://'
                if (!_.isUndefined(widget.config) &&
                  !_.isUndefined(widget.config.url))
                  url = widget.config.url
              }
              return url
            },
            tab: function () {
              return angular.copy($scope.curTab)
            },
            tabs: function () {
              return angular.copy($scope.tabs)
            }
          }
        })

        addActionModel.result.then(function () {
          if (widget.widget) {
            $scope.reloadWidget(widget)
          }
        })
      }
      // 面板的设置
      $scope.boardConfigModelOption = function () {
        var SetPanelModel = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'src/view/nv/dashboard/layout/modals/setPanelTheme.html',
          size: 'lg',
          controller: 'SetPanelCtrl',
          resolve: {
            config: function () {
              if ($scope.board.config == undefined)
                $scope.board.config = {}
              return angular.copy($scope.board.config)
            },
            boardName: function () {
              return $scope.board.name
            },
            categoryId: function () {
              return $scope.board.categoryId
            }
          }
        })
        SetPanelModel.result.then(function (item) {
          $scope.board.name = item.boardName
          $scope.board.config = item.config
          $scope.board.categoryId = item.categoryId
        }, function () {
          // console.info('Modal dismissed at: ' + new Date());
        })
      }
      // 图表的最大化最小化功能
      $scope.minimizeWidget = function () {
        //最大化切换tab后,最小化
        $scope.curTab = angular.copy($scope.lastTab)
      }
      $scope.maximizeWidget = function (widget, $event) {
        var $widget = $($event.target).parents('.panelTheme')
        var option = widget.maximizeOption
        if (widget.maximize) {//最小化
          if (option.type == 'filter') {
            if ($scope.lastFilter)
              widget.widget.data.config.filters = $scope.lastFilter
          } else if (option.type == 'default') {
          }
          //自定义最大化区域
          widget.maximizeOption2 = {
            style: $scope.lastSize
          }
          //自定义最大化区域end
        } else {//最大化
          if (option.type === 'filter') {
            $scope.lastFilter = widget.widget.data.config.filters
            var newFilterList = option.filters
            if (widget.filters_copy)
              newFilterList = newFilterList.concat(widget.filters_copy)
            widget.widget.data.config.filters = newFilterList
          } else if (option.type == 'tab') {
            $scope.lastTab = angular.copy($scope.curTab)
            $scope.curTab = {
              id: option.tabSelect
            }
          } else if (option.type == 'default') {
          }
          $scope.lastSize = {
            'width': $widget.width(),
            'height': $widget.height(),
            'left': $widget.position().left,
            'top': $widget.position().top
          }
          //自定义最大化区域
          if (option.custumSize) {
            //最大化
            widget.maximizeOption2 = {
              style: {
                'width': 100 / 24 * parseInt(option.sizeX) + '%',
                'height': 100 / 12 * parseInt(option.sizeY) + '%',
                'left': 100 / 24 * parseInt(option.col) + '%',
                'top': 100 / 12 * parseInt(option.row) + '%',
                'background': 'url("theme/theme_Beili01/images/bk.jpg") no-repeat',
                'z-index': 9999
              }
            }
          } else {
            widget.maximizeOption2 = {
              style: {
                'width': '100%',
                'height': '100%',
                'left': 0,
                'top': 0,
                'background': 'url("theme/theme_Beili01/images/bk.jpg") no-repeat',
                'z-index': 9999
              }
            }
          }
          //自定义最大化区域end
        }
        if (option.type != 'tab') {
          widget.maximize = !widget.maximize
          // chartService.realTimeRender(widget.realTimeTicket, utils.filter.injectFilter(widget.widget).data);
          $scope.reloadWidget(widget, true)
        }
      }

      $scope.applyParamFilter = function (clear) {
        if (clear) {
          $scope.widgetFilters = []
          $scope.datasetFilters = []
          $scope.globalParamTitle = ''
          $scope.globalParamTitleMap = {}
          _.each($scope.board.layout.rows, function (row) {
            _.each(row.params, function (param) {
              param.values = []
            })
          })
        } else {
          utils.params.paramToFilter()
        }
        _.each($scope.board.layout.rows, function (row) {
          _.each(row.widgets, function (w) {
            if (w.config && w.config.ignoreEvent) return
            try {
              chartService.realTimeRender(w.realTimeTicket,
                utils.filter.injectFilter(w.widget).data)
            } catch (e) {
              console.error(e)
            }
          })
        })
        utils.params.updateParamTitle()
      }
      // 动态标题需要的变量
      $scope.globalParamTitleMap = {}
      var directApplyParamFilter2 = function (param, init, ignoreList) {
        _.each($scope.board.layout.rows, function (row) {
          _.each(row.params, function (pa) {
            for (var i = 0; i < param.length; i++) {
              if (param[i].column == pa.name) {
                pa.type = param[i].type
                pa.values = param[i].values
              }
            }
          })
        })
        utils.params.updateGlobalParamTitle()
      }
      $scope.reloadWidget = function (widget, force, delay, isInitLinkLoad) {
        // isInitLinkLoad 作为初始化链的一环被调用
        if (_.isUndefined(widget.render) || force) {
          if (!force) utils.widget.setBoardFilter(widget)
          widget.show = false
          if (!isInitLinkLoad)
            widget.render = function (content, optionFilter, scope) {
              chartService.render(content, widget.widget.data, optionFilter,
                scope, true, undefined, widget.theme).then(function (d) {
                widget.realTimeTicket = d
                utils.widget.loadWidgetNum++
                if (utils.widget.loadWidgetNum === utils.widget.widgetNum) {
                  widget.loading = false
                  $.filters.autoCalc()
                  $.iframes.calcUrl()
                  if (!$scope.started) {
                    $.widgets.initAll()
                    $.widgets.reloadAll()
                  }
                }
              })
              widget.realTimeOption = {optionFilter: optionFilter, scope: scope}
            }
          $timeout(function () {
            widget.loading = true
            widget.show = true
          })
        } else {
          chartService.realTimeRender(widget.realTimeTicket,
            utils.filter.injectFilter(widget.widget).data)
        }
      }
      $scope.reloadAllWidget = function () {
        _.each($scope.board.layout.rows, function (row) {
          if (row.type == 'widget')
            _.each(row.widgets, function (widget) {
              $scope.reloadWidget(widget)
            })
        })
      }

      // 获取当前面板刚进入页面时的一些参数，保存到$$orangle_param中
      function getOrangleParam() {
        var param = BoardParamService.getAll()
        var copy = new Object()
        copy = Object.freeze(angular.copy(param))
        window.$$orangle_param = angular.copy(copy)
      }

      // 将原始参数和当前状态对比获取到的参数进行查询
      function getParamByOrangle() {
        var $selects = $('select.selector_multiple_simple')
        var $dateSelect = $('.moment-picker-sty')
        var $inputs = $('.selector-input')
        var $capsules = $('.capsule_btn')
        var params = angular.copy(window.$$orangle_param)
        if ($selects.length > 0) {
          _.each($selects, function (dom, i) {
            var $target = $(dom)
            var id = $target.attr('id')
            var event = $target.attr('data-eventname')
            var isSingle = $target.hasClass('isSingle')
            var selected = $target.multipleSelect('getSelects')
            var selectionLength = $target.find('option').length
            var setSelected = null
            if (isSingle) {
              setSelected = selected[0]
            } else {
              if (selected.length === selectionLength) {
                setSelected = 'all'
              } else if (selected.length === 0) {
                setSelected = -1
              } else {
                setSelected = selected
              }
            }
            if (setSelected) params[event] = setSelected
          })
        }
        if ($dateSelect.length > 0) {
          _.each($dateSelect, function (dom, i) {
            var $target = $(dom)
            var event = $target.attr('data-eventname')
            var selected = $target.attr('data-selected')
            if (typeof (selected) !== 'undefined') {
              if (typeof(params[event] === 'string')) {
                params[event] = selected.toString()
              } else {
                params[event] = selected
              }
            }
          })
        }
        if ($inputs.length > 0) {
          _.each($inputs, function (dom, i) {
            var $target = $(dom)
            var event = $target.attr('data-eventName')
            var value = $target.attr('data-value')
            if (typeof (value) !== 'undefined') {
              if (typeof(params[event] === 'string')) {
                params[event] = value.toString()
              } else {
                params[event] = value
              }
            }
          })
        }
        if ($capsules.length > 0) {
          _.each($capsules, function (dom, i) {
            var $target = $(dom)
            var event = $target.attr('data-eventName')
            var value = $target.attr('data-value')
            var active = $target.attr('data-active')
            if (typeof (active) !== 'undefined') {
              if (typeof(params[event] === 'string')) {
                params[event] = active.toString()
              } else {
                params[event] = active
              }
            }
          })
        }
        window.$$dlut_param = angular.copy(params)
      }

      /*---------------------三. 结束--------------------------------------------------------*/

      /*---------------------四. 绑定以及响应图表的事件--------------------------------------------------------*/
      //读取主题
      var getThemeConfigInfo = function (themeName) {
        return
        if (!_.isUndefined(themeName)) {
          CBoardEChartRender.prototype.theme = themeName
          $('#chartThemeScript,#chartOptionScript').remove()
          $('body')
            .append('<script type="text/javascript" id="chartThemeScript" src="/theme/' +
              themeName + '/chartTheme.js"></script>')
            .append('<script type="text/javascript" id="chartOptionScript" src="/theme/' +
              themeName + '/chartOption.js"></script>')
          $http({
            method: 'GET',
            url: 'theme/' + themeName + '/config.json'
          }).then(function successCallback(response) {
            var orginalThemeConfigList = response.data.option,
              newThemeConfigList = {},
              getChartTypeList = function (config, oType) {
                var chartTypeList = [],
                  widgetAllChartTypeList = [
                    'chord',
                    'line',
                    'line2',
                    'line3',
                    'pie',
                    'kpi',
                    'table',
                    'crossTable',
                    'treeGrid',
                    'crossGreatTable',
                    'selector',
                    'dataTable',
                    'funnel',
                    'sankey',
                    'echart3dMap',
                    'echart3dBar',
                    'echart3dArea',
                    'circular',
                    'radar',
                    'map',
                    'scatter',
                    'scatter2',
                    'gauge',
                    'wordCloud',
                    'treeMap',
                    'areaMap',
                    'heatMapCalendar',
                    'heatMapTable',
                    'markLineMap',
                    'liquidFill',
                    'barPolarStack',
                    'pieProportion',
                    'flex',
                    'flex2',
                    'barLimits',
                    'dataLineTable',
                    'echart3dMapLine',
                    'lineMap',
                    'pie2',
                    'gantt',
                    'flexChart',
                    'rose',
                    'flexD3Chart'],
                  boardAllChartTypeList = [],
                  allChartTypeList = []
                if (oType == 'board') {
                  allChartTypeList = boardAllChartTypeList
                } else {
                  allChartTypeList = widgetAllChartTypeList
                }
                if (_.isArray(config.chart_type)) {
                  chartTypeList = config.chart_type
                } else if (config.chartConfig = 'ALL') {
                  chartTypeList = allChartTypeList
                }
                return chartTypeList
              },
              updateNewThemeConfig = function (
                oType, oChartType, groupName, classes) {
                var name = oType + ':' + oChartType
                if (_.isUndefined(newThemeConfigList[name])) {
                  var config = {}
                  config[groupName] = classes
                  newThemeConfigList[name] = config
                } else {
                  if (_.isUndefined(newThemeConfigList[name][groupName])) {
                    newThemeConfigList[name][groupName] = []
                  }
                  newThemeConfigList[name][groupName] = newThemeConfigList[name][groupName].concat(
                    classes)
                }
              }
            _.each(orginalThemeConfigList, function (oConfig) {
              _.each(oConfig.type, function (oType) {
                var chartTypeList = getChartTypeList(oConfig, oType)
                if (oType == 'param' || oType == 'board') {
                  updateNewThemeConfig(oType, '', oConfig.group,
                    oConfig['class'])
                } else {//oType == "widget"
                  _.each(chartTypeList, function (oChartType) {
                    updateNewThemeConfig(oType, oChartType, oConfig.group,
                      oConfig['class'])
                  })
                }
              })
            })
            $scope.themeConfigList = newThemeConfigList
            $scope.reloadAllWidget()
          }, function errorCallback(response) {
            // 请求失败执行代码
          })
        }
      }
      // 绑定主题监听事件，主题改变时响应
      $scope.$watch('board.config.theme', getThemeConfigInfo)
      CBoardEChartRender.prototype.theme = 'theme-fin1'
      // 跳转事件
      EventService.on('WS:screenSkip', function (data) {
        $http.get('screen/getScreenMenuItemByIdType.do?id=' + data.target +
          '&type=' + $rootScope.role).success(function (response) {
          if (data.history)
            $scope.screenHistory = data.history
          if (response == '') {
            $scope.screenHistory.push({})
          } else {
            if (_.isUndefined($stateParams.param))
              $stateParams.param = []
            $scope.screenHistory.push({
              id: $stateParams.id,
              param: $stateParams.param
            })
            $state.go('nv.dashboard.view', {
              id: response.dashboard_id,
              param: data.param,
              history: $scope.history,
              screenHistory: $scope.screenHistory,
              role: $rootScope.role
            }, {
              reload: true
            })
          }
        })
      })
      // 返回事件
      EventService.on('WS:screenBack', function (data) {
        if ($scope.screenHistory.length > 0) {
          var history = $scope.screenHistory.pop()
          if (!_.isUndefined(history.id)) {
            $state.go('nv.dashboard.view', {
              id: history.id,
              param: history.param,
              history: $scope.history,
              screenHistory: $scope.screenHistory,
              role: $rootScope.role
            }, {
              reload: true
            })
          } else {
            $stateParams.screenHistory = $scope.screenHistory
          }
        }
      })
      // 双击事件
      EventService.on('CE:dblclick', function (o) {
        console.log('CE:dblclick', o)
      })
      // 单击事件
      EventService.on('CE:click', function (o) {
        console.log('CE:click', o)
        var widget = o.widget
        var widgetId = widget.widgetId
        var param = o.param
        var eventInfo = []
        if ((param && param.data && param.data.eventInfo) ||
          param.trigger === 'blank')
          EventService.trigger('$click', o)
        if (param.region)
          EventService.trigger('$click', o)
        if (_.isArray(param.data)) {
          var lastItem = param.data[param.data.length - 1]
          if (lastItem.length > 0 && lastItem[0].value != undefined)
            eventInfo = lastItem
        } else if (_.isUndefined(param.data)) {
          return
        } else if (param.data.eventInfo) {
          eventInfo = param.data.eventInfo
        }
        //screen状态
        var isScreenAction = !_.isUndefined($rootScope.role)
          && !_.isUndefined(widget.screenAction)
          && !_.isUndefined(widget.screenAction.target)
        var screenAction = widget.screenAction
        if (isScreenAction && screenAction) {
          //2. 发送跳转事件
          var datasetId = widget.widget.data.datasetId
          var sAction = angular.copy(screenAction),
            sParams = screenAction.param, sendParams = []
          for (var key in sParams) {
            if (sParams[key].selected) {
              for (var i = 0; i < eventInfo.length; i++) {
                var values = eventInfo[i].value
                if (!_.isArray(values)) {
                  values = [values]
                }
                if (key == eventInfo[i].col) {
                  sendParams.push({
                    'datasetId': datasetId,
                    'column': key,
                    'type': '=',
                    'values': values
                  })
                  break
                }
              }
            }
          }
          sAction.param = sendParams
          EventService.trigger('WS:screenSkip', sAction, 'all')
        }
        if (_.isUndefined(widget.action) ||
          (_.isUndefined(widget.action.type) &&
            _.isUndefined(widget.action.regular))) {
          //没有配置action
        }
        else {
          //已经配置action,触发事件
          //没有重新配置action，数据库中已存在action配置的情况
          if (_.isUndefined(widget.action.regular)) {
            actionSkip(o, widget.action, eventInfo, isScreenAction)
          }
          //配置过action但是没有设置正则表达式
          else if (!widget.action.regular) {
            actionSkip(o, widget.action.list[0], eventInfo, isScreenAction)
          }
          //配置过action设置过正则表达式
          else if (widget.action.regular) {
            var skip = false
            _.each(widget.action.list, function (list) {
              var regularLen = 0
              for (var l in list.param) {
                if (list.param[l].selected) regularLen++
              }
              var action = 0
              for (var ei = 0; ei < eventInfo.length; ei++) {
                for (var l in list.param) {
                  if (eventInfo[ei].col == l && list.param[l].selected) {
                    var reg = new RegExp(list.param[l].regular, 'g')
                    if (reg.test(eventInfo[ei].value)) {
                      action++
                    }
                  }
                }
              }
              if (regularLen == action && !skip) {
                skip = true
                actionSkip(o, list, eventInfo, isScreenAction)
              }
            })
          }
        }
      })
      // 单击事件辅助方法
      var actionSkip = function (o, action, eventInfo, isScreenAction) {
        var widget = o.widget
        var widgetId = widget.widgetId
        //已经配置action,触发事件
        var obj = {}
        for (var i in action.param) {
          var pa = action.param[i]
          // if (pa.selected) {
          // selectCol.push(widget.action.param[i].col);
          var selectItem = _.find(eventInfo, function (item) {
            return item.col == pa.col
          })
          if (selectItem != undefined && selectItem.value != undefined)
            obj[pa.col] = selectItem.value
          // }
        }
        //跳转到其他面板//本页面作用
        if (action.type === 'self' || action.type === 'dashboard') {
          var datasetId = widget.widget.data.datasetId
          var param = []
          var ignoreWidgetIdList = []
          if (action.ignoreSelf) {
            ignoreWidgetIdList.push(widgetId)
          }
          _.each(action.param, function (pa) {
            if (pa.selected && pa.col && !_.isUndefined(obj[pa.col])) {
              var values = obj[pa.col]
              if (!_.isArray(values)) {
                values = [values]
              }
              param.push({
                datasetId: datasetId,
                column: pa.col,
                type: '=',
                values: values
              })
            }
          })
          if (action.type == 'dashboard' && !isScreenAction) {
            if (_.isUndefined($stateParams.param))
              $stateParams.param = []
            $scope.history.push({
              id: $stateParams.id,
              param: $stateParams.param
            })
            $state.go('nv.dashboard.view', {
              id: action.target,
              param: param,
              history: $scope.history,
              screenHistory: $scope.screenHistory,
              role: $rootScope.role
            }, {
              reload: true
            })
          } else if (action.type == 'self') {
            directApplyParamFilter2(param, undefined, ignoreWidgetIdList)
          }
        } else if (action.type == 'url') {//跳转到链接
          var url = action.target.toString()
          for (var key in obj) {
            var value = obj[key]
            url = url.replace('{{' + key + '}}', value)
          }
          window.open(url, 'noNewOpen',
            'top=0,left=0,width=1920,height=1080,menubar=no,scrollbars=yes,resizable=yes,status=yes,titlebar=no,toolbar=no,location=no',
            '_blank')
        }
      }
      // 图表下钻事件
      EventService.on('CE:drillDown', function (o) {
        console.log('CE:drillDown-dashboard', o)
        EventService.trigger('$drillDown', o)
        var keys = o.widget.widget.data.config.keys
        var groups = o.widget.widget.data.config.groups
        var drillTier = o.widget.widget.data.config.drillTier
        // var drillTier = angular.copy(o.widget.widget.data.config.drillTier)
        var realTimeTicket = o.widget.realTimeTicket
        var drill = false
        var current = null // 当前层级
        drillTier.isGreat = o.param.isGreat ? o.param.isGreat : false
        _.each(keys, function (key) {
          if (!_.isUndefined(key.drillDown)) {
            if (drillTier.keyTier < key.drillDown.length - 1 &&
              (_.isUndefined(o.param.drillType) || o.param.drillType ===
                'key')) {
              drill = true
              current = key.drillDown[drillTier.keyTier]
              drillTier.filters.key.push(o.param.name)
              drillTier.keyTier++
            }
          }
        })
        _.each(groups, function (group) {
          if (!_.isUndefined(group.drillDown)) {
            if (drillTier.groupTier < group.drillDown.length - 1 &&
              (_.isUndefined(o.param.drillType) || o.param.drillType ===
                'group')) {
              drill = true
              current = key.drillDown[drillTier.groupTier]
              drillTier.filters.group.push(o.param.name)
              drillTier.groupTier++
            }
          }
        })
        if (o.type === 'treeGrid') {
          drill = true
          drillTier.keyTier = o.tier.tier
          drillTier.filters.key = o.tier.list
          drillTier.treeGridFilters = o.filters
        }
        if (drill) {
          chartService.realTimeRender(realTimeTicket, o.widget.widget.data)
        }
      })
      // 图表上卷事件
      EventService.on('CE:drillUp', function (o) {
        EventService.trigger('$drillUp', o)
        var keys = o.widget.widget.data.config.keys
        var groups = o.widget.widget.data.config.groups
        var drillTier = o.widget.widget.data.config.drillTier
        // var drillTier = angular.copy(o.widget.widget.data.config.drillTier)
        var realTimeTicket = o.widget.realTimeTicket
        var drill = false
        var current = null // 当前层级
        drillTier.isGreat = o.param.isGreat ? o.param.isGreat : false
        _.each(keys, function (key) {
          if (!_.isUndefined(key.drillDown)) {
            if (drillTier.keyTier > 0 &&
              (_.isUndefined(o.param.drillType) || o.param.drillType ===
                'key')) {
              drill = true
              current = key.drillDown[drillTier.keyTier]
              drillTier.filters.key.pop()
              drillTier.keyTier--
            }
          }
        })
        _.each(groups, function (group) {
          if (!_.isUndefined(group.drillDown)) {
            if (drillTier.groupTier > 0 &&
              (_.isUndefined(o.param.drillType) || o.param.drillType ===
                'group')) {
              drill = true
              current = key.drillDown[drillTier.groupTier]
              drillTier.filters.group.pop()
              drillTier.groupTier--
            }
          }
        })
        if (drill) {
          chartService.realTimeRender(realTimeTicket, o.widget.widget.data)
        }
      })
      // 图表单击事件
      EventService.on('$click', function (o) {
        var params = eventData(o)
        var boardParams = BoardParamService.getAll()
        if (o.type === 'chart') {
          runEvent({
            data: params.obj,
            param: boardParams,
            seriesName: params.seriesName
          }, o.widget.widget.data.wName, '$click')
        } else if (o.type === 'table') {
          runEvent({
            data: params.obj,
            param: boardParams,
            _this: params._this,
            this_td: params.this_td
          }, o.wName, '$click')
        }
      })
      // 下钻事件
      EventService.on('$drillDown', function (o) {
        var params = eventData(o)
        if (o.type === 'chart') {
          runEvent({data: params.obj, seriesName: params.seriesName},
            o.widget.widget.data.wName, '$drillDown')
        } else if (o.type === 'table') {
        }
      })
      // 上卷事件
      EventService.on('$drillUp', function (o) {
        var params = eventData(o)
        if (o.type === 'chart') {
          runEvent({data: params.obj, seriesName: params.seriesName},
            o.widget.widget.data.wName, '$drillUp')
        } else if (o.type === 'table') {
        }
      })
      // 图表准备完成事件
      EventService.on('$ready', function (o) {
        runEvent('', o.wName, '$ready')
      })
      // 点击空白事件
      EventService.on('$blank', function () {
        try {
          if ($scope.board)
            for (var i = 0; i < $scope.board.layout.rows.length; i++) {
              var row = $scope.board.layout.rows[i]
              if (row.sign === 'customTrigger') {
                if (row.config.customCode) {
                  $scope.boardFunBtnClick(row.config)
                }
              }
            }
        } catch (e) {
          console.error('点击空白错误', e)
        }
      })
      // 面板添加点击事件监听，如果点击空白则响应空白事件
      $('body').off('click').on('click', function (e) {
        var $target = $(e.target)
        if ($target.hasClass('gridster') || $target.hasClass('contentTheme')) {
          $timeout(function () {
            EventService.trigger('$blank')
          }, 500)
        }
      })

      // 相应事件辅助方法--处理相应事件传出的数据
      function eventData(o) {
        var obj = {}
        var eventInfo = []
        var _this, this_td = {}
        if (o.param.data) eventInfo = o.param.data.eventInfo
        if (o.param.this_tr) _this = o.param.this_tr
        if (o.param.this_td) {
          this_td[$.trim(o.param.this_td.data('column'))] = $.trim(
            o.param.this_td.data('value'))
        }
        _.each(eventInfo, function (ei) {
          obj[ei.col] = ei.value
        })
        return {
          seriesName: o.param.seriesName,
          obj: obj,
          _this: _this,
          this_td: this_td
        }
      }

      // 执行面板上图表绑定的事件
      function runEvent(obj, wName, type) {
        if (!_.isUndefined(drillCallbackMap[type])
          && _.isArray(drillCallbackMap[type][wName])
          && drillCallbackMap[type][wName].length > 0) {
          _.each(drillCallbackMap[type][wName], function (callback) {
            callback(obj)
          })
        }
      }

      // 页面销毁执行的方法
      $scope.$on('$destroy', function () {
        CBoardEChartRender.prototype.theme = 'theme-fin1'
        window.chartOptionList = undefined
        window.$$orangle_param = undefined
        window.$$EXCEL = {}
        drillCallbackMap = {}
        // 自定义的代码;
        if ($scope.board.config && $scope.board.config.customDesCode) {
          try {
            eval($scope.board.config.customDesCode)
          } catch (e) {
            console.error('board eval页面离开时调用的代码出错',
              $scope.board.config.customCode, e)
          }
        }
        utils.widget.clearAllRouteFilter()
        $(document).off('click')
      })
      /*---------------------四. 结束--------------------------------------------------------*/

      /*---------------------五. 以下是暴露给配置图表用的一些加载页面的方法-----------------------*/
      // 触发所有选单组件，应用到param filter组件
      $.widgets = {
        reload: function (list) {
          if (!isArrayFn(list)) {
            alert('reload参数应为数组')
            return
          }
          utils.params.paramToFilter()
          _.each($scope.board.layout.rows, function (row) {
            _.each(row.widgets, function (w) {
              if (_.indexOf(list, w.name) > -1) {
                if (row.type === 'widget' && w.config && !w.realTimeTicket) {
                  utils.widget.setBoardFilter(w)
                  utils.widget.rendWidget(w, true)
                  $scope.reloadWidget(w, true, undefined, true)
                } else {
                  try {
                    if (w.widget.data.config.chart_type === 'treeGrid')
                      $.widgets.resetChartDrill([w.name])
                    delete w.widget.data.config.temporaryParam
                    chartService.realTimeRender(w.realTimeTicket,
                      utils.filter.injectFilter(w.widget).data, undefined,
                      undefined,
                      function () {
                      })
                  } catch (e) {
                    console.error(e)
                  }
                }
              }
            })
          })
          utils.params.updateParamTitle()
        },
        reloadAll: function () {
          $scope.applyParamFilter()
        },
        resetChartDrill: function (widgetNames, index) {
          if (_.isUndefined(index)) index = 1
          _.each(widgetNames, function (widget) {
            var w = _.find($scope.board.layout.rows, function (row) {
              if (row.type === 'widget') {
                return row.widgets[0].name == widget
              }
            }).widgets[0]
            var drillTier = w.widget.data.config.drillTier
            drillTier.keyTier = index - 1
            drillTier.groupTier = 0
            drillTier.filters.key = []
            drillTier.filters.group = []
          })
        },
        resetDrilldown: function (widgetNames, index) {
          if (_.isUndefined(index)) index = 1
          _.each(widgetNames, function (widget) {
            var w = _.find($scope.board.layout.rows, function (row) {
              if (row.type === 'widget') {
                return row.widgets[0].name == widget
              }
            }).widgets[0]
            var keys = w.widget.data.config.keys
            keys[index - 1].values = []
            keys.splice(index, keys.length - 1)
          })
        },
        initAll: function () {
          if (utils.widget.widgetNum !== utils.widget.loadWidgetNum) {     // 如果widget加载完，不再加载
            utils.widget.loadDelayWidget(false)
          }
        },
        sort: function (widget, column, sort) {
          var w = _.find($scope.board.layout.rows, function (row) {
            if (row.type === 'widget') {
              return row.widgets[0].name == widget
            }
          }).widgets[0]
          if (_.isUndefined(w)) {
            console.log('无对应的widget-', widget)
            return
          }
          var config = w.widget.data.config
          _.each(config.keys, function (key) {
            if ($.trim(key.col) === column || $.trim(key.column) === column ||
              $.trim(key.alias) === column) {
              key.sort = sort
            } else {
              key.sort = null
            }
          })
          _.each(config.groups, function (group) {
            if ($.trim(group.col) === column ||
              $.trim(group.column) === column ||
              $.trim(group.alias) === column) {
              group.sort = sort
            } else {
              group.sort = null
            }
          })
          _.each(config.values, function (value) {
            _.each(value.cols, function (col) {
              if ($.trim(col.col) === column || $.trim(col.alias) === column) {
                col.sort = sort
              } else {
                col.sort = null
              }
            })
          })
        },
        on: function (event, widgets, callback) {
          if (!drillCallbackMap[event]) {
            drillCallbackMap[event] = {}
          }
          _.each(widgets, function (widget) {
            if (!drillCallbackMap[event][widget]) {
              drillCallbackMap[event][widget] = [callback]
            } else {
              drillCallbackMap[event][widget].push(callback)
            }
          })
        },
        hide(widgetName) {
          _.each($scope.board.layout.rows, function (row) {
            _.each(row.widgets, function (w) {
              if (w.name === widgetName) {
                w.hide = true
                w.config.isInit = false
              }
            })
          })
        },
        show(widgetName, position) {
          if (typeof position === 'undefined') position = {}
          _.each($scope.board.layout.rows, function (row) {
            _.each(row.widgets, function (w) {
              if (w.name === widgetName) {
                for (var key in position) {
                  w[key] = position[key]
                }
                w.hide = false
                w.config.isInit = true
                if (typeof w.realTimeTicket === 'undefined') {
                  $scope.reloadWidget(w, false, true)
                }
              }
            })
          })
        },
        tableDrilldown: function (names, column, value) {
          var widgetList = $scope.board.layout.rows
          _.each(names, function (relevanceName) {
            var relevanceTarget = _.find(widgetList, function (w) {
              if (w.type === 'widget') {
                return w.widgets[0].name === relevanceName
              }
            }).widgets[0]
            if (relevanceTarget) {
              // dataService.getTableDataDrillByWidget()[relevanceTarget.name].chartConfig.crossTable.drill.drillDown(current.id, drillName, relevance.render)
            }
          })
        },
        getPosition(widgetName) {
          _.each($scope.board.layout.rows, function (row) {
            _.each(row.widgets, function (w) {
              if (w.name === widgetName) {
                console.log(widgetName, 'position:', {
                  col: w.col,
                  row: w.row,
                  sizeX: w.sizeX,
                  sizeY: w.sizeY
                })
              }
            })
          })
        },
        setPagesize(wName, size) {
          var w = _.find($scope.board.layout.rows, function (row) {
            if (row.type === 'widget') {
              return row.widgets[0].name === wName
            }
          }).widgets[0]
          w.widget.data.config.option.pageDataNum = size
        }
      }
      $.params = {
        get: function (name) {
          for (var i = 0; i < $scope.board.layout.rows.length; i++) {
            var item = $scope.board.layout.rows[i]
            if (item.type !== 'widget') {
              if (item.config && item.config.eventName === name) {
                var eventName = item.config.eventName
                return BoardParamService.get(eventName)
              }
            }
          }
          return []
        },
        set: function (name, value) {
          for (var i = 0; i < $scope.board.layout.rows.length; i++) {
            var item = $scope.board.layout.rows[i]
            if (item.type !== 'widget') {
              if (item.config && item.config.eventName === name) {
                var eventName = item.config.eventName
                BoardParamService.set(eventName, value)
                if (item.sign === 'capsule') {// 如果是胶囊按钮
                  item.config.activeName = value
                  return false
                }
                if (item.config.showValue !== value)
                  $scope.$applyAsync(function () {
                    item.config.showValue = value
                  })
                return false
              }
            }
          }
          BoardParamService.set(name, value)
        },
        setSelect: function (showName, eventName, list) {
          var $target = $('#select_' + showName)
          if (typeof list === 'undefined') {
            list = eventName
            eventName = showName
            $target = $('[data-eventName=' + eventName + ']')
          }
          if ($target.size()) {
            if (list.length) {
              var value = list
              if ($target.hasClass('isSingle')) {
                value = list[0]
              }
              BoardParamService.set(eventName, value)
              $target.multipleSelect('setSelects', list)
            } else {
              BoardParamService.set(eventName, [])
              $target.multipleSelect('checkAll')
            }
          } else {
            BoardParamService.set(eventName, list)
          }
        }
      }
      $.filters = {
        get: function (name) {
          $scope.board.layout.rows.forEach(function (item) {
            if (item.type === 'param') {
              item.params.forEach(function (param) {
                if (param.name === name) {
                  return BoardParamService.get(name)
                }
              })
            }
          })
        },
        set: function (name, list) {
          directApplyParamFilter2([
            {
              column: name,
              datasetId: '',
              type: '=',
              values: list
            }])
        },
        setSelect: function (showName, eventName, list) {
          $.params.setSelect(showName, eventName, list)
        },
        autoCalc: function () {
          let param = []
          let ignoreWidgetIdList = ['']
          for (let i in utils.widget.boardParamKeyArr) {
            let objParam = {
              column: utils.widget.boardParamKeyArr[i],
              datasetId: '',
              type: '=',
              values: []
            }
            let valueArr = BoardParamService.get(
              utils.widget.boardParamKeyArr[i])
            objParam.values = valueArr
            if (typeof valueArr === 'object' && valueArr.length >= 0) {
              param.push(objParam)
            }
          }
          directApplyParamFilter2(param, undefined, ignoreWidgetIdList)
          if (utils.widget.widgetNum !== utils.widget.loadWidgetNum) {     // 如果widget加载完，不再加载
            utils.widget.loadDelayWidget(false)
          }
        },
        remove: function (key) {
          BoardParamService.remove(key)
        }
      }
      $.iframes = {
        calcUrl: function () {
          var argReg = /\[&[^\]]+/g // 查找预计算中的变量正则
          _.each($scope.board.layout.rows, function (row) {
            if (row.config && row.config.url && row.config.isExp &&
              row.config.exp) {
              argList = row.config.exp.match(argReg)
              var allHave = true
              var exp = row.config.exp
              for (var i = 0; i < argList.length; i++) {
                var argName = argList[i].substr(2)
                var argValue = BoardParamService.get(argName)
                if (typeof argValue !== 'undefined') {
                  exp = exp.replace('[&' + argName + ']', '"' + argValue + '"')
                } else {
                  allHave = false
                  break
                }
              }
              if (allHave) {
                try {
                  var value = eval(exp)
                  $scope.$applyAsync(function () {
                    row.config.showUrl = value
                  })
                } catch (e) {
                  console.error(e)
                }
              }
            }
          })
        }
      }
      $.events = {
        on: function (name, func) {
          EventService.on(name, func)
        },
        trigger: function (name, data) {
          EventService.trigger(name, data)
        },
        off: function (name) {
          EventService.off(name)
        }
      }
      $.highlight = {
        setSeries: function (widgetName, seriesArr) {
          var render = window.$$dlut_renders[widgetName]
          if (render) {
            var instance = render.ecc
            var option = render.options
            if (instance && option) {
              var series = option.series
              if (series) {
                instance.showLoading()
                for (var i = 0; i < series.length; i++) {
                  if (typeof series[i].lineStyle === 'undefined') {
                    series[i].lineStyle = {}
                  }
                  if (typeof series[i].itemStyle === 'undefined') {
                    series[i].itemStyle = {}
                  }
                  series[i].lineStyle.opacity = .3
                  series[i].itemStyle.opacity = .3
                  if (seriesArr) {
                    var isRightSeries = seriesArr.length === 0 ||
                      seriesArr.indexOf(series[i].name) > -1
                    if (isRightSeries) {
                      series[i].lineStyle.opacity = 1
                      series[i].itemStyle.opacity = 1
                    }
                  }
                }
                instance.setOption(option)
                instance.hideLoading()
              }
            }
          }
        },
        cancelSeries: function (widgetName) {
          var render = window.$$dlut_renders[widgetName]
          if (render) {
            var instance = render.ecc
            var option = render.options
            if (instance && option) {
              var series = option.series
              if (series)
                for (var i = 0; i < series.length; i++) {
                  if (typeof series[i].lineStyle === 'undefined') {
                    series[i].lineStyle = {}
                  }
                  if (typeof series[i].itemStyle === 'undefined') {
                    series[i].itemStyle = {}
                  }
                  series[i].lineStyle.opacity = 1
                  series[i].itemStyle.opacity = 1
                }
              instance.setOption(option)
            }
          }
        },
        set: function (widgetName, seriesArr, dataName) {
          var render = window.$$dlut_renders[widgetName]
          if (render) {
            var instance = render.ecc
            var option = render.options
            if (instance && option) {
              instance.showLoading()
              var series = option.series
              var dataIndex = undefined
              var isFunction = false
              if (dataName) {
                var axisData
                if (option.xAxis && option.xAxis.type === 'category' &&
                  option.xAxis.data) {
                  axisData = option.xAxis.data
                } else if (option.yAxis && option.yAxis.type === 'category' &&
                  option.yAxis.data) {
                  axisData = option.yAxis.data
                }
                if (typeof dataName !== 'string') {
                  isFunction = true
                }
                if (axisData)
                  dataIndex = axisData.indexOf(dataName)
              }
              if (series) {
                for (var i = 0; i < series.length; i++) {
                  if (typeof series[i].lineStyle === 'undefined') {
                    series[i].lineStyle = {}
                  }
                  series[i].lineStyle.opacity = .3
                  if (seriesArr) {
                    var isRightSeries = seriesArr.length === 0 ||
                      seriesArr.indexOf(series[i].name) > -1
                    if (isRightSeries) {
                      series[i].lineStyle.opacity = 1
                    }
                    for (var j = 0; j < series[i].data.length; j++) {
                      var data = series[i].data[j]
                      if (typeof data === 'number') break
                      if (!data.itemStyle) {
                        data.itemStyle = {}
                      }
                      if (series[i].type === 'pie') {
                        series[i].labelLine = {
                          show: false
                        }
                        data.itemStyle.opacity = .6
                      } else {
                        data.itemStyle.opacity = .3
                      }
                      if (isRightSeries) {
                        if (isFunction && data.eventInfo) {
                          if (typeof data.infoMap === 'undefined') {
                            data.infoMap = {}
                            for (var k in data.eventInfo) {
                              var item = data.eventInfo[k]
                              if (item.col)
                                data.infoMap[item.col] = item.value
                            }
                          }
                          var result = dataName(data.infoMap)
                          if (result) {
                            data.itemStyle.opacity = 1
                            series[i].lineStyle.opacity = 1
                          } else {
                            series[i].lineStyle.opacity = .3
                          }
                        }
                        else if (typeof dataName === 'undefined' ||
                          data.name === dataName || j === dataIndex) {
                          data.itemStyle.opacity = 1
                        }
                      }
                    }
                  }
                }
                instance.setOption(option)
                instance.hideLoading()
              }
            }
          }
        },
        cancel: function (widgetName) {
          var render = window.$$dlut_renders[widgetName]
          if (render) {
            var instance = render.ecc
            var option = render.options
            if (instance && option) {
              var series = option.series
              for (var i = 0; i < series.length; i++) {
                if (typeof series[i].lineStyle === 'undefined') {
                  series[i].lineStyle = {}
                }
                series[i].lineStyle.opacity = 1
                for (var j = 0; j < series[i].data.length; j++) {
                  if (typeof series[i].data[j].itemStyle === 'undefined') {
                    series[i].data[j].itemStyle = {}
                  }
                  series[i].data[j].itemStyle.opacity = 1
                }
              }
              instance.setOption(option)
            }
          }
        },
        setTable: function (widgetName, obj) {
          var trList = $('table[widget=\'' + widgetName + '\']')
            .find('tbody tr')
          _.each(trList, function (tr) {
            $(tr).removeClass()
          })
          _.each(trList, function (tr) {
            _.each($(tr).find('td'), function (td) {
              _.map(obj, function (value, key) {
                if (key === $.trim($(td).data('column')) &&
                  value === $.trim($(td).data('value'))) {
                  $(td).parents('tr').removeClass()
                  $(td).parents('tr').addClass('highlight_tr')
                } else {
                  if (!$(td).parents('tr').hasClass('highlight_tr')) $(td)
                    .parents('tr')
                    .addClass('dim_tr')
                }
              })
            })
          })
        },
        cancelTable: function (widgetName) {
          var trList = $('table[widget=\'' + widgetName + '\']')
            .find('tbody tr')
          _.each(trList, function (tr) {
            $(tr).removeClass()
          })
        }
      }
      $.alert = function (info, type, size) {
        ModalUtils.alert(info, type, size)
      }
      $.ibm = {
        colors: {
          blue: '#11A0F8',
          green: '#26C8A4',
          purple: '#BF8FE1',
          blue2: '#337FFF',
          orange: '#FF8426',
          yellow: '#FFBB44',
          pink: '#FF7872',
          green2: '#7ACE4C',
          black: '#354052',
          gray: '#7F8FA4'
        }
      }
      $.colors = {
        red: '#FF7872',
        green: '#7ACE4C',
        yellow: '#FFB85E',
        gray: '#EEEEEE',
        blue: '#11A0F8',
        orange: '#f28e2b'
      }
      $.board = {
        onClickBlank: function (callback) {
          return
        },
        flex: {
          reload: function (name) {
            for (var i = 0; i < $scope.board.layout.rows.length; i++) {
              var item = $scope.board.layout.rows[i]
              if (item.type !== 'widget') {
                if (item.sign === 'flex' && item.config &&
                  item.config.flexCode && item.config.eventName === name) {
                  try {
                    var params = BoardParamService.getAll()
                    var HTML = (new Function('params',
                      'return (' + item.config.flexCode + ')(params)'))
                    (params)
                    item.config.showHTML = $sce.trustAsHtml(HTML)
                  } catch (e) {
                    console.error('board Flex eval语句出错', item.config.flexCode,
                      e)
                  }
                }
              }
            }
          }
        }
      }
      $.start = function () {
        if (_.isUndefined(window.$$orangle_param)) {// 如果还没有原始值，则先获取原始值
          getOrangleParam()
        }
        getParamByOrangle()
        $('body').removeClass()
        $('#globalLoading').hide()
        $scope.started = true
        $.widgets.initAll()
        $.iframes.calcUrl()
      }
      $.chainHeadParams = function (arr) {
        utils.chainHeadParamsArr = arr       // 存储传来的链式触发的第一位的数组
      }
      /*-------------------------------------五. 结束--------------------------------------*/
      /*---------------------六. 一些不知道用处，也没找到在哪用的方法--------------------------*/
      // 导出excel
      // $scope.exportXLSX = function (widget) {
      //   var data = transForEXCEL(window.$$EXCEL[widget.widget.data.wName])
      //   var ws = XLSX.utils.json_to_sheet(data)
      //   var wb = XLSX.utils.book_new()
      //   XLSX.utils.book_append_sheet(wb, ws, "sheet1")
      //   XLSX.writeFile(wb, widget.widget.data.wName + ".xlsx")
      // }
      // 好像是可以废弃的方法
      // var directApplyParamFilter = function (param, init, ignoreList) {
      //   var widgetList = []
      //   if (param.length > 0) {
      //     _.each(param, function (initParam) {
      //       var datasetId = initParam.datasetId
      //       $http.post('/dataRelated/getCommonDimList.do', {
      //         datasetId: datasetId,
      //         col: initParam.column
      //       }).success(function (returnData) {
      //         var result = []
      //         if (returnData.length > 0) {
      //           if (returnData[0].dimMaps)
      //             result = returnData[0].dimMaps
      //         }
      //         if (result.length == 0) {
      //           result.push({
      //             col: initParam.column,
      //             datasetId: datasetId
      //           })
      //         }
      //         var titleName = datasetId + '_' + initParam.column
      //         if (returnData.datasetId) {
      //           titleName = returnData.datasetId + '_' + returnData.col
      //         }
      //         $scope.globalParamTitleMap[titleName] = {
      //           col: initParam.column,
      //           type: initParam.type,
      //           values: initParam.values
      //         }
      //         var relatedMap = {}
      //         for (var i = 0; i < result.length; i++) {
      //           var relatedItem = result[i]
      //           relatedMap[relatedItem.datasetId] = relatedItem
      //           if (_.isUndefined(
      //             $scope.datasetFilters[relatedItem.datasetId])) {
      //             $scope.datasetFilters[relatedItem.datasetId] = []
      //           }
      //           var newFilterItem = {
      //             col: relatedItem.col,
      //             type: initParam.type,
      //             values: initParam.values
      //           }
      //           var datasetFilter = _.find(
      //             $scope.datasetFilters[relatedItem.datasetId],
      //             function (item) {
      //               return item.col == newFilterItem.col
      //             })
      //           if (datasetFilter)
      //             datasetFilter = newFilterItem
      //           else
      //             $scope.datasetFilters[relatedItem.datasetId].push(
      //               newFilterItem)
      //         }
      //         utils.params.updateGlobalParamTitle()
      //         var widgetList = []
      //         _.each($scope.board.layout.rows, function (row) {
      //           if (row.type == 'widget') {
      //             _.each(row.widgets, function (widget) {
      //               //不响应任何参数事件
      //               if (widget.config && widget.config.ignoreEvent) return
      //               //自身不影响
      //               if (ignoreList && widget.widgetId &&
      //                 _.indexOf(ignoreList, widget.widgetId) != -1)
      //                 return
      //               var widgetDatasetId = widget.widget.data.datasetId
      //               if (relatedMap[widgetDatasetId]) {
      //                 var relatedItem = relatedMap[widgetDatasetId]
      //                 if (_.isUndefined(
      //                   widget.widget.data.config.boardFilters)) {
      //                   widget.widget.data.config.boardFilters = []
      //                 }
      //                 var newFilter = {
      //                   col: relatedItem.col,
      //                   type: initParam.type,
      //                   values: initParam.values
      //                 }
      //                 var filterIndex = _.findIndex(
      //                   widget.widget.data.config.boardFilters,
      //                   function (filter) {
      //                     return filter.col == newFilter.col
      //                   })
      //                 if (filterIndex != -1)
      //                   widget.widget.data.config.boardFilters[filterIndex] = newFilter
      //                 else
      //                   widget.widget.data.config.boardFilters.push(newFilter)
      //                 var widgetId = widget.widgetId
      //                 var foundWidget = _.find(widgetList, function (w) {
      //                   return w.widgetId == widgetId
      //                 })
      //                 if (_.isUndefined(foundWidget))
      //                   widgetList.push(widget)
      //               }
      //             })
      //           } else if (row.type == 'param') {
      //             _.each(row.params, function (param) {
      //               for (var key in $scope.datasetFilters) {
      //                 for (var i = 0; i <
      //                 $scope.datasetFilters[key].length; i++) {
      //                   var filter = $scope.datasetFilters[key][i]
      //                   for (var j = 0; j < param.col.length; j++) {
      //                     var name = param.col[j].column
      //                     if (name == filter.col) {
      //                       param.values = filter.values
      //                     }
      //                   }
      //                 }
      //
      //               }
      //             })
      //           }
      //         })
      //         _.each(widgetList, function (widget) {
      //           // if (_.isUndefined(init)) {
      //           try {
      //             if (widget.realTimeTicket) {
      //               chartService.realTimeRender(widget.realTimeTicket,
      //                 widget.widget.data)
      //             }
      //             else widget.widget.data.config.boardFiltersByInit = true
      //           } catch (e) {
      //             console.error(e)
      //           }
      //         })
      //       })
      //     })
      //   }
      // }
      // reload and pre_filter
      $scope.load = function (reload) {
        $scope.paramInit = 0
        $scope.loading = true
        _.each($scope.intervals, function (e) {
          $interval.cancel(e)
        })
        $scope.intervals = []

        if ($scope.board) {
          _.each($scope.board.layout.rows, function (row) {
            _.each(row.widgets, function (widget) {
              widget.show = false
            })
          })
        }
        $http.get('dashboard/getBoardData.do?id=' + $stateParams.id +
          '&token=' + getQueryString('yili-token'))
          .success(function (response) {
            var datasetList = []
            _.each(response.layout.rows, function (row) {
              if (row.type == 'widget') {
                datasetList.push(row.widgets[0].widget.data.datasetId)
              }
            })
            var readyCallback = function () {
              $scope.intervalGroup = {}
              $scope.loading = false
              $scope.board = response
              _.each($scope.board.layout.rows, function (row) {
                _.each(row.params, function (param) {
                  $scope.paramInit++
                  if (!param.paramType) {
                    param.paramType = 'default'
                  }
                })
              })
              if (paramInitListener) {
                paramInitListener(reload)
              }
              if ($scope.board.layout.type == 'timeline') {
                groupTimeline()
              }
              if ($scope.paramInit == 0) {
                utils.widget.loadWidget(reload)
              }
              paramInitListener = $scope.$on('paramInitFinish',
                function (e, d) {
                  $scope.paramInit--
                  if ($scope.paramInit == 0) {
                    utils.widget.loadWidget(reload)
                  }
                })
              utils.params.clearAllSelectParams()
            }
            if (datasetList.length > 0)
              dataService.getDatasetList(datasetList).then(readyCallback)
            else
              readyCallback()
          })
      }
      $scope.widgetTransposition = function (widget) {
        var keys = angular.copy(widget.widget.data.config.keys)
        var groups = angular.copy(widget.widget.data.config.groups)
        var drillTier = angular.copy(widget.widget.data.config.drillTier)
        var realTimeTicket = widget.realTimeTicket
        widget.widget.data.config.keys = groups
        widget.widget.data.config.groups = keys
        widget.widget.data.config.drillTier.keyTier = drillTier.groupTier
        widget.widget.data.config.drillTier.groupTier = drillTier.keyTier
        widget.widget.data.config.drillTier.filters.key = drillTier.filters.group
        widget.widget.data.config.drillTier.filters.group = drillTier.filters.key
        chartService.realTimeRender(realTimeTicket, widget.widget.data)
      }
      $scope.downloadExcel = function (widget) {
        var data = transForEXCEL(window.$$EXCEL[widget.widget.data.wName])
        var ws = XLSX.utils.json_to_sheet(data)
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
        XLSX.writeFile(wb, widget.widget.data.wName + '.xlsx')

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
      }
      /*-------------------------------------六. 结束--------------------------------------*/
    })

const isArrayFn = function (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

const findNum = function (str) {
  return str.match(/\d+/g)
}
