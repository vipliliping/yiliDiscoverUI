discovery.service('chartD3ChordService', function (uuid4) {
  "ngInject";
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

  this.parseOption = function (data) {
    var casted_keys = data.keys;
    var casted_values = data.series;
    var aggregate_data = data.data;

    var nodes = [];
    var string_keys = _.map(casted_keys, function (key) {
      var s = key.join('-');
      if (!_.find(nodes, function (e) {
        return e.name == s;
      })) {
        nodes.push({name: s});
      }
      return s;
    });
    _.each(casted_values, function (values) {
      if (values.length > 1) {
        values.splice(-1, 1);
      }
      var s = values.join('-');
      if (!_.find(nodes, function (e) {
        return e.name == s;
      })) {
        nodes.push({name: s});
      }
    });
    var links = [];
    for (var i = 0; i < aggregate_data.length; i++) {
      for (var j = 0; j < aggregate_data[i].length; j++) {
        if (!_.isUndefined(aggregate_data[i][j])) {
          var eventInfo = CBoardEChartRenderEventInfo(data, i, j);
          links.push({
            eventInfo: eventInfo,
            source: string_keys[j],
            target: casted_values[i].join('-'),
            value: aggregate_data[i][j]
          });
        }
      }
    }
    let nodeMap = {}
    for (let i in nodes) {
      nodeMap[nodes[i].name] = i
    }
    matrix = []
    for (let i in nodes) {
      let arr = createArrayWith(nodes.length, 0)
      for (let j in links) {
        if (nodes[i].name === links[j].source) {
          let num = nodeMap[links[j].target]
          arr[num] = parseInt(links[j].value)
        }
      }
      matrix.push(arr)
    }
    let result = {
      matrix: matrix,
      node: nodes
    }
    return result
  };
  this.initCanvas = function (container, option, render) {
    html = "<div>hello world</div>";
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
      .append('svg:svg')
      .attr('width', width)
      .attr('height', height)// 获取svg元素
    return div
  };
  this.draw = function (container, option, render) {
    render.option = option;
    var div = this.initCanvas(container, option, render);

    // var tip = tooltip.default()
    //   .attr('class', 'd3-tip')
    //   .offset([-5, 0])
    //   .html(function(d) {
    //     return '<strong>Frequency:</strong> <span style=color:red>' + d.frequency + '</span>'
    //   })

    var matrix = option.matrix
    // var matrix = [
    //   [11975, 5871, 8916, 2868],
    //   [1951, 10048, 2060, 6171],
    //   [8010, 16145, 8090, 8045],
    //   [1013, 990, 940, 6907]]
    var w = container.width(),
      h = container.height(),
      // r0 = Math.min(w, h) * .41,
      // r1 = r0 * 1.1;
      // 计算外半径尺寸，这里取svg画布的宽、高的最小值的一半，减去40，表示两边留有余地；
      outerRadius = Math.min(w, h) * 0.5 - 60
    // 计算内半径尺寸
    innerRadius = outerRadius - 10

    var chord = d3.layout.chord()
      .padding(.05)
      .sortSubgroups(d3.descending)
      .matrix(matrix)

    var fill = d3.scale.ordinal()
      .domain(d3.range(4))
      .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

    var svg = div.append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
    // 定义一个组元素

    var group = svg.append("svg:g")
      .selectAll("g")
      .data(chord.groups)
      .enter().append("svg:g")

    group.append("path")
      .data(chord.groups)
      .style("fill", function(d) { return fill(d.index); })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
      .on("mouseover", fade(.1, svg))
      .on("mouseout", fade(1, svg));

    group.append('text')
      .each(function(d, i) {
        d.angle = (d.startAngle + d.endAngle) / 2
        d.name = option.node[d.index].name
      })
      .attr('dy', '.35em')
      .attr('transform', function(d) {
        return 'rotate(' + (d.angle * 180 / Math.PI) + ')' +
          'translate(0,' + -1.0 * (outerRadius + 50) + ')' +
          ((d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) ? 'rotate(180)' : '')
      })
      .text(function(d) {
        return d.name
      })

    var ticks = svg.append("svg:g")
      .selectAll("g")
      .data(chord.groups)
      .enter().append("svg:g")
      .selectAll("g")
      .data(groupTicks)
      .enter().append("svg:g")
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius + ",0)";
      });

    ticks.append("svg:line")
      .attr("x1", 1)
      .attr("y1", 0)
      .attr("x2", 5)
      .attr("y2", 0)
      .style("stroke", "#000");

    ticks.append("svg:text")
      .attr("x", 8)
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) {
        return d.angle > Math.PI ? "end" : null;
      })
      .attr("transform", function(d) {
        return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
      })
      .text(function(d) {
        return d.label;
      });

    svg.append("svg:g")
      .attr("class", "chord")
      .selectAll("path")
      .data(chord.chords)
      .enter().append("svg:path")
      .style("fill", function(d) { return fill(d.target.index); })
      .attr("d", d3.svg.chord().radius(innerRadius))
      .style("opacity", 1)
      .on("mouseover", function(d){
        tooltip.text(option.node[d.source.index].name + '--' + option.node[d.target.index].name + ':' + d.source.value)
          // + ';' + option.node[d.target.index].name + '--' + option.node[d.source.index].name + ':' + d.target.value)
        return tooltip.style("visibility","visible");})
      .on("mousemove", function(d){
        tooltip.text(option.node[d.source.index].name + '--' + option.node[d.target.index].name + ':' + d.source.value)
          // + ';' + option.node[d.target.index].name + '--' + option.node[d.source.index].name + ':' + d.target.value)
        return tooltip.style("top",
        (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){
        return tooltip.style("visibility","hidden");});
  };

  this.redraw = function (container, render) {
    this.draw(container, render.option, render);
  };
});

const fade = function (opacity, svg, tooltip) {
  // tooltip.style("visibility","visible")
  return function(g, i) {
    svg.selectAll("g.chord path")
      .filter(function(d) {
        return d.source.index != i && d.target.index != i;
      })
      .transition()
      .style("opacity", opacity);
  };
}

const groupTicks = function (d) {
  var k = (d.endAngle - d.startAngle) / d.value;
  let scale = 20
  let num = 5
  if (d.value > 500) {
    scale = 50
  } else if (d.value > 1000) {
    scale = 100
  } else {

  }
  return d3.range(0, d.value, scale).map(function(v, i) {
    return {
      angle: v * k + d.startAngle,
      label: i % num ? null : v
    };
  });
}

const createArrayWith = function (length,value){
  return Array.apply(null,new Array(length)).map(function(){
    return value
  })
}

// const tooltip = d3.select("body")
//   . append("div")
//   . style("position","absolute")
//   . style("z-index","10")
//   . style("color","black")
//   . style("visibility","hidden")
//   . style("background-color","rgba(50, 50, 50, 0.7)")
//   . style("border-width","0px")
//   . style("color","rgb(255, 255, 255)")
//   . style("border-radius","4px")
//   . style("line-height","21px")
//   . style("padding","5px")
//   . text("");
