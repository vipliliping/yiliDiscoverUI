var CBoardFlex2Render = function (jqContainer, options) {
  this.container = jqContainer // jquery object
  this.options = options
}

CBoardFlex2Render.prototype.html = function (persist, scope, $compile) {
  var option = this.options
  var render = $compile(option.template)
  scope.list = option.data
  // scope.params = BoardParamService.getAll()
  scope.params = $$dlut_param
  var $scope = scope
  if (option.code) {
    try {
      var code = eval(option.code)
      if (typeof code !== 'undefined') {
        for (var key in code) {
          $scope[key] = code[key]
        }
      }
    } catch (error) {
      console.log('flex error', error)
    }
  }
  var html = render(scope)
  return html
}

CBoardFlex2Render.prototype.initialize = function (
  option, EventService, scope, uuid, $compile, BoardParamService) {
  var self = this;
  this.uuid = uuid;
  this.scope = scope;
  this.$compile = $compile;
  scope.EventService = EventService;
  this.scope.$$apply = scope.$apply;

  //点击事件
  scope.click = function (col, value) {
    EventService.trigger('CE:click', {
      widget: scope.widget,
      param: {
        data: {
          eventInfo: [{col: col, value: value}]
        }
      }
    })
    EventService.trigger('CE:drillDown', {
      widget: scope.widget,
      param: {
        data: {
          eventInfo: [{col: col, value: value}]
        }
      }
    })
  }

  //点击事件
  scope.clickMore = function (args) {
    var info = []
    for (var i = 0; i < args.length; i++) {
      info.push({col: args[i].col, value: args[i].value})
    }
    EventService.trigger('CE:click', {
      widget: scope.widget,
      param: {
        data: {
          eventInfo: info
        }
      }
    })
  }

  //三屏跳转
  scope.gotoScreen = function(target,params){
    if(typeof params === 'undefined')params = {}
    if(typeof target === 'undefined')return
    var eventParams = []
    for(var key in params){
      var value = params[key]
      eventParams.push({
        column:key,
        type:'=',
        values:typeof value === 'string'?[value]:value
      })
    }
    EventService.trigger("WS:screenSkip", {
      target:target,
      param:eventParams
    },'all')
  }

  //本页面过滤
  scope.filter = function(params){
    if(typeof params === 'undefined')params = {}
    var eventParams = []
    for(var key in params){
      var value = params[key]
      eventParams.push({
        column:key,
        type:'=',
        values:typeof value === 'string'?[value]:value
      })
    }
    EventService.trigger('CE:filter', eventParams)
  }

  this.draw(option, BoardParamService)
  return function (option) {
    self.draw(option, BoardParamService)
  }
}

CBoardFlex2Render.prototype.draw = function (option, BoardParamService) {
  if(this.scope.flex2_destroy){
    this.scope.flex2_destroy.apply(this.scope)
  }
  this.options = option
  var html = this.html(undefined, this.scope, this.$compile, BoardParamService)
  this.container.prop('id', 'flex_' + this.uuid)
  this.container.html(html)
  if(this.scope.flex2_created){
    this.scope.flex2_created.apply(this.scope)
  }
}
