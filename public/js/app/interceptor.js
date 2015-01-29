/**
 * Module gérant les appels synchrones
 *
 * @class qaobee.rest.httpModule
 * @author Xavier MARIN
 * @copyright <b>QaoBee</b>.
 * @requires {@link https://github.com/chieffancypants/angular-loading-bar|chieffancypants.loadingBar}
 * @requires {@link https://docs.angularjs.org/api/ngAnimate|ngAnimate}
 */
angular.module('httpModule', ['angular-loading-bar', 'ngAnimate', 'authAPI'])

    .config(function (cfpLoadingBarProvider) {
        'use strict';
        cfpLoadingBarProvider.includeSpinner = true;
    })

    .service("checkLogin", function (authAPI, $q, $rootScope, $log, $location, $filter, eventbus, $translatePartialLoader) {
        $translatePartialLoader.addPart('main');
        this.check = function (notify) {
            if (angular.isUndefined(notify)) {
                notify = true;
            }
            var deferred = $q.defer();
            if (!$rootScope.user) {
                authAPI.check().success(function (data) {
                    if (data === 0) {
                        $location.url('/');
                        if (notify) {
                            toastr.error($filter('translate')('auth.session-expired'));
                        }
                        eventbus.prepForBroadcast("logout", data);
                        deferred.reject();
                    } else {
                        $rootScope.user = angular.copy(data);
                        eventbus.prepForBroadcast("login", data);
                        deferred.resolve(data);
                    }
                }).error(function () {
                    eventbus.prepForBroadcast("logout", data);
                    toastr.error($filter('translate')('auth.login-failed'));
                });
            } else {
                deferred.resolve($rootScope.user);
                eventbus.prepForBroadcast("login", $rootScope.user);
            }
            return deferred.promise;
        };
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