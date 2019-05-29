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
        console.log(option);
        // option.textStyle = {
        //     color: "red",
        //     fontSize: 25
        // };
        return option;
    },
    "chartStyle1": function (option) {
        // console.log("option@", option);
        for (var i = 0; i < option.series.length; i++) {
            option.series[i].itemStyle = {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2ef9d5'},
                            {offset: 1, color: '#0e4f9f'}
                        ]
                    )
                },
            }
        }
        return option;
    },
    "chartStyle2A": function (option) {
        if (_.isArray(option.series)) {
            for (var i = 0; i < option.series.length; i++) {
                if (_.isArray(option.series[i].data) && option.series[i].data.length > 0) {
                    if (option.series[i].data[0].label && option.series[i].data[0].label.normal
                        && option.series[i].data[0].label.normal.textStyle) {
                        option.series[i].data[0].label.normal.textStyle.fontSize = 40;
                    }
                }
            }
        }
        return option;
    },
    /*"chartStyle2B": function (option) {
        var color = ["#dd3881", "#20b7b5"];
        if (_.isArray(option.series)) {
            for (var i = 0; i < option.series.length; i++) {
                if (_.isArray(option.series[i].data) && option.series[i].data.length > 0) {
                    for (var j = 0; j < option.series[i].data.length; j++) {
                        if (option.series[i].data[j].itemStyle && option.series[i].data[j].itemStyle.normal) {
                            option.series[i].data[j].itemStyle.normal.color = color[j];
                            option.series[i].data[j].itemStyle.normal.shadowColor = color[j];
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
    },*/
    "greenBlueBar": function (option) {
        // option.color = ["#2ef9d5","#0e4f9f"];
        // option.color = ["#6b56de","#1f6fcd"];
        option.color = ["#2ef9d5", "#dd3881"];
        // var series = option.series;
        // if (_.isArray(option.series)) {
        //     for (var i = 0; i < option.series.length; i++) {
        //
        //     }
        // }
        return option;
    },
    "noBackground": function (option) {
        // option.color = ["#2ef9d5","#0e4f9f"];
        // option.color = ["#6b56de","#1f6fcd"];
        option.color = ["#2ef9d5", "#dd3881"];
        // var series = option.series;
        // if (_.isArray(option.series)) {
        //     for (var i = 0; i < option.series.length; i++) {
        //
        //     }
        // }
        return option;
    },
    "blueColors": function (option) {
        option.color = ["#4f7789", "#59998d", "#70cbb9", "#ace8e6"]
        return option
    },
    "pinkColors": function (option) {
        option.color = ["#9d5b43", "#d97754", "#f2be96", "#8a7a3c"]
        return option
    },
    "oneSpecialColors": function (option) {
        option.color = ["#9acc99", "#cfffcd", "#6b9c43", "#ff9899"]
        return option
    },
    "fourColors": function (option) {
        option.color = ["#9acc99", "#ff9899", "#ce9a33", "#feff97"]
        return option
    }
};