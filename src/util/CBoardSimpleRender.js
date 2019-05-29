var CBoardD3Render = function (jqContainer, options, service) {
    this.container = jqContainer; // jquery object
    this.options = options;
    this.service = service;
    var _this = this;
    $(this.container).resize(function (e) {
        _this.resize(e.target);
    });
};

CBoardD3Render.prototype.resize = function (container) {
    this.service.redraw(container);
};

CBoardD3Render.prototype.chart = function (tall, persist) {
    this.service.draw(this.container, this.options);
    return function (o, drillConfig) {
    }
};