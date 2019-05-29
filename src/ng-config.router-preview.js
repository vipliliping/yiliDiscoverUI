angular.module('discovery').config([
  '$stateProvider', function ($stateProvider) {
    'ngInject'
    $stateProvider.state('nv', {
      url: '/nv',
      abstract: true,
      replace: true,
      template: '<div ui-view></div>'
    })
      .state('nv.dashboard', {
        url: '/dashboard/{category}',
        params: {category: null},
        abstract: true,
        template: '<div ui-view></div>'
      }).state('nv.dashboard.view', {
      url: '/{id}',
      params: {
        id: null,
        param: [],
        history: [],
        screenHistory: [],
        role: false
      },
      templateUrl: 'src/view/nv/dashboard/view.html',
      controller: 'NvDashboardViewCtrl'
    })
  }])
