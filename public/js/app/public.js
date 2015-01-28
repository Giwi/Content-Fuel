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
    .controller('MainCtrl', function ($scope,$translatePartialLoader, checkLogin, eventbus) {
        'use strict';
        $translatePartialLoader.addPart('main');
        eventbus.prepForBroadcast("page", "home");
        checkLogin.check(false).then(function (user) {
            $scope.user = user;
        });
    })

    .controller('LoginCtrl', function ($scope, $rootScope, $translatePartialLoader, authAPI, $log, $location, eventbus, $filter) {
        'use strict';
        $translatePartialLoader.addPart('main');
        eventbus.prepForBroadcast("page", "login");
        $scope.login = function () {
            authAPI.login($scope.email, $scope.password).success(function (data) {
                $rootScope.user = angular.copy(data);
                $log.debug(data);
                eventbus.prepForBroadcast("login", data);
                $location.url('/dashboard');
            }).error(function () {
                toastr.error($filter('translate')('auth.login-failed'));
            });
        };
    })

    .controller('SignupCtrl', function ($scope, $translatePartialLoader, authAPI, $log, $location, $filter, eventbus) {
        'use strict';
        eventbus.prepForBroadcast("page", "login");
        $scope.signUp = {};
        $translatePartialLoader.addPart('main');
        $scope.submit = function () {
            authAPI.signup($scope.signUp).success(function (data) {
                toastr.success($filter('translate')('signUp.signUp.ok'));
                $location.url('/');
            });
        };
    })
//
;