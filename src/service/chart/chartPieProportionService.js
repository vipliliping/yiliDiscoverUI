/**
 * Created by yfyuan on 2017/03/03.
 */
'use strict';
discovery.service('chartPieProportionService', function (dataService, EventService) {
    "ngInject";
    this.instance = null;

    this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
        this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList);
        return this.instance.chart(null, persist, EventService);
    };

    this.parseOption = function (data) {
        var chartConfig = data.chartConfig;
        var chartConfigKeys = chartConfig.keys;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;

        var series = new Array();
        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var string_value = _.map(casted_values, function (value) {
            return value.join('-');
        });

        var b = 100 / (string_keys.length * 9 + 1);
        var titles = [];
        var dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                shadowBlur: 40,
                shadowColor: 'rgba(40, 40, 40, 0.5)'
            }
        };

        var placeHolderStyle = {
            normal: {
                // color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                // color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
            }
        };

        var colorList = ["#3dd4de", "#b697cd", "#a6f08f"];
        for (var i = 0; i < string_keys.length; i++) {
            var s = {
                name: string_keys[i],
                type: 'pie',
                clockWise: false,
                radius: [75, 85],
                xRadius: [75, 85],
                itemStyle: dataStyle,
                hoverAnimation: false,
                center: [5 * b + i * 9 * b + '%', '50%'],
                data: []
            };
            titles.push({
                textStyle: {
                    fontWeight: 'normal',
                    color: '#b697cd',
                    fontSize: 15
                },
                text: string_keys[i],
                x: 'center',
                y: 'center',
                left: 3 * b + i * 9 * b + '%',
                top: '90%'
            });
            // var eventInfo = CBoardEChartRenderEventInfo(data, i);
            var dataItem1 = {
                // eventInfo: eventInfo,
                name: string_keys[i],
                value: _.isUndefined(aggregate_data[0][i]) ? 0 : aggregate_data[0][i],
                label: {
                    normal: {
                        formatter: '{d}%',
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '25',
                            fontWeight: 'normal',
                            color: colorList[i % colorList.length]
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: colorList[i % colorList.length],
                        shadowColor: colorList[i % colorList.length],
                        shadowBlur: 10
                    },
                    emphasis: {
                        color: colorList[i % colorList.length],
                    }
                }
            };
            var dataItem2 = {
                // eventInfo: eventInfo,
                value: _.isUndefined(aggregate_data[1][i] - aggregate_data[0][i]) ? 0 : aggregate_data[1][i] - aggregate_data[0][i],
                name: 'invisible',
                itemStyle: placeHolderStyle
            };
            if (chartConfig.config && chartConfig.config.events.length > 0) {
                // dataItem.datasetId =
            }
            s.data.push(dataItem1);
            s.data.push(dataItem2);
            series.push(s);
        }


        var echartOption = {
            title: titles,
            tooltip: {
                show: false
            },
            toolbox: {
                show: false
            },
            // backgroundColor: 'rgba(0,0,0,0.8)',
            series: series
        };

        updateEchartOptions(chartConfig.option, echartOption);

        return echartOption;
    };
});
