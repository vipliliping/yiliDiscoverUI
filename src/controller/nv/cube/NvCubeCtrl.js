discovery.controller('nvCubeCtrl',
  function ($scope, $state, $http, $stateParams, dataService, $uibModal,
            ModalUtils, $filter, chartService, $timeout, uuid4) {
    'ngInject'
    var translate = $filter('translate')
    $scope.optFlag = 'none'
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
    $scope.tableSql = null // table表的sql
    // 数据过滤的初始化
    $scope.userInfo = USER_INFO_MAP
    $scope.filterCols = []
    var treeID = 'dataSetTreeID' // Set to a same value with treeDom
    var originalData = []
    var updateUrl = 'dashboard/updateDataset.do'

    var trash = {}

    // 数据过滤的添加方法
    $scope.addFilter = function () {
      $scope.curDataset.data.backendFilters.push({sessionKey: '', cols: ''})
    }
    // 数据过滤的删除方法
    $scope.deleteFilter = function (index) {
      $scope.curDataset.data.backendFilters.splice(index, 1)
    }

    // 参数和可取值的添加方法
    $scope.addParam = function () {
      $scope.curDataset.data.schema.paramList.push({column: '', list: [], selectType: 'single', selector: 'single'})
      $scope.showParamData.push('')
    }
    // 参数和可取值的删除方法
    $scope.deleteParam = function (index) {
      $scope.curDataset.data.schema.paramList.splice(index, 1)
      $scope.showParamData.splice(index, 1)
    }

    // 计算属性的添加方法
    $scope.addComputed = function () {
      $scope.curDataset.data.schema.computedDimension.push({
        aggType: '',
        column: '',
        dependOn: [],
        formula: '',
        preCalc: ''
      })
      $scope.showDependOnDimension.push('')
    }
    // 计算属性的添加方法
    $scope.addValueComputed = function () {
      $scope.curDataset.data.schema.computed.push({
        aggType: '',
        column: '',
        dependOn: [],
        formula: '',
        preCalc: ''
      })
      $scope.showDependOnValue.push('')
    }
    // 计算属性的删除方法
    $scope.deleteComputed = function (index) {
      $scope.curDataset.data.schema.computedDimension.splice(index, 1)
      $scope.showDependOnDimension.splice(index, 1)
    }
    // 计算属性的删除方法
    $scope.deleteValueComputed = function (index) {
      $scope.curDataset.data.schema.computed.splice(index, 1)
      $scope.showDependOnValue.splice(index, 1)
    }

    // 格式转化
    $scope.transToNum = function (o) {
      o.style = 'number'
    }
    $scope.transToStr = function (o) {
      o.style = 'string'
    }
    $scope.openSqlEditModal = function () {
      const vm = $scope
      var editDemainModal = $uibModal.open({
        animation: true,
        templateUrl: 'src/view/config/modal/editSqlModal.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.ftlSql = angular.copy(vm.curDataset.data.query.sql)
          $scope.testResult = ''
          $scope.ftlConfig = {
            mode: 'ftl',
            rendererOptions: {
              fontSize: '14px'
              // height: '600px'
              // maxLines: 100,
              // minLines: 20
            }
          }
          $scope.sqlConfig = {
            mode: 'sql'
          }
          $scope.paramsList = vm.curDataset.data.schema.paramList
          $scope.params = {}
          $scope.paramsList.forEach(function (item) {
            $scope.params[item.column] = item.list[0] ? item.list[0] : ''
          })
          $scope.close = function () {
            $uibModalInstance.close({
              result: false
            })
          }
          $scope.test = function () {
            var param = {}
            $scope.paramsList.forEach(function (item) {
              if (item.isSendParam) {
                if (item.selector === 'multiple') {
                  param[item.column] = "'" + [$scope.params[item.column]].join("','") + "'"
                } else {
                  param[item.column] = $scope.params[item.column]
                }
              }
            })
            $http.post("dashboard/testTemplateSql.do", {
              param: angular.toJson(param),
              sql: $scope.ftlSql
            }).success(function (response) {
              $scope.testResult = response.msg
            })
          }
          $scope.save = function () {
            $uibModalInstance.close({
              result: true,
              info: $scope.ftlSql
            })
          }
        }

      })
      editDemainModal.result.then(function (response) {
        if (response.result) {
          vm.curDataset.data.query.sql = response.info
        }
      })
    }

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
          'id': dimension.id,
          'style': dimension.style ? dimension.style : 'string'
        })
      }
      for (var i = 0; i < schema.measure.length; i++) {
        var measure = schema.measure[i]
        // cfg.values.push({
        //     "column": measure.column,
        //     "aggType": "sum"
        // })
        cfg.rows.push({
          'columnName': measure.column,
          'filterType': 'eq',
          'values': [],
          'id': measure.id,
          'style': measure.style ? measure.style : 'string'
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
      // query:{}
      // datasetId:129
      // cfg:{"rows":[{"columnName":"装备名称","filterType":"eq","values":[],"id":"464d0ad5-360b-48df-9768-a755ffcc6f29"}],"columns":[],"filters":[],"events":[],"values":[{"column":"飞机数量","aggType":"sum"}]}
      // reload:false
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
    $scope.goToCreateChart = function () {
      if ($scope.curDataset && $scope.curDataset.id)
        $state.go('nv.explore_create_by', {cube_id: $scope.curDataset.id})
    }

    $scope.goToUploadExcel = function () {
      $state.go('nv.excel.upload')
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

    $scope.permissionSetting = function () {
      var permissionSettingModel = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'src/view/nv/permission/setting.html',
        size: 'lg',
        controller: 'permissionSettingCtrl',
        resolve: {
          config: function () {
            return {
              type: 'dataset',
              id: getSelectedDataSet().id
            }
          }
        }
      })
      permissionSettingModel.result.then(function () {
      })
    }

    $http.get('dashboard/getDatasourceList.do').success(function (response) {
      $scope.datasourceList = response
      $scope.datasourceShowList = _.filter(response, function (item) {
        return item.isVersion == 0
      })
    })

    var getDatasetList = function () {
      // dashboard/getDatasetList.do
      $http.get('dashboard/getDatasetNameList.do').success(function (response) {
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
          $scope.editDs($scope.datasetList[0])
        }
      })
    }

    var getCategoryList = function () {
      $http.get('dashboard/getDatasetCategoryList.do').success(function (response) {
        $scope.categoryList = response
        $('#DatasetName').autocomplete({
          source: $scope.categoryList
        })
      })
    }
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
    getCategoryList()
    getDatasetList()

    $scope.goEdit = function () {
      $state.go('config.model', {dataSourceId: $scope.datasource.id, curDatasetId: $scope.curDataset.id})
    }

    $scope.replaceColsData = {}
    $scope.replaceCols = function () {
      // var reader = new FileReader();
      // reader.readAsText(files[index],'UTF-8');
      $http({
        url: 'db.csv',
        dataType: 'text'
      }).success(function (data) {
        var dataArr = data.split('\n')
        for (let i = 0; i < dataArr.length; i++) {
          if (i > 0) {
            let lineArr = dataArr[i].split(',')
            $scope.replaceColsData[lineArr[0] + '.' + lineArr[2]] = {
              cols: lineArr[3],
              tableCols: lineArr[1] + ':' + lineArr[3]
            }
          }
        }
        for (let i in $scope.curDataset.data.schema.measure) {
          if ($scope.replaceColsData[$scope.curDataset.data.schema.measure[i].column]) {
            if (!$scope.curDataset.data.schema.measure[i]['alias']) {
              $scope.curDataset.data.schema.measure[i]['alias'] = $scope.replaceColsData[$scope.curDataset.data.schema.measure[i].column].cols
            }
          }
        }
        for (let i in $scope.curDataset.data.schema.dimension) {
          if ($scope.replaceColsData[$scope.curDataset.data.schema.dimension[i].column]) {
            if (!$scope.curDataset.data.schema.dimension[i]['alias']) {
              $scope.curDataset.data.schema.dimension[i]['alias'] = $scope.replaceColsData[$scope.curDataset.data.schema.dimension[i].column].cols
            }
          }
        }
      })
    }

    $scope.buildModel = function () {
      $uibModal.open({
        templateUrl: 'src/view/config/modal/selectDataSource.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        scope: $scope,
        controller: function ($scope, $uibModalInstance) {
          "ngInject"
          $scope.datasourceList = null
          $scope.currentDatasource = null
          $scope.searchStr = ''
          var getDatasourceList = function () {
            $http.get("dashboard/getDatasourceList.do").success(function (response) {
              $scope.datasourceList = response
            })
          }
          $scope.selectDataSource = function (event, item) {
            $scope.currentDatasource = item
            var dom = event.target
            var $ = window.$
            $('.data-active').removeClass('data-active')
            dom.classList.add("data-active")
          }
          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.ok = function () {
            if (!$scope.currentDatasource) {
              return
            }
            // var newTab = window.open('', '_blank');
            $state.go('config.model', {dataSourceId: $scope.currentDatasource.id})
            // newTab.location.href = url;
          }
          getDatasourceList()
        }
      })
    }

    $scope.newDs = function () {
      $scope.optFlag = 'new'
      $scope.curDataset = {
        data: {
          expressions: [],
          filters: [],
          schema: {dimension: [], measure: []}
        }
      }
      $scope.curWidget = {}
      $scope.widgetList = []
      $scope.selects = []
      cleanPreview()
    }
    $scope.openWidget = function (id) {
      window.open('#/nv/explore/' + id, 'widget')
    }
    $scope.editDs = function (ds) {
      $http.get('dashboard/getDatasetById.do?id=' + ds.id).success(function (dataset) {
        dataset = dataset[0]
        $scope.showParamData = []
        if (dataset.data.schema.paramList) {
          _.each(dataset.data.schema.paramList, function (item, index) {
            $scope.showParamData.push(item.list.join('\n'))
          })
        }
        $scope.showDependOnDimension = []
        $scope.showDependOnValue = []
        if (dataset.data.schema.computedDimension) {
          _.each(dataset.data.schema.computedDimension, function (item, index) {
            $scope.showDependOnDimension.push(item.dependOn.join(','))
          })
        }
        if (dataset.data.schema.computed) {
          _.each(dataset.data.schema.computed, function (item, index) {
            $scope.showDependOnValue.push(item.dependOn.join(','))
          })
        }
        $http.post('dashboard/checkDatasource.do', {id: dataset.data.datasource}).success(function (response) {
          $http.get('dashboard/getWidgetListByDatasetId.do?datasetId=' + dataset.id).success(function (list) {
            $scope.widgetList = list
          })
          if (response.status == '1') {
            doEditDs(dataset)
            $scope.doConfigParams()
          } else {
            ModalUtils.alert(translate('ADMIN.CONTACT_ADMIN') + '：Datasource/' +
              response.msg, 'modal-danger', 'lg')
          }
        })
      })
    }

    var doEditDs = function (ds) {
      $scope.optFlag = 'edit'
      $scope.curDataset = angular.copy(ds)
      if (!$scope.curDataset.data.backendFilters) {
        $scope.curDataset.data['backendFilters'] = []
      }
      if (!$scope.curDataset.data.schema.paramList) {
        $scope.curDataset.data.schema['paramList'] = []
      }
      if (!$scope.curDataset.data.schema.computedDimension) {
        $scope.curDataset.data.schema['computedDimension'] = []
      }
      if (!$scope.curDataset.data.schema.computed) {
        $scope.curDataset.data.schema['computed'] = []
      }
      if (!$scope.showParamData) {
        $scope.showParamData = []
      }
      if (!$scope.showDependOnDimension) {
        $scope.showDependOnDimension = []
      }
      if (!$scope.showDependOnValue) {
        $scope.showDependOnValue = []
      }
      $scope.filterCols = $scope.curDataset.data.schema.dimension.concat($scope.curDataset.data.schema.measure)
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
      for (let i in $scope.curDataset.data.schema) {
        let schemaItem = $scope.curDataset.data.schema
        for (let j in schemaItem) {
          let itemArr = schemaItem[j]
          for (let k in itemArr) {
            if (itemArr[k]['style'] === 'undefined') {
              itemArr[k]['style'] = 'string'
            }
          }
        }
      }
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
                getDatasetList()
              } else {
                ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
              }
              $scope.optFlag = 'none'
            })
          })
      })
    }

    $scope.copyDs = function (ds) {
      $http.get('dashboard/getDatasetById.do?id=' + ds.id).success(function (dataset) {
        var data = angular.copy(dataset[0])
        data.name = data.name + '_copy'
        $http.post('dashboard/saveNewDataset.do', {json: angular.toJson(data)}).success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            $scope.optFlag = 'none'
            getDatasetList()
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
          } else {
            ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
          }
        })
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
        //不验证sql
        if (name === 'sql') continue
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

    var goToCube = function (datasetId) {
      if (datasetId)
        window.location.href = '/starter.html#/nv/cube/' + datasetId
    }

    $scope.save = function () {
      // 处理参数和可取值得list的转换
      if ($scope.showParamData && $scope.curDataset.data.schema.paramList) {
        for (let i = 0; i < $scope.showParamData.length; i++) {
          if ($scope.showParamData[i].length > 0 && $scope.curDataset.data.schema.paramList[i])
            $scope.curDataset.data.schema.paramList[i].list = $scope.showParamData[i].split('\n')
        }
      }
      // 处理计算属性得dependOn的转换
      if ($scope.showDependOnValue && $scope.curDataset.data.schema.computed) {
        for (let i = 0; i < $scope.showDependOnValue.length; i++) {
          $scope.curDataset.data.schema.computed[i].dependOn = $scope.showDependOnValue[i].split(',')
        }
      }
      if ($scope.showDependOnDimension && $scope.curDataset.data.schema.computedDimension) {
        for (let i = 0; i < $scope.showDependOnDimension.length; i++) {
          $scope.curDataset.data.schema.computedDimension[i].dependOn = $scope.showDependOnDimension[i].split(',')
        }
      }
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

      if ($scope.optFlag == 'new') {
        $http.post('dashboard/saveNewDataset.do', {json: angular.toJson(ds)}).success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            if (serviceStatus.id) {
              $scope.insertId = serviceStatus.id
            }
            getCategoryList()
            getDatasetList()
            $scope.verify = {dsName: true}
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
            goToCube(serviceStatus.uuid)
          } else {
            $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
          }
        })
      } else {
        $http.post(updateUrl, {json: angular.toJson(ds)}).success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            $scope.optFlag = 'edit'
            getCategoryList()
            getDatasetList()
            $scope.verify = {dsName: true}
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
            goToCube(serviceStatus.uuid)
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
    $scope.deleteTree = function () {
      $scope.curDataset.data.schema.computed = []
      $scope.curDataset.data.schema.computedDimension = []
      $scope.curDataset.data.schema.dimension = []
      $scope.curDataset.data.schema.measure = []
      $scope.curDataset.data.schema.paramList = []
    }
    $scope.editDim = function (col) {
      var selects = schemaToSelect($scope.curDataset.data.schema)
      var ok
      var data = {expression: ''}
      if (!col) {
        ok = function (column, alias) {
          let dimeItem = {
            type: 'column',
            column: data.expression,
            alias: data.alias,
            id: uuid4.generate(),
            style: 'string'
          }
          $scope.curDataset.data.schema.dimension.push(dimeItem)
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
      item.style = 'string'
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

    $scope.toAllDimension = function () {
      _.each($('#cubeSelects').val(), function (value) {
        $scope.curDataset.data.schema.dimension.push($scope.createNode({type: 'column', column: value}))
      })
    }

    $scope.toAllValue = function () {
      _.each($('#cubeSelects').val(), function (value) {
        $scope.curDataset.data.schema.measure.push($scope.createNode({type: 'column', column: value}))
      })
    }

    $scope.clearSelected = function () {
      $('#cubeSelects').val('')
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
          $scope.customAceOpt = schemaCustomOpt(selects, datasource.type)
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
    $scope.getSql = function () {
      $http.post('dashboard/getKylinSql.do', {
        datasetId: $scope.curDataset.id,
        query: angular.toJson($scope.curWidget.query),
        datasourceId: $scope.datasource.id
      }).success(function (response) {
        $scope.curWidget.query.sql = response.sql
      })
    }
    $scope.preview = function () {
      $scope.tableSql = $scope.curWidget.query.sql
    }
    $scope.loadData = function () {
      cleanPreview()
      $scope.loading = true

      dataService.getColumns({
        datasource: $scope.datasource.id,
        query: $scope.curWidget.query,
        datasetId: null,
        paramList: $scope.curDataset.data.schema,
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
      //filter data by keywords
      originalData = jstree_CvtVPath2TreeData(
        $filter('filter')(list,
          {name: para.dsName, datasourceName: para.dsrName})
      )

      jstree_ReloadTree(treeID, originalData)
      if ($scope.keywords)
        _.delay(function () {
          $scope.treeInstance.jstree(true).open_all()
        }, 100)
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

const isNumber = function (val) {
  var regPos = /^\d+(\.\d+)?$/ //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ //负浮点数
  if (regPos.test(val) || regNeg.test(val) || typeof val === 'number') {
    return true
  } else {
    return false
  }
}

