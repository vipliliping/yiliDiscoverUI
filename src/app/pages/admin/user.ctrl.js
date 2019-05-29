(function () {
  'use strict'
  angular
    .module('discovery')
    .controller('adminUserCtrl', adminUserCtrl)

  /** @ngInject */
  function adminUserCtrl($scope, $stateParams) {
    const utils = {
      init: {
        //1. 初始化默认tabs
        tabs($stateParams) {
          const type = $stateParams.type
          const typeList = ['user', 'role', 'res']
          let typeIndex = 0
          if (type) {
            const index = typeList.indexOf(type)
            if (index > -1) typeIndex = index
          }
          return typeIndex
        }
      }
    }
    $scope.active = utils.init.tabs($stateParams)
  }
})()
