(function () {
  'use strict'

  angular
    .module('discovery')
    .config(routerConfig)

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    // admin.user
      .state('admin.user', {
        url: '/user',
        templateUrl: H.PAGE('admin/user'),
        controller: 'adminUserCtrl'
      })
      // admin.user直接跳转到Tab
      .state('admin.userType', {
        url: '/user/{type}',
        templateUrl: H.PAGE('admin/user'),
        controller: 'adminUserCtrl'
      })
      // admin.user直接跳转到Tab的某个id
      .state('admin.userTypeId', {
        url: '/user/:type/:id',
        templateUrl: H.PAGE('admin/user'),
        controller: 'adminUserCtrl'
      })
      .state('demo', {
        url: '/demo',
        templateUrl: H.PAGE('demo/demo'),
        controller: 'demoCtrl'
      })

    $urlRouterProvider.otherwise('/')
  }

  angular
    .module('discovery')
    .service('ajaxService', ajaxService)

  /** @ngInject */
  function ajaxService($q, $http, exports) {
    return exports.service({
      actions: {
        getCacheList(name, url, reload) {
          const deferred = $q.defer()
          const self = this
          if (this[name].length && !reload) {
            deferred.resolve(this[name])
          } else {
            $http.get(url).success(function (result) {
              // self[name] = self[name].splice(0, self[name].length).concat(result)
              self[name] = result
              deferred.resolve(self[name])
            })
          }
          return deferred.promise
        }
      },
      utils: {}
    })
  }
})()
