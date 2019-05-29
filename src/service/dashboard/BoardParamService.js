/**
 * Created by xxx on 2018/9/29.
 */

discovery.service('BoardParamService', function ($http) {
  'ngInject'

  window.$$dlut_param = {}

  this.get = function (key, callback) {
    if (typeof callback == 'function') {
      callback(window.$$dlut_param[key])
    }
    return window.$$dlut_param[key]
  }

  this.set = function (key, value) {
    if (_.isUndefined(window.$$dlut_param[key])) {
      window.$$dlut_param[key] = {}
    }
    window.$$dlut_param[key] = value
  }

  this.getAll = function () {
    return window.$$dlut_param
  }

  this.remove = function (key) {
    delete window.$$dlut_param[key]
  }

  this.clear = function () {
    window.$$dlut_param = {}
  }

})
