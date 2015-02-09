angular.module('contentfuel.privateMenu', ['contentfuel.eventbus', 'contentfuel.authAPI'])
    .directive("privateMenu", function () {
        'use strict';
        return {
            restrict: 'AE',
            scope : {
              active  : '@'
            },
            controller: function ($scope, $translatePartialLoader, authAPI, $rootScope, $filter, eventbus,$location, $log) {
                $translatePartialLoader.addPart('private');
                $translatePartialLoader.addPart('main');
                $scope.logout = function() {
                    authAPI.logout().success(function (data) {
                        delete $rootScope.user;
                        eventbus.prepForBroadcast("logout", data);
                        $location.url('/');
                        toastr.error($filter('translate')('auth.logout-ok'));
                    }).error(function () {
                        toastr.error($filter('translate')('auth.logout-failed'));
                    });
                };
                $scope.isActive = function(item) {
                    if (angular.equals(item, $scope.active)) {
                        return 'active';
                    } else {
                        return '';
                    }
                };
            },
            templateUrl: '../../templates/directives/privateMenu.html'
        };
    })

//
;