var CBoardTableRender = function (jqContainer, options, drill) {
  this.container = jqContainer // jquery object
  this.options = options
  this.tall
  this.drill = drill
  var _this = this
  $(this.container).resize(function (e) {
    _this.resize(e.target)
  })
}

CBoardTableRender.prototype.resize = function (container) {
  var wrapper = $(container).find('.table_wrapper')
  var $box = $(container).parents('.box')
  var height = $box.height() - $box.children('.box-header').height()
  height === 0 ? height = 500 : height
  $(container).find('.tableView').css('max-height', height + 'px')
  $(container).css('height', height)
  wrapper.css('width', 'auto')
  if (wrapper.width() < $(container).width()) {
    wrapper.css('width', '100%')
  }
}

CBoardTableRender.prototype.do = function (tall, persist, EventService, type) {
  this.tall = tall
  this.type = type
  tall = _.isUndefined(tall) ? 500 : tall
  var divHeight = tall - 110
  var _this = this
  var render = function (o, drillConfig, type) {
    if ((_.isUndefined(_this.options.chartConfig.option.groupSort) ||
      _.isNull(_this.options.chartConfig.option.groupSort) ||
      _this.options.chartConfig.option.groupSort) && !_this.options.chartConfig.option.stopMerge) {
      _this.prevOptions.keys = _this.options.chartConfig.keys
    }
    _this.options = o
    _this.drill.config = drillConfig
    _this.do(_this.tall, null, EventService, type)
  }
  this.options.chartConfig.crossTable = {}
  this.options.chartConfig.crossTable.drill = this.drill
  this.options.chartConfig.crossTable.render = render
  if ((_.isUndefined(this.options.chartConfig.option.groupSort) ||
    _.isNull(this.options.chartConfig.option.groupSort) ||
    this.options.chartConfig.option.groupSort) && !this.options.chartConfig.option.stopMerge) {
    if (_.isUndefined(this.prevOptions)) {
      this.prevOptions = {
        prevData: groupSort(this.options, this, type)
      }
    } else {
      this.prevOptions.prevData = groupSort(this.options, this, type)
    }
    this.options.data = sortByPrev(this.options, this, type)
  }

  var isDoubleSort = false// 如果大区和区域都存在，并且排序
  if(this.options.chartConfig.option.isDqSort && this.options.chartConfig.option.isQySort) isDoubleSort = true

  // 如果大区、区域都排序
  if(isDoubleSort) {
    var dqRules = this.options.chartConfig.option.dqSorting.split(',')
    var qyRules = this.options.chartConfig.option.qySorting.split(',')
    var dqIndex = this.options.chartConfig.option.dqIndex
    var qyIndex = this.options.chartConfig.option.qyIndex
    this.options.data = sortingByDoule(this.options.data, dqRules, qyRules, dqIndex, qyIndex)
  }
  //如果只有大区排序
  if(this.options.chartConfig.option.isDqSort && !isDoubleSort) {
    var sorting = this.options.chartConfig.option.dqSorting.split(',')
    this.options.data = sortingBySingle(this.options.data, sorting, this.options.chartConfig.option.dqIndex)
  }
  //如果只有区域排序
  if(this.options.chartConfig.option.isQSort && !isDoubleSort) {
    var sorting = this.options.chartConfig.option.qySorting.split(',')
    this.options.data = sortingBySingle(this.options.data, sorting, this.options.chartConfig.option.qyIndex)
  }

  var optionCode = undefined
  if (this.options.chartConfig && this.options.chartConfig.option && this.options.chartConfig.option.optionCode) {
    optionCode = _this.options.chartConfig.option.optionCode
    try {
      var param = angular.copy(window.$$dlut_param)
      _this.options = (new Function('option,param',
        'return (' + optionCode + ')(option,param)'))
      (_this.options, param)
    } catch (e) {
      console.error('option自定义计算错误', _this.options, e)
    }
  }
  var args = {
    tall: tall,
    chartConfig: this.options.chartConfig,
    data: this.options.data,
    container: this.container,
    drill: this.drill,
    oData: this.options.originalData,
    render: render,
    wName: this.options.wName,
    EventService: EventService
  }
  crossTable.table(args)
  $(this.container).css({
    height: tall + 'px'
  })
  this.resize(this.container)
  if (persist) {
    persist.data = this.options.data
    persist.type = 'table'
  }
  return render
}

