angular.module('discovery').config(function ($translateProvider, $translatePartialLoaderProvider) {
  'ngInject'
  // $translatePartialLoaderProvider.addPart('cboard')
  // $translateProvider.useLoader('$translatePartialLoader', {
  //   urlTemplate: 'i18n/{lang}/{part}.json'
  // })
  $translateProvider.translations('cn', CB_I18N)

  $translateProvider.preferredLanguage(settings.preferredLanguage)
})

angular.module('discovery').filter('trustAsResourceUrl', [
  '$sce', function ($sce) {
    'ngInject'
    return function (val) {
      return $sce.trustAsResourceUrl(val)
    }
  }])
