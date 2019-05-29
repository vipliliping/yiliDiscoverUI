/**
 * Created by yfyuan on 2016/8/8.
 */

discovery.directive('dashboardWidget',
  function ($compile, $templateCache, dataService, chartService) {

    'ngInject'
    var renderEchart = function (scope, element, attrs) {
      var template = $templateCache.get('echartContent')
      scope.myheight = scope.row.height ? (scope.row.height - 44) : 300
      var link = $compile(template)
      element.append(link(scope))
      var ndWrapper = $(element).find('.box-body')
      scope.widget.render(ndWrapper, null, scope)
    }

    var renderMap = function (scope, element, attrs) {
      var template = $templateCache.get('chartContent')
      scope.myheight = scope.row.height ? (scope.row.height - 44) : 300
      var link = $compile(template)
      element.append(link(scope))
      var ndWrapper = $(element).find('.box-body')
      scope.widget.render(ndWrapper, null, scope)
    }

    var renderKpi = function (scope, element, attrs) {
      var template = $templateCache.get('kpiContent')
      var aa = $compile(template)(scope)
      element.append(aa)
      var ndWrapper = $(element).find('.kpi-body')
      scope.widget.render(ndWrapper, null, scope)
    }

    var renderSelector = function (scope, element, attrs) {
      var template = $templateCache.get('selectorContent')
      var aa = $compile(template)(scope)
      element.append(aa)
      var ndWrapper = $(element).find('.box-body')
      scope.widget.render(ndWrapper, null, scope)
    }

    var renderTable = function (scope, element, attrs) {
      var template = $templateCache.get('chartContent')
      scope.myheight = scope.row.height ? (scope.row.height - 44) : 500
      var aa = $compile(template)(scope)
      element.append(aa)
      var ndWrapper = $(element).find('.box-body')
      scope.widget.render(ndWrapper, null, scope)
    }

    return {
      restrict: 'E',
      scope: true,
      compile: function (element, attrs) {
        return {
          pre: function (scope, element, attrs) {
          },
          post: function (scope, element, attrs) {
            switch (scope.widget.widget.data.config.chart_type) {
              case 'line':
                renderEchart(scope, element, attrs)
                break
              case 'line2':
                renderEchart(scope, element, attrs)
                break
              case 'line3':
                renderEchart(scope, element, attrs)
                break
              case 'pie':
                renderEchart(scope, element, attrs)
                break
              case 'kpi':
                renderKpi(scope, element, attrs)
                break
              case 'table':
                renderTable(scope, element, attrs)
                break
              case 'crossTable':
                renderTable(scope, element, attrs)
                break
              case 'treeGrid':
                renderTable(scope, element, attrs)
                break
              case 'crossGreatTable':
                renderTable(scope, element, attrs)
                break
              case 'selector':
                renderSelector(scope, element, attrs)
                break
              case 'funnel':
                renderEchart(scope, element, attrs)
                break
              case 'sankey':
                renderEchart(scope, element, attrs)
                break
              case 'chord':
                renderEchart(scope, element, attrs)
                break
              case 'radar':
                renderEchart(scope, element, attrs)
                break
              case 'map':
                renderMap(scope, element, attrs)
                break
              case 'scatter':
                renderEchart(scope, element, attrs)
                break
              case 'gauge':
                renderEchart(scope, element, attrs)
                break
              case 'wordCloud':
                renderEchart(scope, element, attrs)
                break
              case 'treeMap':
                renderEchart(scope, element, attrs)
                break
              case 'areaMap':
                renderEchart(scope, element, attrs)
                break
              case 'heatMapCalendar':
                renderEchart(scope, element, attrs)
                break
              case 'heatMapTable':
                renderEchart(scope, element, attrs)
                break
              case 'markLineMap':
                renderEchart(scope, element, attrs)
                break
              case 'liquidFill':
                renderEchart(scope, element, attrs)
                break
            }
          }
        }
      }
    }
  })
