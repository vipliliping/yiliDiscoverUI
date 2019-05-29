'use strict'
discovery.service('chartCrossTableService',
  function ($filter, EventService, uuid4) {
    'ngInject'
    var translate = $filter('translate')
    this.render = function (containerDom, option, scope, persist) {
      var render = new CBoardDataTableRender(containerDom, option)
      this.instance = {
        render: render
      }
      var uuid = uuid4.generate()//定义表格需要的唯一id
      var tableName = 'example_' + uuid//定义表格名字
      var html = render.html(tableName)
      containerDom.html(html)
      return render.initialize(option, scope, tableName, EventService)
    }
    this.parseOption = function (option) {
      var cols = option.chartConfig.values[0].cols//指标数据
      var keys = option.chartConfig.keys
      var groups = option.chartConfig.groups
      var columnsList = option.originalData.columnList
      var originalData = option.originalData.data

      var keysIndex = getIndex(keys, columnsList)
      var groupsIndex = getIndex(groups, columnsList)

      var tableData = []
      var columnList = []
      var newData = []
      _.each(originalData, function (data) {
        var obj = {}
        _.each(columnsList, function (col) {
          obj[col.name] = data[col.index]
        })
        newData.push(obj)
      })

      var keysList = []
      for (var o = 0; o < originalData.length; o++) {
        keysList.push(originalData[o][keysIndex.index])
      }
      var keysUniq = _.uniq(keysList)
      var groupName = groupsIndex.name
      var keyName = keysIndex.name

      var groupCols = []
      for (var o = 0; o < originalData.length; o++) {
        var obj = {}
        obj[groupName] = originalData[o][groupsIndex.index]
        obj.values = cols

        var gg = _.find(groupCols, function (g) {
          return g[groupName] == originalData[o][groupsIndex.index]
        })
        if (_.isUndefined(gg)) {
          groupCols.push(obj)
        }
      }

      _.each(keysUniq, function (key) {
        var tdata = [key]

        _.each(groupCols, function (group) {
          var d = _.find(newData, function (nd) {
            return nd[groupName] == group[groupName] && key == nd[keyName]
          })
          _.each(group.values, function (col) {
            if (!_.isUndefined(d)) {
              tdata.push(d[col.col])
              columnList.push({
                data: col.col + '-' + d[groupName]
              })
            } else {
              tdata.push('-')
            }
          })
        })
        tableData.push(tdata)
      })

      function getIndex(array, columnsList) {
        if (_.isUndefined(array[0]) || !array.length) return false
        if (!_.isUndefined(array[0].drillDown)) {
          for (var d = 0; d < array[0].drillDown.length; d++) {
            var tor = _.find(columnsList, function (col) {
              return array[0].drillDown[d].col === col.name
            })
            if (tor) {
              return tor
            }
          }
        } else {
          return _.find(columnsList, function (col) {
            return array[0].col === col.name
          })
        }
      }

      option.dataList = tableData
      return option
    }
  })
