angular.module('public', ['ngRoute', 'authAPI'])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainCtrl',
            templateUrl: '../../templates/public/main.html'
        }).when('/login', {
            controller: 'LoginCtrl',
            templateUrl: '../../templates/public/login.html'
        });
    })
/**
 * @class ContentFuelApp.public.MainCtrl
 * @description main controller for the welcome page
 */
    .controller('MainCtrl', function ($translatePartialLoader) {
        'use strict';
        $translatePartialLoader.addPart('main');
    })

    .controller('LoginCtrl', function ($scope, $translatePartialLoader, authAPI, $log) {
        'use strict';
        $translatePartialLoader.addPart('main');
        $scope.login = function() {
            authAPI.login($scope.username, $scope.passwd).success(function (data) {
                toastr.success("You'r logged'");
                $log.debug(data);
            });
        };
    });