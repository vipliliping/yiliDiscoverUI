var CBoardTreeGridRender = function (jqContainer, options) {
  this.container = jqContainer // jquery object
  this.options = options
  this.chartType = 'treeGrid'
}

CBoardTreeGridRender.prototype.html = function (option, id) {
  var html = '<div id="' + id + '" style="width: 100%;height: 100%" class="treegrid"></div>'
  return html
}

CBoardTreeGridRender.prototype.setWidget = function (widget) {
  this.widget = widget;
};

CBoardTreeGridRender.prototype.initialize = function (options, id) {
  var self = this
  var $id = $('#' + id)
  var keys = options.chartConfig.keys[0],
    drillDown = options.chartConfig.keys[0].drillDown,
    option = options.chartConfig.option,
    root = option.root ? option.root : keys.col,
    drillDownNum = option.drillDownNum// 下钻要带过去的参数
  self.treeGrid = $id
  self.width = 0
  self.height = 0

  if (_.isUndefined(drillDownNum) || drillDownNum < 0) {
    drillDownNum = 0
  }

  $id.jqxTreeGrid(
    hierarchyColumn({
      width: $id.parents(".box-content").width(),
      height: $id.parents(".box-content").height(),
      sortable: option.isSort,
      pageable: option.isPageable,
      pageSizeMode: 'root',
      pagerMode: 'advanced',
      pageSize: option.pageSize ? parseInt(option.pageSize) : 10,
      pageSizeOptions: ['10', '20', '50'],
      virtualModeCreateRecords: function (expandedRecord, done) {
        var drillFilters = {}, parents = [], tier = 0
        var drillTarget = angular.copy(options.chartConfig.keys).splice(1, parseInt(drillDownNum))// 下钻需要带的参数名称

        self.done = done
        if (expandedRecord) {
          _.each(drillTarget, function (target) {
            drillFilters[target.col] = expandedRecord[target.col]
          })

          function getParent(record) {//  遍历所有父节点，获得上一级的过滤条件
            tier++
            parents.unshift(record[root])
            if (record.parent) {
              getParent(record.parent)
            }
            return parents
          }

          var list = getParent(expandedRecord)
          $id.trigger('expand', {record: expandedRecord, option: option, tier: {list: list, tier: tier}, filters: drillFilters})
        }
      },
      virtualModeRecordCreating: function (record) {
        if (record.level === drillDown.length - 1) {
          record.leaf = true;
        }
      },
      columns: options.treeGrid.columns
    }))

  var localData = getLocalData(options)// 定义插件需要的data
  var source = {
    dataType: "json",
    dataFields: options.treeGrid.fields,
    hierarchy:
      {
        keyDataField: {name: option.root},
        parentDataField: {name: option.parent}
      },
    id: 'tree_item_id',
    localData: localData
  }
  var dataAdapter = new $.jqx.dataAdapter(source);
  dataAdapter.dataBind();
  self.done(dataAdapter.records);

  return function (_options) {
    var redrawLocalData = getLocalData(_options)// 定义插件需要的data
    var source = {
      dataType: "json",
      dataFields: _options.treeGrid.fields,
      hierarchy:
        {
          keyDataField: {name: option.root},
          parentDataField: {name: option.parent}
        },
      // id: option.root,
      id: 'tree_item_id',
      localData: redrawLocalData
    }
    var dataAdapter = new $.jqx.dataAdapter(source);
    dataAdapter.dataBind();
    if (!self.done) {
      $id.jqxTreeGrid('clear')
    }
    self.done(dataAdapter.records)
  }
}

function getLocalData(options) {
  var optionCode = undefined, // 定义code中js的变量
    treeGridData = options.treeGrid.data// 定义插件需要的data

  // 这里处理排序


  if (options.chartConfig && options.chartConfig.option && options.chartConfig.option.code) {
    optionCode = options.chartConfig.option.code
    try {
      var param = angular.copy(window.$$dlut_param)
      treeGridData = (new Function('data,option,param',
        'return (' + optionCode + ')(data,option,param)'))
      (options.treeGrid.data, options, param)
    } catch (e) {
      console.error('option自定义计算错误', options, e)
    }
  }
  return treeGridData
}

function hierarchyColumn(option, splitStr) {
  if (typeof splitStr === 'undefined') splitStr = ":";
  var columns = option.columns;
  var columnGroupMap = {};
  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    column.colArr = column.text.split(splitStr);
    if (column.colArr.length > 1) {
      column.text = column.colArr[column.colArr.length - 1];
      for (var j = column.colArr.length - 2; j >= 0; j--) {
        var idArr = [];
        for (var k = 0; k <= j; k++) {
          idArr.push(column.colArr[k])
        }
        var id = idArr.join(splitStr)
        if (typeof column.columngroup === 'undefined') column.columngroup = id;
        if (typeof columnGroupMap[id] === 'undefined') {
          columnGroupMap[id] = {text: column.colArr[j], align: 'center', name: id};
          if (j > 0) {
            idArr.pop();
            columnGroupMap[id].parentgroup = idArr.join(splitStr);
          }
        }
      }
    }
  }
  var columnGroups = []
  for (var key in columnGroupMap) {
    columnGroups.push(columnGroupMap[key])
  }
  if (columnGroups.length > 0)
    option.columnGroups = columnGroups;
  return option
}
