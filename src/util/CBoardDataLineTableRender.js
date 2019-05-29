var CBoardDataLineTableRender = function (jqContainer, options) {
  this.container = jqContainer; // jquery object
  this.options = options;
};

CBoardDataLineTableRender.prototype.html = function (persist, uuid, tableName) {
  var self = this;
  var html = "" + "<table id = " + tableName + " class='display table-bordered table-inverse' width='100%'></table>";
  return html;
};


CBoardDataLineTableRender.prototype.initialize = function (option, EventService, scope, uuid, tableName) {
  var keyList = [];
  var deleteList = [];
  for (var i = 0; i < option.chartConfig.keys.length; i++) {
    var item = option.chartConfig.keys[i];
    if (item.hide != true) {
      keyList.push(item);
    } else {
      deleteList.push(item.col);
    }
  }
  if (deleteList.length > 0) {
    option.chartConfig.keys = keyList;
    if (option.data.length > 0) {
      var dataList = [];
      for (var i = 0; i < option.data.length; i++) {
        var data = [];
        for (var j = 0; j < option.data[i].length; j++) {
          var found = false;
          if (option.data[i][j] && option.data[i][j].column_header_header)
            for (var k = 0; k < deleteList.length; k++) {
              if (option.data[i][j].data == deleteList[k]) {
                found = true;
                break;
              }
            }
          if (!found && typeof option.data[i][j] != "undefined") {
            data.push(option.data[i][j]);
          }
        }
        dataList.push(data);
      }
      option.data = dataList;
    }
  }
  var tableContainer = $('#' + tableName);
  var columnsList = [];
  var columns = [];

  for (var i = 0; i < option.chartConfig.keys.length; i++) {
    var name = option.chartConfig.keys[i].alias ? option.chartConfig.keys[i].alias : option.chartConfig.keys[i].col
    columnsList.push(name)//列维名
  }
  if (!_.isUndefined(option.seriesConfig)) {
    for (var key in option.seriesConfig) {
      columnsList.push(key);//指标名
    }
  }
  for (var i = 0; i < columnsList.length; i++) {
    columns.push({
      title: columnsList[i]
    })
  }

  /*for (var j = 0; j < option.data.length; j++) {
      var newList = option.data[j];
      for (var i = 0; i < dataList.length; i++) {
          dataList[i] = dataList[i].concat(newList[i]);
      }
  }*/


  var language = {
    "sProcessing": "处理中...",
    "sLengthMenu": "显示 _MENU_ 项结果",
    "sZeroRecords": "没有匹配的结果",
    "sInfo": "显示第 _START_ 至 _END_ 项结果,共 _TOTAL_ 项",
    "sInfoEmpty": "显示第0至0项结果,共0项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    "sSearch": "搜索",
    "sUrl": "",
    "sEmptyTable": "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
      "sFirst": "首页",
      "sPrevious": "上页",
      "sNext": "下页",
      "sLast": "末页"
    },
    "oAria": {
      "sSortAscending": "以升序排列此列",
      "sSortDescending": "以降序排列此列"
    }
  }
  var sDom = "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'C>r>t"
  var size = 10
  if (option.chartConfig.option.size)
    size = option.chartConfig.option.size
  var sWidth = []
  if (option.chartConfig.option.colWidth) {
    sWidth = option.chartConfig.option.colWidth.split(',')
    for (var i = 0; i < columns.length; i++) {
      if (sWidth[i])
        columns[i].sWidth = sWidth[i]
    }
  }
  var showPage = option.dataList.length > size ? true : false
  if (option.chartConfig.option.showPage)
    showPage = option.chartConfig.option.showPage

  if (showPage)
    sDom += "<'dt-toolbar-footer'<'col-sm-5 col-xs-12 hidden-xs'i><'col-sm-7 col-xs-12'p>>"

  var tableOption = {
    // orderMulti: true,
    data: option.dataList,//数据
    columns: columns,//列名
    language: language,//语言
    autoWidth: true,
    sDom: sDom,
    ordering: true,
    bFilter: false,//去掉搜索
    lengthMenu: [size],//每页显示条数
    paging: showPage,//是否分页
    bLengthChange: showPage,//去掉选择每页条数
    columnDefs: colunmsRender(option)
  };
  if (scope) tableOption.scrollY = 0;
  tableContainer.DataTable(tableOption);
  var table = tableContainer.DataTable();
  // $(document).data("table_"+uuid,table);
  var self = this;
  $('#' + tableName + ' tbody').on('click', 'tr', function () {
    var data = table.row(this).data();
    var eventInfo = [];
    if (columnsList.length == data.length) {
      for (var i = 0; i < columnsList.length; i++) {
        eventInfo.push({
          col: columnsList[i],
          value: data[i]
        })
      }
    }
    var params = {
      data: {
        eventInfo: eventInfo
      },
      name: ""
    };
    EventService.trigger('CE:click', {
      widget: self.widget,
      param: params
    })
    EventService.trigger('CE:drillDown', {
      widget: self.widget,
      param: params
    })
  });
  $('#' + tableName + ' tbody').on("resize", function (e) {
  });
  return function (option) {
    var db = tableContainer.dataTable();
    if (db) {
      db.api().clear();
      db.api().rows.add(option.dataList);
      db.api().draw();
    }
  }
};
CBoardDataLineTableRender.prototype.setWidget = function (widget) {
  this.widget = widget;
};

const colunmsRender = function (option) {
  let keys = option.chartConfig.keys
  let columnDefs = []
  for (let i = 0; i < keys.length; i++) {
    let def = {
      targets: i,
      render: null,
      className: 'dataTable-' + keys[i].align,
      orderable: true
    }
    if (!_.isUndefined(keys[i].dataStyle)) {
      switch (keys[i].dataStyle.type) {
        case 'bar':
          let maxBur = _.max(option.dataList, function(item){
            if (parseInt(item[i])) {
                var num = parseInt(item[i])
                return num;
            }
          });
          def.render = function (data, type, row, meta) {
            if (!parseInt(data)) {
              return data
            }
            let html = '<div class="progress" style="margin-bottom: 0px">'
              + '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:'+ toPercent(data/maxBur[i])+ '">'
              + data
              + '</div> </div>'
            return html
          }
          break
        case 'percent':
          def.render = function (data, type, row, meta) {
            if (!parseInt(data)) {
              return data
            }
            let html = '<a style="color: red;">' + data + '</a>'
            if (toPoint(data) > keys[i].dataStyle.num) {
              html = '<a style="color: green">' + data + '</a>'
            }
            return html
          }
          break
        case 'updown':
          def.render = function (data, type, row, meta) {
            if (!parseInt(data)) {
              return data
            }
            let html = '<a>' + data + '<i class="fa fa-arrow-up" aria-hidden="true" style="color: green; margin-left: 5px"></i></a>';
            if (parseInt(data) < 0) {
              html = '<a>' + data + '<i class="fa fa-arrow-down" aria-hidden="true" style="color: red; margin-left: 5px"></i></a>';
            }
            return html
          }
          break
        default:
      }
    } else {
    }
    columnDefs.push(def)
  }
  return columnDefs
}

const toPercent = function (point) {
  var str=Number(point*100).toFixed(1);
  str+="%";
  return str;
}

const toPoint = function (percent){
  var str=percent.replace("%","");
  str= parseInt(str/100);
  return str;
}