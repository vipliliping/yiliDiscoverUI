angular.module('discovery').config([
  '$stateProvider', function($stateProvider) {
    'ngInject'
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      abstract: true,
      template: '<div ui-view></div>'
    }).state('mine', {
      url: '/mine',
      abstract: true,
      template: '<div ui-view></div>'
    }).state('mine.view', {
      url: '/{id}',
      params: {id: null},
      templateUrl: 'src/view/dashboard/view.html',
      controller: 'dashboardViewCtrl'
    }).state('dashboard.category', {
      url: '/{category}',
      params: {category: null},
      abstract: true,
      template: '<div ui-view></div>'
    }).state('dashboard.category.view', {
      url: '/{id}',
      params: {id: null},
      templateUrl: 'src/view/dashboard/view.html',
      controller: 'dashboardViewCtrl'
    }).state('config', {
      url: '/config',
      abstract: true,
      template: '<div ui-view></div>'
    }).state('config.board', {
      url: '/board',
      templateUrl: 'src/view/config/board.html',
      controller: 'boardCtrl'
    }).state('config.widget', {
      url: '/widget',
      params: {id: null},
      templateUrl: 'src/view/config/widget.html',
      controller: 'widgetCtrl'
    }).state('config.datasource', {
      url: '/datasource',
      templateUrl: 'src/view/config/datasource.html',
      controller: 'datasourceCtrl'
    }).state('config.category', {
      url: '/category',
      templateUrl: 'src/view/config/category.html',
      controller: 'categoryCtrl'
    }).state('config.dataset', {
      url: '/dataset',
      templateUrl: 'src/view/config/dataset.html',
      controller: 'datasetCtrl'
    }).state('config.model', {
      url: '/buildModel/{dataSourceId}',
      params: {dataSourceId: null, curDatasetId: null},
      templateUrl: 'src/view/config/buildModel.html',
      controller: 'buildModelCtrl'
    }).state('config.job', {
      url: '/job',
      templateUrl: 'src/view/config/job.html',
      controller: 'jobCtrl'
    }).state('config.role', {
      url: '/role',
      templateUrl: 'src/view/config/shareResource.html',
      controller: 'shareResCtrl'
    }).state('admin', {
      url: '/admin',
      abstract: true,
      template: '<div ui-view></div>'
    }).state('admin.user', {
      url: '/user',
      templateUrl: 'src/view/admin/user.html',
      controller: 'userAdminCtrl'
    })
    /** new version*/.state('nv', {
      url: '/nv',
      abstract: true,
      replace: true,
      template: '<div ui-view></div>'
    }).state('nv.screen_menu', {//大屏菜单
      url: '/screen/menu',
      templateUrl: 'src/view/nv/screen/screen_menu.html',
      controller: 'NvScreenMenuCtrl'
    }).state('nv.statistics', {//统计
      url: '/statistics',
      templateUrl: 'src/view/nv/statistics/index.html',
      controller: 'NvStatisticsCtrl'
    }).state('nv.typeControl', {//管理分类
      url: '/typeControl',
      templateUrl: 'src/view/nv/typeControl/index.html',
      controller: 'NvTypeControlCtrl'
    }).state('nv.datasource', {//数据源
      url: '/datasource',
      templateUrl: 'src/view/nv/datasource/index.html',
      controller: 'NvDataSourceCtrl'
    }).state('nv.explore_item', {//explore详情
      url: '/explore/:id',
      templateUrl: 'src/view/nv/explore/edit.html',
      controller: 'nvExploreEditCtrl'
    }).state('nv.explore_create', {//新建图表
      url: '/explore/create/new',
      templateUrl: 'src/view/nv/explore/edit.html',
      controller: 'nvExploreEditCtrl',
      params: {create: true}
    }).state('nv.explore_create_by', {//使用数据源新建图表
      url: '/explore/create/by/:cube_id',
      templateUrl: 'src/view/nv/explore/edit.html',
      controller: 'nvExploreEditCtrl',
      params: {create: true}
    }).state('nv.explore', {//explore列表
      url: '/explore',
      templateUrl: 'src/view/nv/explore/list.html',
      controller: 'nvExploreListCtrl'
    }).state('home', {
      url: '',
      templateUrl: 'src/view/nv/home/index.html',
      controller: 'nvHomeCtrl'
    }).state('nv.knowledgegraph', {
      url: '/knowledge',
      templateUrl: 'src/view/nv/knowledgeGraph/index.html',
      controller: function() {
        var kg = document.getElementById('kg')
        kg.setAttribute('src', ZSTP_URL)
      }
    })
    /** home page new version **/.state('nv.homepage', {
      url: '/home',
      templateUrl: 'src/view/nv/home/index.html',
      controller: 'nvHomeCtrl'
    })
    /** cube new version **/.state('nv.cube', {
      url: '/cube',
      templateUrl: 'src/view/nv/cube/index.html',
      controller: 'nvCubeCtrl'
    }).state('nv.cube_item', {
      url: '/cube/:id',
      templateUrl: 'src/view/nv/cube/index.html',
      controller: 'nvCubeCtrl'
    }).state('nv.cube_view', {
      url: '/cube_view',
      templateUrl: 'src/view/nv/cube/index.html',
      controller: 'nvCubeCtrl',
      params: {onlyView: true}
    }).state('nv.neo_vis', {
      url: '/neo_vis',
      templateUrl: 'src/view/nv/neo/index.html'
    }).state('nv.dashboard_panel', {
      url: '/dashboard_panel',
      controller: 'nvDashboardPanelCtrl',
      templateUrl: 'src/view/nv/dashboard/index.html'
    }).state('nv.mind', {
      url: '/mind/:id',
      controller: 'nvJsMindCtrl',
      templateUrl: 'src/view/nv/mind/index.html'
    }).state('nv.mind_list', {
      url: '/mind',
      controller: 'nvJsMindListCtrl',
      templateUrl: 'src/view/nv/mind/list.html'
    })
    /** dashboard new version **/
    // .state('nv.preview', {
    //     url: '/preview/{id}',
    //     params: {id: null, param: [], tabs: null, history: [], role: null},
    //     templateUrl: 'src/view/nv/dashboard/preview.html',
    //     controller: 'NvDashboardViewCtrl'
    // })
    // .state('nv.preview_role', {
    //     url: '/preview/{id}/{role}',
    //     params: {id: null, param: [], tabs: null, history: [], screenHistory: [], role: false},
    //     templateUrl: 'src/view/nv/dashboard/preview.html',
    //     controller: 'NvDashboardViewCtrl'
    // })
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
    }).state('nv.dashboard.role_view', {
      url: '/{id}/{role}',
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
    /** upload excel **/.state('nv.excel', {
      abstract: true,
      template: '<div ui-view></div>'
    }).state('nv.excel.upload', {
      url: '/excel/upload',
      templateUrl: 'src/view/nv/excel/upload.html',
      controller: function() {
      }
    })
    /** share new version **/.state('nv.share', {
      url: '/share',
      templateUrl: 'src/view/nv/share/index.html',
      controller: 'nvShareCtrl'
    }).state('docs', {
      abstract: true,
      template: '<div ui-view></div>'
    }).state('docs.analyse', {
      url: '/nv/docs/analyse',
      templateUrl: 'src/view/nv/docs/analyse.html',
      controller: 'NvDocsAnalyse'
    }).state('docs.result', {
      url: '/nv/docs/result/{widgetList}',
      params: {widgetList: null},
      // templateUrl: 'src/view/nv/docs/result.html',
      // controller: 'NvDocsResult'
      templateUrl: 'src/view/nv/docs/related/dataset.html',
      controller: 'NvDocsWidgetCtrl'

    }).state('docs.related', {
      abstract: true,
      template: '<div ui-view></div>'
    }).state('docs.related.widget', {
      url: '/nv/docs/related/widget/{widgetId}',
      params: {widgetId: null},
      templateUrl: 'src/view/nv/docs/related/widget.html',
      controller: 'NvDocsRelatedWidgetCtrl'
    }).state('docs.related.dataset', {
      url: '/nv/docs/related/dataset/{datasetId}',
      params: {datasetId: null},
      templateUrl: 'src/view/nv/docs/related/dataset.html',
      controller: 'NvDocsWidgetCtrl'
    }).state('render', {
      url: '/render/:wid',
      params: {wid: null},
      templateUrl: 'src/view/render/index.html',
      controller: 'renderCtrl'
    }).state('chart', {
      url: '/chart/:wid',
      params: {wid: null},
      templateUrl: 'src/view/nv/onlyChart/index.html',
      controller: 'chartCtrl'
    })
    // .state('nv.board', {//dashboard列表
    //     url: '/board',
    //     templateUrl: 'src/view/nv/dashboard/board.html',
    //     controller: 'NvBoardCtrl'
    // })
    // .state('nv.dashboard', {
    //     url: '/dashboard',
    //     templateUrl: 'src/view/nv/dashboard/view.html',
    //     controller: 'NvDashboardViewCtrl'
    // });
  }])
