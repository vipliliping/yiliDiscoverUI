discovery.service('chartCodeFlowerService', function (uuid4) {
    "ngInject";
    this.render = function (containerDom, option, scope, persist, drill) {
        containerDom.empty();
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
        // var option = chartDataProcess(data.chartConfig, data.keys, data.series, data.data, data.seriesConfig);
        // return option;
        return data
    };
    this.initCanvas = function (container, option, render) {
        html = '<div id="wrapper" style="position:relative">' +
            '<div id="info" style="opacity: 1;position:absolute;top:0;left:0;right:0">' +
            '<div><span id="name"></span><span id="segment">&nbsp;</span></div>' +
            '<div><span id="emissions"></span><span id="percent"></span></div>' +
            '<div id="tweet-box">' +
            '<i id="close" class="icon-remove"></i>' +
            '<div id="tweet-text"></div>' +
            '</div>';
        container.html(html);
        var height = container.height();
        var width = container.width();
        var div = d3.select(".d3_" + render.uuid)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
        return div
    };
    this.draw = function (container, option, render) {
        render.option = option;
        var div = this.initCanvas(container, option, render);
        var colorsList = option.data[1];
        var config = option.chartConfig;
        var style = config.values[0].style ? config.values[0].style : "random";
        if (style != "random" && style != "multi") option.color = [style];
        var depth = option.chartConfig.keys.length;
        var keys = option.keys;
        var values = option.data;
        for (var i in keys) keys[i].reverse();
        var datas = recursion(depth, depth, "", keys, values, style);

        var COLOR_LIST = [];
        for (var i = 10; i < 20; i++) {
            // COLOR_LIST.push("hsl(" + i * 19 + ",90%,70%)");
            COLOR_LIST.push(i * 19);
        }

        function getColor(i) {
            return COLOR_LIST[i % COLOR_LIST.length]
        }

        /*引用*/
        var height = container.height();
        var width = container.width();
        var radius = (height * 0.85) / 2,
            x = d3.scale.linear().range([0, 2 * Math.PI]),
            y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
            padding = 5,
            duration = 1000,
            centreDepth = 0;

        var vis = div
            .attr("width", width + padding * 2)
            .attr("height", height + padding * 2)
            .append("g")
            // .attr("transform", "translate(" + [width / 2, radius + padding] + ")");
            .attr("transform", "translate(" + [width / 2, height / 2] + ")");


        var partition = d3.layout.partition()
            .value(function (d) {
                return d.size;
            });

        var arc = d3.svg.arc()
            .startAngle(function (d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
            })
            .endAngle(function (d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
            })
            .innerRadius(function (d) {
                return Math.max(0, d.y ? y(d.y) : d.y);
            })
            .outerRadius(function (d) {
                return Math.max(0, y(d.y + d.dy));
            });

        var labelFits = function (d) {
            return x(d.x + d.dx) - x(d.x) > 0.05;
        };
        if (_.isArray(datas))
            for (var i = 0; i < datas.length; i++) {
                datas[i].color = getColor(i);
            }
        var nodes = partition.nodes({name: "", children: datas});
        var path = vis.selectAll("path").data(nodes);
        path.enter().append("path")
            .attr("id", function (d, i) {
                return "path-" + i;
            })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function (d) {
                return colors(d);
            })
            .on("click", function (d) {
                return d.depth < 4 ? click(d) : click(d.parent)
            })
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut);

        var text = vis.selectAll("text").data(nodes);
        var textEnter = text.enter().append("text")
            .style("fill-opacity", .1)
            .style("stroke", function (d) {
                return labelFits(d) ? "white" : "none";
            })
            .attr("text-anchor", function (d) {
                return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
            })
            .attr("dy", ".35em")
            .attr("transform", function (d) {
                var multiline = (d.name || "").split(" ").length > 1,
                    angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                    rotate = angle + (multiline ? -.5 : 0);
                return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate("
                    + (angle > 90 ? -180 : 0) + ")";
            });
        textEnter.append("tspan")
            .attr("x", 0)
            .text(function (d) {
                // Truncate text where necessary for neatness
                return d.name
                var firstLine = d.name.split(" ")[0];
                if (d.depth && firstLine.length > 13) {
                    return firstLine.substring(0, 12) + "…"
                } else if (d.depth) {
                    return firstLine;
                } else return ""
            });
        textEnter.append("tspan")
            .attr("x", 0)
            .attr("dy", "1.1em")
            .text(function (d) {
                return d.depth ? d.name.split(" ")[1] || "" : "";
            });

        // d3.select("svg")
        //     .append("circle")
        //     .attr("id","centre-label-background")
        //     .attr("cx",435)
        //     .attr("cy",435)
        //     .attr("r",19)
        //     .attr("fill","#333")
        //     .attr("pointer-events","none");
        // d3.select("svg")
        //     .append("text")
        //     .attr("id","centre-label")
        //     .text("All emissions")
        //     .attr("x",435)
        //     .attr("y",440)
        //     .attr("text-anchor","middle")
        //     .attr("pointer-events","none");

        function click(d) {
            path.transition()
                .duration(duration)
                .attrTween("d", arcTween(d))
                .each("end", function (d, i) {
                    // Once the scales have been updated by arcTween, update the
                    // fill style of the label depending on the size of the wedge
                    d3.select(text[0][i]).style("fill", function (d) {
                        return labelFits(d) ? "white" : "none";
                    });
                });

            // Somewhat of a hack as we rely on arcTween updating the scales.
            text.style("visibility", function (e) {
                return isParentOf(d, e) ? null : d3.select(this).style("visibility");
            })
                .transition()
                .duration(duration)
                .attrTween("text-anchor", function (d) {
                    return function () {
                        return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
                    };
                })
                .attrTween("transform", function (d) {
                    var multiline = (d.name || "").split(" ").length > 1;
                    return function () {
                        var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                            rotate = angle + (multiline ? -.5 : 0);
                        return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
                    };
                })
                .style("fill-opacity", function (e) {
                    return isParentOf(d, e) ? 1 : 1e-6;
                })
                .each("end", function (e) {
                    d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
                });

            // Fade headline, and adjust centre label, in/out depending on zoom
            // if (tweetBoxShowing) hideTweetBox();
            if (d.depth == 0) {
                d3.select("#splash").style("display", "block").transition().duration(750).delay(500).style("opacity", 1);
                d3.select("#centre-label").text("All emissions")
                    .style("font-family", "Guardian-Text-Egyp-Web-Reg-Latin").style("font-size", "12px");
            } else {
                d3.select("#splash").transition().duration(750).style("opacity", 0).each("end", function () {
                    d3.select(this).style("display", "none");
                });
                d3.select("#centre-label").text("\uF010").style("font-family", "FontAwesome").style("font-size", "18px");
                d3.select("#centre-label-background").transition().delay(750).style("fill", colors(d.parent))
                if (d.depth == 3) {
                    var emissions = Math.round(d.value * 100) / 100;
                    var percent = (d.parent ? Math.round(100 * 100 * emissions / d.parent.value) / 100 : '');
                    tweetText = d.name + " has caused " + percent + "% of manmade carbon emissions";
                    d3.select("#tweet-text").transition().delay(750).text("‘" + tweetText + "’");
                    showTweetBox();
                    // addTweetButton(tweetText);
                }
            }
        }

        d3.select("#close").on("click", function () {
            hideTweetBox();
        });

        function hideTweetBox() {
            d3.select("#tweet-box")
                .transition().duration(500)
                .style("opacity", 0)
                .each("end", function () {
                    d3.select(this).style("display", "none");
                });
            tweetBoxShowing = false;
        }

        function showTweetBox() {
            d3.select("#tweet-box")
                .style("display", "block")
                .transition().duration(500)
                .style("opacity", 1);
            tweetBoxShowing = true;
        }

        function mouseOver(d) {
            // return;
            displayDetails(d);
            if (d.depth < 4) d3.select(this).style("cursor", "pointer");
            var ancestorArray = getAncestors(d);
            d3.selectAll("path")
                .classed("highlighted-path", false);
            d3.selectAll("path")
                .filter(function (node) {
                    return ancestorArray.indexOf(node) >= 0;
                })
                .classed("highlighted-path", true);
            d3.select("#centre-label-background").classed("highlighted-path", true);
        }

        function displayDetails(d) {
            container.find("#info").show();
            container.find("#name").text(d.depth == 0 ? "总计" : d.name)
            var emissions = Math.round(d.value * 100) / 100;
            var percent = (d.parent ? Math.round(100 * 100 * emissions / d.parent.value) / 100 : '');
            container.find("#emissions").text(d.value != 0 ? "数值：" + emissions + "  " : " ");
            container.find("#percent").text(d.value != 0 ? "对" + d.parent.name + "占比：" + percent + "%" : "");
        }

        function mouseOut(d) {
            container.find("#info").hide();
            d3.selectAll(".highlighted-path").classed("highlighted-path", false)
        }


        function getAncestors(node) {
            var path = [];
            var current = node;
            while (current.parent) {
                path.unshift(current);
                current = current.parent;
            }
            path.unshift(current);
            return path;
        }

        function isParentOf(p, c) {
            if (p === c) return true;
            if (p.children) {
                return p.children.some(function (d) {
                    return isParentOf(d, c);
                });
            }
            return false;
        }

// Interpolate the scales!
        function arcTween(d) {
            var my = maxY(d),
                xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, my]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function (d) {
                return function (t) {
                    x.domain(xd(t));
                    y.domain(yd(t)).range(yr(t));
                    return arc(d);
                };
            };
        }

        function maxY(d) {
            return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
        }

        function colors(d) {
            var x = d, n = 0;
            while (x) {
                if (x.color) {
                    return "hsl(" + x.color + "," + (30 + n * 10) + "%," + (20 + n * 10) + "%)";
                }
                n++;
                x = x.parent;
            }
            return d.colors;
        }

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
        function brightness(rgb) {
            return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
        }
    };

    this.redraw = function (container, render) {
        this.draw(container, render.option, render);
    };

    /**
     * 递归
     */
    function recursion(depth, totalDepth, prefix, keys, values, style) {
        var map = getMap(depth, totalDepth, prefix, keys, values);
        var data = [];
        if (depth == totalDepth) {
            for (var k in map) {
                var obj = {
                    name: map[k].arr[depth - 1],
                    size: map[k].val,
                    children: recursion(depth - 1, totalDepth, map[k].key, keys, values)
                };
                if (style == "random") obj.itemStyle = createRandomItemStyle();
                data.push(obj);
            }
        } else if (depth > 1) {
            for (var k in map) {
                data.push({
                    name: map[k].arr[depth - 1],
                    size: map[k].val,
                    children: recursion(depth - 1, totalDepth, map[k].key, keys, values)
                });
            }
        } else if (depth == 1) {
            for (var k in map) {
                data.push({
                    name: map[k].arr[depth - 1],
                    size: map[k].val
                });
            }
        }
        return data;
    }

    function getMap(depth, totalDepth, prefix, keys, values) {
        var map = {};
        for (var i in keys) {
            var key = keys[i][depth - 1];
            if (totalDepth > depth) {
                var prefixs = "";
                for (var j = totalDepth; j > depth; j--) {
                    if (j == totalDepth)
                        prefixs = keys[i][j - 1];
                    else
                        prefixs = prefixs + "-" + keys[i][j - 1];
                }
                if (prefix != prefixs) continue;
                key = prefix + "-" + key;
            }
            var val = isNaN(values[0][i]) ? 0 : parseFloat(values[0][i]);
            if (map[key] == undefined) {
                map[key] = {key: key, val: val, arr: keys[i]};
            } else {
                map[key] = {key: key, val: map[key].val + val, arr: keys[i]};
            }
        }
        return map;
    }


    function createRandomItemStyle() {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')'
            }
        };
    }

});
