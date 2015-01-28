angular.module('headerMenu', ['eventbus'])
    .directive("headerMenu", function (eventbus, $log, $translatePartialLoader) {
        'use strict';
        return {
            restrict: 'AE',
            controller: function ($scope) {
                $translatePartialLoader.addPart('main');
                $scope.currentItem = 'home';
                $scope.$on('eventbus', function () {
                    if ("login" === eventbus.message) {
                        $scope.user = eventbus.data;
                    } else if ("logout" === eventbus.message) {
                        delete $scope.user;
                    } else if ("page" == eventbus.message) {
                        $scope.currentItem = eventbus.data;
                    }
                });

                $scope.isActive = function(item) {
                    if (angular.equals(item, $scope.currentItem)) {
                        return 'active';
                    } else {
                        return '';
                    }
                };
            },
            templateUrl: '../../templates/directives/headerMenu.html'
        };
    })

//
;