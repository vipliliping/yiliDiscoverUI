discovery.service('chartSimpleService', function (EventService) {
    "ngInject";
    this.option = {};
    this.instance = null;
    this.render = function (containerDom, option, scope, persist, drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight : null;
        this.instance = new CBoardD3Render(containerDom, option, this);
        return this.instance.chart(null, persist, EventService);
    };

    this.parseOption = function (data) {
        var option = chartDataProcess(data.chartConfig, data.keys, data.series, data.data, data.seriesConfig);
        return option;
    };
    this.initCanvas = function () {

    };
    this.draw = function (container, option) {
        this.option = option;
        $(container).text("hello d3")
    };

    this.redraw = function (container) {
        this.draw(container, this.option);
    }
});
