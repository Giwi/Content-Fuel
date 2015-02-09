angular.module('contentfuel.private', ['ngRoute', 'contentfuel.privateMenu', 'contentfuel.spaces', 'contentfuel.models', 'contentfuel.dashboardAPI'])

    .config(function ($routeProvider, metaDatasProvider) {

        $routeProvider.when('/dashboard', {
            controller: 'DashBoardCtrl',
            resolve: {
                user: metaDatasProvider.checkUser
            },
            templateUrl: '../../templates/private/dashboard.html'
        });
    })

    .controller('DashBoardCtrl', function ($scope, $translatePartialLoader, eventbus, dashboardAPI) {
        'use strict';
        eventbus.prepForBroadcast("page", "private");
        dashboardAPI.getList().success(function(data) {
           $scope.meta = data;
        });
    })
//
;