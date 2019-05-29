discovery.controller('nvDashboardPanelCtrl', [
  '$scope',
  '$state',
  '$http',
  '$stateParams',
  'dataService',
  'ModalUtils',
  '$filter',
  'chartService',
  '$timeout',
  '$uibModal',
  '$location',
  function ($scope, $state, $http, $stateParams, dataService, ModalUtils,
            $filter, chartService, $timeout, $uibModal, $location) {
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
    $scope.queryAceOpt = cbAcebaseOption
    $scope.params = []
    $scope.treePath = ''

    var treeID = 'dataSetTreeID' // Set to a same value with treeDom
    window.originalData = []
    var updateUrl = 'dashboard/updateBoard.do'

    $scope.$watch('curDataset.data', function (xxxx) {
      var temp = {}
      temp = $scope.curDataset.data.schema
    }, true)

    var getBoardList = function () {
      $http.get('admin/getBoardListUser.do').success(function (response) {
        $scope.boardList = response
        $scope.searchNode()
      })
    }

    getBoardList()

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

    $scope.openWidget = function (id) {
      window.open('#/nv/explore/' + id, 'widget')
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

      if ($scope.optFlag == 'new') {
        $http.post('dashboard/saveNewBoard.do', {json: angular.toJson(ds)}).
          success(function (serviceStatus) {
            if (serviceStatus.status == '1') {
              if (serviceStatus.id) {
                $scope.insertId = serviceStatus.id
              }
              getBoardList()
              $scope.verify = {dsName: true}
              ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
                'sm')
            } else {
              $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
            }
          })
      } else {
        $http.post(updateUrl, {json: angular.toJson(ds)}).
          success(function (serviceStatus) {
            if (serviceStatus.status == '1') {
              $scope.optFlag = 'edit'
              getBoardList()
              $scope.verify = {dsName: true}
              ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
                'sm')
            } else {
              $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
            }
          })
      }
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
      return _.find($scope.boardList, function (ds) {
        return ds.id == selectedNode.id
      })
    }

    var checkTreeNode = function (actionType) {
      return jstree_CheckTreeNode(actionType, treeID, ModalUtils.alert)
    }

    $scope.applyModelChanges = function () {
      return !$scope.ignoreChanges
    }

    $scope.copyDs = function (ds) {
      var data = angular.copy(ds)
      data.name = data.name + '_copy'
      $http.post('dashboard/saveNewBoard.do', {json: angular.toJson(data)}).
        success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            getBoardList()
            $scope.optFlag = 'none'
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
          } else {
            ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
          }
        })
    }

    $scope.createNode = function () {
      var treePath = $scope.treePath
      $uibModal.open({
        templateUrl: 'src/view/nv/dashboard/modal/createTreeNode.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        resolve: {
          nodeName: function () {
            return $scope.treePath
          }
        },
        controller: function ($scope, $uibModalInstance) {
          'ngInject'

          $scope.nodeName = treePath
          $scope.close = function () {
            $uibModalInstance.close()
          }

          $scope.ok = function () {
            if (!$scope.nodeName.length) {
              return
            }
            var param = {'name': $scope.nodeName}
            $http.post('dashboard/saveNewCategory.do',
              {json: angular.toJson(param)}).
              success(function (response) {
                if (response.status == '1') {
                  ModalUtils.alert(translate('COMMON.SUCCESS'),
                    'modal-success', 'sm')
                  $uibModalInstance.close()
                } else {
                  ModalUtils.alert(response.msg, 'modal-warning', 'lg')
                }
              })
          }
        }
      })
    }

    $('#' + treeID).on('select_node.jstree', function (e, data) {
      $scope.treePath = ''
      if (data.node.id.indexOf('parent') >= 0) {
        for (var dnp = 1; dnp < data.node.parents.length; dnp++) {
          $scope.treePath += data.node.parents.reverse()[dnp] + '/'
        }
        $scope.treePath += data.node.text + '/'
      }
    })

    $scope.copyNode = function () {
      if (!checkTreeNode('copy')) return
      $scope.copyDs(getSelectedDataSet())
    }

    $scope.editNode = function () {
      var getSelectedData = getSelectedDataSet()
      $location.url('/nv/dashboard/Demo/' + getSelectedData.id)
      // if (!checkTreeNode('edit')) return
      // $scope.editDs(getSelectedDataSet())
    }

    $scope.deleteNode = function () {
      if (!checkTreeNode('delete')) return
      $scope.deleteDs(getSelectedDataSet())
    }
    $scope.searchNode = function () {
      var para = {dsName: '', dsrName: ''}
      //map boardList to list (add datasourceName)
      var list = $scope.boardList.map(function (ds) {
        var dsr = _.find($scope.datasourceList, function (obj) {
          return obj.id == ds.data.datasource
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
        treeID: treeID, listName: 'boardList', updateUrl: updateUrl,
        ModalUtils: ModalUtils, categoryList: 'categoryList'
      })
      return baseEventObj
    }()

    $scope.doConfigParams = function () {
      $http.get('dashboard/getConfigParams.do?type=' + $scope.datasource.type +
        '&page=dataset.html').then(function (response) {
        $scope.params = response.data
      })
    }

    /**  js tree related end **/

    /** Ace Editor Starer... **/
    $scope.queryAceOpt = datasetEditorOptions()
  }])
