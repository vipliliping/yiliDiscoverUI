discovery.service('updateService', function () {
    "ngInject";
    this.updateConfig = function (config) {
        var toFilterConfig = function (e) {
            if (_.isString(e)) {
                return {col: e, type: 'eq', values: []};
            }
            return e;
        };
        config.keys = _.map(config.keys, toFilterConfig);
        config.groups = _.map(config.groups, toFilterConfig);
        if (!config.filters) {
            config.filters = [];
        }

        if (!config.events) {
            config.events = [];
        }

        switch (config.chart_type) {
            case 'pie':
                //the new pie
                if (!config.groups) {
                    config.groups = [];
                }
                break;
            case 'line':
                if (!config.valueAxis) {
                    config.valueAxis = 'vertical';
                }
                break;
        }
    };

    this.updateBoard = function (board) {
        if (board.layout === undefined) return;
        _.each(board.layout.rows, function (row) {
            if (!row.type) {
                row.type = 'widget';
            }
        });
    };
});
