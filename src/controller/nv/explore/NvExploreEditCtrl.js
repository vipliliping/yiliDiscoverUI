'use strict'
discovery.controller('personCtrl', function ($scope) {
  'ngInject'
  $scope.myChartOption = true
  $scope.openChartOption = function () {
    $scope.myChartOption = !$scope.myChartOption
  }
}).controller('saveWgtAsCtrl',
  function ($scope, $http, $uibModalInstance, $filter, widgetName) {
    'ngInject'
    $scope.widgetName = widgetName
    $scope.ok = function () {
      $uibModalInstance.close($scope.widgetName)
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }
  }).controller('nvExploreEditCtrl',
  function ($scope, $window, $stateParams, $state, $http, $uibModal,
            dataService, ModalUtils, updateService, $filter, chartService,
            $timeout, EventService, BoardParamService, $q) {
    'ngInject'

    $.colors = {
      red: '#FF7872',
      green: '#7ACE4C',
      yellow: '#FFB85E',
      gray: '#EEEEEE',
      blue: '#11A0F8'
    }
    $.ibm = {
      colors: {
        blue: '#11A0F8',
        green: '#26C8A4',
        purple: '#BF8FE1',
        blue2: '#337FFF',
        orange: '#FF8426',
        yellow: '#FFBB44',
        pink: '#FF7872',
        green2: '#7ACE4C',
        black: '#354052',
        gray: '#7F8FA4'
      }
    }
    CBoardEChartRender.prototype.theme = 'theme-fin1'
    var translate = $filter('translate')
    var updateUrl = 'dashboard/updateWidget.do'

    // 配置项的文本编辑器配置
    $scope.expAceOpt = cbAcebaseOption
    $scope.expAceOpt = datasetEditorOptions()

    //图表类型初始化
    $http.get('admin/isAdmin.do').success(function (response) {
      $scope.isAdmin = response
      if ($scope.isAdmin) {
        // $scope.chart_group[2].list.push({
        //     name: translate('CONFIG.WIDGET.FLEX'),
        //     value: 'flex',
        //     class: 'cFlex'
        // });
        $scope.chart_group[2].list.push({
          name: translate('CONFIG.WIDGET.FLEX2'),
          value: 'flex2',
          class: 'cFlex2'
        })
        $scope.chart_group[2].list.push({
          name: translate('CONFIG.WIDGET.FLEXCHART'),
          value: 'flexChart',
          class: 'cFlex',
          row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
          column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
          measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        })
        $scope.chart_group[2].list.push({
          name: translate('CONFIG.WIDGET.FLEXD3CHART'),
          value: 'flexD3Chart',
          class: 'cFlexD3Chart',
          row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
          column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
          measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
        })
      }
      //     row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
      //     column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
      //     measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
      // }, {
    })

    $scope.goToCube = function () {
      if ($scope.curWidget && $scope.curWidget.datasetId)
        window.open('#/nv/cube/' + $scope.curWidget.datasetId, 'cube')
      // $state.go('config.widget', {id: $scope.curWidget.datasetId});
    }

    //新建数据
    $scope.newData = function () {
      var newDataModal = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'src/view/nv/dashboard/layout/modals/newData.html',
        size: 'md',
        controller: 'newData',
        resolve: {}
      })
      newDataModal.result.then(function (boardConfig) {
        var dataset = _.findWhere($scope.datasetList, {
          name: boardConfig.selectTable,
          categoryName: '自动建模/' + boardConfig.datasource.name
        })
        if (dataset) { // 已有dataset
          $state.go('nv.explore_create_by', {cube_id: dataset.id})
        } else { //ajax新建
          var ds = {
            data: {
              expressions: [],
              filters: [],
              schema: {
                dimension: [],
                measure: []
              },
              datasource: boardConfig.datasource.id,
              query: {
                sql: 'select * from ' + boardConfig.selectTable
              }
            },
            name: boardConfig.selectTable,
            categoryName: '自动建模/' + boardConfig.datasource.name,
            loadFromCache: true
          }
          $http.post('dashboard/saveNewDataset.do',
            {json: angular.toJson(ds)}).success(function (serviceStatus) {
            if (serviceStatus.status == '1') {
              $state.go('nv.explore_create_by',
                {cube_id: serviceStatus.uuid})
            } else {
              $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
            }
          })
        }
      })
    }

    $scope.chart_group = [
      {
        name: '常用',
        list: [
          {
            name: translate('CONFIG.WIDGET.TABLE'),
            value: 'table',
            class: 'cTable',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.DATALINETABLE'),
            value: 'dataLineTable',
            class: 'cDataLineTable',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.TREEGRID'),
            value: 'treeGrid',
            class: 'cTreeGrid',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.CROSSTABLE'),
            value: 'crossTable',
            class: 'cCrossTable',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.CROSSGREATTABLE'),
            value: 'crossGreatTable',
            class: 'cCrossGreatTable',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.SELECTOR'),
            value: 'selector',
            class: 'cSelector',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.LINE_BAR'),
            value: 'line',
            class: 'cLine',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.LINE_BAR2'),
            value: 'line2',
            class: 'cLine2',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.LINE_BAR3'),
            value: 'line3',
            class: 'cLine3',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.SCATTER'),
            value: 'scatter',
            class: 'cScatter',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.SCATTER2'),
            value: 'scatter2',
            class: 'cScatter2',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.PIE'),
            value: 'pie',
            class: 'cPie',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          }
          ,
          {
            name: translate('CONFIG.WIDGET.PIE2'),
            value: 'pie2',
            class: 'cPie2',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          }
        ]
      },
      {
        name: '三维',
        list: [
          {
            name: translate('CONFIG.WIDGET.3DMAP'),
            value: 'echart3dMap',
            class: 'cechart3dMap',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.3DBAR'),
            value: 'echart3dBar',
            class: 'cechart3dBar',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.3DAREA'),
            value: 'echart3dArea',
            class: 'cechart3dArea',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.3DMAPLINE'),
            value: 'echart3dMapLine',
            class: 'cechart3dMapLine',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          }
        ]
      },
      {
        name: '其他',
        list: [
          {
            name: translate('CONFIG.WIDGET.ZONEMAP'),
            value: 'zoneMap',
            class: 'cZoneMap',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.CITYMAP'),
            value: 'cityMap',
            class: 'cCityMap',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.KPI'),
            value: 'kpi',
            class: 'cKpi',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.FUNNEL'),
            value: 'funnel',
            class: 'cFunnel',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.SANKEY'),
            value: 'sankey',
            class: 'cSankey',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          /*{
             name: translate('CONFIG.WIDGET.CIRCULAR'), value: 'circular', class: 'cCircular',
             row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
             column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
             measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
             },*/
          {
            name: translate('CONFIG.WIDGET.BARPOLARSTACK'),
            value: 'barPolarStack',
            class: 'cBarPolarStack',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.PIEPROPORTION'),
            value: 'pieProportion',
            class: 'cPieProportion',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.RADAR'),
            value: 'radar',
            class: 'cRadar',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          /*{
             name: translate('CONFIG.WIDGET.MAP'), value: 'map', class: 'cMap',
             row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
             column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
             measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
             },*/
          {
            name: translate('CONFIG.WIDGET.GAUGE'),
            value: 'gauge',
            class: 'cGauge',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.WORD_CLOUD'),
            value: 'wordCloud',
            class: 'cWordCloud',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.TREE_MAP'),
            value: 'treeMap',
            class: 'cTreeMap',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          /*{
             name: translate('CONFIG.WIDGET.AREA_MAP'), value: 'areaMap', class: 'cAreaMap',
             row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
             column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
             measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
             },
             {
             name: translate('CONFIG.WIDGET.HEAT_MAP_CALENDER'),
             value: 'heatMapCalendar',
             class: 'cHeatMapCalendar',
             row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1'),
             column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
             measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
             },*/
          {
            name: translate('CONFIG.WIDGET.HEAT_MAP_TABLE'),
            value: 'heatMapTable',
            class: 'cHeatMapTable',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          /*{
             name: translate('CONFIG.WIDGET.MARK_LINE_MAP'), value: 'markLineMap', class: 'cMarkLineMap',
             row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
             column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
             measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
             },
             {
             name: translate('CONFIG.WIDGET.LIQUID_FILL'), value: 'liquidFill', class: 'cLiquidFill',
             row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
             column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
             measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
             }*/
          /*{
             name: "d3Demo", value: 'd3Demo', class: 'cD3Demo',
             row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
             column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0'),
             measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
             },*/
          {
            name: translate('CONFIG.WIDGET.CODEFLOWER'),
            value: 'codeFlower',
            class: 'cCodeFlower',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            //     name: translate('CONFIG.WIDGET.FLEX'), value: 'flex', class: 'cFlex',
            //     row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            //     column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            //     measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
            // }, {
            name: translate('CONFIG.WIDGET.BARLIMITS'),
            value: 'barLimits',
            class: 'cBarLimits',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.LINEMAP'),
            value: 'lineMap',
            class: 'cLineMap',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.GANTT'),
            value: 'gantt',
            class: 'cGantt',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE')
          },
          {
            name: translate('CONFIG.WIDGET.ROSE'),
            value: 'rose',
            class: 'cRose',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          },
          {
            name: translate('CONFIG.WIDGET.CHORD'),
            value: 'chord',
            class: 'cChord',
            row: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1_MORE'),
            column: translate('CONFIG.WIDGET.TIPS_DIM_NUM_0_MORE'),
            measure: translate('CONFIG.WIDGET.TIPS_DIM_NUM_1')
          }
        ]
      }
    ]

    $scope.clearEmptyValues = function () {
      if ($scope.curWidget && $scope.curWidget.config.values) {
        $scope.curWidget.config.values = _.filter(
          $scope.curWidget.config.values, function (value) {
            return value.cols.length > 0
          })
      }
    }
    $scope.chart_types_status = {
      'line': true,
      'line2': true,
      'line3': true,
      'pie': true,
      'kpi': true,
      'table': true,
      'crossTable': true,
      'treeGrid': true,
      'crossGreatTable': true,
      'selector': true,
      'dataLineTable': true,
      'chord': true,
      'cityMap': true,
      'circular': true,
      'echart3dMap': true,
      'funnel': true,
      'zoneMap': true,
      'sankey': true,
      'barPolarStack': true,
      'pieProportion': true,
      'radar': true,
      'map': true,
      'echart3dMapLine': true,
      'echart3dBar': true,
      'echart3dArea': true,
      'scatter': true,
      'scatter2': true,
      'gauge': true,
      'wordCloud': true,
      'treeMap': true,
      'areaMap': true,
      'heatMapCalendar': true,
      'heatMapTable': true,
      'markLineMap': true,
      'liquidFill': true,
      'd3Demo': true,
      'codeFlower': true,
      'flex': true,
      'flex2': true,
      'barLimits': true,
      'lineMap': true,
      'pie2': true,
      'gantt': true,
      'flexChart': true,
      'flexD3Chart': true,
      'rose': true
    }

    $scope.value_series_types = [
      {name: translate('CONFIG.WIDGET.LINE'), value: 'line'},
      {name: translate('CONFIG.WIDGET.BAR'), value: 'bar'},
      {name: translate('CONFIG.WIDGET.STACKED_BAR'), value: 'stackbar'},
      {name: translate('CONFIG.WIDGET.PERCENT_BAR'), value: 'percentbar'},
      {name: translate('CONFIG.WIDGET.SCATTER'), value: 'scatter'},
      {name: translate('CONFIG.WIDGET.STACK_LINE'), value: 'stackline'},
      {name: translate('CONFIG.WIDGET.ONE_LINE_BAR'), value: 'oneLineBar'},
      {name: translate('CONFIG.WIDGET.WATER_FALL'), value: 'waterFall'}
    ]
    $scope.value_series_color = [
      {name: '红色', value: 'red'},
      {name: '蓝色', value: 'blue'}
    ]
    $scope.value_series_Mtypes = [
      {name: '柱图', value: 'bar3D'},
      {name: '点图', value: 'scatter3D'}
    ]
    $scope.value_aggregate_types = [
      {name: '总计', value: 'sum'},
      {name: '计数', value: 'count'},
      {name: '取平均', value: 'avg'},
      {name: '取最大', value: 'max'},
      {name: '取最小', value: 'min'},
      {name: '可用值数', value: 'distinct'}
    ]

    $scope.kpi_styles = [
      {name: translate('CONFIG.WIDGET.AQUA'), value: 'text-aqua'},
      {name: translate('CONFIG.WIDGET.RED'), value: 'text-red'},
      {name: translate('CONFIG.WIDGET.GREEN'), value: 'text-green'},
      {name: translate('CONFIG.WIDGET.YELLOW'), value: 'text-yellow'},
      {name: translate('CONFIG.WIDGET.CYAN'), value: 'text-cyan'}
    ]

    $scope.iconList = [
      {value: ''},
      {value: 'fa fa-area-chart'},
      {value: 'fa fa-bar-chart'},
      {value: 'fa fa-line-chart'},
      {value: 'fa fa-pie-chart'},
      {value: 'glyphicon glyphicon-bell'},
      {value: 'glyphicon glyphicon-bookmark'},
      {value: 'glyphicon glyphicon-briefcase'},
      {value: 'glyphicon glyphicon-bullhorn'},
      {value: 'glyphicon glyphicon-calendar'},
      {value: 'glyphicon glyphicon-circle-arrow-up'},
      {value: 'glyphicon glyphicon-circle-arrow-down'},
      {value: 'glyphicon glyphicon-comment'},
      {value: 'glyphicon glyphicon-globe'},
      {value: 'glyphicon glyphicon-home'},
      {value: 'glyphicon glyphicon-list-alt'},
      {value: 'glyphicon glyphicon-plane'},
      {value: 'glyphicon glyphicon-random'},
      {value: 'glyphicon glyphicon-refresh'},
      {value: 'glyphicon glyphicon-repeat'},
      {value: 'glyphicon glyphicon-send'},
      {value: 'glyphicon glyphicon-sort'},
      {value: 'glyphicon glyphicon-star'},
      {value: 'glyphicon glyphicon-tag'},
      {value: 'glyphicon glyphicon-th-large'},
      {value: 'glyphicon glyphicon-time'},
      {value: 'glyphicon glyphicon-tint'},
      {value: 'glyphicon glyphicon-tower'},
      {value: 'glyphicon glyphicon-trash'},
      {value: 'glyphicon glyphicon-user'},
      {value: 'glyphicon glyphicon-wrench'},
      {value: 'fa fa-anchor'},
      {value: 'fa fa-automobile'},
      {value: 'fa fa-bank'},
      {value: 'fa fa-bullseye'},
      {value: 'fa fa-cab'},
      {value: 'fa fa-comment'},
      {value: 'fa fa-database'},
      {value: 'fa fa-dashboard'},
      {value: 'fa fa-diamond'},
      {value: 'fa fa-cube'},
      {value: 'fa fa-fighter-jet'},
      {value: 'fa fa-flag'},
      {value: 'fa fa-lightbulb-o'},
      {value: 'fa fa-lock'},
      {value: 'fa fa-location-arrow'},
      {value: 'fa fa-plane'},
      {value: 'fa fa-search'},
      {value: 'fa fa-shield'},
      {value: 'fa fa-sitemap'},
      {value: 'fa fa-signal'},
      {value: 'fa fa-ship'},
      {value: 'fa fa-space-shuttle'},
      {value: 'fa fa-rmb'},
      {value: 'fa fa-list-alt'}
    ]

    $scope.alignIcon = [
      {value: 'fa fa-align-left', align: 'textLeft'},
      {value: 'fa fa-align-center', align: 'textCenter'},
      {value: 'fa fa-align-right', align: 'textRight'}
    ]

    $scope.iconActive = function (icon) {
      $scope.curWidget.config.values[0].icon = icon
    }

    $scope.switchAlign = function (align) {
      $scope.curWidget.config.values[0].align = align
    }

    $.getJSON('plugins/FineMap/mapdata/citycode.json', function (data) {
      $scope.provinces = data.provinces
    })

    $scope.treemap_styles = [
      {name: translate('CONFIG.WIDGET.RANDOM'), value: 'random'},
      {name: translate('CONFIG.WIDGET.MULTI'), value: 'multi'},
      {name: translate('CONFIG.WIDGET.BLUE'), value: 'blue'},
      {name: translate('CONFIG.WIDGET.RED'), value: 'red'},
      {name: translate('CONFIG.WIDGET.GREEN'), value: 'green'},
      {name: translate('CONFIG.WIDGET.YELLOW'), value: 'yellow'},
      {name: translate('CONFIG.WIDGET.PURPLE'), value: 'purple'}
    ]

    $scope.heatmap_styles = [
      {name: translate('CONFIG.WIDGET.BLUE'), value: ['#eee', 'blue']},
      {name: translate('CONFIG.WIDGET.RED'), value: ['#eee', 'red']},
      {name: translate('CONFIG.WIDGET.GREEN'), value: ['#eee', 'green']},
      {name: translate('CONFIG.WIDGET.YELLOW'), value: ['#eee', 'yellow']},
      {name: translate('CONFIG.WIDGET.PURPLE'), value: ['#eee', 'purple']},
      {
        name: '绿/黄/红',
        value: [
          /*"Rgb(138,169,106)",*/
          'Rgb(148,219,34)',
          '#FFD73E',
          '#F29400',
          '#b72222'
          /*, "Rgb(120,120,120)"*/]
      }
    ]

    $scope.heatmap_date_format = [
      {name: 'yyyy-MM-dd', value: 'yyyy-MM-dd'},
      {name: 'yyyy/MM/dd', value: 'yyyy/MM/dd'},
      {name: 'yyyyMMdd', value: 'yyyyMMdd'}
    ]

    $scope.liquid_fill_style = [
      {name: translate('CONFIG.WIDGET.CIRCLE'), value: 'circle'},
      {name: translate('CONFIG.WIDGET.PIN'), value: 'pin'},
      {name: translate('CONFIG.WIDGET.RECT'), value: 'rect'},
      {name: translate('CONFIG.WIDGET.ARROW'), value: 'arrow'},
      {name: translate('CONFIG.WIDGET.TRIANGLE'), value: 'triangle'},
      {name: translate('CONFIG.WIDGET.ROUND_RECT'), value: 'roundRect'},
      {name: translate('CONFIG.WIDGET.SQUARE'), value: 'square'},
      {name: translate('CONFIG.WIDGET.DIAMOND'), value: 'diamond'}
    ]

    /***************************************
     *  0:  None items
     *  1:  only 1 item
     * -1:  None Restrict
     *  2:  1 or more
     ***************************************/
    $scope.configRule = {
      cityMap: {keys: 2, groups: 0, filters: -1, values: 2, events: -1},
      zoneMap: {keys: 2, groups: 0, filters: -1, values: 1, events: -1},
      chord: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      line: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      line2: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      line3: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      pie: {keys: 2, groups: 0, filters: -1, values: 2, events: -1},
      pie2: {keys: 0, groups: 0, filters: -1, values: 2, events: -1},
      flexChart: {keys: -1, groups: -1, filters: -1, values: -1, events: -1},
      flexD3Chart: {
        keys: -1,
        groups: -1,
        filters: -1,
        values: -1,
        events: -1
      },
      kpi: {keys: 0, groups: 0, filters: -1, values: 1, events: -1},
      table: {keys: -1, groups: -1, filters: -1, values: -1, events: -1},
      treeGrid: {keys: -1, groups: 0, filters: -1, values: -1, events: -1},
      crossTable: {keys: -1, groups: -1, filters: -1, values: -1, events: -1},
      crossGreatTable: {keys: -1, groups: 0, filters: -1, values: -1, events: -1},
      selector: {keys: -1, groups: 0, filters: -1, values: 0, events: -1},
      funnel: {keys: -1, groups: -1, filters: -1, values: 2, events: -1},
      sankey: {keys: 2, groups: 2, filters: -1, values: 1, events: -1},
      circular: {keys: 2, groups: 2, filters: -1, values: 1, events: -1},
      echart3dMap: {keys: 2, groups: 0, filters: -1, values: 1, events: -1},
      echart3dBar: {keys: 2, groups: 2, filters: -1, values: 1, events: -1},
      echart3dArea: {keys: 2, groups: 2, filters: -1, values: 1, events: -1},
      barPolarStack: {
        keys: 2,
        groups: -1,
        filters: -1,
        values: 2,
        events: -1
      },
      pieProportion: {
        keys: 2,
        groups: 0,
        filters: -1,
        values: -1,
        events: -1
      },
      radar: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      map: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      scatter: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      scatter2: {keys: 2, groups: -1, filters: -1, values: 2, events: -1},
      gauge: {keys: 0, groups: 0, filters: -1, values: 1, events: -1},
      wordCloud: {keys: 2, groups: 0, filters: -1, values: 1, events: -1},
      treeMap: {keys: 2, groups: 0, filters: -1, values: 1, events: -1},
      areaMap: {keys: 2, groups: -1, filters: -1, values: 1, events: -1},
      heatMapCalendar: {
        keys: 1,
        groups: 0,
        filters: -1,
        values: 1,
        events: -1
      },
      heatMapTable: {
        keys: -1,
        groups: -1,
        filters: -1,
        values: 1,
        events: -1
      },
      markLineMap: {keys: 2, groups: 2, filters: -1, values: 1, events: -1},
      liquidFill: {keys: 0, groups: 0, filters: -1, values: 1, events: -1},
      d3Demo: {keys: 2, groups: 0, filters: -1, values: 2, events: -1},
      codeFlower: {keys: 2, groups: 0, filters: -1, values: 2, events: -1},
      flex: {keys: -1, groups: -1, filters: -1, values: -1, events: -1},
      flex2: {keys: -1, groups: -1, filters: -1, values: -1, events: -1},
      barLimits: {keys: 2, groups: 0, filters: -1, values: -1, events: -1},
      dataLineTable: {
        keys: -1,
        groups: 0,
        filters: -1,
        values: -1,
        events: -1
      },
      lineMap: {keys: 2, groups: -1, filters: -1, values: -1, events: -1},
      echart3dMapLine: {
        keys: 2,
        groups: 2,
        filters: -1,
        values: -1,
        events: -1
      },
      gantt: {keys: 2, groups: 2, filters: -1, values: 0, events: -1},
      rose: {keys: 2, groups: -1, filters: -1, values: 2, events: -1}
    }
    var optionRule = {
      cityMap: true,
      zoneMap: true,
      chord: true,
      codeFlower: true,
      wordCloud: true,
      barPolarStack: true,
      sankey: true,
      echart3dArea: true,
      echart3dBar: true,
      table: true,
      crossTable: true,
      treeGrid: true,
      crossGreatTable: true,
      selector: true,
      dataLineTable: true,
      line: true,
      line2: true,
      line3: true,
      pie: true,
      pie2: true,
      flexChart: true,
      flexD3Chart: true,
      kpi: true,
      funnel: true,
      radar: true,
      map: true,
      scatter: true,
      scatter2: true,
      pieProportion: true,
      gauge: true,
      treeMap: true,
      heatMapCalendar: true,
      heatMapTable: true,
      markLineMap: true,
      echart3dMap: true,
      // d3Demo: true
      echart3dMapLine: true,
      flex: true,
      flex2: true,
      barLimits: true,
      lineMap: true,
      gantt: true,
      rose: true
    }
    $scope.hasOption = function () {
      if ($scope.curWidget
        && $scope.curWidget.config
        && $scope.curWidget.config.chart_type
        && optionRule[$scope.curWidget.config.chart_type])
        return true
      else return false
    }
    $scope.refresh = function () {
      loadDataset(function () {
        // debugger
        // $scope.curWidget.dimensionGroups = [];
        // loadDsDimensionGroups();
        $scope.curWidget.measureGroups = []
        loadDsMeasureGroups()

        $scope.curWidget.computedDimensionGroups = []
        $scope.curWidget.computedGroups = []
        loadDsComputedGroups()

        $scope.curWidget.expressions = []
        loadDsExpressions()
        $scope.curWidget.filterGroups = []
        loadDsFilterGroups()
        buildSchema()
      })
    }
    //界面控制
    $scope.loading = false
    $scope.toChartDisabled = true
    $scope.optFlag = ''
    $scope.alerts = []
    $scope.treeData = []
    var originalData = []
    var treeID = 'widgetTreeID' // Set to a same value with treeDom

    $scope.datasource
    $scope.widgetName
    $scope.widgetCategory
    $scope.widgetId
    $scope.curWidget = {}
    $scope.previewDivWidth = 12
    $scope.expressions = []
    $scope.customDs = false
    $scope.loadFromCache = true
    $scope.filterSelect = {}
    $scope.verify = {widgetName: true}
    $scope.params = []

    //获取id获取widget详情
    var getWidgetInfo = function (callback) {
      $http.get('dashboard/dashboardWidget.do?id=' + $stateParams.id).success(function (response) {
        $scope.widgetInfo = response
        if (callback) {
          callback()
        }
      })
    }

    var loadDataset = function (callback) {
      // dashboard/getDatasetList.do
      $http.get('dashboard/getDatasetNameList.do').success(function (response) {
        $scope.datasetList = response
        if (callback) {
          callback()
        }
      })
    }
    $scope.goBack = function () {
      $window.history.back()
    }
    // if($stateParams)
    loadDataset()
    // $http.get("dashboard/getDatasetCategoryList.do").success(function (response) {
    //     $scope.datasetCategoryList = response;
    // });

    var loadDatasetInfo = function (callback) {
      $http.get('dashboard/getDatasetById.do?id=' + $scope.curWidget.datasetId).then(function (response) {
        $scope.dataset = response.data[0]
        if (callback) {
          callback()
        }
      })
    }

    var getDatasourceList = function () {
      $http.get('dashboard/getDatasourceList.do').success(function (response) {
        $scope.datasourceList = response
        getCategoryList()
        if ($stateParams.create) {
          $scope.newWgt()
          if ($stateParams.cube_id) {
            $scope.curWidget = {
              datasetId: $stateParams.cube_id + '',
              query: {},
              measureGroups: [],
              dimensionGroups: [],
              computedDimensionGroups: [],
              computedGroups: [],
              expressions: [],
              filterGroups: [],
              config: {
                option: {},
                events: []
              }
            }
            $scope.loadData()
          }
        } else if ($stateParams.id) {
          getWidgetInfo(function () {
            $scope.editWgt($scope.widgetInfo)
          })
        }
      })
    }
    getDatasourceList()

    $scope.datasetGroup = function (item) {
      return item.categoryName
    }

    var getWidgetList = function (callback) {
      $http.get('dashboard/getWidgetList.do').success(function (response) {
        $scope.widgetList = response
        if (callback) {
          callback()
        }
        // $scope.searchNode();
      })
    }

    var getCategoryList = function () {
      $http.get('dashboard/getWidgetCategoryList.do').success(function (response) {
        $scope.categoryList = response
        $('#widgetName').autocomplete({
          source: $scope.categoryList
        })
      })
    }

    $scope.editExp = function (col) {
      var selects = schemaToSelect($scope.schema)
      var aggregate = $scope.value_aggregate_types
      var curWidget = $scope.curWidget
      var ok
      var data = {expression: ''}
      if (!col) {
        ok = function (data) {
          $scope.curWidget.expressions.push({
            type: 'exp',
            exp: data.expression,
            alias: data.alias
          })
        }
      } else {
        data.expression = col.exp
        data.alias = col.alias
        ok = function (data) {
          col.exp = data.expression
          col.alias = data.alias
        }
      }

      $uibModal.open({
        templateUrl: 'src/view/nv/explore/modal/exp.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.data = data
          $scope.curWidget = curWidget
          $scope.selects = selects
          $scope.aggregate = aggregate
          $scope.alerts = []
          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.expAceOpt = expEditorOptions(selects, aggregate)
          $scope.addToken = function (str, agg) {
            var tc = document.getElementById('expression_area')
            var tclen = $scope.data.expression.length
            tc.focus()
            var selectionIdx = 0
            if (typeof document.selection != 'undefined') {
              document.selection.createRange().text = str
              selectionIdx = str.length - 1
            }
            else {
              var a = $scope.data.expression.substr(0, tc.selectionStart)
              var b = $scope.data.expression.substring(tc.selectionStart,
                tclen)
              $scope.data.expression = a + str
              selectionIdx = $scope.data.expression.length - 1
              $scope.data.expression += b
            }
            if (!agg) {
              selectionIdx++
            }
            tc.selectionStart = selectionIdx
            tc.selectionEnd = selectionIdx
          }
          $scope.verify = function () {
            $scope.alerts = []
            var v = verifyAggExpRegx($scope.data.expression)
            $scope.alerts = [
              {
                msg: v.isValid ? translate('COMMON.SUCCESS') : v.msg,
                type: v.isValid ? 'success' : 'danger'
              }]
          }
          $scope.ok = function () {
            if (!$scope.data.alias) {
              ModalUtils.alert(translate('CONFIG.WIDGET.ALIAS') +
                translate('COMMON.NOT_EMPTY'), 'modal-warning', 'lg')
              return
            }
            ok($scope.data)
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.editMea = function (col) {
      var selects = schemaToSelect($scope.schema)
      var aggregate = [
        {name: '+', value: '+'},
        {name: '-', value: '-'},
        {name: '*', value: '*'},
        {name: '/', value: '/'}
      ]
      var ok
      var data = {expression: ''}
      if (!col) {
        ok = function (column, alias) {
          $scope.curWidget.measureGroups.push({
            type: 'column',
            column: data.expression,
            alias: data.alias
          })
        }
      } else {
        data.expression = col.column
        data.alias = col.alias
        ok = function (data) {
          col.column = data.expression
          col.alias = data.alias
        }
      }

      $uibModal.open({
        templateUrl: 'src/view/nv/explore/modal/measure.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.data = data
          $scope.selects = selects
          $scope.aggregate = aggregate
          $scope.alerts = []
          $scope.expAceOpt = expEditorOptions(selects, aggregate)

          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.addToken = function (str, agg) {
            var tc = document.getElementById('expression_area')
            var tclen = $scope.data.expression.length
            tc.focus()
            var selectionIdx = 0
            if (typeof document.selection != 'undefined') {
              document.selection.createRange().text = str
              selectionIdx = str.length - 1
            }
            else {
              var a = $scope.data.expression.substr(0, tc.selectionStart)
              var b = $scope.data.expression.substring(tc.selectionStart,
                tclen)
              $scope.data.expression = a + str
              selectionIdx = $scope.data.expression.length - 1
              $scope.data.expression += b
            }
            if (!agg) {
              selectionIdx++
            }
            tc.selectionStart = selectionIdx
            tc.selectionEnd = selectionIdx
          }
          // $scope.verify = function () {
          //     $scope.alerts = [];
          //     var v = verifyAggExpRegx($scope.data.expression);
          //     $scope.alerts = [{
          //         msg: v.isValid ? translate("COMMON.SUCCESS") : v.msg,
          //         type: v.isValid ? 'success' : 'danger'
          //     }];
          // };
          $scope.ok = function () {
            if (!$scope.data.alias) {
              ModalUtils.alert(translate('CONFIG.WIDGET.ALIAS') +
                translate('COMMON.NOT_EMPTY'), 'modal-warning', 'lg')
              return
            }
            ok($scope.data)
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.editDim = function (col) {
      var selects = schemaToSelect($scope.schema)
      var ok
      var data = {expression: ''}
      if (!col) {
        ok = function (column, alias) {
          $scope.curWidget.dimensionGroups.push({
            type: 'column',
            column: data.expression,
            alias: data.alias
          })
        }
      } else {
        data.expression = col.column
        data.alias = col.alias
        ok = function (data) {
          col.column = data.expression
          col.alias = data.alias
        }
      }

      $uibModal.open({
        templateUrl: 'src/view/nv/explore/modal/dimension.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.data = data
          $scope.selects = selects
          $scope.alerts = []
          $scope.expAceOpt = expEditorOptions(selects, '')

          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.addToken = function (str, agg) {
            var tc = document.getElementById('expression_area')
            var tclen = $scope.data.expression.length
            tc.focus()
            var selectionIdx = 0
            if (typeof document.selection != 'undefined') {
              document.selection.createRange().text = str
              selectionIdx = str.length - 1
            }
            else {
              var a = $scope.data.expression.substr(0, tc.selectionStart)
              var b = $scope.data.expression.substring(tc.selectionStart,
                tclen)
              $scope.data.expression = a + str
              selectionIdx = $scope.data.expression.length - 1
              $scope.data.expression += b
            }
            if (!agg) {
              selectionIdx++
            }
            tc.selectionStart = selectionIdx
            tc.selectionEnd = selectionIdx
          }
          // $scope.verify = function () {
          //     $scope.alerts = [];
          //     var v = verifyAggExpRegx($scope.data.expression);
          //     $scope.alerts = [{
          //         msg: v.isValid ? translate("COMMON.SUCCESS") : v.msg,
          //         type: v.isValid ? 'success' : 'danger'
          //     }];
          // };
          $scope.ok = function () {
            if (!$scope.data.alias) {
              ModalUtils.alert(translate('CONFIG.WIDGET.ALIAS') +
                translate('COMMON.NOT_EMPTY'), 'modal-warning', 'lg')
              return
            }
            ok($scope.data)
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.loadData = function () {
      $scope.toChartDisabled = false
      // $scope.newConfig()
      $scope.filterSelect = {}
      loadDatasetInfo(function () {
        $scope.curWidget.measureGroups = []
        loadDsMeasureGroups()

        $scope.curWidget.computedDimensionGroups = []
        $scope.curWidget.computedGroups = []
        loadDsComputedGroups()

        $scope.curWidget.expressions = []
        loadDsExpressions()
        $scope.curWidget.filterGroups = []
        loadDsFilterGroups()
        buildSchema()
      })
      cleanPreview()
    }

    $scope.newWgt = function () {
      $scope.curWidget = {}
      $scope.curWidget.config = {}
      $scope.curWidget.config.option = {}
      $scope.curWidget.dimensionGroups = []
      $scope.curWidget.measureGroups = []
      $scope.curWidget.expressions = []
      $scope.curWidget.filterGroups = []
      $scope.curWidget.query = {}
      $scope.datasource = null
      $scope.widgetName = null
      $scope.widgetCategory = null
      $scope.widgetId = null
      $scope.optFlag = 'new'
      $scope.customDs = false
      $scope.schema = null
      addValidateWatch()
    }

    $scope.isDsDimensionGroups = function (o) {
      if ($scope.customDs) {
        return false
      } else {
        var dsExp = $scope.dataset.data.schema.dimension
        var exp = _.find(dsExp, function (e) {
          return e.id && o.id == e.id
        })
        return !_.isUndefined(exp)
      }
    }

    $scope.isDsMeasureGroups = function (o) {
      if ($scope.customDs) {
        return false
      } else {
        var mg = $scope.dataset.data.schema.measure
        var meaGrp = _.find(mg, function (e) {
          return e.id && o.id == e.id
        })
        return !_.isUndefined(meaGrp)
      }
    }

    $scope.isDsComputedGroups = function (o, type) {
      if ($scope.customDs) {
        return false
      } else {
        var mg = $scope.dataset.data.schema[type]
        var meaGrp = _.find(mg, function (e) {
          return e.id && o.id == e.id
        })
        return !_.isUndefined(meaGrp)
      }
    }

    $scope.isDsExpression = function (o) {
      if ($scope.customDs) {
        return false
      } else {
        var dsExp = $scope.dataset.data.expressions
        var exp = _.find(dsExp, function (e) {
          return e.id && o.id == e.id
        })
        return !_.isUndefined(exp)
      }
    }

    $scope.isDsFilter = function (o) {
      if ($scope.customDs) {
        return false
      } else {
        var fg = $scope.dataset.data.filters
        var f = _.find(fg, function (e) {
          return e.id && o.id == e.id
        })
        return !_.isUndefined(f)
      }
    }

    var loadDsFilterGroups = function () {
      if (!$scope.customDs) {
        var fg = $scope.dataset.data.filters
        if (fg) {
          _.each(fg, function (e) {
            $scope.curWidget.filterGroups.push(e)
          })
        }
      }
    }

    var loadDsExpressions = function () {
      if (!$scope.customDs) {
        var dsExp = $scope.dataset.data.expressions
        if (dsExp) {
          _.each(dsExp, function (e) {
            $scope.curWidget.expressions.push(e)
          })
        }
      }
    }

    var loadDsDimensionGroups = function () {
      if (!$scope.customDs) {
        var dg = $scope.dataset.data.schema.dimension
        if (dg) {
          _.each(dg, function (e) {
            $scope.curWidget.dimensionGroups.push(e)
          })
        }
      }
    }

    var loadDsMeasureGroups = function () {
      if (!$scope.customDs) {
        var mg = $scope.dataset.data.schema.measure
        if (mg) {
          _.each(mg, function (e) {
            $scope.curWidget.measureGroups.push(e)
          })
        }
      }
    }

    var loadDsComputedGroups = function () {
      if (!$scope.customDs) {
        var dimensionMg = $scope.dataset.data.schema.computedDimension
        var valueMg = $scope.dataset.data.schema.computed
        if (dimensionMg) {
          _.each(dimensionMg, function (e) {
            e['alias'] = e.column
            e['type'] = 'computedDimension'
            $scope.curWidget.computedDimensionGroups.push(e)
          })
        }
        if (valueMg) {
          _.each(valueMg, function (e) {
            e['alias'] = e.column
            e['type'] = 'computed'
            $scope.curWidget.computedGroups.push(e)
          })
        }
      }
    }

    var addWatch = function () {
      $scope.$watch('curWidget.config.keys', changeChartStatus, true)
      $scope.$watch('curWidget.config.groups', changeChartStatus, true)
      $scope.$watch('curWidget.config.values', changeChartStatus, true)
      $scope.$watch('curWidget.config.filters', changeChartStatus, true)
      $scope.$watch('curWidget.config.events', changeChartStatus, true)
      addValidateWatch()
    }

    var addValidateWatch = function () {
      $scope.$watch('widgetName', clearAlert, true)
      $scope.$watch('curWidget.datasetId', clearAlert, true)
    }
    var clearAlert = function () {
      $scope.alerts = []
      $scope.verify = {widgetName: true}
    }
    var validation = function () {
      $scope.alerts = []
      $scope.verify = {widgetName: true}
      if (!$scope.widgetName) {
        $scope.alerts = [{
          msg: translate('CONFIG.WIDGET.WIDGET_NAME') +
          translate('COMMON.NOT_EMPTY'),
          type: 'danger'
        }]
        $scope.verify = {widgetName: false}
        $('#widgetName').focus()
        return false
      }
      if ($scope.customDs == false &&
        $scope.curWidget.datasetId == undefined) {
        $scope.alerts = [
          {
            msg: translate('CONFIG.WIDGET.DATASET') +
            translate('COMMON.NOT_EMPTY'),
            type: 'danger'
          }]
        return false
      }
      if ($scope.customDs == true) {
        for (var i = 0; i < $scope.params.length; i++) {
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
      }
      return true
    }
    var changeChartStatus = function () {
      for (var type in $scope.chart_types_status) {
        var rule = $scope.configRule[type]
        var config = $scope.curWidget.config
        var flattenValues = []
        _.each(config.values, function (v) {
          flattenValues = flattenValues.concat(v.cols)
        })
        if (_.size(config.keys) == 0 && _.size(config.groups) == 0 &&
          _.size(flattenValues) == 0) {
          r = false
        } else {
          for (var k in rule) {
            var r = true
            if (rule[k] == 2) {
              if (k == 'values') {
                r = (_.size(flattenValues) >= 1)
              } else {
                r = (_.size(config[k]) >= 1)
              }
            } else if (rule[k] != -1) {
              if (k == 'values') {
                r = (_.size(flattenValues) == rule[k])
              } else {
                r = (_.size(config[k]) == rule[k])
              }
            }
            if (!r) {
              $scope.chart_types_status[type] = r
              break
            }
          }
        }
        $scope.chart_types_status[type] = r
      }
    }
    $scope.changeChart = function (chart_type) {
      if (!$scope.chart_types_status[chart_type]) {
        return
      }
      var oldConfig = angular.copy($scope.curWidget.config)
      $scope.curWidget.config = {}
      $scope.curWidget.config.option = {}
      $scope.curWidget.config.chart_type = chart_type
      //loadDsExpressions();
      cleanPreview()

      $scope.curWidget.config.selects = oldConfig.selects ? oldConfig.selects : []
      $scope.curWidget.config.keys = oldConfig.keys ? oldConfig.keys : []
      $scope.curWidget.config.groups = oldConfig.groups ? oldConfig.groups : []
      $scope.curWidget.config.values = []
      $scope.curWidget.config.events = []

      $scope.curWidget.config.filters = oldConfig.filters
      $scope.curWidget.config.option.tooltip = {}     //列维
      $scope.curWidget.config.option.tooltipGroups = {}   //行维
      $scope.curWidget.config.option.tooltipTarget = {}   //指标
      $scope.curWidget.config.option.thresholds = {}   //指标
      switch ($scope.curWidget.config.chart_type) {
        case 'line':
          _.each(oldConfig.values, function (v) {
            $scope.curWidget.config.values.push({name: v.name, cols: v.cols})
          })
          $scope.curWidget.config.valueAxis = 'vertical'
          _.each($scope.curWidget.config.values, function (v) {
            v.series_type = 'line'
            v.type = 'value'
          })
          break
        case 'line2':
          _.each(oldConfig.values, function (v) {
            $scope.curWidget.config.values.push({name: v.name, cols: v.cols})
          })
          $scope.curWidget.config.valueAxis = 'vertical'
          _.each($scope.curWidget.config.values, function (v) {
            v.series_type = 'line'
            v.type = 'value'
          })
          break
        case 'line3':
          _.each(oldConfig.values, function (v) {
            $scope.curWidget.config.values.push({name: v.name, cols: v.cols})
          })
          $scope.curWidget.config.valueAxis = 'vertical'
          _.each($scope.curWidget.config.values, function (v) {
            v.series_type = 'line'
            v.type = 'value'
          })
          break
        case 'kpi':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          _.each($scope.curWidget.config.values, function (v) {
            v.style = 'text-aqua'
          })
          break
        case 'scatter':
          var i = 0
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              if (i >= 3) {
                $scope.curWidget.config.selects.push(c.col)
                return
              }
              if (!$scope.curWidget.config.values[i]) {
                $scope.curWidget.config.values[i] = {name: '', cols: []}
              }
              $scope.curWidget.config.values[i].cols.push(c)
              i++
            })
          })
          for (var i = 0; i < 3; i++) {
            if (!$scope.curWidget.config.values[i]) {
              $scope.curWidget.config.values[i] = {name: '', cols: []}
            }
          }
          break
        case 'scatter2':
          _.each(oldConfig.values, function (v) {
            $scope.curWidget.config.values.push({name: v.name, cols: v.cols})
          })
          // for (let i = 0; i < 2; i++) {
          //     if ($scope.curWidget.config.values.length < 2) {
          //         $scope.curWidget.config.values.push({name: '', cols: [
          //                 {
          //                     aggregate_type: "",
          //                     alias: "",
          //                     col: "",
          //                 }
          //             ]})
          //     }
          // }
          break
        case 'pieProportion':
          var i = 0
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              if (i >= 3) {
                $scope.curWidget.config.selects.push(c.col)
                return
              }
              if (!$scope.curWidget.config.values[i]) {
                $scope.curWidget.config.values[i] = {name: '', cols: []}
              }
              $scope.curWidget.config.values[i].cols.push(c)
              i++
            })
          })
          for (var i = 0; i < 2; i++) {
            if (!$scope.curWidget.config.values[i]) {
              $scope.curWidget.config.values[i] = {name: '', cols: []}
            }
          }
          break
        case 'lineMap':
          var i = 0
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              if (i >= 3) {
                $scope.curWidget.config.selects.push(c.col)
                return
              }
              if (!$scope.curWidget.config.values[i]) {
                $scope.curWidget.config.values[i] = {name: '', cols: []}
              }
              $scope.curWidget.config.values[i].cols.push(c)
              i++
            })
          })
          for (var i = 0; i < 3; i++) {
            if (!$scope.curWidget.config.values[i]) {
              $scope.curWidget.config.values[i] = {name: '', cols: []}
            }
          }
          break
        case 'barLimits':
          var i = 0
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              if (i >= 3) {
                $scope.curWidget.config.selects.push(c.col)
                return
              }
              if (!$scope.curWidget.config.values[i]) {
                $scope.curWidget.config.values[i] = {name: '', cols: []}
              }
              $scope.curWidget.config.values[i].cols.push(c)
              i++
            })
          })
          for (var i = 0; i < 2; i++) {
            if (!$scope.curWidget.config.values[i]) {
              $scope.curWidget.config.values[i] = {name: '', cols: []}
            }
          }
          break
        case 'd3Demo':
          var i = 0
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              if (i >= 3) {
                $scope.curWidget.config.selects.push(c.col)
                return
              }
              if (!$scope.curWidget.config.values[i]) {
                $scope.curWidget.config.values[i] = {name: '', cols: []}
              }
              $scope.curWidget.config.values[i].cols.push(c)
              i++
            })
          })
          for (var i = 0; i < 2; i++) {
            if (!$scope.curWidget.config.values[i]) {
              $scope.curWidget.config.values[i] = {name: '', cols: []}
            }
          }
          break
        case 'codeFlower':
          var i = 0
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              if (i >= 3) {
                $scope.curWidget.config.selects.push(c.col)
                return
              }
              if (!$scope.curWidget.config.values[i]) {
                $scope.curWidget.config.values[i] = {name: '', cols: []}
              }
              $scope.curWidget.config.values[i].cols.push(c)
              i++
            })
          })
          for (var i = 0; i < 2; i++) {
            if (!$scope.curWidget.config.values[i]) {
              $scope.curWidget.config.values[i] = {name: '', cols: []}
            }
          }
          break
        case 'gauge':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.styles = [
            {proportion: '0.2', color: '#228b22'},
            {proportion: '0.8', color: '#48b'},
            {proportion: '1', color: '#ff4500'}
          ]
          break
        case 'areaMap':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          _.each($scope.curWidget.config.values, function (v) {
            v.style = 'text-aqua'
          })
          break
        case 'heatMapCalendar':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          _.each($scope.curWidget.config.values, function (v) {
            v.dateFormat = 'yyyy-MM-dd'
            v.style = 'blue'
          })
          break
        case 'heatMapTable':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          _.each($scope.curWidget.config.values, function (v) {
            v.style = 'blue'
          })
          break
        case 'liquidFill':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.animation = 'static'
          _.each($scope.curWidget.config.values, function (v) {
            v.style = 'circle'
          })
          break
        case 'markLineMap':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          _.each($scope.curWidget.config.values, function (v) {
            v.style = 'text-aqua'
          })
          break
        case 'flexChart':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          if (_.isUndefined($scope.curWidget.config.option.flex))
            $scope.curWidget.config.option.flex = 'draw = function(list, config){\n' +
              '\tvar option={};\n' +
              '\treturn option\n' +
              '}'
          break
        case 'flexD3Chart':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          if (_.isUndefined($scope.curWidget.config.option.flex))
            $scope.curWidget.config.option.flex = 'draw = function(d3,$canvas,list,config){\n' +
              '}'
          break
        case 'flex2':
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          if (_.isUndefined($scope.curWidget.config.option.flex))
            $scope.curWidget.config.option.flex = '<div ng-init="init()">{{list}}</div>'
          if (_.isUndefined($scope.curWidget.config.option.code))
            $scope.curWidget.config.option.code = 'fun = {\n' +
              '\tinit:function(){\n' +
              '\t\tconsole.log($scope.list)\n' +
              '\t}\n' +
              '}'
          break
        default:
          $scope.curWidget.config.values.push({name: '', cols: []})
          _.each(oldConfig.values, function (v) {
            _.each(v.cols, function (c) {
              $scope.curWidget.config.values[0].cols.push(c)
            })
          })
          break
      }
      _.each($scope.curWidget.config.values, function (v) {
        _.each(v.cols, function (c) {
          delete c.formatter
        })
      })
      $scope.preview()
    }

    $scope.newConfig = function () {
      console.log('newConfig')
      $scope.curWidget.config = {}
      $scope.curWidget.config.option = {}
      $scope.curWidget.config.events = []
      $scope.curWidget.config.chart_type = 'table'
      cleanPreview()
      switch ($scope.curWidget.config.chart_type) {
        case 'cityMap':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'zoneMap':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'line':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = new Array()
          $scope.curWidget.config.filters = new Array()
          $scope.curWidget.config.valueAxis = 'vertical'
          $scope.add_value()
          break
        case 'line2':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = new Array()
          $scope.curWidget.config.filters = new Array()
          $scope.curWidget.config.valueAxis = 'vertical'
          $scope.add_value()
          break
        case 'line3':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = new Array()
          $scope.curWidget.config.filters = new Array()
          $scope.curWidget.config.valueAxis = 'vertical'
          $scope.add_value()
          break
        case 'pie':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'flexChart':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'flexD3Chart':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'pie2':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'kpi':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: [],
              style: 'text-aqua'
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'table':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.option.isPagenation = true
          $scope.curWidget.config.option.groupSort = true
          $scope.curWidget.config.filters = new Array()
          console.log('$scope.curWidget.config', $scope.curWidget.config)
          break
        case 'crossTable':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'treeGrid':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.option.isPagenation = true
          $scope.curWidget.config.option.groupSort = true
          $scope.curWidget.config.filters = new Array()
          break
        case 'crossGreatTable':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'selector':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.filters = new Array()
          break
        case 'dataLineTable':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'gantt':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'flex':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'flex2':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'funnel':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'sankey':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'circular':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'echart3dMap':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'echart3dMapLine':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'echart3dBar':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'echart3dArea':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'barPolarStack':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'pieProportion':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'barLimits':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'lineMap':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'd3Demo':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'pie':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'codeFlower':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'radar':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'map':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'gauge':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          $scope.curWidget.config.styles = [
            {proportion: '0.2', color: '#228b22'},
            {proportion: '0.8', color: '#48b'},
            {proportion: '1', color: '#ff4500'}
          ]
          break
        case 'areaMap':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'heatMapCalendar':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: [],
              dateFormat: 'yyyy-MM-dd',
              style: 'blue'
            }]
          break
        case 'heatMapTable':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: [],
              style: 'blue'
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'markLineMap':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
          break
        case 'liquidFill':
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: [],
              style: 'circle'
            }]
          $scope.curWidget.config.filters = new Array()
          $scope.curWidget.config.animation = 'static'
          break
        default:
          $scope.curWidget.config.selects = angular.copy($scope.columns)
          $scope.curWidget.config.keys = new Array()
          $scope.curWidget.config.groups = new Array()
          $scope.curWidget.config.values = [
            {
              name: '',
              cols: []
            }]
          $scope.curWidget.config.filters = new Array()
      }
      addWatch()
    }

    var cleanPreview = function () {
      $('#preview_widget').html('')
      $('#viewQuery_widget').html('')
      $scope.viewQueryMoal = false
    }

    $scope.previewQuery = function () {
      $('#viewQuery_widget').html('')
      $timeout(function () {
        angular.element('#viewQuery_widget_tab').trigger('click')
      })
      $scope.loadingPre = true
      dataService.viewQuery({
        config: $scope.curWidget.config,
        datasource: $scope.datasource ? $scope.datasource.id : null,
        query: $scope.curWidget.query,
        datasetId: $scope.customDs ? undefined : $scope.curWidget.datasetId
      }, function (query) {
        var querybr = query.trim().replace(/\n/g, '<br/>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        $('#viewQuery_widget').html('<div class=\'alert alert-info\' role=\'alert\' style=\'text-align: left;\'><p style=\'color: black\'>' +
          querybr + '</p></div>')
        $scope.loadingPre = false
        $scope.viewQueryMoal = true
      })
    }

    $scope.permissionSetting = function () {
      var permissionSettingModel = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'src/view/nv/permission/setting.html',
        size: 'lg',
        controller: 'permissionSettingCtrl',
        resolve: {
          config: function () {
            return {
              type: 'explore',
              id: $stateParams.id
            }
          }
        }
      })
      permissionSettingModel.result.then(function () {
      })
    }

    $scope.preview = function () {
      $('#preview_widget').html('')
      $timeout(function () {
        angular.element('#preview_widget_tab').trigger('click')
      })
      $scope.loadingPre = true
      // --- start ---
      // 添加echarts3.6.2后这里除了第一次可以加载echarts图表，再次加载无法显示图表。
      // 完全无法找到问题下，出于无奈嵌套了一层后发现可以显示图表。囧！！
      // 具体原因没有找到，求大神帮忙解决，thanks！
      $('#preview_widget').html(
        '<div id=\'preview\' style=\'min-height: 300px;height:100%;user-select: text;\'></div>')
      // --- end ---
      /* 初始化下钻层级 */
      $scope.curWidget.config.drillTier = {}
      $scope.curWidget.config.drillTier.isGreat = false //是否是大数据下钻表格
      $scope.curWidget.config.drillTier.keyTier = 0 //当前层级
      $scope.curWidget.config.drillTier.groupTier = 0 //当前层级
      $scope.curWidget.config.drillTier.filters = {}
      $scope.curWidget.config.drillTier.filters.key = []
      $scope.curWidget.config.drillTier.filters.group = []
      chartService.render($('#preview'), {
        config: $scope.curWidget.config,
        datasource: $scope.datasource ? $scope.datasource.id : null,
        query: $scope.curWidget.query,
        datasetId: $scope.customDs ? undefined : $scope.curWidget.datasetId,
        paramList: $scope.schema ? $scope.schema.paramList : []
      }, function (option) {
        switch ($scope.curWidget.config.chart_type) {
          case 'cityMap':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'zoneMap':
            $scope.previewDivWidth = 12
            // option.toolbox = {
            //   feature: {
            //     dataView: {
            //       show: true,
            //       readOnly: true
            //     }
            //   }
            // }
            break
          case 'line':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'line2':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'line3':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'pie':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'flexChart':
            $scope.expAceOpt.mode = 'javascript'
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'flexD3Chart':
            $scope.expAceOpt.mode = 'javascript'
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'pie2':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'kpi':
            $scope.previewDivWidth = 6
            break
          case 'table':
            $scope.previewDivWidth = 12
            break
          case 'crossTable':
            $scope.previewDivWidth = 12
            break
          case 'treeGrid':
            $scope.previewDivWidth = 12
            break
          case 'crossGreatTable':
            $scope.previewDivWidth = 12
            break
          case 'selector':
            $scope.previewDivWidth = 12
            break
          case 'dataLineTable':
            $scope.previewDivWidth = 12
            break
          case 'gantt':
            $scope.previewDivWidth = 12
            break
          case 'flex':
            $scope.previewDivWidth = 12
            break
          case 'flex2':
            $scope.previewDivWidth = 12
            $scope.expAceOptHTML = angular.copy($scope.expAceOpt)
            $scope.expAceOptHTML.mode = 'html'
            // $scope.expAceOptHTML.rendererOptions.fontSize = '12px'
            // $scope.expAceOptHTML.rendererOptions.minLines = 5
            $scope.expAceOptJS = angular.copy($scope.expAceOpt)
            $scope.expAceOptJS.mode = 'javascript'
            // $scope.expAceOptJS.rendererOptions.fontSize = '10px'
            // $scope.expAceOptJS.rendererOptions.minLines = 5
            break
          case 'funnel':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'sankey':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'circular':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'echart3dMap':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'barPolarStack':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'pieProportion':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'barLimits':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'lineMap':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'd3Demo':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'rose':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'codeFlower':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'echart3dMapLine':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'echart3dBar':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'echart3dArea':
            $scope.previewDivWidth = 12
            option.toolbox = {
              feature: {
                dataView: {
                  show: true,
                  readOnly: true
                }
              }
            }
            break
          case 'map':
            $scope.previewDivWidth = 12
            break
          case 'areaMap':
            $scope.previewDivWidth = 12
            break
          case 'markLineMap':
            $scope.previewDivWidth = 12
            break
        }
        $scope.loadingPre = false
      }, null, !$scope.loadFromCache, undefined, undefined, true).then(function (d) {
        $scope.curWidget.realTimeTicket = d
      })
    }

    // $scope.saveChart = function () {
    //     dashboardService.saveWidget('123', $scope.datasource, $scope.config);
    // };

    $scope.add_value = function () {
      $scope.curWidget.config.values.push({
        name: '',
        series_type: 'line',
        type: 'value',
        cols: []
      })
    }

    $scope.add_style = function () {
      $scope.curWidget.config.styles.push({
        proportion: '',
        color: ''
      })
    }

    var saveWgtCallBack = function (serviceStatus) {
      if (serviceStatus.status == '1') {
        getWidgetList()
        getCategoryList()
        ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success', 'sm')
      } else {
        ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
      }
    }

    $scope.saveWgtAs = function () {
      var saveWgtAsModel = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'src/view/nv/dashboard/layout/modals/saveWgtAsModel.html',
        size: 'sm',
        controller: 'saveWgtAsCtrl',
        resolve: {
          widgetName: function () {
            return angular.copy($scope.widgetName)
          }
        }
      })
      saveWgtAsModel.result.then(function (widgetName) {
        var o = {}
        o.name = widgetName ? widgetName.slice(widgetName.lastIndexOf('/') +
          1).trim() : ''
        o.categoryName = widgetName ? widgetName.substring(0,
          widgetName.lastIndexOf('/')).trim() : ''
        if (o.categoryName == '') {
          o.categoryName = translate('COMMON.DEFAULT_CATEGORY')
        }
        o.data = {}
        o.data.config = $scope.curWidget.config
        if ($scope.customDs) {
          o.data.query = $scope.curWidget.query
          o.data.datasource = $scope.datasource.id
        } else {
          o.data.datasetId = $scope.curWidget.datasetId
        }
        o.data.measureGroups = _.filter($scope.curWidget.measureGroups,
          function (e) {
            return !$scope.isDsMeasureGroups(e)
          })
        o.data.dimensionGroups = _.filter($scope.curWidget.dimensionGroups,
          function (e) {
            return !$scope.isDsDimensionGroups(e)
          })
        o.data.expressions = _.filter($scope.curWidget.expressions,
          function (e) {
            return !$scope.isDsExpression(e)
          })
        o.data.filterGroups = _.filter($scope.curWidget.filterGroups,
          function (e) {
            return !$scope.isDsFilter(e)
          })
        $scope.alerts = []
        $scope.verify = {widgetName: true}

        if (o.name == null || o.name == '') {
          $scope.alert('图表名不能为空')
          return
        }
        $http.post('dashboard/saveNewWidget.do', {json: angular.toJson(o)}).success(function (serviceStatus) {
          // debugger;
          if (serviceStatus.status == '1') {
            // getWidgetList()
            getCategoryList()
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
            window.location.href = '/starter.html#/nv/explore/' +
              serviceStatus.uuid
          } else {
            $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
          }
        })
      }, function () {
        // console.info('Modal dismissed at: ' + new Date());
      })
    }

    $scope.saveWgt = function () {
      if (!validation()) {
        return
      }

      var o = {}
      o.name = $scope.widgetName.slice($scope.widgetName.lastIndexOf('/') +
        1).trim()
      o.categoryName = $scope.widgetName.substring(0,
        $scope.widgetName.lastIndexOf('/')).trim()
      if (o.categoryName == '') {
        o.categoryName = translate('COMMON.DEFAULT_CATEGORY')
      }
      o.data = {}
      o.data.config = $scope.curWidget.config
      o.data.config.redis = $scope.redis
      if ($scope.customDs) {
        o.data.query = $scope.curWidget.query
        o.data.datasource = $scope.datasource.id
      } else {
        o.data.datasetId = $scope.curWidget.datasetId
      }
      o.data.measureGroups = _.filter($scope.curWidget.measureGroups,
        function (e) {
          return !$scope.isDsMeasureGroups(e)
        })
      o.data.computedDimensionGroups = _.filter($scope.curWidget.computedDimensionGroups,
        function (e) {
          return !$scope.isDsComputedGroups(e, 'computedDimensionGroups')
        })
      o.data.computedGroups = _.filter($scope.curWidget.computedGroups,
        function (e) {
          return !$scope.isDsComputedGroups(e, 'computedGroups')
        })
      o.data.dimensionGroups = _.filter($scope.curWidget.dimensionGroups,
        function (e) {
          return !$scope.isDsDimensionGroups(e)
        })
      o.data.expressions = _.filter($scope.curWidget.expressions,
        function (e) {
          return !$scope.isDsExpression(e)
        })
      o.data.filterGroups = _.filter($scope.curWidget.filterGroups,
        function (e) {
          return !$scope.isDsFilter(e)
        })
      $scope.alerts = []
      $scope.verify = {widgetName: true}

      if (o.name == null || o.name == '') {
        $scope.alerts = [
          {
            msg: translate('CONFIG.WIDGET.WIDGET_NAME') +
            translate('COMMON.NOT_EMPTY'),
            type: 'danger'
          }]
        $scope.verify = {widgetName: false}
        $('#widgetName').focus()
        return
      } else if (o.data.datasetId == undefined && $scope.customDs == false) {
        $scope.alerts = [
          {
            msg: translate('CONFIG.WIDGET.DATASET') +
            translate('COMMON.NOT_EMPTY'),
            type: 'danger'
          }]
        return
      }

      if ($scope.optFlag == 'new') {
        $http.post('dashboard/saveNewWidget.do', {json: angular.toJson(o)}).success(function (serviceStatus) {
          // debugger;
          if (serviceStatus.status == '1') {
            // getWidgetList()
            getCategoryList()
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
            window.location.href = '/starter.html#/nv/explore/' +
              serviceStatus.uuid
          } else {
            $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
          }
        })
      } else if ($scope.optFlag == 'edit') {
        o.id = $scope.widgetId
        $http.post(updateUrl, {json: angular.toJson(o)}).success(function (serviceStatus) {
          if (serviceStatus.status == '1') {
            // getWidgetList()
            getCategoryList()
            ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
              'sm')
          } else {
            $scope.alerts = [{msg: serviceStatus.msg, type: 'danger'}]
          }
        })
      }
    }

    $scope.editWgt = function (widget) {
      $http.post('dashboard/checkWidget.do', {id: widget.id}).success(function (response) {
        if (response.status == '1') {
          doEditWgt(widget)
          if ($scope.customDs == true) $scope.doConfigParams()
        } else {
          var d = widget.data.datasetId
            ? 'CONFIG.WIDGET.DATASET'
            : 'CONFIG.WIDGET.DATA_SOURCE'
          ModalUtils.alert(translate('ADMIN.CONTACT_ADMIN') + '：' +
            translate(d) + '/' + response.msg, 'modal-danger', 'lg')
        }
      })
    }

    $scope.editCurWgt = function () {
      // var wgt = _.find($scope.widgetList, function (w) {
      //   return w.id == $scope.widgetId
      // })
      var wgt = $scope.widgetInfo
      if (wgt) {
        $scope.editWgt(wgt)
      }
    }

    var doEditWgt = function (widget) {
      cleanPreview()
      $timeout(function () {
        // switchNode(widget.id)
      }, 500)
      // switchNode(widget.id);
      $('#preview_widget').html('')
      widget.data.datasetId += ''
      $scope.curWidget = angular.copy(widget.data)
      if (!$scope.curWidget.measureGroups) {
        $scope.curWidget.measureGroups = []
      }
      if (!$scope.curWidget.computedDimensionGroups) {
        $scope.curWidget.computedDimensionGroups = []
      }
      if (!$scope.curWidget.computedGroups) {
        $scope.curWidget.computedGroups = []
      }
      if (!$scope.curWidget.dimensionGroups) {
        $scope.curWidget.dimensionGroups = []
      }
      if (!$scope.curWidget.expressions) {
        $scope.curWidget.expressions = []
      }
      if (!$scope.curWidget.filterGroups) {
        $scope.curWidget.filterGroups = []
      }
      updateService.updateConfig($scope.curWidget.config)
      $scope.datasource = _.find($scope.datasourceList, function (ds) {
        return ds.id == widget.data.datasource
      })
      $scope.widgetName = angular.copy(widget.categoryName + '/' +
        widget.name)
      $scope.redis = widget.data.config.redis
      $scope.widgetId = widget.id
      $scope.optFlag = 'edit'
      $scope.customDs = _.isUndefined($scope.curWidget.datasetId)
      loadDatasetInfo(function () {
        loadDsMeasureGroups()
        // loadDsDimensionGroups();
        loadDsComputedGroups()
        loadDsExpressions()
        loadDsFilterGroups()
        buildSchema()
        dataService.linkDataset($scope.curWidget.datasetId,
          $scope.curWidget.config)
      })
      addWatch()
    }

    $scope.doCancel = function () {
      if ($scope.optFlag == 'new') {
        $scope.newConfig()
        $scope.filterSelect = {}
        cleanPreview()
      } else {
        $scope.editCurWgt()
      }
    }

    $scope.filterDimension = function (e) {
      if (e.type == 'level') {
        return true
      }
      var keys = _.find($scope.curWidget.config.keys, function (k) {
        return k.col == e.column
      })
      var groups = _.find($scope.curWidget.config.groups, function (k) {
        return k.col == e.column
      })
      return !(keys || groups)
    }

    $scope.filterMeasureGroups = function (e) {
      var result = false
      _.each($scope.curWidget.config.values, function (v) {
        _.each(v.cols, function (c) {
          if (e.column == c.col) {
            result = true
          }
        })
      })
      return !result
    }

    $scope.filterComputedGroups = function (e) {
      var result = false
      _.each($scope.curWidget.config.values, function (v) {
        _.each(v.cols, function (c) {
          if (e.column == c.column) {
            result = true
          }
        })
      })

      var keys = _.find($scope.curWidget.config.keys, function (k) {
        return k.col == e.column || k.column == e.column
      })
      var groups = _.find($scope.curWidget.config.groups, function (k) {
        return k.col == e.column || k.column == e.column
      })

      return !result && !(keys || groups)
    }

    $scope.filterExpressions = function (e) {
      var result = false
      _.each($scope.curWidget.config.values, function (v) {
        _.each(v.cols, function (c) {
          if (c.type == 'exp') {
            if (e.id == c.id && e.alias == c.alias) {
              result = true
            }
          }
        })
      })
      return !result
    }

    $scope.selectParam = function (key, value) {
      BoardParamService.set(key, [value])
    }

    $scope.filterFilterGroup = function (e) {
      var result = false
      _.each($scope.curWidget.config.filters, function (f) {
        if (f.group) {
          if (e.id == f.id && e.group == f.group) {
            result = true
          }
        }
      })
      return !result
    }

    var isEmptyObject = function (obj) {
      for (var key in obj) {
        return false
      }
      return true
    }

    var buildSchema = function () {
      var loadFromDataset = false
      if (!$scope.customDs) {
        if ($scope.dataset.data.schema &&
          ($scope.dataset.data.schema.measure.length > 0 ||
            $scope.dataset.data.schema.dimension.length > 0)) {
          loadFromDataset = true
        }
      }
      if (loadFromDataset) {
        $scope.schema = $scope.dataset.data.schema
        $scope.paramForChange = {}
        if ($scope.schema.paramList && isEmptyObject($scope.paramForChange)) {
          // debugger
          for (let i in $scope.schema.paramList) {
            if ($scope.schema.paramList[i].list.length > 0) {
              BoardParamService.set($scope.schema.paramList[i].column, $scope.schema.paramList[i].list[0])
              $scope.paramForChange[$scope.schema.paramList[i].column] = $scope.schema.paramList[i].list[0]
            }
          }
        }
        $scope.alerts = []
      } else {
        $scope.loading = true
        dataService.getColumns({
          datasource: $scope.datasource ? $scope.datasource.id : null,
          query: $scope.curWidget.query,
          datasetId: $scope.customDs ? undefined : $scope.curWidget.datasetId,
          reload: !$scope.loadFromCache,
          callback: function (dps) {
            $scope.loading = false
            $scope.alerts = []
            if (dps.msg == '1') {
              $scope.schema = {selects: []}
              _.each(dps.columns, function (e) {
                $scope.schema.selects.push({column: e})
              })
            } else {
              $scope.alerts = [{msg: dps.msg, type: 'danger'}]
            }
          }
        })
      }
      //初始预读
      if ($stateParams.create) {
        $stateParams.create = false
      } else $scope.preview()
    }

    $scope.deleteWgt = function (widget) {
      ModalUtils.confirm(translate('COMMON.CONFIRM_DELETE'), 'modal-info',
        'lg', function () {
          $http.post('dashboard/deleteWidget.do', {id: widget.id}).success(function (serviceStatus) {
            if (serviceStatus.status == '1') {
              // getWidgetList()
            } else {
              ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
            }
            $scope.optFlag == 'none'
          })
        })
    }

    $scope.copyWgt = function (widget) {
      var o = angular.copy(widget)
      o.name = o.name + '_copy'
      $http.post('dashboard/saveNewWidget.do', {json: angular.toJson(o)}).success(function (serviceStatus) {
        if (serviceStatus.status == '1') {
          // getWidgetList()
          ModalUtils.alert(translate('COMMON.SUCCESS'), 'modal-success',
            'sm')
        } else {
          ModalUtils.alert(serviceStatus.msg, 'modal-warning', 'lg')
        }
        $scope.optFlag == 'none'
      })
    }

    $scope.getQueryView = function () {
      if ($scope.datasource && $scope.datasource.name) {
        return 'dashboard/getConfigView.do?type=' + $scope.datasource.type
      }
    }

    $scope.getChartView = function () {
      if ($scope.curWidget.config && $scope.curWidget.config.chart_type) {
        return 'src/view/nv/chart/' + $scope.curWidget.config.chart_type +
          '.html'
      }
    }

    $scope.getOptionsView = function () {
      var basePath = 'src/view/nv/chart/options/'
      if ($scope.curWidget.config && $scope.curWidget.config.chart_type) {
        return basePath + $scope.curWidget.config.chart_type + '.html'
      }
    }

    $scope.deleteValue = function (cols) {
      _.each(cols, function (e) {
        if (e.type == 'exp') {
          $scope.expressions.push(e)
        } else {
          $scope.curWidget.config.selects.push(e.col)
        }
      })
    }

    $scope.dndTransfer = {
      toCol: function (list, index, item, type) {
        if (type == 'key' || type == 'group' || type == 'filter') {
          list[index] = {
            col: item.col,
            aggregate_type: 'sum',
            alias: (item.alias ? item.alias : item.col)/*+"总量"*/
          }
        } else if (type == 'select' || type == 'measure') {
          list[index] = {
            col: item.column,
            aggregate_type: 'sum',
            alias: (item.alias ? item.alias : item.column)/*+"总量"*/
          }
        }
      },
      toSelect: function (list, index, item, type) {
        if (type == 'col') {
          list[index] = item.col
        } else if (type == 'key' || type == 'group' || type == 'filter') {
          list[index] = item.col
        }
      },
      toEvent: function (list, index, item, type, datasetId) {
        list[index] = {
          alias: item.alias,
          col: item.column
          // datasetId: datasetId
        }
      },
      toKeysGroups: function (list, index, item, type) {
        if (type == 'col') {
          list[index] = {col: item.col, type: 'eq', values: [], sort: 'asc'}
        } else if (type == 'dimension' || type == 'select') {
          list[index] = {
            alias: item.alias,
            col: item.column,
            level: item.level,
            type: 'eq',
            values: [],
            sort: 'asc',
            style: item.style ? item.style : 'string'
          }
          if (type == 'dimension') {
            list[index].id = item.id
          }
        }
      },
      attachLevel: function (column, level) {
        column.level = level.alias
        return column
      },
      attachLevel2: function (level) {
        var le = angular.copy(level)
        var columns = level.columns
        var drillDown = []
        level = {
          alias: le.alias,
          col: le.alias,
          level: le.alias,
          id: le.id,
          type: 'eq',
          values: [],
          sort: 'asc'
        }
        for (var drill = 0; drill < columns.length; drill++) {
          var dd = {
            alias: columns[drill].alias,
            col: columns[drill].column,
            level: le.alias,
            id: columns[drill].id,
            type: 'eq',
            values: [],
            sort: 'asc'
          }
          drillDown.push(dd)
        }
        level.drillDown = drillDown
        return level
      },
      limitDnd: function (list, type) {
        if (type == 'crossTable') {
          if (list.length == 0) {
            return true
          } else {
            return false
          }
        }
        else {
          return true
        }
      }
    }

    $scope.selectsByFilter = []
    $scope.selects = []
    $scope.editFilter = function (setbackArr, setbackIdx) {
      $uibModal.open({
        templateUrl: 'src/view/nv/dashboard/modal/param.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        resolve: {
          param: function () {
            var item = setbackArr[setbackIdx]
            if (item.col) {
              if (item.type == 'eq') {
                item.type = '='
              } else if (item.type == 'ne') {
                item.type = '≠'
              }
              return angular.copy(item)
            } else {
              return {col: item, type: '=', values: []}
            }
          },
          filter: function () {
            return true
          },
          getSelects: function () {
            return function (byFilter, column, callback) {
              var config = undefined
              if (byFilter) {
                config = angular.copy($scope.curWidget.config)
                var arr = _.findKey($scope.curWidget.config, function (o) {
                  return o == setbackArr
                })
                config[arr].splice(setbackIdx, 1)
              }
              dataService.getDimensionValues(
                $scope.datasource ? $scope.datasource.id : null,
                $scope.curWidget.query,
                $scope.customDs ? undefined : $scope.curWidget.datasetId,
                column, config, function (filtered) {
                  callback(filtered)
                })
            }
          },
          ok: function () {
            return function (param) {
              setbackArr[setbackIdx] = param
            }
          }
        },
        controller: 'paramSelector'
      })
    }

    $scope.editStyle = function (o) {
      $uibModal.open({
        templateUrl: 'src/view/nv/dashboard/modal/tableDataStyle.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'sm',
        resolve: {
          curWidgetConfig: $scope.curWidget.config,
          widget: $scope.curWidget,
          o: o
        },
        controller: function ($scope, $uibModalInstance) {
          $scope.typeList = {
            bar: '柱状显示',
            percent: '百分比显示',
            updown: '增减',
            custom: '自定义显示',
            hidden: '隐藏'
          }
          $scope.customCode = !_.isUndefined($scope.$resolve.o.dataStyle)
            ? $scope.$resolve.o.dataStyle.num
            : ''
          $scope.percentNum = !_.isUndefined($scope.$resolve.o.dataStyle)
            ? parseInt($scope.$resolve.o.dataStyle.num)
            : 100
          $scope.selected = !_.isUndefined($scope.$resolve.o.dataStyle)
            ? $scope.$resolve.o.dataStyle.type
            : ''
          $scope.hidden = !_.isUndefined($scope.$resolve.o.dataStyle)
            ? $scope.$resolve.o.dataStyle.type
            : ''
          $scope.selectItem = function (key) {
            if ($scope.selected == key) {
              $scope.selected = ''
            } else {
              $scope.selected = key
            }
          }
          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.ok = function () {
            if ($scope.selected === 'percent') {
              o['dataStyle'] = {
                type: $scope.selected,
                num: parseInt(document.getElementById('percentNum').value)
              }
            } else if ($scope.selected === 'custom') {
              o['dataStyle'] = {
                type: $scope.selected,
                num: document.getElementById('editCustomCode').value
              }
            } else {
              o['dataStyle'] = {
                type: $scope.selected,
                num: 100
              }
            }
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.editVFilter = function (o) {
      $uibModal.open({
        templateUrl: 'src/view/nv/modal/vfilter.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          $scope.type = [
            '=',
            '≠',
            '>',
            '<',
            '≥',
            '≤',
            '(a,b]',
            '[a,b)',
            '(a,b)',
            '[a,b]']
          $scope.f_type = o.f_type ? o.f_type : '>'
          $scope.f_values = o.f_values ? o.f_values : []
          $scope.f_top = o.f_top ? o.f_top : ''
          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.ok = function () {
            o.f_type = $scope.f_type
            o.f_values = $scope.f_values
            o.f_top = $scope.f_top
            $uibModalInstance.close()
          }
        }
      })
    }

    $scope.editThreshold = function (o) {
      $uibModal.open({
        templateUrl: 'src/view/nv/modal/threshold.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        size: 'lg',
        resolve: {
          curWidgetConfig: $scope.curWidget.config,
          widget: $scope.curWidget,
          o: o
        },
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          // $scope.type = ['=', '≠', '>', '<', '≥', '≤', '(a,b]', '[a,b)', '(a,b)', '[a,b]'];
          if (_.isUndefined($scope.thresholds)) {
            $scope.thresholds = {}
          }
          $scope.thresholds[o.col] = o.thresholds ? o.thresholds[o.col] : []
          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.ok = function () {
            $scope.$resolve.curWidgetConfig.option.thresholds[o.col] = $scope.thresholds[o.col]
            if (_.isUndefined(o.thresholds)) {
              o.thresholds = {}
            }
            o.thresholds[o.col] = $scope.thresholds[o.col]
            $uibModalInstance.close()
          }
          $scope.add = function () {
            let threshold = {
              t_key: '',
              t_min_values: '',
              t_max_values: '',
              t_color: ''
            }
            $scope.thresholds[o.col].push(threshold)
          }
          $scope.delete = function (index) {
            $scope.thresholds[o.col].splice(index, 1)
          }
        }
      })
    }

    var schemaToSelect = function (schema) {
      if (schema.selects) {
        return angular.copy(schema.selects)
      } else {
        var selects = []
        selects = selects.concat(schema.measure)
        _.each(schema.dimension, function (e) {
          if (e.type == 'level') {
            _.each(e.columns, function (c) {
              selects.push(c)
            })
          } else {
            selects.push(e)
          }
        })
        return angular.copy(selects)
      }
    }

    $scope.editFilterGroup = function (col) {
      var selects = schemaToSelect($scope.schema)
      $uibModal.open({
        templateUrl: 'src/view/nv/modal/filterGroup.html',
        windowTemplateUrl: 'src/view/util/modal/window.html',
        backdrop: false,
        scope: $scope,
        controller: function ($scope, $uibModalInstance) {
          'ngInject'
          if (col) {
            $scope.data = angular.copy(col)
          } else {
            $scope.data = {group: '', filters: []}
          }
          $scope.selects = selects
          $scope.close = function () {
            $uibModalInstance.close()
          }
          $scope.addColumn = function (str) {
            $scope.data.filters.push({col: str, type: '=', values: []})
          }
          $scope.ok = function () {
            if (col) {
              col.group = $scope.data.group
              col.filters = $scope.data.filters
            } else {
              $scope.curWidget.filterGroups.push($scope.data)
            }
            $uibModalInstance.close()
          }
          $scope.editFilter = function (filter) {
            $uibModal.open({
              templateUrl: 'src/view/nv/dashboard/modal/param.html',
              windowTemplateUrl: 'src/view/util/modal/window.html',
              backdrop: false,
              size: 'lg',
              resolve: {
                param: function () {
                  return angular.copy(filter)
                },
                filter: function () {
                  return false
                },
                getSelects: function () {
                  return function (byFilter, column, callback) {
                    dataService.getDimensionValues(
                      $scope.datasource ? $scope.datasource.id : null,
                      $scope.curWidget.query, $scope.curWidget.datasetId,
                      column, undefined, function (filtered) {
                        callback(filtered)
                      })
                  }
                },
                ok: function () {
                  return function (param) {
                    filter.type = param.type
                    filter.values = param.values
                    filter.isExp = param.isExp
                    filter.exp = param.exp
                  }
                }
              },
              controller: 'paramSelector'
            })
          }
        }
      })
    }

    $scope.editSort = function (o) {
      switch (o.sort) {
        case 'asc':
          o.sort = 'desc'
          break
        case 'desc':
          o.sort = undefined
          break
        default:
          o.sort = 'asc'
          break
      }
    }

    $scope.cleanVSort = function () {
      _.each($scope.curWidget.config.values, function (v) {
        _.each(v.cols, function (c) {
          c.sort = undefined
        })
      })
    }

    $scope.editAlign = function (o) {
      switch (o.align) {
        case undefined:
          o.align = 'left'
          break
        case 'left':
          o.align = 'right'
          break
        default:
          o.align = undefined
          break
      }
    }

    $scope.cleanRowSort = function (o) {
      var sort = o.sort
      _.each($scope.curWidget.config.keys, function (k) {
        k.sort = undefined
      })
      $scope.cleanVSort()
      o.sort = sort
    }

    $scope.showTooltip = function (chart, e) {
      if (chart.isDisabled) {
        return
      }
      var $curTarget = $(e.currentTarget),
        _tooltip = $curTarget.find('.chart-tip')
      _tooltip.show()
    }
    $scope.hideTooltip = function (chart, e) {
      if (chart.isDisabled) {
        return
      }
      var $curTarget = $(e.currentTarget),
        _tooltip = $curTarget.find('.chart-tip')
      _tooltip.hide()
    }

    /** Ace Editor Starer... **/
    $scope.queryAceOpt = datasetEditorOptions()

    //EventService
    EventService.on('CE:drillDown', function (o) {
      console.log('CE:drillDown-explore', o)
      o.widget = {}
      o.widget.widget = {}
      o.widget.widget.data = $scope.curWidget
      var isDrill = false
      var keys = o.widget.widget.data.config.keys
      var groups = o.widget.widget.data.config.groups
      var drillTier = o.widget.widget.data.config.drillTier
      var realTimeTicket = $scope.curWidget.realTimeTicket
      drillTier.isGreat = o.param.isGreat ? o.param.isGreat : false
      _.each(keys, function (key) {
        if (!_.isUndefined(key.drillDown)) {
          isDrill = true
          if (drillTier.keyTier < key.drillDown.length - 1 && (_.isUndefined(o.param.drillType) || o.param.drillType == 'key')) {
            drillTier.filters.key.push(o.param.name)
            drillTier.keyTier++
          }
        }
      })
      _.each(groups, function (group) {
        if (!_.isUndefined(group.drillDown)) {
          isDrill = true
          if (drillTier.groupTier < group.drillDown.length - 1 && (_.isUndefined(o.param.drillType) || o.param.drillType == 'group')) {
            drillTier.filters.group.push(o.param.name)
            drillTier.groupTier++
          }
        }
      })
      if (o.type === 'treeGrid') {
        isDrill = true
        drillTier.keyTier = o.tier.tier
        drillTier.filters.key = o.tier.list
        drillTier.treeGridFilters = o.filters
      }
      if (!isDrill) {
        return
      }
      chartService.realTimeRender(realTimeTicket, o.widget.widget.data)
    })
    EventService.on('CE:drillUp', function (o) {
      o.widget = {}
      o.widget.widget = {}
      o.widget.widget.data = $scope.curWidget
      var isDrill = false
      var keys = o.widget.widget.data.config.keys
      var groups = o.widget.widget.data.config.groups
      var drillTier = o.widget.widget.data.config.drillTier
      var realTimeTicket = $scope.curWidget.realTimeTicket
      drillTier.isGreat = o.param.isGreat ? o.param.isGreat : false
      _.each(keys, function (key) {
        if (!_.isUndefined(key.drillDown)) {
          isDrill = true
          if (drillTier.keyTier > 0 && (_.isUndefined(o.param.drillType) || o.param.drillType == 'key')) {
            drillTier.filters.key.pop()
            drillTier.keyTier--
          }
        }
      })
      _.each(groups, function (group) {
        if (!_.isUndefined(group.drillDown)) {
          isDrill = true
          if (drillTier.groupTier > 0 && (_.isUndefined(o.param.drillType) || o.param.drillType == 'group')) {
            drillTier.filters.group.pop()
            drillTier.groupTier--
          }
        }
      })
      if (!isDrill) {
        return
      }

      chartService.realTimeRender(realTimeTicket, o.widget.widget.data)
    })
  }
)

