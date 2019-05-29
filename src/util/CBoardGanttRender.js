var CBoardGanttRender = function (jqContainer, options) {
  this.container = jqContainer // jquery object
  this.options = options
}

CBoardGanttRender.prototype.html = function (persist, uuid, ganttName) {
  var self = this
  // var html = "" + self.template;
  // var html = "" + "<div id = " + ganttName + " style='width:100%; height:100%;'></div>";

  var html =
    '<div class=\'row\'>' +
    '<div class=\'col-sm-12\'>' +
    '<div class=\'pull-right ganttBtnGroup\'>' +
    '<button onClick=\'ganttFun.zoomToFit()\' class=\'btn btn-success\'><i class=\'fa-search-minus fa\'></i>自动缩放</button>' +
    '<button onClick=\'ganttFun.setScaleConfig("day")\' class=\'btn btn-default\'>天</button>' +
    '<button onClick=\'ganttFun.setScaleConfig("week")\' class=\'btn btn-default\'>周</button>' +
    '<button onClick=\'ganttFun.setScaleConfig("month")\' class=\'btn btn-default\'>月</button>' +
    '<button onClick=\'ganttFun.setScaleConfig("year")\' class=\'btn btn-default\'>年</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div id = ' + ganttName +
    ' style=\'width:100%; height:100%;\' class=\'gantt\'></div>'
  return html
}

