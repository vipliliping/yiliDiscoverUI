/**
 * Created by yfyuan on 2016/8/26.
 */

discovery.service('ModalUtils', function ($uibModal, $filter) {
    "ngInject";

    var translate = $filter('translate');

    this.alert = function (content, style, size, callback) {
        $uibModal.open({
            templateUrl: 'src/view/util/modal/alert.html',
            windowTemplateUrl: 'src/view/util/modal/windowPreview.html',
            backdrop: false,
            windowClass: style,
            size: size,
            controller: function ($scope, $uibModalInstance) {
                "ngInject";
                content ? $scope.content = content : $scope.content = translate('CONFIG.DASHBOARD.DASHBOARD_SOMETHING_WRONG');
                $scope.ok = function () {
                    $uibModalInstance.close();
                    if (callback) {
                        callback();
                    }
                };
            }
        });
    };

    this.confirm = function (content, style, size, ok, close) {
        $uibModal.open({
            templateUrl: 'src/view/util/modal/confirm.html',
            windowTemplateUrl: 'src/view/util/modal/windowPreview.html',
            backdrop: false,
            windowClass: style,
            size: size,
            controller: function ($scope, $uibModalInstance) {
                "ngInject";
                content ? $scope.content = content : $scope.content = translate('CONFIG.DASHBOARD.DASHBOARD_SOMETHING_WRONG');
                $scope.ok = function () {
                    $uibModalInstance.close();
                    if (ok) {
                        ok();
                    }
                };
                $scope.close = function () {
                    $uibModalInstance.close();
                    if (close) {
                        close();
                    }
                };
            }
        });
    };

});
