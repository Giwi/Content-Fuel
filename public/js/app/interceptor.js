/**
 * Module gérant les appels synchrones
 *
 * @class qaobee.rest.httpModule
 * @author Xavier MARIN
 * @copyright <b>QaoBee</b>.
 * @requires {@link https://github.com/chieffancypants/angular-loading-bar|chieffancypants.loadingBar}
 * @requires {@link https://docs.angularjs.org/api/ngAnimate|ngAnimate}
 */
angular.module('httpModule', ['angular-loading-bar', 'ngAnimate'])

    .config(function (cfpLoadingBarProvider) {
        'use strict';
        cfpLoadingBarProvider.includeSpinner = true;
    })

    .factory('httpInterceptor', function ($q, $rootScope, $window, ENV, $log) {
        'use strict';
        return {
            // Everytime a request starts
            request: function (config) {
                if (config.url.startsWith('/api')) {
                    config.headers['Content-Type'] = 'application/json';
                    config.responseType = 'json';
                }
                if (config.url.startsWith('/api/private') || config.url.startsWith('/api/admin') || config.url.startsWith('/api/logout')) {
                    config.headers.token = $window.sessionStorage.contentFuelSession;
                }
                if (!config.url.startsWith('template') && !config.url.startsWith('js/i18n') && !config.url.startsWith('http') && !config.url.startsWith('ngTagsInput') && !config.url.startsWith('ng-table')) {
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
                if (response.status === 401)
                    $location.url('/login');
                if (response.data !== null) {
                    $log.error(response.data);
                    toastr.error(response.data.error);
                }
                return $q.reject(response);
            }
        };
    })
//
;