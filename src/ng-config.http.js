angular.module('discovery').factory('sessionHelper', [
  '$rootScope', '$q', function($rootScope, $q) {
    var sessionHelper = {
      responseError: function(response) {
        if (response.data.status == 2) {
          if ($rootScope.alert) {
              // $rootScope.alert('请求超时，请重新刷新页面')
             $rootScope.alert(response.data.msg)
          }
        }
        return $q.reject(response)
      }
    }
    return sessionHelper
  }])

angular.module('discovery').factory('baseUrlHelper', [
  '$q', 'globalConfig', function($q, globalConfig) {
    var baseUrlHelper = {
      request: function(config) {
        if (config.url.indexOf('http') !== 0
            && config.url.indexOf('.do') !== -1) {
          config.url = globalConfig.api.baseUrl + config.url
        }
        return config || $q.when(config)
      }
    }
    return baseUrlHelper
  }])

angular.module('discovery').config(function($httpProvider) {
  'ngInject'
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [
    function(data) {
      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */
      var param = function(obj) {
        var query = ''
        var name, value, fullSubName, subName, subValue, innerObj, i

        for (name in obj) {
          value = obj[name]

          if (value instanceof Array) {
            for (var i = 0; i < value.length; ++i) {
              subValue = value[i]
              fullSubName = name + '[' + i + ']'
              innerObj = {}
              innerObj[fullSubName] = subValue
              query += param(innerObj) + '&'
            }
          } else if (value instanceof Object) {
            for (subName in value) {
              subValue = value[subName]
              fullSubName = name + '[' + subName + ']'
              innerObj = {}
              innerObj[fullSubName] = subValue
              query += param(innerObj) + '&'
            }
          } else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '='
                + encodeURIComponent(value) + '&'
          }
        }

        return query.length ? query.substr(0, query.length - 1) : query
      }

      return angular.isObject(data) && String(data) !== '[object File]'
          ? param(data)
          : data
    }]
  $httpProvider.interceptors.push('baseUrlHelper')
  $httpProvider.interceptors.push('sessionHelper')

})
