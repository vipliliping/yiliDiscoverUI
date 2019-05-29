discovery.controller('buildModelCtrl',
  function ($scope, $state, $http, $stateParams, dataService, $uibModal,
            ModalUtils, $filter, chartService, $timeout, uuid4) {
    'ngInject'
    var translate = $filter('translate')
    $scope.optFlag = 'new'
    $scope.curDataset = {
      data: {
        expressions: [],
        filters: [],
        schema: {dimension: [], measure: []}
      }
    }
    $scope.curWidget = {}
    $scope.alerts = []
    $scope.verify = {dsName: true}
    $scope.loadFromCache = true
    $scope.queryAceOpt = cbAcebaseOption
    $scope.hierarchy = translate('CONFIG.DATASET.HIERARCHY')
    $scope.uuid4 = uuid4
    $scope.params = []
    $scope.colSearch = {row: []}

    var treeID = 'dataSetTreeID' // Set to a same value with treeDom
    var originalData = []
    var updateUrl = 'dashboard/updateDataset.do'

    var trash = {}

    // 自己写的
    $scope.tableList = null
    $scope.dataList = []
    $scope.testList = []
    $scope.tableRelation = []
    $scope.lastTable = ''
    $scope.id = $scope.$resolve.$stateParams.dataSourceId

    // 拖拽
    $scope.$watch('curDataset.data', function (xxxx) {
      var temp = {}
      temp = $scope.curDataset.data.schema
    }, true)

    $scope.checkDimension = function (dimension) {
      var cfg = {
        'columns': [],
        'filters': [],
        'events': [],
        'rows': [],
        'values': [
          {
            'column': dimension,
            'aggType': 'sum'
          }]
      }
      var query = {}
      if (typeof query.param === 'undefined') query.param = {}
      query.param.cols = ""
      cfg.rows.forEach(function (item) {
        query.param.cols += "'" + item.columnName + "'" + ','
      })
      cfg.columns.forEach(function (item) {
        query.param.cols += "'" + item.columnName + "'" + ','
      })
      query.param.pg_grpcols = query.param.cols = query.param.cols.slice(0, query.param.cols.length - 1)
      $http.post('/dashboard/getAggregateData.do', {
        query: angular.toJson(query),
        datasetId: $scope.curDataset.id,
        reload: false,
        cfg: JSON.stringify(cfg)
      }).success(function (request) {
        if (request.data) {
          ModalUtils.alert('可用,总数:' + JSON.stringify(request.data),
            'modal-warning', 'sm')
        }
      })
    }


    $scope.loadAggregateData = function () {
      var cfg = {
          'columns': [],
          'filters': [],
          'events': [],
          'rows': [],
          'values': []
        },
        schema = $scope.curDataset.data.schema
      for (var i = 0; i < schema.dimension.length; i++) {
        var dimension = schema.dimension[i]
        cfg.rows.push({
          'columnName': dimension.column,
          'filterType': 'eq',
          'values': [],
          'id': dimension.id
        })
      }
      for (var i = 0; i < schema.measure.length; i++) {
        var measure = schema.measure[i]
        cfg.rows.push({
          'columnName': measure.column,
          'filterType': 'eq',
          'values': [],
          'id': measure.id
        })
      }
      var query = {}
      if (typeof query.param === 'undefined') query.param = {}
      query.param.cols = ""
      cfg.rows.forEach(function (item) {
        query.param.cols += "'" + item.columnName + "'" + ','
      })
      cfg.columns.forEach(function (item) {
        query.param.cols += "'" + item.columnName + "'" + ','
      })
      query.param.pg_grpcols = query.param.cols = query.param.cols.slice(0, query.param.cols.length - 1)
      $http.post('/dashboard/getAggregateData.do', {
        query: angular.toJson(query),
        datasetId: $scope.curDataset.id,
        reload: false,
        cfg: JSON.stringify(cfg)
      }).success(function (request) {
        $scope.aggregateData = request
      })
    }

    $scope.editDemand = function () {
      var editDemainModal = $uibModal.open({
        animation: true,
        templateUrl: 'src/view/config/modal/demand.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'

          $scope.close = function () {
            $uibModalInstance.close()
          }

          $scope.ok = function () {
            if (!$scope.name) {
              ModalUtils.alert(translate('CONFIG.DATASET.NAME') +
                translate('COMMON.NOT_EMPTY'), 'modal-warning', 'lg')
              return
            }
            $uibModalInstance.close({
              name: $scope.name,
              explaination: $scope.explaination
            })
          }

        }
      })
      editDemainModal.result.then(function (info) {
        $http.post('dashboard/saveNewDemand.do', {
          name: info.name,
          explaination: info.explaination,
          datasetId: $scope.curDataset.id
        }).success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
            getDatesetDemandList()
          } else {
            ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
          }
        })
      })
    }

    $scope.onlyView = function () {
      if (_.isUndefined($stateParams.onlyView)) {
        return false
      }
      return $stateParams.onlyView
    }

    $scope.toTrash = function (array, index) {
      var o = array[index]
      if (o.type == 'column') {
        if (!trash[o.column]) {
          trash[o.column] = []
        }
        trash[o.column].push(o)
      }
      array.splice(index, 1)
    }

    $scope.dndTransfer = {
      dimension: function (list, index, item, type) {
        if (type == 'column') {
          list[index] = {type: 'column', column: item}
        }
      },
      measure: function (list, index, item, type) {
        if (type == 'column') {
          list[index] = {type: 'column', column: item}
        }
      }
    }

    $http.get('dashboard/getDatasourceList.do').success(function (response) {
      $scope.datasourceList = response
      $scope.datasourceShowList = _.filter(response, function (item) {
        return item.isVersion == 0
      })
    })

    var getDatasetList = function () {
      $http.get('dashboard/getDatasetList.do').success(function (response) {
        $scope.datasetList = response
        $scope.searchNode()
        /** new Version open data **/
        if (!_.isUndefined($stateParams.id)) {
          $scope.editDs(_.find($scope.datasetList, function (ds) {
            return ds.id == $stateParams.id
          }))
        } else if ($scope.insertId) {
          $scope.editDs(_.find($scope.datasetList, function (ds) {
            return ds.id == $scope.insertId
          }))
          $scope.insertId = null
        } else if ($scope.datasetList.length > 0 &&
          _.isUndefined($scope.curDataset.id)) {
          if ($stateParams.curDatasetId) {
            const index = _.findIndex($scope.datasetList, function (item) {
              return item.id === $stateParams.curDatasetId
            })
            $scope.editDs($scope.datasetList[index])
            $scope.dataList = $scope.datasetList[index].data.dataList
            $scope.tableRelation = $scope.datasetList[index].data.tableRelation
          }
        }
      })

    }

    getDatasetList()

    $scope.dimMapList = []
    var getDimMapList = function (datasetId) {
      $http.post('dataRelated/getDimMapList.do', {
        datasetId: datasetId
      }).success(function (data) {
        var dimMapList = {}
        for (var i = 0; i < data.length; i++) {
          var item = data[i]
          dimMapList[item.col] = item
        }
        $scope.dimMapList = dimMapList
      })
    }

    $scope.openWidget = function (id) {
      window.open('#/nv/explore/' + id, 'widget')
    }
    $scope.editDs = function (ds) {
      $http.post('dashboard/checkDatasource.do', {id: ds.data.datasource}).success(function (response) {
        $http.get('dashboard/getWidgetListByDatasetId.do?datasetId=' + ds.id).success(function (list) {
          $scope.widgetList = list
        })
        if (response.status == '1') {
          doEditDs(ds)
          $scope.doConfigParams()
        } else {
          ModalUtils.alert(translate('ADMIN.CONTACT_ADMIN') + '：Datasource/' +
            response.msg, 'modal-danger', 'lg')
        }
      })
    }

    var doEditDs = function (ds) {
      $scope.optFlag = 'edit'
      $scope.curDataset = angular.copy(ds)
      $scope.curDataset.name = $scope.curDataset.categoryName + '/' +
        $scope.curDataset.name
      if (!$scope.curDataset.data.expressions) {
        $scope.curDataset.data.expressions = []
      }
      if (!$scope.curDataset.data.filters) {
        $scope.curDataset.data.filters = []
      }
      if (!$scope.curDataset.data.schema) {
        $scope.curDataset.data.schema = {dimension: [], measure: []}
      }
      $scope.datasource = _.find($scope.datasourceList, function (ds) {
        return ds.id == $scope.curDataset.data.datasource
      })
      $scope.curWidget.query = $scope.curDataset.data.query
      $scope.loadData()
    }

    $scope.checkExist = function (column) {
      var find = _.find($scope.curDataset.data.schema.measure, function (e) {
        return e.column == column
      })
      if (!_.isUndefined(find)) {
        return true
      }
      find = _.find($scope.curDataset.data.schema.dimension, function (e) {
        if (e.type == 'level') {
          var _find = _.find(e.columns, function (_e) {
            return _e.column == column
          })
          return !_.isUndefined(_find)
        } else {
          return e.column == column
        }
      })
      return !_.isUndefined(find)
    }

    $scope.deleteDs = function (ds) {
      $http.get('dashboard/getAllWidgetList.do').then(function (response) {
        if (!response) {
          return false
        }
        var resDs = []

        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].data.datasetId == ds.id) {
            resDs.push(response.data[i].name)
          }
        }

        if (resDs.length > 0) {
          var warnStr = translate('CONFIG.WIDGET.WIDGET') + ':[' +
            resDs.toString() + ']'
          ModalUtils.alert(translate(
            'COMMON.NOT_ALLOWED_TO_DELETE_BECAUSE_BE_DEPENDENT') + warnStr,
            'modal-warning', 'lg')
          return false
        }
        ModalUtils.confirm(translate('COMMON.CONFIRM_DELETE'), 'modal-warning',
          'lg', function () {
            $http.post('dashboard/deleteDataset.do', {id: ds.id}).success(function (serviceStatus) {
              if (serviceStatus.status == '1') {
              } else {
                ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
              }
              $scope.optFlag = 'none'
            })
          })
      })
    }

    $scope.copyDs = function (ds) {
      var data = angular.copy(ds)
      data.name = data.name + '_copy'
      $http.post('dashboard/saveNewDataset.do', {json: angular.toJson(data)}).success(function (serviceStatus) {
        if (serviceStatus.status == '1') {
          $scope.optFlag = 'none'
          ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
            'sm')
        } else {
          ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
        }
      })
    }

    var validate = function () {
      $scope.alerts = []
      if (!$scope.curDataset.name) {
        $scope.alerts = [
          {
            msg: translate('CONFIG.DATASET.NAME') +
            translate('COMMON.NOT_EMPTY'), type: 'danger'
          }]
        $scope.verify = {dsName: false}
        $('#DatasetName').focus()
        return false
      }
      for (var i in $scope.params) {
        var name = $scope.params[i].name
        var label = $scope.params[i].label
        var required = $scope.params[i].required
        var value = $scope.curWidget.query[name]
        if (required == true && value != 0 &&
          (value == undefined || value == '')) {
          var pattern = /([\w_\s\.]+)/
          var msg = pattern.exec(label)
          if (msg && msg.length > 0)
            msg = translate(msg[0])
          else
            msg = label
          $scope.alerts = [
            {
              msg: '[' + msg + ']' + translate('COMMON.NOT_EMPTY'),
              type: 'danger'
            }]
          $scope.verify[name] = false
          return false
        }
      }
      return true
    }

    $scope.save = function () {
      $scope.datasource
        ? $scope.curDataset.data.datasource = $scope.datasource.id
        : null
      $scope.curDataset.data.query = $scope.curWidget.query

      if (!validate()) {
        return
      }
      var ds = angular.copy($scope.curDataset)
      var index = ds.name.lastIndexOf('/')
      ds.categoryName = $scope.curDataset.name.substring(0, index).trim()
      ds.name = $scope.curDataset.name.slice(index + 1).trim()
      if (ds.categoryName == '') {
        ds.categoryName = translate('COMMON.DEFAULT_CATEGORY')
      }
      ds.loadFromCache = $scope.loadFromCache
      ds.data.datasource = $scope.id
      ds.data['query'] = {}
      ds.data.query['sql'] = 'select '
      if ($scope.dataList[0]) {
        for (let i in $scope.dataList[0].columns) {        // 遍历第一个表的col
          ds.data.query['sql'] += $scope.dataList[0].tableName + '.' + $scope.dataList[0].columns[i].title + ' as ' + $scope.dataList[0].columns[i].value + ','
        }
        var evSql = ''
        for (let j = 0; j < $scope.tableRelation.length; j++) {
          for (let k = 0; k < $scope.tableRelation[j].currentColumns.length; k++) {
            ds.data.query['sql'] += $scope.tableRelation[j].table.current + '.' + $scope.tableRelation[j].currentColumns[k] + ' as ' + $scope.tableRelation[j].table.current + '__' + $scope.tableRelation[j].currentColumns[k] + ','
          }
          evSql += ' ' + $scope.tableRelation[j].table.relation + ' ' + $scope.tableRelation[j].table.current + ' on '
          for (let g = 0; g < $scope.tableRelation[j].columns.length; g++) {
            evSql += $scope.tableRelation[j].columns[g].current + $scope.tableRelation[j].columns[g].relation + $scope.tableRelation[j].columns[g].target + ' and '
          }
          evSql = evSql.slice(0, evSql.length - 4)
        }
        ds.data.query['sql'] = ds.data.query['sql'].slice(0, ds.data.query['sql'].length - 1)
        ds.data.query['sql'] += ' from ' + $scope.dataList[0].tableName + evSql
        ds.data['dataList'] = $scope.dataList
        ds.data['tableRelation'] = $scope.tableRelation
      }
      if ($scope.optFlag == 'new') {
        $http.post('dashboard/saveNewDataset.do', {json: angular.toJson(ds)}).success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            if (serviceStatus.id) {
              $scope.insertId = serviceStatus.id
            }
            $scope.verify = {dsName: true}
            $state.go('nv.cube_item', {id: serviceStatus.uuid})
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
          } else {
            if (serviceStatus.uuid) {
              $state.go('nv.cube_item', {id: serviceStatus.uuid})
            } else {
              $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
            }
          }
        })
      } else {
        $http.post(updateUrl, {json: angular.toJson(ds)}).success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            $scope.optFlag = 'edit'
            // getCategoryList()
            // getDatasetList()
            $scope.verify = {dsName: true}
            $state.go('nv.cube_item', {id: serviceStatus.uuid})
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
          } else {
            $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
          }
        })
      }

    }

    $scope.editFilterGroup = function (col) {
      var selects = schemaToSelect($scope.curDataset.data.schema)
      $uibModal.open({
        templateUrl: 'src/view/config/modal/filterGroup.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        scope: $scope,
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          if (col) {
            $scope.data = angular.copy(col)
          } else {
            $scope.data = {group: '', filters: [], id: uuid4.generate()}
          }
          $scope.selects = selects
          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.addColumn = function (str) {
            $scope.data.filters.push({col: str, type: '=', values: []})
          }
          $scope.ok = function () {
            if (col) {
              col.group = $scope.data.group
              col.filters = $scope.data.filters
            } else {
              if ($scope.$parent.curDataset.data.filters == null) {
                $scope.$parent.curDataset.data.filters = []
              }
              $scope.$parent.curDataset.data.filters.push($scope.data)
            }
            $uibModalInstance.close()
          }
          $scope.editFilter = function (filter) {
            $uibModal.open({
              templateUrl: 'src/view/nv/dashboard/modal/param.html',
              windowTemplateUrl: 'src/view/util/modal/window.html',
              backdrop: false,
              size: 'lg',
              resolve: {
                param: function () {
                  return angular.copy(filter)
                },
                filter: function () {
                  return false
                },
                getSelects: function () {
                  return function (byFilter, column, callback) {
                    dataService.getDimensionValues($scope.datasource.id,
                      $scope.curWidget.query, undefined, column, undefined,
                      function (filtered) {
                        callback(filtered)
                      })
                  }
                },
                ok: function () {
                  return function (param) {
                    filter.type = param.type
                    filter.values = param.values
                  }
                }
              },
              controller: 'paramSelector'
            })
          }
        }
      })
    }

    $scope.deleteFilterGroup = function (index) {
      ModalUtils.confirm(translate('COMMON.FILTER_GROUP') + ': [' +
        $scope.curDataset.data.filters[index].group + '], ' +
        translate('COMMON.CONFIRM_DELETE'), 'modal-warning', 'lg',
        function () {
          $scope.curDataset.data.filters.splice(index, 1)
        }
      )
    }

    var schemaToSelect = function (schema) {
      if (schema.selects) {
        return angular.copy(schema.selects)
      } else {
        var selects = []
        selects = selects.concat(schema.measure)
        _.each(schema.dimension, function (e) {
          if (e.type == 'level') {
            _.each(e.columns, function (c) {
              selects.push(c)
            })
          } else {
            selects.push(e)
          }
        })
        return angular.copy(selects)
      }
    }

    $scope.editExp = function (col) {
      var selects = schemaToSelect($scope.curDataset.data.schema)
      var aggregate = [
        {name: 'sum', value: 'sum'},
        {name: 'count', value: 'count'},
        {name: 'avg', value: 'avg'},
        {name: 'max', value: 'max'},
        {name: 'min', value: 'min'}
      ]
      var ok
      var data = {expression: ''}
      if (!col) {
        ok = function (exp, alias) {
          $scope.curDataset.data.expressions.push({
            type: 'exp',
            exp: data.expression,
            alias: data.alias,
            id: uuid4.generate()
          })
        }
      } else {
        data.expression = col.exp
        data.alias = col.alias
        ok = function (data) {
          col.exp = data.expression
          col.alias = data.alias
        }
      }

      $uibModal.open({
        templateUrl: 'src/view/config/modal/exp.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.data = data
          $scope.selects = selects
          $scope.aggregate = aggregate
          $scope.alerts = []
          $scope.expAceOpt = expEditorOptions(selects, aggregate)

          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.addToken = function (str, agg) {
            var tc = document.getElementById('expression_area')
            var tclen = $scope.data.expression.length
            tc.focus()
            var selectionIdx = 0
            if (typeof document.selection != 'undefined') {
              document.selection.createRange().text = str
              selectionIdx = str.length - 1
            }
            else {
              var a = $scope.data.expression.substr(0, tc.selectionStart)
              var b = $scope.data.expression.substring(tc.selectionStart,
                tclen)
              $scope.data.expression = a + str
              selectionIdx = $scope.data.expression.length - 1
              $scope.data.expression += b
            }
            if (!agg) {
              selectionIdx++
            }
            tc.selectionStart = selectionIdx
            tc.selectionEnd = selectionIdx
          }
          $scope.verify = function () {
            $scope.alerts = []
            var v = verifyAggExpRegx($scope.data.expression)
            $scope.alerts = [
              {
                msg: v.isValid ? translate('COMMON.SUCCESS') : v.msg,
                type: v.isValid ? 'success' : 'danger'
              }]
          }
          $scope.ok = function () {
            if (!$scope.data.alias) {
              ModalUtils.alert(translate('CONFIG.WIDGET.ALIAS') +
                translate('COMMON.NOT_EMPTY'), 'modal-warning', 'lg')
              return
            }
            ok($scope.data)
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.deleteExp = function (index) {
      ModalUtils.confirm(translate('CONFIG.COMMON.CUSTOM_EXPRESSION') + ': [' +
        $scope.curDataset.data.expressions[index].alias + '], ' +
        translate('COMMON.CONFIRM_DELETE'), 'modal-warning', 'lg',
        function () {
          $scope.curDataset.data.expressions.splice(index, 1)
        }
      )
    }

    $scope.editMea = function (col) {
      var selects = schemaToSelect($scope.curDataset.data.schema)
      var aggregate = [
        {name: '+', value: '+'},
        {name: '-', value: '-'},
        {name: '*', value: '*'},
        {name: '/', value: '/'}
      ]
      var ok
      var data = {expression: ''}
      if (!col) {
        ok = function (column, alias) {
          $scope.curDataset.data.schema.measure.push({
            type: 'column',
            column: data.expression,
            alias: data.alias,
            id: uuid4.generate()
          })
        }
      } else {
        data.expression = col.column
        data.alias = col.alias
        ok = function (data) {
          col.column = data.expression
          col.alias = data.alias
        }
      }

      $uibModal.open({
        templateUrl: 'src/view/config/modal/measure.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.data = data
          $scope.selects = selects
          $scope.aggregate = aggregate
          $scope.alerts = []
          $scope.expAceOpt = expEditorOptions(selects, aggregate)

          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.addToken = function (str, agg) {
            var tc = document.getElementById('expression_area')
            var tclen = $scope.data.expression.length
            tc.focus()
            var selectionIdx = 0
            if (typeof document.selection != 'undefined') {
              document.selection.createRange().text = str
              selectionIdx = str.length - 1
            }
            else {
              var a = $scope.data.expression.substr(0, tc.selectionStart)
              var b = $scope.data.expression.substring(tc.selectionStart,
                tclen)
              $scope.data.expression = a + str
              selectionIdx = $scope.data.expression.length - 1
              $scope.data.expression += b
            }
            if (!agg) {
              selectionIdx++
            }
            tc.selectionStart = selectionIdx
            tc.selectionEnd = selectionIdx
          }
          // $scope.verify = function () {
          //     $scope.alerts = [];
          //     var v = verifyAggExpRegx($scope.data.expression);
          //     $scope.alerts = [{
          //         msg: v.isValid ? translate("COMMON.SUCCESS") : v.msg,
          //         type: v.isValid ? 'success' : 'danger'
          //     }];
          // };
          $scope.ok = function () {
            if (!$scope.data.alias) {
              ModalUtils.alert(translate('CONFIG.WIDGET.ALIAS') +
                translate('COMMON.NOT_EMPTY'), 'modal-warning', 'lg')
              return
            }
            ok($scope.data)
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.editDim = function (col) {
      var selects = schemaToSelect($scope.curDataset.data.schema)
      var ok
      var data = {expression: ''}
      if (!col) {
        ok = function (column, alias) {
          $scope.curDataset.data.schema.dimension.push({
            type: 'column',
            column: data.expression,
            alias: data.alias,
            id: uuid4.generate()
          })
        }
      } else {
        data.expression = col.column
        data.alias = col.alias
        ok = function (data) {
          col.column = data.expression
          col.alias = data.alias
        }
      }

      $uibModal.open({
        templateUrl: 'src/view/config/modal/dimension.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.data = data
          $scope.selects = selects
          $scope.alerts = []
          $scope.expAceOpt = expEditorOptions(selects, '')

          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.addToken = function (str, agg) {
            var tc = document.getElementById('expression_area')
            var tclen = $scope.data.expression.length
            tc.focus()
            var selectionIdx = 0
            if (typeof document.selection != 'undefined') {
              document.selection.createRange().text = str
              selectionIdx = str.length - 1
            }
            else {
              var a = $scope.data.expression.substr(0, tc.selectionStart)
              var b = $scope.data.expression.substring(tc.selectionStart,
                tclen)
              $scope.data.expression = a + str
              selectionIdx = $scope.data.expression.length - 1
              $scope.data.expression += b
            }
            if (!agg) {
              selectionIdx++
            }
            tc.selectionStart = selectionIdx
            tc.selectionEnd = selectionIdx
          }
          // $scope.verify = function () {
          //     $scope.alerts = [];
          //     var v = verifyAggExpRegx($scope.data.expression);
          //     $scope.alerts = [{
          //         msg: v.isValid ? translate("COMMON.SUCCESS") : v.msg,
          //         type: v.isValid ? 'success' : 'danger'
          //     }];
          // };
          $scope.ok = function () {
            if (!$scope.data.alias) {
              ModalUtils.alert(translate('CONFIG.WIDGET.ALIAS') +
                translate('COMMON.NOT_EMPTY'), 'modal-warning', 'lg')
              return
            }
            ok($scope.data)
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.createNode = function (item) {
      if (trash[item.column]) {
        var _i = trash[item.column].pop()
        if (_i) {
          return _i
        }
      }
      item.id = uuid4.generate()
      return item
    }

    $scope.measureToDimension = function (index, o) {
      $scope.curDataset.data.schema.measure.splice(index, 1)
      $scope.curDataset.data.schema.dimension.push(o)
    }

    $scope.toDimension = function (o) {
      $scope.curDataset.data.schema.dimension.push($scope.createNode(o))
    }

    $scope.custom = function (o) {
      var selects = $scope.selects
      var datasource = $scope.datasource
      $uibModal.open({
        templateUrl: 'src/view/config/modal/custom.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'sm',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.c = o
          $scope.ok = function () {
            $uibModalInstance.close()
          }
          // $scope.customAceOpt = schemaCustomOpt(selects, datasource.type)
        }
      })
    }

    var getDatesetDemandList = function () {
      if ($scope.curDataset.id)
        return $http.get('dashboard/getDatesetDemandList.do?datasetId=' +
          $scope.curDataset.id).success(function (response) {
          getDimMapList($scope.curDataset.id)
          $scope.demandList = response
        })
    }

    $scope.loadData = function () {
      cleanPreview()
      $scope.loading = true

      dataService.getColumns({
        datasource: $scope.datasource.id,
        query: $scope.curWidget.query,
        datasetId: null,
        reload: !$scope.loadFromCache,
        callback: function (dps) {
          $scope.loading = false
          $scope.toChartDisabled = false
          if (dps.msg == '1') {
            $scope.alerts = []
            $scope.selects = dps.columns
          } else {
            $scope.alerts = [{msg: dps.msg, type: 'danger'}]
          }

          var widget = {
            chart_type: 'table',
            filters: [],
            groups: [],
            keys: [],
            selects: [],
            values: [
              {
                cols: []
              }
            ]
          }
          _.each($scope.selects, function (c) {
            widget.keys.push({
              col: c,
              type: 'eq',
              values: []
            })
          })
        }
      })

      getDatesetDemandList()
    }

    $scope.updateStatus = function (id, status) {
      $http.post('dashboard/updateStatus.do', {
        id: id,
        status: status
      }).success(function (serviceStatus) {
        if (serviceStatus.status == '1') {
          getDatesetDemandList()
          ModalUtils.alert(serviceStatus.msg, 'modal-success', 'sm')
        } else {
          ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
        }
      })
    }

    var cleanPreview = function () {
      $('#dataset_preview').html('')
    }

    /**  js tree related start **/
    $scope.treeConfig = jsTreeConfig1

    $('#' + treeID).keyup(function (e) {
      if (e.keyCode == 46) {
        $scope.deleteNode()
      }
    })

    var getSelectedDataSet = function () {
      var selectedNode = jstree_GetSelectedNodes(treeID)[0]
      return _.find($scope.datasetList, function (ds) {
        return ds.id == selectedNode.id
      })
    }

    var checkTreeNode = function (actionType) {
      return jstree_CheckTreeNode(actionType, treeID, ModalUtils.alert)
    }

    var switchNode = function (id) {
      $scope.ignoreChanges = false
      var dataSetTree = jstree_GetWholeTree(treeID)
      dataSetTree.deselect_all()
      dataSetTree.select_node(id)
    }

    $scope.applyModelChanges = function () {
      return !$scope.ignoreChanges
    }

    $scope.copyNode = function () {
      if (!checkTreeNode('copy')) return
      $scope.copyDs(getSelectedDataSet())
    }

    $scope.editNode = function () {
      if (!checkTreeNode('edit')) return
      $scope.editDs(getSelectedDataSet())
    }

    $scope.deleteNode = function () {
      if (!checkTreeNode('delete')) return
      $scope.deleteDs(getSelectedDataSet())
    }
    $scope.searchNode = function () {
      var para = {dsName: '', dsrName: ''}
      //map datasetList to list (add datasourceName)
      var list = $scope.datasetList.map(function (ds) {
        var dsr = _.find($scope.datasourceList, function (obj) {
          var data = ds.data
          if (data) {
            return obj.id == data.datasource
          }
        })
        return {
          'id': ds.id,
          'name': ds.name,
          'categoryName': ds.categoryName,
          'datasourceName': dsr ? dsr.name : ''
        }
      })
      //split search keywords
      if ($scope.keywords) {
        if ($scope.keywords.indexOf(' ') == -1 &&
          $scope.keywords.indexOf(':') == -1) {
          para.dsName = $scope.keywords
        } else {
          var keys = $scope.keywords.split(' ')
          for (var i = 0; i < keys.length; i++) {
            var w = keys[i].trim()
            if (w.split(':')[0] == 'ds') {
              para['dsName'] = w.split(':')[1]
            }
            if (w.split(':')[0] == 'dsr') {
              para['dsrName'] = w.split(':')[1]
            }
          }
        }
      }
    }

    $scope.treeEventsObj = function () {
      var baseEventObj = jstree_baseTreeEventsObj({
        ngScope: $scope, ngHttp: $http, ngTimeout: $timeout,
        treeID: treeID, listName: 'datasetList', updateUrl: updateUrl
      })
      return baseEventObj
    }()

    $scope.doConfigParams = function () {
      $http.get('dashboard/getConfigParams.do?type=' + $scope.datasource.type +
        '&page=dataset.html').then(function (response) {
        $scope.params = response.data
      })
    }

    $scope.changeDs = function () {
      $scope.curWidget.query = {}
      $http.get('dashboard/getConfigParams.do?type=' + $scope.datasource.type +
        '&page=dataset.html').then(function (response) {
        $scope.params = response.data
        for (var i in $scope.params) {
          var name = $scope.params[i].name
          var value = $scope.params[i].value
          var checked = $scope.params[i].checked
          var type = $scope.params[i].type
          if (type == 'checkbox' && checked == true) {
            $scope.curWidget.query[name] = true
          }
          if (type == 'number' && value != '' && !isNaN(value)) {
            $scope.curWidget.query[name] = Number(value)
          } else if (value != '') {
            $scope.curWidget.query[name] = value
          }
        }
      })
    }

    /**  js tree related end **/

    /** Ace Editor Starer... **/
    $scope.queryAceOpt = datasetEditorOptions()

    $scope.setDataRelated = function (o, datasetId, dimMap) {
      var setDataRelatedModal = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'setDataRelated.html',
        size: 'md',
        controller: 'SetDataRelatedCtrl',
        resolve: {
          column: function () {//维度名
            return o.column
          },
          id: function () {//维度id
            return o.id
          },
          datasetId: function () {//模型id
            return datasetId
          },
          commonId: function () {
            if (dimMap)
              return dimMap.commonId
            else
              return null
          }
        }
      })
      setDataRelatedModal.result.then(function (commonId) {
        getDimMapList($scope.curDataset.id)
        // $scope.data.schema.dimension
      }, function () {
        // console.info('Modal dismissed at: ' + new Date());
      })
    }

    // 打开配置数据库的模态框
    $scope.openDbReletionModal = function (tableName) {
      const _vm = $scope
      $uibModal.open({
        templateUrl: 'src/view/config/modal/dbRelation.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        scope: $scope,
        controller: function ($scope, $uibModalInstance, $stateParams) {
          "ngInject"
          $scope.relationOptions = ['>', '=', '<']   // 可选的关系
          $scope.currentTable = {           // 当前表的信息
            tableName: tableName,
            columns: []
          }
          $scope.selectedTable = _vm.dataList
          $scope.radioModel = 'left join'        // 数据库关系
          $scope.targetTable = {         // 目标数据库
            tableName: '',
            columns: []
          }
          $scope.relationList = []       // 字段对应

          const obj = {
            sql: 'select * from ' + tableName
          }
          $http.post("dashboard/getColumns.do", {
            datasourceId: _vm.id,
            query: JSON.stringify(obj),
            reload: false
          }).success(function (response) {
            if (response.columns) {
              $scope.currentTable.columns = response.columns
            } else {
            }
          })

          $scope.add = function () {
            if (!$scope.targetTable.tableName) {
              return
            }
            const obj = {
              current: $scope.currentTable.columns[0] ? $scope.currentTable.columns[0] : '',
              relation: '=',
              target: ''
            }
            $scope.relationList.push(obj)
          }

          $scope.close = function () {
            $uibModalInstance.close()
          }

          $scope.ok = function () {
            const obj = {
              table: {
                current: $scope.currentTable.tableName,
                relation: $scope.radioModel,
                target: $scope.targetTable.tableName
              },
              columns: [],
              currentColumns: $scope.currentTable.columns
            }
            // 处理columns，加表名。 例A.aa
            for (let i in $scope.relationList) {
              let newObj = {
                current: $scope.currentTable.tableName + '.' + $scope.relationList[i].current,
                relation: $scope.relationList[i].relation,
                target: $scope.targetTable.tableName + '.' + $scope.relationList[i].target
              }
              obj.columns.push(newObj)
            }
            _vm.tableRelation.push(obj)
            $uibModalInstance.close()
          }

          $scope.selectTable = function () {
            $scope.relationList = []
            const obj = {
              sql: 'select * from ' + $scope.targetTable.tableName
            }
            $http.post("dashboard/getColumns.do", {
              datasourceId: _vm.id,
              query: JSON.stringify(obj),
              reload: false
            }).success(function (response) {
              if (response.columns) {
                $scope.targetTable.columns = response.columns
              } else {
              }
            })
          }
        }
      })
    },
      // 打开选择表模态框
      $scope.openAddTableModal = function () {
        $uibModal.open({
          templateUrl: 'src/view/config/modal/selectTable.html',
          windowTemplateUrl: 'src/view/util/modal/window.html',
          backdrop: false,
          size: 'lg',
          scope: $scope,
          controller: function ($scope, $uibModalInstance, $stateParams) {
            "ngInject"
            $scope.tableList = []
            $scope.currentTable = null
            $scope.searchStr = ''
            $scope.dataSourceId = $stateParams.dataSourceId

            $scope.selectTable = function (event, item) {
              $scope.currentTable = item
              var dom = event.target
              var $ = window.$
              $('.data-active').removeClass('data-active')
              dom.classList.add("data-active")
            }
            $scope.close = function () {
              $uibModalInstance.close()
            }
            $scope.ok = function () {
              $uibModalInstance.close($scope.currentTable)
            }

            const _vm = $scope
            $http.post("dashboard/getTableListByDatasourceId.do", {
              id: _vm.dataSourceId
            }).success(function (response) {
              _vm.tableList = response
            })
          }
        }).result.then(function (result) {
          if (result) {
            if ($scope.dataList.length !== 0) {
              $scope.openDbReletionModal(result)
            }
            $scope.lastTable = result
            const dataItem = {
              tableName: result,
              columns: []
            }
            const _vm = $scope
            const obj = {
              sql: 'select * from ' + result
            }
            $http.post("dashboard/getColumns.do", {
              datasourceId: _vm.id,
              query: JSON.stringify(obj),
              reload: false
            }).success(function (response) {
              if (response.columns) {
                let columnsList = []
                for (let i in response.columns) {
                  const obj = {
                    title: response.columns[i],
                    value: result + '__' + response.columns[i]
                  }
                  columnsList.push(obj)
                }
                dataItem.columns = columnsList
                $scope.dataList.push(dataItem)
              } else {
              }
            })
          }
        }, function (reason) {
          console.log(reason)//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
        })
      }
  }).controller('SetDataRelatedCtrl',
  function (commonId, datasetId, column, id, $scope, $rootScope, $http,
            $uibModalInstance, ModalUtils, $filter, $location) {
    'ngInject'
    $scope.activeCommonId = commonId
    var getDataRelatedList = function () {
      $http.get('dataRelated/getDataRelatedList.do').success(function (dataRelatedList) {
        $scope.dataRelatedList = dataRelatedList
      })
      //$scope.activeCommonId = 1;
    }
    getDataRelatedList()

    $scope.changeDataRelated = function (commonId) {
      if ($scope.activeCommonId != commonId) {
        $scope.activeCommonId = commonId
      } else {
        $scope.activeCommonId = ''
      }

    }

    $scope.ok = function () {
      $http.post('dataRelated/saveDataRelated.do', {
        datasetId: datasetId,
        commonId: $scope.activeCommonId,
        col: column,
        colId: id
      }).success(function (serviceStatus) {
        $uibModalInstance.close($scope.activeCommonId)
      })

    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }


  })
