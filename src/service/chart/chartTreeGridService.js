'use strict'
discovery.service('chartTreeGridService', function () {
  "ngInject"

  this.render = function (containerDom, option, scope) {
    var render = new CBoardTreeGridRender(containerDom, option)
    var random = Math.random().toString(36).substring(2)
    var id = 'treegrid_' + random
    var html = render.html(option, id)
    this.instance = {
      render: render
    }
    containerDom.html(html)
    return render.initialize(option, id)
  }

  this.parseOption = function (option) {
    var fields = [], columns = [], data = [], o_name = null, parentDataField = null
    var values = option.chartConfig.values[0].cols,
      o_data = angular.copy(option.originalData.data),
      o_cols = angular.copy(option.originalData.columnList),
      tier = option.chartConfig.drillTier.keyTier,// 当前下钻的层级
      keys = option.chartConfig.keys,
      drillDown = option.chartConfig.keys[0].drillDown

    var tierName = o_name = drillDown[tier].col
    _.each(o_cols, function (col) {// 循环原始数据的列，替换name
      col.name === tierName ? col.name = keys[0].col : null
    })

    if (tier > 0) {
    }

    _.each(keys, function (key) {// 循环维度，组装columns和fields
      fields.push({name: key.col})
      columns.push({dataField: key.col, text: key.col, width: key.width ? key.width : 'auto'})
    })

    _.each(values, function (value) {// 循环指标项，组装columns和fields
      fields.push({name: value.col, type: value.treeType})
      var temp
      var text = value.alias ? value.alias : value.col

      if (value.dataStyle && value.dataStyle.type === 'custom') {
        temp = (new Function('rowKey, dataField, value, data',
          'return (' + value.dataStyle.num + ')(rowKey, dataField, value, data)'))
      }
      columns.push({
        dataField: value.col,
        text: text,
        width: value.width ? value.width : 'auto',
          cellsRenderer: temp
      })
    })

    _.each(o_data, function (d) {// 循环原始数据，组装数据体
      var obj = {}
      _.each(o_cols, function (c) {
        obj[c.name] = d[c.index]
        obj['tree_item_id'] = generatekey()
      })
      data.push(obj)
    })

    option.treeGrid = {
      fields: fields,
      columns: columns,
      data: data
    }
    return option
  }

  var generatekey = function () {// 生成ID
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
})
