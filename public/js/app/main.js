try {
    angular.module("templates-main");
} catch (err) {
    angular.module('templates-main', []);
}
angular.module(
    'ContentFuelApp',
    ['ngRoute', 'config', 'ui.bootstrap', 'ngSanitize', 'ngCookies', 'pascalprecht.translate', 'httpModule', 'angular-loading-bar', 'ngAnimate', 'duScroll', 'templates-main',
        'public'])

    .value('duScrollOffset', 50)

    .config(function ($translateProvider, $translatePartialLoaderProvider, $httpProvider, $logProvider, $tooltipProvider, ENV) {
        'use strict';
        $tooltipProvider.options({animation: false});
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'js/i18n/{part}/{lang}.json'
        });
        $translateProvider.useLoaderCache(ENV.useLoaderCache);
        $logProvider.debugEnabled(ENV.debugEnabled);
        $translateProvider.registerAvailableLanguageKeys(['fr', 'en', 'de'], {
            'fr_FR': 'fr',
            'en_US': 'en',
            'en_UK': 'en',
            'de_DE': 'de',
            'de_CH': 'de'
        });
        $translateProvider.determinePreferredLanguage();

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push('httpInterceptor');
    })
    .run(function ($rootScope, $translate) {
        'use strict';
        $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
            $translate.refresh();
        });
    });