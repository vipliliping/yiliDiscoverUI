var CBoardD3Render = function (jqContainer, options, service, uuid) {
    this.container = jqContainer; // jquery object
    this.options = options;
    this.service = service;
    this.uuid = uuid;
    var _this = this;
    $(this.container).resize(function (e) {
        _this.resize(e.target);
    });
};

CBoardD3Render.prototype.resize = function (container) {
    this.service.redraw($(container), this);
};

CBoardD3Render.prototype.chart = function (tall, persist) {
    this.service.draw(this.container, this.options, this);
    return function (o, drillConfig) {
    }
};