angular.module('contentfuel.spaces', ['ngRoute', 'contentfuel.spacesAPI'])

    .config(function ($routeProvider, metaDatasProvider) {
        $routeProvider.when('/spaces', {
            controller: 'SpacesCtrl',
            resolve: {
                user: metaDatasProvider.checkUser
            },
            templateUrl: '../../templates/private/spaces.html'
        }).when('/space/:id', {
            controller: 'SpaceDetailCtrl',
            resolve: {
                user: metaDatasProvider.checkUser
            },
            templateUrl: '../../templates/private/spaceDetail.html'
        });
    })

    .controller('SpacesCtrl', function ($scope, $log, $translatePartialLoader, user, eventbus, spacesAPI, $q, $filter, dialogs) {
        'use strict';
        eventbus.prepForBroadcast("page", "private");
        $translatePartialLoader.addPart('dialogs');
        $translatePartialLoader.addPart('spaces');
        $scope.spacesCache = [];
        function retrieveData() {
            var deferred = $q.defer();
            spacesAPI.getList().then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        $scope.addSpace = function () {
            dialogs.create('../../templates/modals/spaceCreation.html', 'SpaceCreationModalCtrl', {
                size: 'lg',
                keyboard: true,
                backdrop: false,
                windowClass: 'my-class'
            }).result.then(function (newSpace) {
                    spacesAPI.add(newSpace).success(function () {
                        $scope.spacesCache.push(data);
                        toastr.success($filter('translate')('spaces.insertSuccess'));
                    });
                }, function () {
                    // nothing
                });
        };

        $scope.del = function (space) {
            dialogs.confirm($filter('translate')('common.delete'), $filter('translate')('spaces.delete.ask', {
                name: space.name
            })).result.then(function () {
                    spacesAPI.del(space._id).success(function (data) {
                        $scope.spacesCache = data;
                        toastr.success($filter('translate')('spaces.delete.success'));
                    });
                }, function () {
                    // nothing
                }
            );
        };

        retrieveData().then(function (data) {
            if (data !== null) {
                $scope.spacesCache = data;
            }
        });
    })

    .controller('SpaceCreationModalCtrl', function ($scope, $modalInstance, spacesAPI, $translatePartialLoader) {
        'use strict';
        $translatePartialLoader.addPart('dialogs');
        $translatePartialLoader.addPart('spaces');
        $scope.newSpace = {};
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.update = function () {
            $modalInstance.close($scope.newSpace);
        };
    })

    .controller('SpaceDetailCtrl', function ($scope, $translatePartialLoader, user, eventbus, spacesAPI, $log, $filter, $routeParams) {
        'use strict';
        $translatePartialLoader.addPart('dialogs');
        $translatePartialLoader.addPart('spaces');
        eventbus.prepForBroadcast("page", "private");
        $scope.space = {};
        spacesAPI.getDetail($routeParams.id).success(function (data) {
            $scope.space = data;
            $log.debug(data);
        });
        $scope.update = function () {
            spacesAPI.add($scope.space).success(function () {
                toastr.success($filter('translate')('spaces.insertSuccess'));
            });
        };
    })
//
;
