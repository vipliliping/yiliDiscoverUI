'use strict'
discovery.service('chartCrossTableGreatService',
  function ($filter, EventService, uuid4) {
    'ngInject'
    var translate = $filter('translate')
    this.render = function (containerDom, option, scope, persist) {
      var render = new CBoardCrossGreatRender(containerDom, option)
      this.instance = {
        render: render
      }
      var uuid = uuid4.generate()//定义表格需要的唯一id
      var tableId = 'cross_great_' + uuid//定义表格名字
      var html = render.html(tableId, option)
      containerDom.html(html)
      return render.initialize(option, scope, tableId, EventService)
    }
    this.parseOption = function (option) {
      var drillTier = option.chartConfig.drillTier
      var columnsList = option.originalData.columnList
      var originalData = option.originalData.data

      var tableData = [] //表格数据

      drillTier.isGreat = true

      _.each(originalData, function (data) {
        var tData = {}
        _.each(columnsList, function (col) {
          tData[col.name] = data[col.index]
        })
        tableData.push(tData)
      })

      option.tableData = tableData
      return option
    }
  })
