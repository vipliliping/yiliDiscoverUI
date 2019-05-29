/**
 * Created by xxx on 2018/9/13.
 */
discovery.controller('permissionSettingCtrl',
  function ($scope, $timeout, $uibModalInstance, $http, $filter, config) {
    'ngInject'
    var translate = $filter('translate')

    $scope.existRoleList = []
    $scope.roleList = []

    $scope.checkA = function (exist) {
      exist.read = exist.admin
      exist.update = exist.admin
      exist.delete = exist.admin
    }

    $scope.checkD = function (exist) {
      if (exist.delete) {
        exist.read = true
      } else {
        if (!exist.update) {
          exist.read = false
        }
      }
      if (!exist.delete && !exist.update && !exist.read) exist.admin = false
    }

    $scope.checkU = function (exist) {
      if (exist.update) {
        exist.read = true
      } else {
        if (!exist.delete) {
          exist.read = false
        }
      }
      if (!exist.delete && !exist.update && !exist.read) exist.admin = false
    }

    $scope.checkR = function (exist) {
      if (!exist.read) {
        exist.update = false
        exist.delete = false
        exist.admin = false
      }
    }

    //判断用户是否登录
    $http.get('admin/isAdmin.do').success(function (response) {
      $scope.isAdmin = response
    })

    //获取当前类有权限的角色列表
    var getRoleListByType = function () {
      $http.get('admin/getRoleResById.do?resId=' + config.id + '&resType=' +
        config.type).success(function (response) {
        $scope.existRoleList = response
        comparison()
      })
    }
    getRoleListByType()

    //获取角色列表
    var getRoleListAll = function () {
      $http.get('admin/getRoleListAll.do').success(function (response) {
        $scope.roleList = response
        comparison()
      })
    }
    getRoleListAll()

    var comparison = function () {
      _.each($scope.roleList, function (role) {
        var existRole = _.find($scope.existRoleList, function (exist) {
          return exist.roleId == role.roleId
        })
        if (!existRole) {
          role.permission = null
          $scope.existRoleList.push(role)
        }
      })
      permissionAnalysisByGet()
    }

    var permissionAnalysisByGet = function () {
      _.each($scope.existRoleList, function (exist) {
        switch (exist.permission) {
          case '00':
            exist.read = true
            exist.update = false
            exist.delete = false
            exist.admin = false
            break
          case '01':
            exist.read = true
            exist.update = false
            exist.delete = true
            exist.admin = false
            break
          case '10':
            exist.read = true
            exist.update = true
            exist.delete = false
            exist.admin = false
            break
          case '11':
            exist.read = true
            exist.update = true
            exist.delete = true
            exist.admin = true
            break
          default:
            exist.read = false
            exist.update = false
            exist.delete = false
            exist.admin = false
            break
        }
      })
    }

    var permissionAnalysisByUpdate = function () {
      _.each($scope.existRoleList, function (exist) {
        if (exist.read && exist.update && exist.delete) {
          exist.permission = '11'
        } else if (exist.read && exist.update && !exist.delete) {
          exist.permission = '10'
        } else if (exist.read && !exist.update && exist.delete) {
          exist.permission = '01'
        } else if (exist.read && !exist.update && !exist.delete) {
          exist.permission = '00'
        } else {
          delete exist.permission
        }
        exist.resType = config.type
        exist.resId = config.id
      })
      return $scope.existRoleList
    }

    $scope.ok = function () {
      $http.post('admin/updateRoleResById.do',
        {permissionSetting: angular.toJson(permissionAnalysisByUpdate())}).
        success(function (serviceStatus) {
          if (serviceStatus == '1') {
            $uibModalInstance.close()
          } else {
            $scope.alerts = [{msg: serviceStatus.msg, type: 'error'}]
          }
        })
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }
    $scope.close = function () {
      $uibModalInstance.dismiss('cancel')
    }
  })
