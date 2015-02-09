/**
 *
 * @class contentfuel.httpModule
 * @author Giwi
 * @copyright <b>Giwi</b>.
 * @requires {@link https://github.com/chieffancypants/angular-loading-bar|chieffancypants.loadingBar}
 * @requires {@link https://docs.angularjs.org/api/ngAnimate|ngAnimate}
 */
angular.module('contentfuel.httpModule', ['angular-loading-bar', 'ngAnimate', 'contentfuel.authAPI'])

    .config(function (cfpLoadingBarProvider) {
        'use strict';
        cfpLoadingBarProvider.includeSpinner = true;
    })

    .factory('httpInterceptor', function ($q, $rootScope, $window, ENV, $log, $location, eventbus) {
        'use strict';
        return {
            // Everytime a request starts
            request: function (config) {
                if (config.url.startsWith('/api')) {
                    config.headers['Content-Type'] = 'application/json';
                    config.responseType = 'json';
                }
                if ($rootScope.user !== null && angular.isDefined($rootScope.user)) {
                    config.headers.Authorization = 'Bearer ' + $rootScope.user.token;
                }
                if (!config.url.startsWith('template') && !config.url.startsWith('js/i18n') && !config.url.startsWith('http') && !config.url.startsWith('ngTagsInput') && !config.url.startsWith('/dialogs')) {
                    if (config.url.startsWith('/')) {
                        config.url = ENV.apiEndPoint + config.url;
                    } else {
                        config.url = ENV.apiEndPoint + '/' + config.url;
                    }
                }
                return config || $q.when(config);
            },
            // When a request ends
            response: function (response) {
                return response || $q.when(response);
            },
            // When a request fails
            responseError: function (response) {
                if (response.status === 401) {
                    $location.url('/login');
                    eventbus.prepForBroadcast("logout", null);
                }
                if (response.data !== null) {
                    $log.error(response.data);
                    toastr.error(response.data);
                }
                return $q.reject(response);
            }
        };
    })
//
;