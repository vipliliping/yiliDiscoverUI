/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict'
discovery.service('chartTableService', function (EventService) {
  "ngInject"

  this.render = function (containerDom, option, scope, persist, drill) {
    if (option == null) {
      containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>")
      return
    }
    var height
    scope ? height = scope.myheight : null
    this.type = 'table'
    return new CBoardTableRender(containerDom, option, drill).do(height, persist, EventService)
  }

  this.parseOption = function (data) {
    var tableOption = chartDataProcess(data.chartConfig, data.keys, data.series, data.data, data.seriesConfig, data.originalData, data.wName)
    return tableOption
  }
})
