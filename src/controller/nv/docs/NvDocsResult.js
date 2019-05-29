'use strict';
discovery.controller('NvDocsResult', function ($scope, $stateParams, $http, $filter, $timeout) {
    "ngInject";
    $scope.test = "NvDocsResult";
    console.log($stateParams.id);
});
