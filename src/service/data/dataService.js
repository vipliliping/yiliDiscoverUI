/**
 * Created by yfyuan on 2016/8/12.
 */
'use strict'
discovery.service('dataService',
  function ($http, $q, updateService, ComputedValueService, BoardParamService) {
    'ngInject'
    var dataSetMap = {}
    var tableDrill = {}

    var getDatasetList = function (datasetId) {
      var deferred = $q.defer()
      var item = dataSetMap[datasetId]
      if (_.isUndefined(item)) {
        $http.get('dashboard/getDatasetById.do?id=' + datasetId)
          .success(function (data) {
            dataSetMap[datasetId] = data[0]
            deferred.resolve(data[0])
          })
      } else {
        deferred.resolve(item)
      }
      return deferred.promise
    }

    this.getDatasetList = function (datasetList) {
      var deferred = $q.defer()
      var dataList = ''
      _.each(datasetList, function (dataset) {
        dataSetMap[dataset]
        dataList += 'id=' + dataset + '&'
      })
      var ids = dataList.substring(0, dataList.length - 1)
      $.ajax({
        type: "POST",
        url: baseUrl + 'dashboard/getDatasetByIdList.do',
        traditional: true,
        data: {
          id: datasetList,
          token: getQueryString('yili-token')
        },
        dataType: "json",
        async: false
      }).success(function (response) {
        _.each(response, function (dataset) {
          if (_.isUndefined(dataSetMap[dataset.id])) {
            dataSetMap[dataset.id] = dataset
          }
        })
        deferred.resolve()
      })
      return deferred.promise
    }

    this.linkDataset = function (datasetId, chartConfig) {
      return linkDataset(datasetId, chartConfig)
    }

    var linkDataset = function (datasetId, chartConfig) {
      if (_.isUndefined(datasetId) || _.isUndefined(chartConfig)) {
        var deferred = $q.defer()
        deferred.resolve()
        return deferred.promise
      } else {
        return getDatasetList(datasetId).then(function (dataset) {
          var deferred = $q.defer()
          //link filter group
          _.each(chartConfig.filters, function (f) {
            if (f.group) {
              var group = _.find(dataset.data.filters, function (e) {
                return e.id == f.id
              })
              if (group) {
                f.filters = group.filters
                f.group = group.group
              }
            }
          })
          //link exp
          _.each(chartConfig.values, function (v) {
            _.each(v.cols, function (c) {
              if (c.type == 'exp') {
                var exp = _.find(dataset.data.expressions, function (e) {
                  return c.id == e.id
                })
                if (exp) {
                  c.exp = exp.exp
                  c.alias = exp.alias
                }
              }
            })
          })
          //link dimension
          var linkFunction = function (k) {
            if (k.id) {
              var _level
              var _dimension
              _.each(dataset.data.schema.dimension, function (e) {
                if (e.type == 'level') {
                  _.each(e.columns, function (c) {
                    if (c.id == k.id) {
                      _dimension = c
                      _level = e
                    }
                  })
                } else if (k.id == e.id) {
                  _dimension = e
                }
              })
              if (_dimension && _dimension.alias) {
                k.alias = _dimension.alias
                if (_level) {
                  k.level = _level.alias
                }
              }
            }
          }
          _.each(chartConfig.keys, linkFunction)
          _.each(chartConfig.groups, linkFunction)

          deferred.resolve(dataset.data ? dataset.data.schema : null)
          return deferred.promise
        })
      }
    }

    var getDimensionConfig = function (array, schema) {
      var result = []
      if (array) {
        _.each(array, function (e) {
          if (e.type == 'computedDimension') {
            var setResult = function (_e, c) {
              if (_e.dependOn.indexOf(c.alias) > -1 ||
                _e.dependOn.indexOf(c.column) > -1 ||
                _e.formula2.indexOf(c.alias) > -1 ||
                _e.formula2.indexOf(c.column) > -1) {
                result.push({
                  columnName: c.column,
                  filterType: c.filterType ? c.filterType : 'eq',
                  values: [],
                  id: c.id,
                  style: c.style ? c.style : 'string'
                })
              }
            }
            _.each(schema.dimension, function (dimension) {
              if (_.isArray(dimension.columns)) {
                _.each(dimension.columns, function (column) {
                  setResult(e, column)
                })
              } else {
                setResult(e, dimension)
              }
            })
          }
          else {
            if (_.isUndefined(e.group)) {
              result.push({
                columnName: e.col,
                filterType: e.type,
                values: e.values,
                id: e.id,
                style: e.style ? e.style : 'string'
              })
            } else {
              _.each(e.filters, function (f) {
                var hasValue = false
                if (f.isExp && f.exp) {
                  var reg = /\[&[^\]]+/g
                  var argsList = f.exp.match(reg)
                  var allArgsHad = true
                  // var expResult = null
                  var exp = f.exp
                  if (argsList)
                    for (var i = 0; i < argsList.length; i++) {
                      var argName = argsList[i].substr(2)
                      var argValue = BoardParamService.get(argName)
                      if (typeof argValue === 'undefined') {
                        allArgsHad = false
                        break
                      } else {
                        exp = exp.replace('[&' + argName + ']', '(' + argValue + ')')
                      }
                    }
                  try {
                    var expResult = eval(exp)
                    hasValue = true
                    result.push({
                      columnName: f.col,
                      filterType: f.type,
                      values: [expResult],
                      style: f.style ? f.style : 'string'
                    })
                    // debugger
                  } catch (e) {
                    console.error(
                      'dataService:function-getDimensionConfig,row-111,eval(exp)执行错误',
                      e)
                  }
                }
                if (!hasValue)
                  result.push(
                    {columnName: f.col, filterType: f.type, values: f.values})
              })
            }
          }
        })
      }
      return result
    }

    this.getDimensionValues = function (datasource, query, datasetId, colmunName, chartConfig, callback) {
      chartConfig = angular.copy(chartConfig)
      linkDataset(datasetId, chartConfig).then(function (schema) {
        var cfg = undefined
        if (chartConfig) {
          cfg = {rows: [], columns: [], filters: []}
          cfg.rows = getDimensionConfig(chartConfig.keys, schema)
          cfg.columns = getDimensionConfig(chartConfig.groups, schema)
          cfg.filters = getDimensionConfig(chartConfig.filters, schema)
        }

        $http.post('dashboard/getDimensionValues.do', {
          datasourceId: datasource,
          query: angular.toJson(query),
          datasetId: datasetId,
          colmunName: colmunName,
          cfg: angular.toJson(cfg)
        }).success(function (response) {
          callback(response)
        })
      })
    }

    this.getDataSeries = function (datasource, widget, datasetId, chartConfig, callback, reload, isPreview) {
      widget.loadingCircle = true
      chartConfig = angular.copy(chartConfig)
      updateService.updateConfig(chartConfig)
      linkDataset(datasetId, chartConfig).then(function (schema) {
        var ComputedValues = ComputedValueService.precomputation(chartConfig, schema)

        chartConfig.computedValue = ComputedValues.values
        chartConfig.computedKey = ComputedValues.keys
        chartConfig.computedGroup = ComputedValues.groups

        if (_.isUndefined(widget.query)) {
          widget.query = {}
        }

        if (isPreview) {// 如果是preview页面，获取全局变量
          widget.query.param = {}
          _.each(BoardParamService.getAll(), function (value, key) {
            var select = _.find(widget.paramList, function (param) {
              return param.column == key
            })
            if (select) {
              if (select.selector === 'multiple') {
                var v = "'" + [value[0]].join("','") + "'"
                widget.query.param[key] = v
              } else {
                widget.query.param[key] = value[0]
              }
            }
          })
        }

        var getDrillDataCfg = function (chartConfig, schema) {
          var config = {}
          var keys = chartConfig.keys
          var groups = chartConfig.groups
          var filters = []
          var drillTier = chartConfig.drillTier
          config.rows = []
          config.columns = []
          _.each(keys, function (key) {
            if (!_.isUndefined(key.drillDown)) {
              var drillValues = []
              if (drillTier.keyTier > 0 && !drillTier.isGreat) {
                _.each(key.drillDown.slice(0, drillTier.keyTier),
                  function (e, index) {
                    drillValues.push({
                      columnName: e.col,
                      filterType: '=',
                      values: drillTier.filters.key[index]
                    })
                  })
              }
              filters = filters.concat(drillValues)
              if (drillTier.isGreat) {
                config.rows = config.rows.concat(
                  greatRowsPackage(key.drillDown, drillTier.keyTier))
              } else {
                config.rows.push({
                  columnName: key.drillDown[drillTier.keyTier].col,
                  filterType: key.drillDown[drillTier.keyTier].type,
                  values: key.drillDown[drillTier.keyTier].values,
                  id: key.drillDown[drillTier.keyTier].id
                })
              }
            } else {
              if (key.type == 'computedDimension') {
                _.each(schema.dimension, function (dimension) {
                  if (key.dependOn.indexOf(dimension.alias) > -1 ||
                    key.dependOn.indexOf(dimension.column) > -1 ||
                    key.formula2.indexOf(dimension.alias) > -1 ||
                    key.formula2.indexOf(dimension.column) > -1) {
                    config.rows.push({
                      columnName: dimension.column,
                      filterType: dimension.filterType
                        ? dimension.filterType
                        : 'eq',
                      values: [],
                      id: dimension.id
                    })
                  }
                })
                config.rows = _.uniq(config.rows)
              } else {
                config.rows.push({
                  columnName: key.col,
                  filterType: key.type,
                  values: key.values,
                  id: key.id
                })
              }
            }
          })
          _.each(groups, function (group) {
            if (!_.isUndefined(group.drillDown)) {
              var drillValues = []
              if (drillTier.groupTier > 0 && !drillTier.isGreat) {
                _.each(group.drillDown.slice(0, drillTier.groupTier),
                  function (e, index) {
                    drillValues.push({
                      columnName: e.col,
                      filterType: '=',
                      values: drillTier.filters.group[index]
                    })
                  })
              }
              filters = filters.concat(drillValues)
              config.columns.push({
                columnName: group.drillDown[drillTier.groupTier].col,
                filterType: group.drillDown[drillTier.groupTier].type,
                values: group.drillDown[drillTier.groupTier].values,
                id: group.drillDown[drillTier.groupTier].id
              })
            } else {
              if (group.type == 'computedDimension') {
                _.each(schema.dimension, function (dimension) {
                  if (group.dependOn.indexOf(dimension.alias) > -1 ||
                    group.dependOn.indexOf(dimension.column) > -1 ||
                    group.formula2.indexOf(dimension.alias) > -1 ||
                    group.formula2.indexOf(dimension.column) > -1) {
                    config.columns.push({
                      columnName: dimension.column,
                      filterType: dimension.filterType
                        ? dimension.filterType
                        : 'eq',
                      values: [],
                      id: dimension.id
                    })
                  }
                })
                config.columns = _.uniq(config.columns)
              } else {
                config.columns.push({
                  columnName: group.col,
                  filterType: group.type,
                  values: group.values,
                  id: group.id
                })
              }
            }
          })

          // 如果是树形表格下钻，增加过滤条件
          if (chartConfig.chart_type) {
            _.each(drillTier.treeGridFilters, function (v, k) {
              filters.push({
                columnName: k,
                filterType: '=',
                values: v,
                style: 'string'
              })
            })
          }
          config.filters = filters

          function greatRowsPackage(drillDown, keyTier) {
            var rows = []
            _.each(drillDown, function (drill, index) {
              if (index <= keyTier) {
                rows.push({
                  columnName: drill.col,
                  filterType: drill.type,
                  values: drill.values,
                  id: drill.id
                })
              }
            })
            return rows
          }

          return config
        }
        // 行维、列维去重方法
        var DuplicateRowColumn = function (cfg) {
          var rows = cfg.rows
          var columns = cfg.columns
          var temp = {}
          var repeatIndex = []

          _.each(rows, function (row, index) {
            temp[row.columnName] = true
          })
          _.each(columns, function (col, index) {
            if (temp[col.columnName] === true) {
              repeatIndex.push(index)
            }
          })
          _.each(repeatIndex, function (index) {
            columns.splice(index, 1)
          })
          return cfg
        }

        var dataSeries = getDataSeries(chartConfig)
        var cfg = {rows: [], columns: [], filters: []}
        cfg.rows = getDimensionConfig(chartConfig.keys, schema)
        cfg.columns = getDimensionConfig(chartConfig.groups, schema)
        cfg.filters = getDimensionConfig(chartConfig.filters, schema)
        cfg.events = getDimensionConfig(chartConfig.events, schema)
        cfg.filters = cfg.filters.concat(
          getDimensionConfig(chartConfig.boardFilters, schema))
        cfg.values = _.map(dataSeries, function (s) {
          return {column: s.name, aggType: s.aggregate}
        })
        // 如果没有配置任何行维、列维、指标等，不予请求
        if (cfg.rows.length == 0 && cfg.columns.length == 0 &&
          cfg.filters.length == 0
          && cfg.events.length == 0 && cfg.filters.length == 0 &&
          cfg.values.length == 0)
          return

        var config = getDrillDataCfg(chartConfig, schema)
        if (config.rows.length) {
          cfg.rows = config.rows
        }
        if (config.columns.length) {
          cfg.columns = config.columns
        }
        if (config.filters.length) {
          cfg.filters = cfg.filters.concat(config.filters)
        }

        cfg = DuplicateRowColumn(cfg)
        var query = widget.query ? widget.query : {}
        if (typeof query.param === 'undefined')
          query.param = {}
        var boardParams = BoardParamService.getAll()
        var copyParams = {}
        for (var key in boardParams) {
          var bParam = boardParams[key]
          if (_.isArray(bParam) && bParam.length === 0) bParam = "'all'"// 多选的筛选器，全部选和全选是一样的
          if (bParam === 'all') bParam = "'all'"
          else if (_.isArray(bParam)) bParam = "'" + bParam.join("','") + "'"
          copyParams[key] = bParam
        }
        query.param = copyParams
        /*
        //cols发字符串
        query.param.cols = ""
        cfg.rows.forEach(function (item) {
          query.param.cols += "'" + item.columnName + "'" + ','
        })
        cfg.columns.forEach(function (item) {
          query.param.cols += "'" + item.columnName + "'" + ','
        })
        */
        query.param.cols = []
        var colsMap = {}
        cfg.rows.forEach(function (item) {
          colsMap[item.columnName] = true
        })
        cfg.columns.forEach(function (item) {
          colsMap[item.columnName] = true
        })
        for (var key in colsMap) {
          query.param.cols.push(key)
        }
        // query.param.cols = query.param.cols.slice(0, query.param.cols.length - 1)
        // 为filters和row添加类型,string,number
        for (var i in cfg.filters) {
          if (!cfg.filters[i].style) {
            cfg.filters[i].style = 'string'
          }
        }
        for (var i in cfg.rows) {
          if (!cfg.rows[i].style) {
            cfg.rows[i].style = 'string'
          }
        }
        var wheres = []
        if (cfg.rows)
          for (var i = 0; i < cfg.rows.length; i++) {
            if (cfg.rows[i].values && cfg.rows[i].values.length > 0) {
              var value = cfg.rows[i].values
              if (typeof value === 'string') value = [value]
              // if (cfg.rows[i].values.length === 1)
              //   value = cfg.rows[i].values[0]
              wheres.push({
                name: cfg.rows[i].columnName,
                type: '=',
                value: value
              })
            }
          }
        if (cfg.filters)
          for (var i = 0; i < cfg.filters.length; i++) {
            var filter = cfg.filters[i]
            var value = filter.values
            if (typeof value === 'string') value = [value]
            wheres.push({
              name: filter.columnName,
              type: filter.filterType,
              value: value
            })
          }
        for (var i = 0; i < wheres.length; i++) {
          for (var j = 0; j < wheres[i].value.length; j++) {
            if (typeof wheres[i].value[j] === 'string')
              wheres[i].value[j] = "'" + wheres[i].value[j] + "'"
          }
        }
        query.param['func_whrcols'] = wheres
        // debugger
        // var query =
        try {
          if (chartConfig.option && chartConfig.option.advancedOption) {
            $.extend(query, JSON.parse(chartConfig.option.advancedOption))
          }
        } catch (e) {
          console.error('advancedOption error', chartConfig.option.advancedOption)
        }
        query.param["func_grpcols"] = query.param.cols
        for (var q in query.param) {
          if (query.param[q] === '-1' || query.param[q] === -1) {
            query.param[q] = undefined
          }
        }
        $http.post('dashboard/getAggregateData.do', {
          datasourceId: datasource,
          query: angular.toJson(query),
          datasetId: datasetId,
          cfg: angular.toJson(cfg),
          reload: reload,
          cache: widget.config.redis,
          token: getQueryString('yili-token')
        }).success(function (data) {
          var computedData = ComputedValueService.replaceDisplay(data,
            chartConfig)

          var result = castRawData2Series(computedData, chartConfig, widget.wName)
          result.chartConfig = chartConfig
          result.wName = widget.wName
          // 保存面板界面的widget
          if (!window.$$EXCEL) {
            window.$$EXCEL = {}
          }
          // if (widget.wName) {
          //   window.$$EXCEL[widget.wName] = {
          //     columnList: data.columnList,
          //     data: data.data
          //   }
          // }
          if (!_.isUndefined(datasetId)) {
            getDrillConfig(datasetId, chartConfig).then(function (c) {
              result.drill = {config: c}
              tableDrill[widget.wName] = result
              callback(result)
            })
          } else {
            callback(result)
          }
          widget.loadingCircle = false
        })
      })
    }

    this.getDrillPath = function (datasetId, id) {
      var deferred = $q.defer()
      getDatasetList(datasetId).then(function (dataset) {
        var path = []
        var level
        _.each(dataset.data.schema.dimension, function (_e) {
          if (_e.type == 'level') {
            _.each(_e.columns, function (_c) {
              if (_c.id == id) {
                path = _e.columns
                level = _e
              }
            })
          }
        })
        path = _.map(path, function (e) {
          return {
            id: e.id,
            alias: e.alias,
            col: e.column,
            level: level.alias,
            type: '=',
            values: [],
            sort: 'sort'
            // sort: 'asc'
          }
        })
        deferred.resolve(path)
      })
      return deferred.promise
    }

    var getDrillConfig = function (datasetId, chartConfig) {
      var deferred = $q.defer()
      getDatasetList(datasetId).then(function (dataset) {
          var drillConfig = {}
          if (!dataset.data.schema || dataset.data.schema.dimension.length == 0) {
            deferred.resolve(drillConfig)
            return deferred.promise
          }
          var _f = function (array) {
            _.each(array, function (c, i_array) {
              var level
              var i_level
              var dimensionId, iIndex, iLength
              _.find(dataset.data.schema.dimension, function (_e) {
                if (_e.type == 'level') {
                  return _.find(_e.columns, function (_c, _i) {
                    if (_c.id == c.id) {
                      level = _e
                      i_level = _i
                      dimensionId = _e.id
                      iLength = _e.columns
                      return true
                    }
                  })
                }
              })
              if (!level) {
                return
              }
              var prevIsInLevel = false
              if (i_array > 0 && i_level > 0) {
                prevIsInLevel = array[i_array - 1].id ==
                  level.columns[i_level - 1].id
              }

              var prevDrilled = i_array > 0
              //&& array[i_array - 1].type == '='

              // var prevDrilled = i_array > 0 && array[i_array - 1].values.length ==
              //     1 && array[i_array - 1].type == '='

              var nextIsInLevel = false
              if (i_array < array.length - 1 && i_level < level.columns.length - 1) {
                nextIsInLevel = array[i_array + 1].id == level.columns[i_level + 1].id
              }
              var isLastLevel = i_level == level.columns.length - 1
              var drillDownExistIdx = 0
              var drillDownExist = _.find(array, function (e, i) {
                if (i_level < level.columns.length - 1 && level.columns[i_level + 1].id == e.id) {
                  drillDownExistIdx = i
                  return true
                }
              })
              //if next level exist in array,the level must be the next of current
              var drillDown = drillDownExist
                ? drillDownExistIdx == i_array + 1
                : true


              var up = i_level > 0 && i_array > 0 && prevIsInLevel &&
                (i_array == array.length - 1 || !nextIsInLevel) && prevDrilled

              var down = (nextIsInLevel || !isLastLevel) && drillDown

              //   && (!prevIsInLevel || (array[i_array - 1].type == '=' && array[i_array - 1].values.length == 1))
              drillConfig[c.id] = {
                up: up,
                down: down,
                dimensionId: dimensionId,
                length: iLength,
                index: i_level
              }
            })
          }
          _f(chartConfig.keys)
          _f(chartConfig.groups)
          deferred.resolve(drillConfig)
        }
      )
      return deferred.promise
    }

    this.viewQuery = function (params, callback) {
      params.config = angular.copy(params.config)
      updateService.updateConfig(params.config)
      linkDataset(params.datasetId, params.config).then(function (schema) {
        var dataSeries = getDataSeries(params.config)
        var cfg = {rows: [], columns: [], filters: []}
        cfg.rows = getDimensionConfig(params.config.keys, schema)
        cfg.columns = getDimensionConfig(params.config.groups, schema)
        cfg.filters = getDimensionConfig(params.config.filters, schema)
        cfg.filters = cfg.filters.concat(
          getDimensionConfig(params.config.boardFilters, schema))
        cfg.values = _.map(dataSeries, function (s) {
          return {column: s.name, aggType: s.aggregate}
        })
        $http.post('dashboard/viewAggDataQuery.do', {
          datasourceId: params.datasource,
          query: angular.toJson(params.query),
          datasetId: params.datasetId,
          cfg: angular.toJson(cfg)
        }).success(function (response) {
          callback(response[0])
        })
      })
    }

    this.getColumns = function (option) {
      option.query = angular.copy(option.query)
      if (typeof option.query === 'undefined') option.query = {}
      option.query.param = {}
      if (option.paramList && option.paramList.paramList && _.isArray(option.paramList.paramList)) {
        _.each(option.paramList.paramList, function (param) {
          if (param.selector == 'multiple') {
            option.query.param[param.column] = '1'
          } else {
            option.query.param[param.column] = '1'
          }
        })
      }
      $http.post('dashboard/getColumns.do', {
        datasourceId: option.datasource,
        query: option.query ? angular.toJson(option.query) : null,
        datasetId: option.datasetId,
        reload: option.reload
      }).success(function (response) {
        option.callback(response)
      })
    }
    this.getColumnsByDatasetConfig = function (option) {
      $http.get('dashboard/getDatasetById.do?id=' + option.datasetId)
        .success(function (response) {
          option.callback(response[0])
        })
    }
    var getDataSeries = function (chartConfig) {
      var result = []
      _.each(chartConfig.values, function (v) {
        _.each(v.cols, function (c) {
          var series = configToDataSeries(c)
          _.each(series, function (s) {
            if (!_.find(result, function (e) {
                return JSON.stringify(e) == JSON.stringify(s)
              })) {
              result.push(s)
            }
          })
        })
      })
      return result
    }

    var configToDataSeries = function (config) {
      switch (config.type) {
        case 'exp':
          return getExpSeries(config.exp)
          break
        case 'computed':
          return getComputedSeries(config)
          break
        default:
          return [
            {
              name: config.col || config.column,
              aggregate: config.aggregate_type || null
            }]
          break
      }
    }

    var getComputedSeries = function (config) {
      var computedSeries = []
      _.each(config.dependOn, function (c) {
        computedSeries.push({
          name: c.column,
          aggregate: c.aggType || 'sum'
        })
      })
      return computedSeries
    }

    var getExpSeries = function (exp) {
      return parserExp(exp).aggs
    }

    var filter = function (cfg, iv) {
      switch (cfg.f_type) {
        case '=':
        case 'eq':
          for (var i = 0; i < cfg.f_values.length; i++) {
            if (iv == cfg.f_values[i]) {
              return true
            }
          }
          return cfg.f_values.length == 0
        case '≠':
        case 'ne':
          for (var i = 0; i < cfg.f_values.length; i++) {
            if (iv == cfg.f_values[i]) {
              return false
            }
          }
          return true
        case '>':
          var v = cfg.f_values[0]
          var params = toNumber(iv, v)
          if (!_.isUndefined(v) && params[0] <= params[1]) {
            return false
          }
          return true
        case '<':
          var v = cfg.f_values[0]
          var params = toNumber(iv, v)
          if (!_.isUndefined(v) && params[0] >= params[1]) {
            return false
          }
          return true
        case '≥':
          var v = cfg.f_values[0]
          var params = toNumber(iv, v)
          if (!_.isUndefined(v) && params[0] < params[1]) {
            return false
          }
          return true
        case '≤':
          var v = cfg.f_values[0]
          var params = toNumber(iv, v)
          if (!_.isUndefined(v) && params[0] > params[1]) {
            return false
          }
          return true
        case '(a,b]':
          var a = cfg.f_values[0]
          var b = cfg.f_values[1]
          var params = toNumber(iv, a, b)
          if (!_.isUndefined(a) && !_.isUndefined(b) &&
            (params[0] <= params[1] || params[0] > params[2])) {
            return false
          }
          return true
        case '[a,b)':
          var a = cfg.f_values[0]
          var b = cfg.f_values[1]
          var params = toNumber(iv, a, b)
          if (!_.isUndefined(a) && !_.isUndefined(b) &&
            (params[0] < params[1] || params[0] >= params[2])) {
            return false
          }
          return true
        case '(a,b)':
          var a = cfg.f_values[0]
          var b = cfg.f_values[1]
          var params = toNumber(iv, a, b)
          if (!_.isUndefined(a) && !_.isUndefined(b) &&
            (params[0] <= params[1] || params[0] >= params[2])) {
            return false
          }
          return true
        case '[a,b]':
          var a = cfg.f_values[0]
          var b = cfg.f_values[1]
          var params = toNumber(iv, a, b)
          if (!_.isUndefined(a) && !_.isUndefined(b) &&
            (params[0] < params[1] || params[0] > params[2])) {
            return false
          }
          return true
        default:
          return true
      }
    }

    var toNumber = function () {
      var arr = _.isArray(arguments[0]) ? arguments[0] : arguments
      var result = []
      for (var i = 0; i < arr.length; i++) {
        var a = Number(arr[i])
        if (isNaN(a)) {
          return arr
        } else {
          result.push(a)
        }
      }
      return result
    }
    this.toNumber = toNumber

    /**
     * Cast the aggregated raw data into data series
     * @param rawData
     * @param chartConfig
     */
    var castRawData2Series = function (aggData, chartConfig, wName) {
      var castedKeys = new Array()
      var castedGroups = new Array()
      var joinedKeys = {}
      var joinedGroups = {}
      var newData = {}

      var getIndex = function (columnList, col) {
        var result = new Array()
        if (col) {
          for (var j = 0; j < col.length; j++) {
            var idx = _.find(columnList, function (e) {
              return e.name == col[j]
            })
            result.push(idx.index)
          }
        }
        return result
      }
      // var keyMap = [];
      // _.each(chartConfig.keys, function (e) {
      //     if (e.hide != true)
      //         keyMap.push(e.col);
      // });
      var keysIdx = getIndex(aggData.columnList,
        _.map(chartConfig.keys, function (e) {
          if (e.drillDown) {
            return e.drillDown[chartConfig.drillTier.keyTier].col
          } else {
            return e.col || e.column
          }
        }))
      var keysSort = _.map(chartConfig.keys, function (e) {
        return e.sort
      })
      var groupsIdx = getIndex(aggData.columnList,
        _.map(chartConfig.groups, function (e) {
          if (e.drillDown) {
            return e.drillDown[chartConfig.drillTier.groupTier].col
          } else {
            return e.col || e.column
          }
        }))
      var groupsSort = _.map(chartConfig.groups, function (e) {
        if (e.drillDown) {
          return e.drillDown[chartConfig.drillTier.groupTier].sort
        } else {
          return e.sort
        }
      })

      var valueSeries = _.filter(aggData.columnList, function (e) {
        return e.aggType
      })
      for (var i = 0; i < aggData.data.length; i++) {
        //组合keys
        var newKey = getRowElements(aggData.data[i], keysIdx)
        var jk = newKey.join('-')
        if (_.isUndefined(joinedKeys[jk])) {
          castedKeys.push(newKey)
          joinedKeys[jk] = true
        }
        //组合groups
        var group = getRowElements(aggData.data[i], groupsIdx)
        var newGroup = group.join('-')
        if (_.isUndefined(joinedGroups[newGroup])) {
          castedGroups.push(group)
          joinedGroups[newGroup] = true
        }
        // pick the raw values into coordinate cell and then use aggregate function to do calculate
        _.each(valueSeries, function (dSeries) {
          if (_.isUndefined(newData[newGroup])) {
            newData[newGroup] = {}
          }
          if (_.isUndefined(newData[newGroup][dSeries.name])) {
            newData[newGroup][dSeries.name] = {}
          }
          if (_.isUndefined(newData[newGroup][dSeries.name][dSeries.aggType])) {
            newData[newGroup][dSeries.name][dSeries.aggType] = {}
          }
          // if (_.isUndefined(newData[newGroup][dSeries.name][dSeries.aggType][jk])) {
          //     newData[newGroup][dSeries.name][dSeries.aggType][jk] = [];
          // }
          if (dSeries.aggType != 'string') {
            newData[newGroup][dSeries.name][dSeries.aggType][jk] = parseFloat(
              aggData.data[i][dSeries.index])
          } else {
            newData[newGroup][dSeries.name][dSeries.aggType][jk] = aggData.data[i][dSeries.index]
          }
        })
      }
      //sort dimension
      var getSort = function (sort) {
        return function (a, b) {
          var r = 0
          var j = 0
          for (; j < a.length; j++) {
            if (!sort[j]) {
              continue
            }
            if (a[j] == b[j]) {
              r = 0
              continue
            }
            var params = toNumber(a[j], b[j])
            r = (params[0] > params[1]) ? 1 : -1
            if (sort[j] == 'desc') r = r * -1
            break
          }
          return r
        }
      }
      castedKeys.sort(getSort(keysSort))
      castedGroups.sort(getSort(groupsSort))
      //
      var castedAliasSeriesName = new Array()
      var aliasSeriesConfig = {}
      var aliasData = new Array()

      var valueSort = undefined
      var valueSortArr = []

      _.each(castedGroups, function (group) {
        _.each(chartConfig.values, function (value) {
          _.each(value.cols, function (series) {
            if (_.isUndefined(valueSort) && series.sort) {
              valueSort = series.sort
              castSeriesData(series, group.join('-'), castedKeys, newData,
                function (castedData, keyIdx) {
                  valueSortArr[keyIdx] = {v: castedData, i: keyIdx}
                })
            }
          })
        })
      })

      if (!_.isUndefined(valueSort)) {
        valueSortArr.sort(function (a, b) {
          if (a.v == b.v) return 0
          var p = toNumber(a.v, b.v)
          if (_.isNaN(p[0]) || _.isUndefined(p[0]) || _.isNull(p[0]) || p[0] === Infinity || p[0] === -Infinity) p[0] = -Infinity
          if (_.isNaN(p[1]) || _.isUndefined(p[1]) || _.isNull(p[1]) || p[1] === Infinity || p[1] === -Infinity) p[1] = -Infinity
          if (valueSort == 'asc') {
            return p[0] - p[1]
          }
          else {
            return p[1] - p[0]
          }
        })
        var tk = angular.copy(castedKeys)
        _.each(valueSortArr, function (e, i) {
          castedKeys[i] = tk[e.i]
        })
      }

      _.each(castedGroups, function (group) {
        _.each(chartConfig.values, function (value, vIdx) {
          _.each(value.cols, function (series) {
            var seriesName = series.alias ? series.alias : series.col
            var newSeriesName = seriesName
            if (group && group.length > 0) {
              var a = [].concat(group)
              a.push(seriesName)
              newSeriesName = a.join('-')
              castedAliasSeriesName.push(a)
            } else {
              castedAliasSeriesName.push([seriesName])
            }
            //castedAliasSeriesName.push(newSeriesName);
            aliasSeriesConfig[newSeriesName] = {
              type: value.series_type,
              valueAxisIndex: vIdx,
              formatter: series.formatter,
              dataStyle: series.dataStyle ? series.dataStyle : null
            }
            castSeriesData(series, group.join('-'), castedKeys, newData,
              function (castedData, keyIdx) {
                if (!aliasData[castedAliasSeriesName.length - 1]) {
                  aliasData[castedAliasSeriesName.length - 1] = new Array()
                }
                // Only format decimal
                aliasData[castedAliasSeriesName.length - 1][keyIdx] = castedData
              })
          })
        })
      })

      for (var i = 0; i < castedKeys.length; i++) {
        var s = 0
        var f = true
        _.each(castedGroups, function (group) {
          _.each(chartConfig.values, function (value) {
            _.each(value.cols, function (series) {
              if (!f) {
                return
              }
              if (series.f_top && series.f_top <= i) {
                f = false
              }
              if (!filter(series, aliasData[s][i])) {
                f = false
              }
              if (f) {
                aliasData[s][i] = dataFormat(aliasData[s][i])
              }
              s++
            })
          })
        })
        if (!f) {
          castedKeys.splice(i, 1)
          _.each(aliasData, function (_series) {
            _series.splice(i, 1)
          })
          i--
        }
      }
      /*排序隐藏属性*/
      var hideKeyMap = []
      _.each(chartConfig.keys, function (e, i) {
        if (e.hide == true)
          hideKeyMap.push(i)
      })
      hideKeyMap = hideKeyMap.reverse()
      for (var i = 0; i < castedKeys.length; i++) {
        for (var j = 0; j < hideKeyMap.length; j++) {
          castedKeys[i].splice(hideKeyMap[j], 1)
        }
      }
      return {
        originalData: aggData,
        keys: castedKeys,
        series: castedAliasSeriesName,
        data: aliasData,
        seriesConfig: aliasSeriesConfig
      }
    }

    var castSeriesData = function (series, group, castedKeys, newData, iterator) {
      switch (series.type) {
        case 'exp':
          var runExp = compileExp(series.exp)
          for (var i = 0; i < castedKeys.length; i++) {
            iterator(runExp(newData[group], castedKeys[i].join('-')), i)
          }
          break
        case 'computed':
          for (var i = 0; i < castedKeys.length; i++) {
            iterator(
              newData[group][series.col ||
              series.column][series.aggregate_type][castedKeys[i].join(
                '-')], i)
          }
          break
        default:
          for (var i = 0; i < castedKeys.length; i++) {
            iterator(
              newData[group][series.col][series.aggregate_type][castedKeys[i].join(
                '-')], i)
          }
          break
      }
    }

    var compileExp = function (exp) {
      var parseredExp = parserExp(exp)
      return function (groupData, key) {
        var _names = parseredExp.names
        return eval(parseredExp.evalExp)
      }
    }

    var aggregate = function (data_array, fnc) {
      if (!data_array) {
        return data_array
      }
      switch (fnc) {
        case 'sum':
          return aggregate_sum(data_array)
        case 'count':
          return aggregate_count(data_array)
        case 'avg':
          return aggregate_avg(data_array)
        case 'max':
          return _.max(data_array, function (f) {
            return parseFloat(f)
          })
        case 'min':
          return _.min(data_array, function (f) {
            return parseFloat(f)
          })
      }
    }

    var aggregate_sum = function (data_array) {
      var sum = 0
      for (var i = 0; i < data_array.length; i++) {
        var f = parseFloat(data_array[i])
        if (f) {
          sum += f
        }
      }
      return sum
    }

    var aggregate_count = function (data_array) {
      return data_array.length
    }

    var aggregate_avg = function (data_array) {
      var sum = 0
      var count = 0
      for (var i = 0; i < data_array.length; i++) {
        var f = parseFloat(data_array[i])
        if (f) {
          sum += f
          count++
        }
      }
      return count == 0 ? 0 : sum / count
    }

    var getHeaderIndex = function (chartData, col) {
      var result = new Array()
      if (col) {
        for (var j = 0; j < col.length; j++) {
          var idx = _.indexOf(chartData[0], col[j])
          result.push(idx)
        }
      }
      return result
    }

    var getRowElements = function (row, elmIdxs) {
      var arr = new Array()
      for (var j = 0; j < elmIdxs.length; j++) {
        var elm = row[elmIdxs[j]]
        arr.push(elm)
      }
      return arr
    }

    function parserExp(rawExp) {
      var evalExp = rawExp
      var _temp = []
      var aggs = []
      evalExp = evalExp.trim().replace(/[\n|\r|\r\n]/g, '')

      _.each(evalExp.match(/".*?"/g), function (qutaText) {
        evalExp = evalExp.replace(qutaText, '_#' + _temp.length)
        _temp.push(qutaText)
      })

      var names = [] // expression text in aggreagtion function, could be a columnName or script
      _.each(evalExp.match(/(sum|avg|count|max|min|distinct)\("?.*?"?\)/g),
        function (aggUnit) {
          var aggregate = aggUnit.substring(0, aggUnit.indexOf('('))
          var name = aggUnit.substring(aggUnit.indexOf('(') + 1,
            aggUnit.indexOf(')'))
          if (name.match('_#')) {
            name = _temp[name.replace('_#', '')].replace(/\"/g, '')
          }
          evalExp = evalExp.replace(aggUnit, 'groupData[_names[' +
            names.length +
            ']][\'' + aggregate + '\'][key]')
          names.push(name)
          aggs.push({
            name: name,
            aggregate: aggregate
          })
        })
      return {evalExp: evalExp, aggs: aggs, names: names}
    }

    this.getTableDataDrillByWidget = function () {
      return tableDrill
    }

    this.getDatasetListMap = function () {
      return dataSetMap
    }
  })
