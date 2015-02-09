angular.module('contentfuel.common-config', ['contentfuel.eventbus', 'contentfuel.authAPI'])

    .provider('metaDatas', function metaDatasProvider() {
        'use strict';
        this.$get = function metaDatasFactory() {
            // return this;
        };

        this.checkUser = function ($rootScope, authAPI, eventbus, $location, $q, $filter, $translatePartialLoader) {
            $translatePartialLoader.addPart('main');
            var deferred = $q.defer();
            if (!$rootScope.user) {
                authAPI.check().success(function (data) {
                    if (data === 0) {
                        $location.url('/');
                        toastr.error($filter('translate')('auth.session-expired'));
                        eventbus.prepForBroadcast("logout", data);
                        deferred.reject();
                    } else {
                        $rootScope.user = angular.copy(data);
                        eventbus.prepForBroadcast("login", data);
                        deferred.resolve(data);
                    }
                }).error(function (data) {
                    eventbus.prepForBroadcast("logout", data);
                    toastr.error($filter('translate')('auth.login-failed'));
                });
            } else {
                deferred.resolve($rootScope.user);
                eventbus.prepForBroadcast("login", $rootScope.user);
            }
            return deferred.promise;
        };

    });