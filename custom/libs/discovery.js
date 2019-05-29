(function ($, io) {
  baseUrl = 'http://21.122.110.147'
  socketUrl = 'http://21.122.110.147:5051'
  if (typeof $ === 'undefined') {
    alert('discovery lib is base on jquery')
    return
  }
  if (typeof io === 'undefined') {
    alert('discovery lib is base on socket.io')
    return
  }

  function datasetClass() {
  }

  datasetClass.prototype.reload = function (reload) {
    if (typeof this.option === 'undefined') {
      console.error("error:get dataset before set attribute reload")
    } else {
      this.option.reload = reload
    }
    return this
  }
  datasetClass.prototype.groupBy = function (columns) {
    var rows = []
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i]
      if (typeof column === 'string')
        rows.push({
          "columnName": column,
          "filterType": "eq",
          "values": []
        })
    }
    this.option.cfg.rows = rows
    return this
  }
  datasetClass.prototype.where = function (filtersIn) {
    var filters = []
    for (var i = 0; i < filtersIn.length; i++) {
      var filter = filtersIn[i]
      filters.push({
        columnName: filter.col,
        filterType: filter.type,
        values: filter.values
      })
    }
    this.option.cfg.filters = filters
    return this
  }
  datasetClass.prototype.sum = function (values) {
    for (var i = 0; i < values.length; i++) {
      this.option.cfg.values.push({
        column: values[i],
        aggType: "sum"
      })
    }
    return this
  }
  datasetClass.prototype.submit = function () {
    var query = {}
    if (typeof query.param === 'undefined') query.param = {}
    query.param.cols = ""
    this.option.cfg.rows.forEach(function (item) {
      query.param.cols += "'" + item.columnName + "'" + ','
    })
    this.option.cfg.columns.forEach(function (item) {
      query.param.cols += "'" + item.columnName + "'" + ','
    })
    query.param.pg_grpcols = query.param.cols = query.param.cols.slice(0, query.param.cols.length - 1)
    return $.ajax({
      type: "POST",
      url: baseUrl + "/dashboard/getAggregateData.do",
      data: {
        query: angular.toJson(query),
        datasetId: this.option.datasetId,
        cfg: JSON.stringify(this.option.cfg),
        reload: this.option.reload
      }
      // dataFilter:function(data){
      // data.c = 's'
      // return data
      // }
    })
      .then(function (data) {
        var list = []
        for (var i = 0; i < data.data.length; i++) {
          var d = data.data[i]
          var row = {}
          for (var j = 0; j < data.columnList.length; j++) {
            row[data.columnList[j].name] = d[j]
          }
          list.push(row)
        }
        return list
      })
  }

  function initSocketIO() {
    try {
        socketUrl = 'http://21.122.110.147:5051'
      socket = io.connect(socketUrl, {
        'reconnection limit': 1
      })
      socket.on("connect_error", function (data) {
        io.disconnect()
      })
      socket.on("letter", function (letter) {
        if (letter.type
          && typeof letter.scope !== 'undefined'
          && onEventFunc[letter.type]) {
          if (letter.scope == "all") {
            onEventFunc[letter.type](letter.data)
          }
        }
      })
    } catch (e) {
      console.error("dlut", "PostMan init must has io,option,socketUrl 3 parms")
    }
  }

  $.discovery = {
    dataset: function (id) {
      var dataset = new datasetClass()
      dataset.option = {
        datasetId: id,
        cfg: {rows: [], columns: [], filters: [], events: [], values: []},
        reload: false
      }
      return dataset
    },
    on: function (type, f) {
      onEventFunc[type] = f
    },
    trigger: function (type, data, scope) {
      for (var item in onEventFunc) {
        if (item == type) {
          if (typeof scope === 'undefined' || scope == "all") {
            onEventFunc[item](data)
          }
        }
      }
      if (typeof scope !== 'undefined' && socket) {
        socket.emit('letter', {
          type: type,
          data: data,
          scope: scope
        })
      }
    },
    send: function (message) {
      if (socket) {
        socket.emit("letter", message)
      }
    },
    selfPageFilter: function (params) {
      if (typeof params === 'undefined') params = {}
      var eventParams = []
      for (var key in params) {
        var value = params[key]
        eventParams.push({
          column: key,
          type: '=',
          values: typeof value === 'string' ? [value] : value
        })
      }
      $.discovery.trigger('CE:iframe', eventParams, 'all')
    },
    gotoScreen: function (target, params) {
      if (typeof params === 'undefined') params = {}
      if (typeof target === 'undefined') return
      var eventParams = []
      for (var key in params) {
        var value = params[key]
        eventParams.push({
          column: key,
          type: '=',
          values: typeof value === 'string' ? [value] : value
        })
      }
      $.discovery.trigger("WS:screenSkip", {
        target: target,
        param: eventParams
      }, 'all')

    }
  }
  var onEventFunc = {},
    socket = false
  initSocketIO()
})($, io)
