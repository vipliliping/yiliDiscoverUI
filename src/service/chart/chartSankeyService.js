/**
 * Created by yfyuan on 2016/10/28.
 */
'use strict';
discovery.service('chartSankeyService', function (EventService) {
    "ngInject";
    this.instance = null;

    this.render = function (containerDom, option, scope, persist, drill, themeFunList) {
        this.instance = new CBoardEChartRender(containerDom, option, undefined, themeFunList);
        return this.instance.chart(null, persist, EventService);
    };

    this.parseOption = function (data) {
        var chartConfig = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;

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
        var echartOption = {
            color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            toolbox: false,
            series: [{
                type: 'sankey',
                layout: 'none',
                data: nodes,
                links: links,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#aaa'
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'source',
                        curveness: 0.5
                    }
                },
                label: {
                    normal: {
                        color: '#fff'
                    }
                }
            }]
        };

        var tunningOpt = chartConfig.option;
        if (tunningOpt) {
            if (tunningOpt.legendShow == false) {
                echartOption.grid = echartsBasicOption.grid;
                echartOption.grid.top = '5%';
                echartOption.legend.show = false;
            }
        }
        return echartOption;
    };
});
