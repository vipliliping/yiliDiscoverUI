var CBoardFlexRender = function (jqContainer, options) {
    this.container = jqContainer; // jquery object
    this.options = options;
};

CBoardFlexRender.prototype.html = function (persist) {
    var option = this.options;
    var render = template.compile(option.template);
    var html = render({
        list: option.data
    });
    return html;
};

CBoardFlexRender.prototype.initialize = function (option, EventService, scope, uuid) {
    var self = this;
    this.uuid = uuid;
    this.draw(option);
    return function (option) {
        self.draw(option);
    }
};

CBoardFlexRender.prototype.draw = function (option) {
    this.options = option;
    var html = this.html();
    this.container.prop("id", "flex_" + this.uuid);
    this.container.html(html);
};