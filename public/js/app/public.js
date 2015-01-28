angular.module('public', ['ngRoute', 'authAPI'])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainCtrl',
            templateUrl: '../../templates/public/main.html'
        }).when('/login', {
            controller: 'LoginCtrl',
            templateUrl: '../../templates/public/login.html'
        }).when('/signup', {
            controller: 'SignupCtrl',
            templateUrl: '../../templates/public/signup.html'
        });
    })
/**
 * @class ContentFuelApp.public.MainCtrl
 * @description main controller for the welcome page
 */
    .controller('MainCtrl', function ($scope,$translatePartialLoader, authAPI, $log, $rootScope, $q) {
        'use strict';
        var deferred = $q.defer();
        $translatePartialLoader.addPart('main');
        if(!$rootScope.user) {
            authAPI.check().success(function (data) {
                $rootScope.user = angular.copy(data);
                deferred.resolve(data);
            }).error(function () {
                toastr.error('Authentication failed.');
            });
        } else {
            deferred.resolve($rootScope.user);
        }
        deferred.promise.then(function (user) {
            $scope.user = user;
        });
    })

    .controller('LoginCtrl', function ($scope, $rootScope, $translatePartialLoader, authAPI, $log, $location, eventbus, $filter) {
        'use strict';
        $translatePartialLoader.addPart('main');
        $scope.login = function () {
            authAPI.login($scope.email, $scope.password).success(function (data) {
                $log.debug(data);
                $rootScope.user = angular.copy(data);
                eventbus.prepForBroadcast("login", data);
                $location.url('/');
            }).error(function () {
                toastr.error($filter('translate')('auth.login-failed'));
            });
        };
    })

    .controller('SignupCtrl', function ($scope, $translatePartialLoader, authAPI, $log, $location, $filter) {
        'use strict';
        $scope.signUp = {};
        $translatePartialLoader.addPart('main');
        $scope.submit = function () {
            authAPI.signup($scope.signUp).success(function (data) {
                $log.debug(data);
                toastr.success($filter('translate')('signUp.ok'));
                $location.url('/');
            });
        };
    })
//
;