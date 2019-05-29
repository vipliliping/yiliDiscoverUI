'use strict';
discovery.service('chartFlexD3ChartService', function (uuid4) {
  "ngInject";
  this.instance = null;

  this.render = function (containerDom, option, scope, persist, drill) {
    if (option == null) {
      containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
      return;
    }
    var height;
    scope ? height = scope.myheight : null;
    var uuid = uuid4.generate();
    containerDom.addClass("d3_" + uuid);//jquery
    return new CBoardD3Render(containerDom, option, this, uuid).chart(null, persist);
  };

  this.initCanvas = function (container, option, render) {
    var html = "<div>hello world</div>";
    html = "<div id=\"wrapper\">\n" +
      "\t\t<div id=\"info\" style=\"opacity: 1;\">\n" +
      "\t\t\t\t<div><span id=\"name\"></span><span id=\"segment\">&nbsp;</span></div>\n" +
      "\t\t\t\t<div><span id=\"emissions\"></span><span id=\"percent\"></span></div>\n" +
      "\t\t<div id=\"tweet-box\">\n" +
      "\t\t\t<i id=\"close\" class=\"icon-remove\"></i>\n" +
      "\t\t\t<div id=\"tweet-text\"></div>\n" +
      "\t\t</div>\t\t\n"
    container.html(html);
    var height = container.height();
    var width = container.width();
    var div = d3.select(".d3_" + render.uuid)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("left", 200);
    return div
  };

  this.draw = function (container, data, render) {
    render.option = data;
    var div = this.initCanvas(container, data, render);
    var newList = [];
    if (!_.isUndefined(data.chartConfig.option.flex)) {
      //1. keyList
      var keyNameList = [];
      for (var i = 0; i < data.chartConfig.keys.length; i++) {
        keyNameList.push(data.chartConfig.keys[i].col)
      }
      //2. keys
      for (var i = 0; i < data.keys.length; i++) {
        var obj = {};
        for (var j = 0; j < keyNameList.length; j++) {
          obj[keyNameList[j]] = data.keys[i][j];
        }
        newList.push(obj)
      }
      //3. values
      for (var i = 0; i < data.series.length; i++) {
        for (var j = 0; j < data.keys.length; j++) {
          var valueName = data.series[i][0];
          var valueData = data.data[i];
          newList[j][valueName] = valueData[j];
        }
      }
    }
    var echartOption = {};
    try {
      var draw;
      var flexD3Chart = eval(data.chartConfig.option.flex);
      if (_.isFunction(flexD3Chart))
        flexD3Chart(d3, div, newList, data);
      //event
      //eventInfo end
      // delete(window.flexD3Chart);
    } catch (e) {
      console.error('chartFlexD3ChartService:function-this.draw,row-39,eval(data.chartConfig.option.flex)执行错误', e);
    }
  }

  this.redraw = function (container, render) {
    this.draw(container, render.option, render);
  };

  this.parseOption = function (data, scope) {
    // var chartConfig = data.chartConfig;
    //
    return data;
  };
});