CBoardGanttRender.prototype.initialize = function (
  option, EventService, scope, uuid, ganttName) {
  var data = option.newList
  var newData = {
    data: [],
    links: []
  }
  var dataKeys = [
    'id',
    'text',
    'duration',
    'progress',
    'open',
    'parent',
    'state']

  if (data && _.isArray(data))
    for (var i = 0; i < data.length; i++) {
      var item = {}
      item.start_date = data[i].start_date.split('-').reverse().join('-')
      for (var j in dataKeys) {
        var key = dataKeys[j]
        item[key] = data[i][key]
      }
      item.duration = parseFloat(item.duration)
      item.progress = parseFloat(item.progress)
      if (item.parent == '-' || item.parent == '') {
        item.parent = undefined
      }
      newData.data.push(item)
    }
  gantt.config.subscales = [
    {unit: 'month', step: 1, date: '%Y年%M'}
  ]
  gantt.templates.task_class = function (st, end, item) {
    return item.progress == 1 ? 'gantt_project' : ''
  }
  gantt.templates.task_text = function (start, end, task) {
    var progress = task.progress * 100
    if (progress == 100)
      return task.text + '(已完成)'
    else
      return task.text + '(' + progress + '%)'
  }
  gantt.config.date_scale = '%d日'
  gantt.config.readonly = true
  gantt.config.drag_links = false
  gantt.config.drag_move = false

  gantt.templates.tooltip_text = function (start, end, task) {
    return '<b>项目名称:</b> ' + task.text + '<br/>' +
      '<b>开始时间:</b> ' + gantt.templates.tooltip_date_format(start) + '<br/>' +
      '<b>结束时间:</b> ' + gantt.templates.tooltip_date_format(end) + '<br/>' +
      '<b>说明:</b>' + task.state
  }
  gantt.config.grid_width = 500
  gantt.config.scale_height = 100
  gantt.config.columns = [
    {name: 'text', label: '项目名称', tree: true, width: '200', align: 'center'},
    {name: 'start_date', label: '开始时间', width: '130', align: 'center'},
    {name: 'duration', label: '持续时间', width: '130', align: 'center'},
    {name: 'add'}
  ]
  gantt.config.grid_resize = true

  if (_.isUndefined(window.ganttFun))
    window.ganttFun = {
      scaleConfigs: [
        // minutes
        {
          unit: 'minute',
          step: 1,
          scale_unit: 'hour',
          date_scale: '%H',
          subscales: [
            {unit: 'minute', step: 1, date: '%H:%i'}
          ]
        },
        // hours
        {
          unit: 'hour',
          step: 1,
          scale_unit: 'day',
          date_scale: '%M %j',
          subscales: [
            {unit: 'hour', step: 1, date: '%H:%i'}
          ]
        },
        // days
        {
          unit: 'day',
          step: 1,
          scale_unit: 'month',
          date_scale: '%F',
          subscales: [
            {unit: 'day', step: 1, date: '%j'}
          ]
        },
        // weeks
        {
          unit: 'week',
          step: 1,
          scale_unit: 'month',
          date_scale: '%F',
          subscales: [
            {
              unit: 'week', step: 1, template: function (date) {
              var dateToStr = gantt.date.date_to_str('%M%d日')
              var endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1,
                'day')
              return dateToStr(date) + ' - ' + dateToStr(endDate)
            }
            }
          ]
        },
        // months
        {
          unit: 'month',
          step: 1,
          scale_unit: 'year',
          date_scale: '%Y',
          subscales: [
            {unit: 'month', step: 1, date: '%M'}
          ]
        },
        // quarters
        {
          unit: 'month',
          step: 3,
          scale_unit: 'year',
          date_scale: '%Y',
          subscales: [
            {
              unit: 'month', step: 3, template: function (date) {
              var dateToStr = gantt.date.date_to_str('%M')
              var endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1,
                'day')
              return dateToStr(date) + ' - ' + dateToStr(endDate)
            }
            }
          ]
        },
        // years
        {
          unit: 'year',
          step: 1,
          scale_unit: 'year',
          date_scale: '%Y',
          subscales: [
            {
              unit: 'year', step: 5, template: function (date) {
              var dateToStr = gantt.date.date_to_str('%Y')
              var endDate = gantt.date.add(gantt.date.add(date, 5, 'year'), -1,
                'day')
              return dateToStr(date) + ' - ' + dateToStr(endDate)
            }
            }
          ]
        },
        // decades
        {
          unit: 'year',
          step: 10,
          scale_unit: 'year',
          template: function (date) {
            var dateToStr = gantt.date.date_to_str('%Y')
            var endDate = gantt.date.add(gantt.date.add(date, 10, 'year'), -1,
              'day')
            return dateToStr(date) + ' - ' + dateToStr(endDate)
          },
          subscales: [
            {
              unit: 'year', step: 100, template: function (date) {
              var dateToStr = gantt.date.date_to_str('%Y')
              var endDate = gantt.date.add(gantt.date.add(date, 100, 'year'),
                -1, 'day')
              return dateToStr(date) + ' - ' + dateToStr(endDate)
            }
            }
          ]
        }
      ],
      getUnitsBetween: function (from, to, unit, step) {
        var start = new Date(from),
          end = new Date(to)
        var units = 0
        while (start.valueOf() < end.valueOf()) {
          units++
          start = gantt.date.add(start, step, unit)
        }
        return units
      },
      zoomToFit: function () {
        var project = gantt.getSubtaskDates(),
          areaWidth = gantt.$task.offsetWidth
        for (var i = 0; i < ganttFun.scaleConfigs.length; i++) {
          var columnCount = this.getUnitsBetween(project.start_date,
            project.end_date, ganttFun.scaleConfigs[i].unit,
            ganttFun.scaleConfigs[i].step)
          if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
            break
          }
        }
        if (i == ganttFun.scaleConfigs.length) {
          i--
        }
        ganttFun.applyConfig(ganttFun.scaleConfigs[i], project)
        gantt.render()
      },
      applyConfig: function (config, dates) {
        gantt.config.scale_unit = config.scale_unit
        if (config.date_scale) {
          gantt.config.date_scale = config.date_scale
          gantt.templates.date_scale = null
        }
        else {
          gantt.templates.date_scale = config.template
        }

        gantt.config.step = config.step
        gantt.config.subscales = config.subscales

        if (dates) {
          gantt.config.start_date = gantt.date.add(dates.start_date, -1,
            config.unit)
          gantt.config.end_date = gantt.date.add(
            gantt.date[config.unit + '_start'](dates.end_date), 2, config.unit)
        } else {
          gantt.config.start_date = gantt.config.end_date = null
        }
      },
      setScaleConfig: function (value) {
        switch (value) {
          case 'day':
            gantt.config.scale_unit = 'day'
            gantt.config.step = 1
            gantt.config.date_scale = '%M%d日'
            gantt.config.subscales = []
            gantt.config.scale_height = 27
            gantt.templates.date_scale = null
            break
          case 'week':
            var weekScaleTemplate = function (date) {
              var dateToStr = gantt.date.date_to_str('%M%d日')
              var endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1,
                'day')
              return dateToStr(date) + ' - ' + dateToStr(endDate)
            }

            gantt.config.scale_unit = 'week'
            gantt.config.step = 1
            gantt.templates.date_scale = weekScaleTemplate
            gantt.config.subscales = [
              {unit: 'day', step: 1, date: '%D'}
            ]
            gantt.config.scale_height = 50
            break
          case 'month':
            gantt.config.scale_unit = 'month'
            gantt.config.date_scale = '%Y%F'
            gantt.config.subscales = [
              {unit: 'day', step: 1, date: '%j(%D)'}
            ]
            gantt.config.scale_height = 50
            gantt.templates.date_scale = null
            break
          case 'year':
            gantt.config.scale_unit = 'year'
            gantt.config.step = 1
            gantt.config.date_scale = '%Y'
            gantt.config.min_column_width = 50

            gantt.config.scale_height = 90
            gantt.templates.date_scale = null

            gantt.config.subscales = [
              {unit: 'month', step: 1, date: '%M'}
            ]
            break
        }
        gantt.render()
      }
    }

  gantt.init(ganttName)
  gantt.parse(newData)
  gantt.addMarker({
    start_date: new Date(),
    css: 'today',
    text: '今天'
  })
  window.ganttFun.zoomToFit()

  this.newData = newData
  var self = this
  gantt.attachEvent('onTaskClick', function (id, e) {
    var item = null
    if (self.newData && self.newData.data)
      for (var i = 0; i < self.newData.data.length; i++) {
        if (self.newData.data[i].id == id) {
          item = self.newData.data[i]
          break
        }
      }
    var eventInfo = []
    if (option.chartConfig.keys[0].col && option.chartConfig.keys[4].col) {
      eventInfo.push({
        col: option.chartConfig.keys[0].col,
        value: id
      }, {
        col: option.chartConfig.keys[4].col,
        value: item.text
      })
    }
    var params = {
      data: {
        eventInfo: eventInfo
      },
      name: ''
    }
    EventService.trigger('CE:click', {
      widget: self.widget,
      param: params
    })
    EventService.trigger('CE:drillDown', {
      widget: self.widget,
      param: params
    })
    gantt.render()
    return true
  })
  $('#' + ganttName).on('resize', function (e) {
    gantt.render()
  })

  gantt.render()
  return function (option) {
    var data = option.newList
    var newData = {
      data: [],
      links: []
    }
    var dataKeys = [
      'id',
      'text',
      'duration',
      'progress',
      'open',
      'parent',
      'state']

    if (data && _.isArray(data))
      for (var i = 0; i < data.length; i++) {
        var item = {}
        item.start_date = data[i].start_date.split('-').reverse().join('-')
        for (var j in dataKeys) {
          var key = dataKeys[j]
          item[key] = data[i][key]
        }
        item.duration = parseFloat(item.duration)
        item.progress = parseFloat(item.progress)
        if (item.parent == '-' || item.parent == '') {
          item.parent = undefined
        }
        newData.data.push(item)
      }
    this.newData = newData
    gantt.clearAll()
    gantt.parse(newData)
    // gantt.refreshData();
    // if (db) {
    gantt.render()
    // }
  }
}
CBoardGanttRender.prototype.setWidget = function (widget) {
  this.widget = widget
}
