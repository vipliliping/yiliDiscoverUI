/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
discovery.service('chartRadarService', function (EventService) {
    "ngInject";
    this.instance = null;

    this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
        this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList);
        return this.instance.chart(null, persist, EventService);
    };

    this.parseOption = function (_data) {
        var chartConfig = _data.chartConfig;
        var casted_keys = _data.keys;
        var casted_values = _data.series;
        var aggregate_data = _data.data;
        for (var i = 0; i < aggregate_data.length; i++) {
            for (var j = 0; j < aggregate_data[i].length; j++) {
                if (_.isUndefined(aggregate_data[i][j])) {
                    aggregate_data[i][j] = 0;
                }
            }
        }
        var string_keys = _.map(casted_keys, function (key) {
            return key.join('-');
        });
        var string_values = _.map(casted_values, function (value) {
            return value.join('-');
        });
        var data = [];
        var max;
        var indicator = [];
        if (chartConfig.asRow) {
            for (var i = 0; i < string_keys.length; i++) {
                var d = {value: [], name: string_keys[i]};
                for (var j = 0; j < casted_values.length; j++) {
                    d.value[j] = aggregate_data[j][i];
                    var n = Number(aggregate_data[j][i]);
                    if (_.isUndefined(max) || n > max) {
                        max = n;
                    }
                }
                var eventInfo = CBoardEChartRenderEventInfo(data, undefined, i);
                d.eventInfo = eventInfo;
                data.push(d);
            }
            for (var j = 0; j < casted_values.length; j++) {
                indicator.push({name: casted_values[j], max: max * 1.05});
            }
        } else {
            for (var i = 0; i < string_values.length; i++) {
                var d = {value: [], name: string_values[i]};
                for (var j = 0; j < string_keys.length; j++) {
                    d.value[j] = aggregate_data[i][j];
                    var n = Number(aggregate_data[i][j]);
                    if (_.isUndefined(max) || n > max) {
                        max = n;
                    }
                }
                var eventInfo = [];
                for (var k = 0; k < chartConfig.keys.length; k++) {
                    if (casted_keys[i])
                        eventInfo.push({
                            col: chartConfig.keys[k].col,
                            alias: chartConfig.keys[k].alias,
                            value: casted_keys[i][k]
                        })
                }
                d.eventInfo = eventInfo;
                data.push(d);
            }
            for (var j = 0; j < string_keys.length; j++) {
                indicator.push({name: string_keys[j], max: max * 1.05});
            }
        }


        var echartOption = {
            tooltip: {
                trigger: 'item'
            },
            toolbox: false,
            legend: {
                orient: 'vertical',
                left: 'left',
                data: chartConfig.asRow ? string_keys : string_values
            },
            radar: {
                name: {
                  textStyle: {
                      fontSize: 18
                  }
                },
                indicator: indicator
            },
            series: [{
                name: 'radar',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        areaStyle: {color: 'rgba(0,250,0,0.3)'}
                    }
                },
                data: data
            }]
        };

        updateEchartOptions(chartConfig.option, echartOption);

        return echartOption;
    };
});
