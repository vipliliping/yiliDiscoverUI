discovery.controller('nvJsMindListCtrl', [
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
    $scope.treePath = ''
    $scope.categoryList = []

    var treeID = 'mindTreeID' // Set to a same value with treeDom
    var originalData = []
    var updateUrl = 'mindmap/updateMindmap.do'

    var getMindList = function () {
      $http.get('mindmap/getMindmapList.do').success(function (response) {
        $scope.mindList = response
        $scope.searchNode()
      })
    }

    getMindList()

    $scope.onlyView = function () {
      if (_.isUndefined($stateParams.onlyView)) {
        return false
      }
      return $stateParams.onlyView
    }

    /**  js tree related start **/
    $scope.treeConfig = jsTreeConfig1

    $('#' + treeID).keyup(function (e) {
      if (e.keyCode == 46) {
        $scope.deleteNode()
      }
    })

    var getSelectedMind = function () {
      var selectedNode = jstree_GetSelectedNodes(treeID)[0]
      return _.find($scope.mindList, function (ds) {
        return ds.id == selectedNode.id
      })
    }

    var checkTreeNode = function (actionType) {
      return jstree_CheckTreeNode(actionType, treeID, ModalUtils.alert)
    }

    $scope.applyModelChanges = function () {
      return !$scope.ignoreChanges
    }

    $scope.copyDs = function (mind) {
      var data = angular.copy(mind)
      data.name = data.name + '_copy'
      var json = {
        jsMind: {
          data: {//根节点ID 后台自动生成
            topic: data.name,//根节点名称  与脑图名称相同
            extended: true,
            children: []
          },
          format: 'node_tree',//脑图数据格式
          meta: {
            name: data.name//脑图名称
          }
        },
        widget: []
      }
      $http.post('mindmap/saveNewMindmap.do', {
        json: angular.toJson(json),
        name: data.name,
        categoryName: mind.categoryName
      }).success(function (serviceStatus) {
        if (serviceStatus.status == '1') {
          $scope.optFlag = 'none'
          ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
            'sm')
          getMindList()
        } else {
          ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
        }
      })
    }

    $scope.createNode = function () {
      $uibModal.open({
        templateUrl: 'src/view/nv/mind/modal/createTreeNode.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        resolve: {
          categoryName: function () {
            return ''
          },
          nodeName: function () {
            return ''
          }
        },
        controller: function ($scope, $uibModalInstance) {
          'ngInject'

          $scope.close = function () {
            $uibModalInstance.close()
          }

          $scope.ok = function () {
            if (!$scope.nodeName.length) {
              return
            }
            var json = {
              jsMind: {
                data: {//根节点ID 后台自动生成
                  topic: $scope.nodeName,//根节点名称  与脑图名称相同
                  extended: true,
                  children: []
                },
                format: 'node_tree',//脑图数据格式
                meta: {
                  name: $scope.nodeName//脑图名称
                }
              },
              widget: []
            }
            $http.post('mindmap/saveNewMindmap.do',
              {
                json: angular.toJson(json),
                name: $scope.nodeName,
                categoryName: $scope.categoryName
              }).success(function (response) {
              if (response.status == '1') {
                ModalUtils.alert(translate('COMMON.SUCCESS'),
                  'modal-success', 'sm')
                $uibModalInstance.close()
                getMindList()
              } else {
                ModalUtils.alert(response.msg, 'modal-warning', 'lg')
              }
            })
          }
        }
      })
    }

    $scope.deleteDs = function (mind) {
      $http.post('/mindmap/deleteMindmap.do', {
        id: mind.id
      }).success(function (serviceStatus) {
        if (serviceStatus.status == '1') {
          ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
            'sm')
          getMindList()
        } else {
          ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
        }
      })
    }

    $scope.copyNode = function () {
      if (!checkTreeNode('copy')) return
      $scope.copyDs(getSelectedMind())
    }

    $scope.deleteNode = function () {
      if (!checkTreeNode('delete')) return
      $scope.deleteDs(getSelectedMind())
    }

    $scope.editNode = function () {
      var selectedMind = getSelectedMind()
      $location.url('/nv/mind/' + selectedMind.id)
    }

    $scope.searchNode = function () {
      var para = {mindName: '', dsrName: ''}
      //map mindList to list (add datasourceName)
      var list = $scope.mindList.map(function (ds) {
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
          para.mindName = $scope.keywords
        } else {
          var keys = $scope.keywords.split(' ')
          for (var i = 0; i < keys.length; i++) {
            var w = keys[i].trim()
            if (w.split(':')[0] == 'mind') {
              para['mindName'] = w.split(':')[1]
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
          {name: para.mindName, datasourceName: para.dsrName})
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
        treeID: treeID, listName: 'mindList', updateUrl: updateUrl,
        ModalUtils: ModalUtils, categoryList: 'categoryList'
      })
      return baseEventObj
    }()

    /**  js tree related end **/
  }])