function groupSort(options, _this, type) {
  var arr = []
  var prevOptions = _this.prevOptions
  var keyLength = options.chartConfig.keys.length,
    groupLength = options.chartConfig.groups.length,
    sortingData = options.data

  var drillList = []
  var isDrill = false
  for (var dl in _this.drill.config) {
    drillList.push(_this.drill.config[dl])
  }
  if (_.isUndefined(prevOptions)) {
    // if(drillList.length >= 2) {
    //     keyLength = keyLength - 1
    // }
    arr = getSortingData(sortingData, keyLength, groupLength, options, type, _this)
  } else {
    var secondArr = []
    var prevArr = prevOptions.prevData
    var prevKeys = prevOptions.keys
    if (prevKeys.length !== keyLength) {
      if (type !== 'up') {
        keyLength = prevKeys.length
      }
    }
    var sortList = getSortingData(sortingData, keyLength, groupLength, options, type, _this)
    if (prevArr.length === 0) {
      prevArr = sortList
    }
    _.each(prevArr, function (item) {
      _.each(sortList, function (sort) {
        if (type === 'down' || _.isUndefined(type)) {
          if (sort.indexOf(item) > -1) secondArr.push(sort)
        } else {
          if (item.indexOf(sort) > -1) secondArr.push(sort)
        }
      })
    })

    _.each(sortList, function (nItem) {
      if (secondArr.indexOf(nItem) === -1) {
        secondArr.push(nItem)
      }
    })

    if (secondArr.length > 0) {
      arr = _.uniq(secondArr)
    }
  }
  return arr
}

function getSortingData(data, kLength, gLength, options, type, _this) {
  var arr = []
  var sortType = undefined
  var currentKeysLength = options.chartConfig.keys.length
  _.map(data[gLength], function (e, _i) {
    if (_.isUndefined(sortType) && e.sort && e.sort !== 'sort') {
      sortType = e.sort
    }
  })
  var n = 0, _n = 1
  if (type === 'up' || (type !== 'up' && type !== 'down')) {
    n = 1
    _n = 2
  }
  for (var s = gLength + 1; s < data.length; s++) {
    var key = ''
    for (var k = 0; k < kLength - n; k++) {
      if (!_.isNaN(Number(data[s][k].data)) && data[s][k].data !== '') {
        continue
      } // 如果第一位是数字，则说明是排名
      key += data[s][k].data === '' ? '_' : data[s][k].data
      if (k !== kLength - _n) {
        key += '-'
      }
    }
    if (arr.indexOf(key) === -1) {
      arr.push(key)
    }
  }

  var sortText = ''
  if (typeof sortText.localeCompare === 'function') {
    arr = arr.sort(
      function compareFunction(param1, param2) {
        if (!_.isUndefined(sortType) && currentKeysLength === 1 || !_.isUndefined(_this.prevOptions)) {
          return 0
        } else {
          return param1.localeCompare(param2, "zh")
        }
      }
    )
  } else {
    arr = arr.sort()
  }
  return arr
}

function sortByPrev(options, _this, type) {
  var data_final = [], groupData = {}
  var prevData = _this.prevOptions.prevData
  var keyLength = options.chartConfig.keys.length,
    groupLength = options.chartConfig.groups.length,
    sortingData = options.data
  var sortType = undefined
  var sortIndex = undefined
  var kn = 0, gn = 1 // 根据是下钻还是上卷
  _.map(sortingData[groupLength], function (e, _i) {
    if (_.isUndefined(sortType) && e.sort) {
      sortType = e.sort
      sortIndex = _i
    }
  })
  if (!_.isUndefined(_this.prevOptions.keys) && type !== 'up') {
    keyLength = _this.prevOptions.keys.length
  }
  if (type === 'up' || (type !== 'up' && type !== 'down')) {
    kn = 1
    gn = 2
  }
  for (var s = groupLength + 1; s < sortingData.length; s++) {
    var key = ''
    for (var k = 0; k < keyLength - kn; k++) {
      if (!_.isNaN(Number(sortingData[s][k].data)) && sortingData[s][k].data !== '') {
        continue
      }
      key += sortingData[s][k].data === '' ? '_' : sortingData[s][k].data
      if (k !== keyLength - gn) {
        key += '-'
      }
    }
    if (!groupData[key]) {
      groupData[key] = [sortingData[s]]
    } else {
      groupData[key].push(sortingData[s])
    }
  }

  _.each(prevData, function (item) {
    if (!_.isUndefined(sortIndex) && !_.isUndefined(groupData[item])) {
      groupData[item].sort(function (a, b) {
        if (sortType === 'asc') {
          return toNumber(a[sortIndex].data) - toNumber(b[sortIndex].data)
        } else if (sortType === 'desc') {
          return toNumber(b[sortIndex].data) - toNumber(a[sortIndex].data)
        } else {
          return 0
        }
      })
    }
    if (!_.isUndefined(groupData[item])) {
      data_final = data_final.concat(groupData[item])
    }
  })
  var columnHeader = []
  for (var ch = 0; ch < groupLength + 1; ch++) {
    columnHeader.push(sortingData[ch])
  }
  data_final = columnHeader.concat(data_final)
  return data_final
}

