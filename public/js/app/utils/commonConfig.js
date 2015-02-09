angular.module('common-config', ['eventbus', 'userMetaAPI'])

    .provider('metaDatas', function metaDatasProvider() {
        'use strict';
        this.$get = function metaDatasFactory() {
           // return this;
        };

        function loadAdmin(data) {
            data.isAdmin = false;
            if (angular.isDefined(data.account) && data.account.habilitations !== null) {
                data.account.habilitations.forEach(function (a) {
                    if (a.key === "admin_qaobee") {
                        data.isAdmin = true;
                    }
                });
            }
            return data;
        }

        this.checkUser = function ($rootScope, userMetaAPI, eventbus, $location, $q, $window) {
            var deferred = $q.defer();
            if (angular.isDefined($rootScope.user)) {
                deferred.resolve($rootScope.user);
            } else {

                var token = $window.sessionStorage.qaobeesession;

                if (token !== null && angular.isDefined(token)) {
                    userMetaAPI.getCurrentUser().success(function (data) {
                        $rootScope.user = loadAdmin(data);
                        eventbus.prepForBroadcast("login", $rootScope.user);
                        deferred.resolve($rootScope.user);
                    });
                } else {
                    $location.path('/');
                }
            }
            return deferred.promise;
        };

        this.getMeta = function ($rootScope, userMetaAPI, $location, $q, $window) {
            var deferred = $q.defer();
            if (angular.isDefined($rootScope.meta)) {
                deferred.resolve($rootScope.meta);
            } else {

                var token = $window.sessionStorage.qaobeesession;

                if (token !== null && angular.isDefined(token)) {
                    userMetaAPI.getMetas().success(function (data) {
                        if (angular.isDefined(data) && data !== null) {
                            deferred.resolve(data);
                        }
                    });
                } else {
                    $location.path('/');
                }
            }
            return deferred.promise;
        };

    });