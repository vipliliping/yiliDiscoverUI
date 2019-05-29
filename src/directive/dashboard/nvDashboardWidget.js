/**
 * Created by yfyuan on 2016/8/8.
 */

discovery.directive('nvDashboardWidget', function ($compile, $templateCache, dataService, chartService) {
  "ngInject"
  var renderEchart = function (scope, element, attrs) {

    var template = $templateCache.get("nvEchartContent")
    scope.myheight = scope.height
    var link = $compile(template)
    element.append(link(scope))
    var ndWrapper = $(element).find('.box-body')
    if (scope.widget.render) {
      scope.widget.render(ndWrapper, null, scope)
    }
  }

  var renderD3 = function (scope, element, attrs) {
    var template = $templateCache.get("nvD3Content")
    scope.myheight = scope.height
    var link = $compile(template)
    element.append(link(scope))
    var ndWrapper = $(element).find('.box-body')
    if (scope.widget.render) {
      scope.widget.render(ndWrapper, null, scope)
    }
    // TODO: 加resize
  }

  var renderMap = function (scope, element, attrs) {
    var template = $templateCache.get("nvChartContent")
    scope.myheight = scope.height
    var link = $compile(template)
    element.append(link(scope))
    var ndWrapper = $(element).find('.box-body')
    scope.widget.render(ndWrapper, null, scope)
  }

  var renderKpi = function (scope, element, attrs) {
    var template = $templateCache.get("nvKpiContent")
    var aa = $compile(template)(scope)
    element.append(aa)
    var ndWrapper = $(element).find('.kpi-body')
    scope.widget.render(ndWrapper, null, scope)
  }

  var renderTable = function (scope, element, attrs) {
    var template = $templateCache.get("nvChartContent")
    scope.myheight = scope.height
    var aa = $compile(template)(scope)
    element.append(aa)
    var $box = $(element).parents('.box')
    scope.myheight = $box.height() - $box.children('.box-header').height()
    var ndWrapper = $(element).find('.box-body')
    if (scope.widget.render) {
      scope.widget.render(ndWrapper, null, scope)
    }
  }

  return {
    restrict: 'EA',
    scope: true,
    compile: function (element, attrs) {
      return {
        pre: function (scope, element, attrs) {
        },
        post: function (scope, element, attrs) {
          switch (scope.widget.widget.data.config.chart_type) {
            case 'cityMap':
              renderEchart(scope, element, attrs)
              break
            case 'zoneMap':
              renderEchart(scope, element, attrs)
              break
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
            case 'flexChart':
              renderEchart(scope, element, attrs)
              break
            case 'kpi':
              renderKpi(scope, element, attrs)
              break
            case 'table':
              renderTable(scope, element, attrs)
              break
            case 'dataLineTable':
              renderTable(scope, element, attrs)
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
            case 'barPolarStack':
              renderEchart(scope, element, attrs)
              break
            case 'pieProportion':
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
            case 'rose':
              renderEchart(scope, element, attrs)
              break
            case 'flexD3Chart':
              renderD3(scope, element, attrs)
              break
            default:
              renderD3(scope, element, attrs)
              break
          }
        }
      }
    }
  }
})
