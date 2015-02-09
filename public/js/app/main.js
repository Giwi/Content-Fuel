try {
    angular.module("templates-main");
} catch (err) {
    angular.module('templates-main', []);
}
angular.module(
    'ContentFuelApp',
    ['ngRoute', 'tmh.dynamicLocale', 'config', 'ui.bootstrap', 'ngSanitize', 'ngCookies', 'dialogs.main', 'pascalprecht.translate', 'contentfuel.httpModule', 'angular-loading-bar', 'ngAnimate', 'duScroll', 'templates-main',
       'ngTable', 'contentfuel.commonsDirectives','contentfuel.common-config','contentfuel.headerMenu', 'contentfuel.eventbus', 'contentfuel.public', 'contentfuel.private'])

    .value('duScrollOffset', 50)

    .config(function ($translateProvider, $translatePartialLoaderProvider, $httpProvider, $logProvider, $tooltipProvider, ENV, dialogsProvider, tmhDynamicLocaleProvider) {
        'use strict';
        $tooltipProvider.options({animation: false});
        tmhDynamicLocaleProvider.localeLocationPattern('lib/angular-i18n/angular-locale_{{locale}}.js');
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

        dialogsProvider.useEscClose(true);
        dialogsProvider.useCopy(false);


        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    })
    .run(function ($rootScope, $translate, $http) {
        'use strict';
        $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
            $translate.refresh();
        });
        $rootScope.message = '';
        $rootScope.logout = function () {
            $rootScope.message = 'Logged out.';
            $http.post('/logout');
        };
    });