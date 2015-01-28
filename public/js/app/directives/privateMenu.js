angular.module('privateMenu', ['eventbus', 'authAPI'])
    .directive("privateMenu", function () {
        'use strict';
        return {
            restrict: 'AE',
            controller: function ($scope, $translatePartialLoader, authAPI, $rootScope, $filter) {
                $translatePartialLoader.addPart('private');
                $translatePartialLoader.addPart('main');
                $scope.logout = function() {
                    authAPI.logout().success(function (data) {
                        delete $rootScope.user;
                        eventbus.prepForBroadcast("logout", data);
                        $location.url('/');
                    }).error(function () {
                        toastr.error($filter('translate')('auth.logout-failed'));
                    });
                };
            },
            templateUrl: '../../templates/directives/privateMenu.html'
        };
    })

//
;