function toNumber(number) {
  var Rnumber = parseFloat(number)
  Rnumber = (_.isNaN(Rnumber) || _.isUndefined(Rnumber) || _.isNull(Rnumber) || Rnumber === Infinity) ? -Infinity : Rnumber
  return Rnumber
}
/*
* @params data表格的数据, rules 排序的规则
* 大区、区域排序方法
* */
function sortingByDoule(data, dq_rules, qy_rules, dq_index, qy_index) {
  if(_.isUndefined(dq_rules) || _.isUndefined(qy_rules)) return data

  var thead = data.splice(0, 1), dataCache = {}, item_cache = {}, sortType = undefined, sortIndex = undefined

  _.each(thead[0], function (item, index) {// 查找指标或维度中是否有需要排序的
    if (_.isUndefined(sortType) && item.sort) {
      sortType = item.sort
      sortIndex = index
    }
  })

  _.each(dq_rules, function(rule, r_index) {// 先将数据按大区分组
    dataCache[rule] = []
    _.each(data, function(item) {
      if(item[dq_index - 1].data === rule) {
        dataCache[rule].push(item)
      }
    })
  })

  _.map(dataCache, function(value, key) {// 将大区内的数据按照区域分组
    dataCache[key] = []
    _.each(qy_rules, function (rule) {
      if(_.isUndefined(item_cache[rule])) {
        item_cache[rule] = []
      }
      _.each(value, function(v) {
        if(v[qy_index - 1].data === rule) {
          item_cache[rule].push(v)
          if(dataCache[key].indexOf(rule) === -1) {
            dataCache[key].push(rule)
          }
        }
      })
    })
  })

  _.each(qy_rules, function(_r) {
    if (!_.isUndefined(sortIndex) && !_.isUndefined(item_cache[_r])) {
      item_cache[_r].sort(function (a, b) {
        if (sortType === 'asc') {
          return toNumber(a[sortIndex].data) - toNumber(b[sortIndex].data)
        } else if (sortType === 'desc') {
          return toNumber(b[sortIndex].data) - toNumber(a[sortIndex].data)
        } else {
          return 0
        }
      })
    }
  })

  _.each(dq_rules, function(dq) {// 组装最后返回的数据
    var dq_v = []
    _.each(dataCache[dq], function(qy) {
      dq_v = dq_v.concat(item_cache[qy])
    })
    if (!_.isUndefined(dataCache[dq])) {
      thead = thead.concat(dq_v)
    }
  })
  return thead
}

/*
* @params data 表格的数据， rules 排序的规则
* 大区或区域排序方法
* */
function sortingBySingle(data, rules, dq_index) {
  if(_.isUndefined(rules)) return data
  var thead = data.splice(0, 1), dataCache = {}, sortType = undefined, sortIndex = undefined

  _.each(thead[0], function (item, index) {// 查找指标或维度中是否有需要排序的
    if (_.isUndefined(sortType) && item.sort) {
      sortType = item.sort
      sortIndex = index
    }
  })

  _.each(rules, function(rule, r_index) {// 先将数据分组
    dataCache[rule] = []
    _.each(data, function(item) {
      if(item[dq_index - 1].data === rule) {
        dataCache[rule].push(item)
      }
    })
  })

  _.each(rules, function (item) {// 根据排序的规则来循环数据，组装最后需要的数据
    if (!_.isUndefined(sortIndex) && !_.isUndefined(dataCache[item])) {
      dataCache[item].sort(function (a, b) {
        if (sortType === 'asc') {
          return toNumber(a[sortIndex].data) - toNumber(b[sortIndex].data)
        } else if (sortType === 'desc') {
          return toNumber(b[sortIndex].data) - toNumber(a[sortIndex].data)
        } else {
          return 0
        }
      })
    }
    if (!_.isUndefined(dataCache[item])) {
      thead = thead.concat(dataCache[item])
    }
  })
  return thead
}

