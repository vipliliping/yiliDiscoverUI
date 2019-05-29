window.chartOptionList = {
    "colors": {
        "1-2": ["rgba(36, 137, 176, 0.7)", "rgba(154, 188, 193, 0.7)"],
        "3-5": ["rgba(36, 137, 176, 0.7)", "rgba(91, 192, 222, 0.7)", "rgba(167, 206, 218, 0.7)",
            "rgba(145, 156, 159, 0.7)", "rgba(194, 206, 209, 0.7)"],
        "6+": ["rgba(0, 101, 145, 0.7)", "rgba(36, 137, 176, 0.7)", "rgba(14, 158, 196, 0.7)",
            "rgba(91, 192, 222, 0.7)", "rgba(131, 208, 226, 0.7)", "rgba(167, 206, 218, 0.7)",
            "rgba(131, 176, 186, 0.7)", "rgba(145, 156, 159, 0.7)", "rgba(175, 178, 178, 0.7)",
            "rgba(194, 206, 209, 0.7)"]
    },
    "default": function (option) {
        /*柱图值为0时不显示*/
        /*for (var i = 0; i < option.series.length; i++) {
            if (option.series[i].type == "bar") {
                for (var j = 0; j < option.series[i].data.length; j++) {
                    if (option.series[i].data[j].value == 0) {
                        option.series[i].data[j].value = null
                    }
                }
            }
        }*/

        var types = [], type;
        for (var i = 0; i < option.series.length; i++) {
            types.push(option.series[i].type);
        }

        if (_.uniq(types).length === 1) {
            type = _.uniq(types)[0];
            if (type == 'pie') {
                option.color = rtnColors(option.series[0].data);
            } else if (type == 'bar' || type == 'line') {
                option.color = rtnColors(option.series);
            }
        } else {
            option.color = rtnColors(option.series);
        }

        function rtnColors(data) {
            var len = data.length;
            if (len > 0 && len <= 2) {
                return chartOptionList.colors['1-2']
            } else if (len > 2 && len <= 5) {
                return chartOptionList.colors['3-5']
            } else if (len > 5) {
                return chartOptionList.colors['6+']
            }
        }

        return option;
    },
    /*隐藏折线*/
    "chartLineStyle01": function (option) {
        if (_.isArray(option.series)) {
            for (var i = 0; i < option.series.length; i++) {
                if (option.series[i].type == "line") {
                    option.series[i].lineStyle = {
                        normal: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                }
            }
        }
        return option;
    },
    /*隐藏值轴*/
    "chartNoneValueAxis": function (option) {
        if (_.isArray(option.xAxis)) {
            for (var i = 0; i < option.xAxis.length; i++) {
                if (option.xAxis[i].type == "value") {
                    option.xAxis[i].axisLabel.textStyle =
                        {
                            color: 'rgba(0,0,0,0)'
                        }
                }
            }
            return option;
        } else {
            if (option.xAxis.type == "value") {
                option.xAxis.axisLabel.textStyle =
                    {
                        color: 'rgba(0,0,0,0)'
                    }
            }
            return option;
        }
    },
    "maximize": function (option) {
        /*轴字号*/
        var textstyle = {
            fontSize: 28
        };
        var axis = {
            axisLabel: {
                textStyle: {
                    fontSize: 28
                }
            }
        };
        option.textStyle = _.extend(option.textStyle, textstyle);
        if (_.isArray(option.xAxis)) {
            for (var i = 0; i < option.xAxis.length; i++) {
                option.xAxis[i] = _.extend(option.xAxis[i], axis);
            }
        } else {
            option.xAxis = _.extend(option.xAxis, axis);
        }
        if (_.isArray(option.yAxis)) {
            for (var i = 0; i < option.yAxis.length; i++) {
                option.yAxis[i] = _.extend(option.yAxis[i], axis);
            }
        } else {
            option.yAxis = _.extend(option.yAxis, axis);
        }

        /*label字号*/
        var series = {
            label: {
                normal: {
                    show: true,
                    // position: 'inside',
                    textStyle: {
                        fontSize: 28
                    }
                }
            },
        };
        if (_.isArray(option.series)) {
            for (var i = 0; i < option.series.length; i++) {
                option.series[i] = _.extend(option.series[i], series);
            }
        } else {
            option.series = _.extend(option.series, series);
        }

        /*legend字号*/
        var legend = {
            textStyle: {
                fontSize: 28
            }
        };
        option.legend = _.extend(option.legend, legend);

        /*tooltip字号*/
        var tooltip = {
            textStyle: {
                fontSize: 28
            }
        };
        option.tooltip = _.extend(option.tooltip, tooltip);
        return option;
    }

    ,
    "pieOption":

        function (option) {
            option.textStyle = {
                color: "red",
                fontSize: 25
            };
            return option;
        }

    ,
    "noAxis":

        function (option) {
            function setSplitLineFalse(axis) {
                axis.splitLine = {
                    show: false
                }
            }

            function setAxisSplitLineFalse(axis) {
                if (axis) {
                    if ($.isArray(axis)) {
                        for (var i = 0; i < axis.length; i++) {
                            setSplitLineFalse(axis[i]);
                        }
                    } else {
                        setSplitLineFalse(axis);
                    }
                }
            }

            setAxisSplitLineFalse(option.xAxis);
            setAxisSplitLineFalse(option.yAxis);
            setAxisSplitLineFalse(option.radiusAxis);
            setAxisSplitLineFalse(option.angleAxis);
            // option.textStyle = {
            //     color: "red",
            //     fontSize: 25
            // };
            return option;
        }

    ,
    "chartAloneColor00":

        function (option) {
            option.color = ["rgba(60, 191, 184, 0.9)"];
            return option;
        }

    ,
    "chartAloneColor01":

        function (option) {
            option.color = ["rgba(9, 173, 173, 0.9)"];
            return option;
        }

    ,
    "chartAloneColor02":

        function (option) {
            option.color = ["rgba(17, 153, 163, 0.9)"];
            return option;
        }

    ,
    "chartAloneColor03":

        function (option) {
            option.color = ["rgba(8, 132, 128, 0.9)"];
            return option;
        }

    ,
    "chartAloneColor04":

        function (option) {
            option.color = ["rgba(1, 114, 111, 0.9)"];
            return option;
        }

    ,
    "chartAloneColor05":

        function (option) {
            option.color = ["rgba(15, 96, 96, 0.9)"];
            return option;
        }

    ,
    "chartDoubleColor00":

        function (option) {
            var color = ["rgba(36, 137, 176, 0.7)", "rgba(36, 137, 176, 0.2)"];
            if (_.isArray(option.series)) {
                for (var i = 0; i < option.series.length; i++) {
                    if (_.isArray(option.series[i].data) && option.series[i].data.length > 0) {
                        for (var j = 0; j < option.series[i].data.length; j++) {
                            if (option.series[i].data[j].itemStyle && option.series[i].data[j].itemStyle.normal) {
                                option.series[i].data[j].itemStyle.normal.color = color[j];
                                option.series[i].data[j].itemStyle.normal.shadowColor = color[j];
                                option.series[i].data[j].itemStyle.emphasis.color = color[j];
                                option.series[i].data[j].itemStyle.emphasis.shadowColor = color[j];
                            }
                            if (option.series[i].data[j].label && option.series[i].data[j].label.normal
                                && option.series[i].data[j].label.normal.textStyle) {
                                option.series[i].data[j].label.normal.textStyle.color = color[j];
                            }
                        }
                    }
                }
            }
            return option;
        }

    ,
    "chartColor01":

        function (option) {
            option.color = chartOptionList.colors["1-2"];
            return option;
        }

    ,
    "chartColor00":

        function (option) {
            option.color = chartOptionList.colors["3-5"];
            return option;
        }

    ,
    "chartColor02":

        function (option) {
            option.color = chartOptionList.colors["6+"];
            return option;
        }

    ,
    "chartColor03":

        function (option) {
            var color = chartOptionList.colors["6+"];
            if (_.isArray(option.series)) {
                for (var i = 0; i < option.series.length; i++) {
                    var series = option.series[i];
                    if (_.isArray(series.data)) {
                        for (var j = 0; j < series.data.length; j++) {
                            series.data[j].itemStyle = {
                                normal: {
                                    color: color[j % 6]
                                }
                            }
                        }
                    }

                }
            }
            return option;
        }

    ,
    "chartTreemapColor":

        function (option) {
            var colors = chartOptionList.colors["6+"];
            var s = option.series;
            if (_.isArray(s)) {
                if (_.isArray(s[0].data)) {
                    for (var i = 0; i < s[0].data.length; i++) {
                        s[0].data[i].itemStyle.normal.color = colors[i % 6]
                    }
                }
            }

            return option;
        }

    ,
    "chartAxisStyle01":

        function (option) {
            var axis = {
                axisLine: {
                    lineStyle: {
                        color: ''
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: ''
                    }
                }
            };
            if (_.isArray(option.xAxis)) {
                for (var i = 0; i < option.xAxis.length; i++) {
                    option.xAxis[i] = $.extend(true, {}, option.xAxis[i], axis);
                    option.yAxis = $.extend(true, {}, option.yAxis, axis);

                    option.xAxis[i].axisLine.lineStyle.color = 'rgba(255, 255, 255, 0.6)';
                    option.xAxis[i].axisLabel.textStyle.color = 'rgba(255, 255, 255, 0.6)';
                    option.yAxis.axisLine.lineStyle.color = 'rgba(255, 255, 255, 0.6)';
                    option.yAxis.axisLabel.textStyle.color = 'rgba(255, 255, 255, 0.6)';
                }
            }
            if (_.isArray(option.yAxis)) {
                for (var i = 0; i < option.yAxis.length; i++) {
                    option.xAxis = $.extend(true, {}, option.xAxis, axis);
                    option.yAxis[i] = $.extend(true, {}, option.yAxis[i], axis);

                    option.yAxis[i].axisLine.lineStyle.color = 'rgba(255, 255, 255, 0.6)';
                    option.yAxis[i].axisLabel.textStyle.color = 'rgba(255, 255, 255, 0.6)';
                    option.xAxis.axisLine.lineStyle.color = 'rgba(255, 255, 255, 0.6)';
                    option.xAxis.axisLabel.textStyle.color = 'rgba(255, 255, 255, 0.6)';
                }
            }
            return option;
        }

    ,
    "chartColor04":

        function (option) {
            var color = ["rgba(60, 191, 184, 0.9)",
                "rgba(9, 173, 173, 0.9)",
                "rgba(17, 153, 163, 0.9)",
                "rgba(8, 132, 128, 0.9)",
                "rgba(1, 114, 111, 0.9)",
                "rgba(15, 96, 96, 0.9)"];
            if (_.isArray(option.series)) {
                for (var i = 0; i < option.series.length; i++) {
                    var series = option.series[i];
                    if (_.isArray(series.data)) {
                        for (var j = 0; j < series.data.length; j++) {
                            series.data[j].itemStyle = {
                                normal: {
                                    color: color[j % 6]
                                }
                            }
                        }
                    }

                }
            }
            return option;
        }

    ,
    "chartBeiliColor01":

        function (option) {
            var color = ["#2489b0", "#5bc0de", "#a7ceda", "#919c9f", "#c2ced1"];
            if (_.isArray(option.series)) {
                for (var i = 0; i < option.series.length; i++) {
                    if (_.isArray(option.series[i].data) && option.series[i].data.length > 0) {
                        for (var j = 0; j < option.series[i].data.length; j++) {
                            if (option.series[i].data[j].itemStyle && option.series[i].data[j].itemStyle.normal) {
                                option.series[i].data[j].itemStyle.normal.color = color[j];
                                option.series[i].data[j].itemStyle.normal.shadowColor = color[j];
                                option.series[i].data[j].itemStyle.emphasis.color = color[j];
                                option.series[i].data[j].itemStyle.emphasis.shadowColor = color[j];
                            }
                            if (option.series[i].data[j].label && option.series[i].data[j].label.normal
                                && option.series[i].data[j].label.normal.textStyle) {
                                option.series[i].data[j].label.normal.textStyle.color = color[j];
                            }
                        }
                    }
                }
            }
            return option;
        }

    ,
    "chartLineColor00":

        function (option) {
            option.color = ["rgba(36, 137, 176, 1)", "rgba(91, 192, 222, 1)", "rgba(167, 206, 218, 1)",
                "rgba(145, 156, 159, 1)", "rgba(194, 206, 209, 1)"];
            return option;
        }

    ,
    "chartLineOnlyColor01":

        function (option) {//单线条显示面积图
            if (_.isArray(option.series)) {
                for (var i = 0; i < option.series.length; i++) {
                    option.series[i].areaStyle = {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    }
                }
            }
            return option;
        }

    ,
    "chartCategoryFontSize00":

        function (option) {//设置类轴字号
            if (!_.isArray(option.xAxis)) {
                option.xAxis.axisLabel.textStyle = {
                    fontSize: 8
                }
            }
            if (!_.isArray(option.yAxis)) {
                option.yAxis.axisLabel.textStyle = {
                    fontSize: 8
                }
            }
            return option;
        }

    ,
    "chartCategoryFontSize01":

        function (option) {//设置类轴字号
            if (!_.isArray(option.xAxis)) {
                option.xAxis.axisLabel.textStyle = {
                    fontSize: 12
                }
            }
            if (!_.isArray(option.yAxis)) {
                option.yAxis.axisLabel.textStyle = {
                    fontSize: 12
                }
            }
            return option;
        }

    ,
    "chartCategoryFontSize02":

        function (option) {//设置类轴字号
            if (!_.isArray(option.xAxis)) {
                option.xAxis.axisLabel.textStyle = {
                    fontSize: 14
                }
            }
            if (!_.isArray(option.yAxis)) {
                option.yAxis.axisLabel.textStyle = {
                    fontSize: 14
                }
            }
            return option;
        }

    ,
    "chartCategoryFontSize03":

        function (option) {//设置类轴字号
            if (!_.isArray(option.xAxis)) {
                option.xAxis.axisLabel.textStyle = {
                    fontSize: 16
                }
            }
            if (!_.isArray(option.yAxis)) {
                option.yAxis.axisLabel.textStyle = {
                    fontSize: 16
                }
            }
            return option;
        }

    ,
    "chartCategoryFontSize04":

        function (option) {//设置类轴字号
            if (!_.isArray(option.xAxis)) {
                option.xAxis.axisLabel.textStyle = {
                    fontSize: 18
                }
            }
            if (!_.isArray(option.yAxis)) {
                option.yAxis.axisLabel.textStyle = {
                    fontSize: 18
                }
            }
            return option;
        }

    ,
    "chartPieColor":

        function (option) {
            var data = option.series[0].data;

            data.sort(function (a, b) {
                return a.value - b.value
            });
            data.reverse();

            var dataMax = _.first(data, 5);
            data.splice(0, 5);

            var v = 0, e = [], col = '';
            for (var i = 0; i < data.length; i++) {
                v += parseInt(data[i].value);
                e.push(data[i].eventInfo[0].value);
                col = data[i].eventInfo[0].col;
            }
            var dataOther = {
                eventInfo: [{
                    col: col,
                    value: e
                }],
                name: '其他',
                value: v
            };

            dataMax.push(dataOther);

            option.series[0].data = dataMax;
            var legend = [];
            for (var i = 0; i < dataMax.length; i++) {
                legend.push(dataMax[i].name);
            }
            option.legend.data = legend;
            option.color = chartOptionList.colors['3-5'];

            return option;
        }

    ,
    "noAxisLine":

        function (option) {
            if (_.isArray(option.xAxis)) {
                for (var i = 0; i < option.xAxis.length; i++) {
                    option.xAxis[i].axisLine = {
                        show: false
                    };
                    option.xAxis[i].axisTick = {
                        show: false
                    };
                    option.xAxis[i].splitLine = {
                        show: false
                    };
                    option.xAxis[i].axisLabel = {
                        show: false
                    }
                }
            } else {
                option.xAxis.axisLine = {
                    show: false
                };
                option.xAxis.axisTick = {
                    show: false
                };
                option.xAxis.splitLine = {
                    show: false
                };
            }
            if (_.isArray(option.yAxis)) {
                for (var i = 0; i < option.yAxis.length; i++) {
                    option.yAxis[i].axisLine = {
                        show: false
                    };
                    option.yAxis[i].axisTick = {
                        show: false
                    };
                    option.yAxis[i].splitLine = {
                        show: false
                    };
                }
            } else {
                option.yAxis.axisLine = {
                    show: false
                };
                option.yAxis.axisTick = {
                    show: false
                };
                option.yAxis.splitLine = {
                    show: false
                };
            }
            return option;
        }

    ,
    "chartLineIntactRate":

        function (option) {
            if (option.series && option.series.length == 1) {
                var value = 0, name = "", axisName = "";
                if (option.xAxis && option.xAxis.type == "category") {
                    axisName = "yAxis";
                    name = option.xAxis.data.shift();
                }
                if (option.yAxis && option.yAxis.type == "category") {
                    axisName = "xAxis";
                    name = option.yAxis.data.shift();
                }
                for (var i = 0; i < option.series.length; i++) {
                    var dataList = option.series[i].data;
                    value = dataList.shift();
                    var markLinePoint = {
                        name: name
                        // yAxis: 100
                    };
                    markLinePoint[axisName] = value.value;
                    option.series[i].markLine = {
                        symbol: ['none', 'none'],
                        data: [markLinePoint],
                        label: {
                            normal: {
                                formatter: function () {
                                    return name
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                type: "solid",
                                width: 4,
                                color: "white"
                            }
                        }
                    }
                    // option.series[i].data = dataList;
                }
            }
            return option;
        }

    ,
    "chartLineNodeDisplay":

        function (option) {
            for (var i = 0; i < option.series.length; i++) {
                if (option.series[i].type == 'line') {
                    option.series[i].symbolSize = 0;
                }
            }
            return option;
        }

    ,
    "chartDeleteAxis":

        function (option) {
            var x = option.xAxis,
                y = option.yAxis;

            if (!_.isUndefined(x)) {
                if (x.length >= 2) {
                    option.xAxis = x[0];
                }
            }

            if (!_.isUndefined(y)) {
                if (y.length >= 2) {
                    option.yAxis = y[0];
                }
            }

            for (var i = 0; i < option.series.length; i++) {
                var s = option.series[i];
                delete s.xAxisIndex;
                delete s.yAxisIndex;
            }

            return option;
        }
};