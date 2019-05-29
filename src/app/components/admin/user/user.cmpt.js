(function () {
  'use strict'
  angular
    .module('discovery')
    .directive('adminUserUserCmpt', function () {
      return {
        restrict: 'EAC',
        replace: true,
        transclude: false,
        scope: {},
        templateUrl: H.CMPT('admin/user/user'),
        controller: adminUserUserCmpt
      }
    })

  /** @ngInject */
  function adminUserUserCmpt($scope, $element, $attrs, $transclude, exports, adminUserService) {
    const utils = {}
    exports.controller($scope, {
      service: {
        adminUserService
      },
      data: {
        listCount: 0,
        userRoleMap: {},
        activeUserId: ''
      },
      created() {
        adminUserService.fetchAllAsync().then(() => {
          // this.user1Role = adminUserService.getRoleListByUserId('1')
        })
      },
      events: {},
      watch: {},
      methods: {
        /**
         * 打开user详情,显示user的role
         * @param userId
         */
        openUserInfo(userId) {
          if (this.activeUserId !== userId) {
            this.activeUserId = userId
            this.userRoleMap[userId] = this.adminUserService.getRoleListByUserId(userId)
          }
        }
      },
      destroyed() {
      }
    })
  }
})()
