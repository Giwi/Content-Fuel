angular.module('private', ['ngRoute', 'privateMenu'])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'DashBoardCtrl',
            templateUrl: '../../templates/private/dashboard.html'
        });
    })

    .controller('DashBoardCtrl', function ($scope,$translatePartialLoader, authAPI, $log, $rootScope, $q) {
        'use strict';
    })
//
;