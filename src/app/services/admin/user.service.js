(function () {
  'use strict'

  angular
    .module('discovery')
    .service('adminUserService', adminUserService)

  /** @ngInject */
  function adminUserService($q, $http, exports, ajaxService) {
    const URL = H.URL({
      WHETHER_OR_NOT_ADMIN: 'admin/isAdmin.do',// 是否管理员
      ALL_USER_LIST: 'admin/getUserList.do',// 用户列表
      ALL_ROLE_LIST: 'admin/getRoleList.do',// 角色列表
      ALL_USER_ROLE_LIST: 'admin/getUserRoleList.do',// 用户角色关联表
      ALL_ROLE_RES_LIST: 'admin/getRoleResList.do'// 角色权限表

    })
    return exports.service({
      data: {
        isAdmin: false,//是否是管理员
        userList: [],
        roleList: [],
        userRoleList: [],
        roleResList: []
      },
      cached: {},
      created() {
        // this.whetherOrNotAdminAsync(true).then(() => {
        // })
        // this.fetchAllAsync().then(() => {
        // })
      },
      actions: {
        userAndRole: {// 用户与角色相关
          /**
           * 根据roleId获得全部用户列表
           * @param roleId
           */
          getUserListByRoleId(roleId) {
            const userIdList = _.pluck(_.where(this.userRoleList, {roleId}), 'userId')
            return _.map(userIdList, (userId) => _.findWhere(this.userList, {userId}))
          },
          /**
           * 根据userId获得全部Role
           * @param userId
           */
          getRoleListByUserId(userId) {
            const roleIdList = _.pluck(_.where(this.userRoleList, {userId}), 'roleId')
            const roleList = _.map(roleIdList, (roleId) => _.findWhere(this.roleList, {roleId}))
            return roleList
          }
        },
        roleRes: {//角色权限相关

        },
        async: {// ajax方法
          /**
           * 判断是否有管理员权限
           * @param reload
           * @returns {*}
           */
          whetherOrNotAdminAsync(reload) {
            return ajaxService.getCacheList.apply(this, ['isAdmin', URL.WHETHER_OR_NOT_ADMIN, reload])
          },
          /**
           * 获得UserList,RoleList,UserListResList
           * @returns {*}
           */
          fetchAllAsync() {
            return $q.all([
              this.fetchUserListAsync(true),
              this.fetchRoleListAsync(true),
              this.fetchUserRoleListAsync(true),
              this.fetchRoleResListAsync(true)
            ])
          },
          /**
           * 获得UserList
           * @param reload
           * @returns {*}
           */
          fetchUserListAsync(reload) {
            return ajaxService.getCacheList.apply(this, ['userList', URL.ALL_USER_LIST, reload])
          },
          /**
           * 获得RoleList
           * @param reload
           * @returns {*}
           */
          fetchRoleListAsync(reload) {
            return ajaxService.getCacheList.apply(this, ['roleList', URL.ALL_ROLE_LIST, reload])
          },
          /**
           * 获得 User Role关联关系
           * @param reload
           * @returns {*}
           */
          fetchUserRoleListAsync(reload) {
            return ajaxService.getCacheList.apply(this, ['userRoleList', URL.ALL_USER_ROLE_LIST, reload])
          },
          /**
           * 获得角色权限
           * @param reload
           * @returns {*}
           */
          fetchRoleResListAsync(reload) {
            return ajaxService.getCacheList.apply(this, ['roleResList', URL.ALL_ROLE_RES_LIST, reload])
          }
        }
      },
      utils: {}
    })
  }
})()
