window.chartOptionList = {
    "default": function(option){
        return option;
    },
    "pieOption": function (option) {
        option.textStyle = {
            color: "red",
            fontSize: 25
        };
        return option;
    },
    "lineStyleThick": function (option) {
        if ($.isArray(option.series)) {
            for (var i = 0; i < option.series.length; i++) {
                option.series[i].lineStyle = {
                    normal: {
                        width: 3
                    }
                }
            }
        }
        return option;
    },
    "noAxis": function (option) {
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
    },
    "chartColor01": function (option) {
        option.color = ["#2ef9d5", "#dd3881"];
        return option;
    },
    "chartBeiliColor01": function (option) {
        var color = ["#5bc0de", "#e5e5e5"];
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
    },
    "chartColor02": function (option) {
        option.color = ["#ff4c79"];
        return option;
    },
    "chartColor03": function (option) {
        option.color = ["#5bc0de"];
        return option;
    }
};