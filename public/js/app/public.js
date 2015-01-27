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
        $scope.user = deferred.promise;
        $translatePartialLoader.addPart('main');
        if(!$rootScope.user) {
            authAPI.check().success(function (data) {
                $rootScope.user = angular.copy(data);
                $log.debug("from node");
                $log.debug(data);
                deferred.resolve(data);
            }).error(function () {
                toastr.error('Authentication failed.');
            });
        } else {
            $log.debug("from rootScope");
            deferred.resolve($rootScope.user);
        }
    })

    .controller('LoginCtrl', function ($scope, $rootScope, $translatePartialLoader, authAPI, $log, $location) {
        'use strict';
        $translatePartialLoader.addPart('main');
        $scope.login = function () {
            authAPI.login($scope.email, $scope.password).success(function (data) {
                $log.debug(data);
                $rootScope.user = angular.copy(data);
                $location.url('/');
            }).error(function () {
                toastr.error('Authentication failed.');
            });
        };
    })

    .controller('SignupCtrl', function ($scope, $translatePartialLoader, authAPI, $log, $location, $filter) {
        'use strict';
        $translatePartialLoader.addPart('main');
        $scope.submit = function () {
            authAPI.signup($scope.signUp).success(function (data) {
                toastr.success($filter('translate')('signUp.ok'));
                $location.url('/');
            });
        };
    })
//
;