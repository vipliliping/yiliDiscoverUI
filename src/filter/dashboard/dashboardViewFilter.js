/**
 * Created by zyong on 2017/4/28.
 */
discovery.filter('hasBoards', function () {
    "ngInject";
    return function (category, boardlist) {
        if (boardlist == undefined) return boardlist;
        var cids = boardlist.map(function (b) {
            return b.categoryId;
        });
        var result = _.filter(category, function (c) {
            return _.contains(cids, c.id);
        });
        return result;
    };
});

discovery.filter('hasCategoryId', function () {
    "ngInject";
    return function (boardlist) {
        var result = [];
        if(!_.isUndefined(boardlist)){
            for (var i = 0; i < boardlist.length; i++) {
                if (boardlist[i].categoryId == null) {
                    result.push(boardlist[i]);
                }
            }
        }
        return result;
    };
});
