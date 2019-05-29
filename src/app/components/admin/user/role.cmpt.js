(function () {
  'use strict'
  angular
    .module('discovery')
    .directive('adminUserRoleCmpt', function () {
      return {
        restrict: 'EAC',
        replace: true,
        transclude: false,
        scope: {},
        templateUrl: H.CMPT('admin/user/role'),
        controller: adminUserRoleCmpt
      }
    })

  /** @ngInject */
  function adminUserRoleCmpt($scope, $element, $attrs, $transclude, exports, adminUserService) {
    const utils = {}
    exports.controller($scope, {
      service: {
        adminUserService
      },
      data: {
        listCount: 0,
        roleUserMap: {},
        activeRoleId: ''
      },
      created() {
        // adminUserService.fetchAllAsync().then(() => {
          // this.user1Role = adminUserService.getRoleListByUserId('1')
        // })
      },
      events: {},
      watch: {},
      methods: {
        /**
         * 打开role详情,显示role的user
         * @param roleId
         */
        openRoleInfo(roleId) {
          if (this.activeRoleId !== roleId) {
            this.activeRoleId = roleId
            this.roleUserMap[roleId] = this.adminUserService.getUserListByRoleId(roleId)
          }
        }
      },
      destroyed() {
      }
    })
  }
})()
