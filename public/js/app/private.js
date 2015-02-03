angular.module('private', ['ngRoute', 'privateMenu', 'spacesAPI'])

    .config(function ($routeProvider) {
        function checkUser(checkLogin, $rootScope) {
            checkLogin.check(false).then(function (user) {
                $rootScope.user = user;
            });
        }

        checkUser.$inject = ['checkLogin', '$rootScope'];
        $routeProvider.when('/dashboard', {
            controller: 'DashBoardCtrl',
            resolve: {
                user: checkUser
            },
            templateUrl: '../../templates/private/dashboard.html'
        }).when('/spaces', {
            controller: 'SpacesCtrl',
            resolve: {
                user: checkUser
            },
            templateUrl: '../../templates/private/spaces.html'
        }).when('/space/:id', {
            controller: 'SpaceDetailCtrl',
            resolve: {
                user: checkUser
            },
            templateUrl: '../../templates/private/spaceDetail.html'
        });
    })

    .controller('DashBoardCtrl', function ($scope, $translatePartialLoader, checkLogin, eventbus) {
        'use strict';
        eventbus.prepForBroadcast("page", "private");
    })

    .controller('SpacesCtrl', function ($scope, $log, $translatePartialLoader, checkLogin, eventbus, spacesAPI, $q, $filter, dialogs) {
        'use strict';
        eventbus.prepForBroadcast("page", "private");
        $translatePartialLoader.addPart('dialogs');
        $scope.spacesCache = [];
        function retrieveData() {
            var deferred = $q.defer();
            spacesAPI.getList().then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        $scope.addSpace = function () {
            dialogs.create('../../templates/modals/spaceCreation.html', 'spaceCreationModalCtrl', {
                size: 'lg',
                keyboard: true,
                backdrop: false,
                windowClass: 'my-class'
            }).result.then(function () {
                    // nothing
                }, function (newSpace) {
                    $scope.spacesCache.push(newSpace);
                    toastr.success($filter('translate')('spaces.insertSuccess'));
                });
        };

        $scope.del = function (space) {
            dialogs.confirm($filter('translate')('common.delete'), $filter('translate')('spaces.delete.ask', {
                name: space.name
            })).result.then(function (btn) {
                    spacesAPI.del(space._id).success(function (data) {
                        $scope.spacesCache = data;
                        toastr.success($filter('translate')('spaces.delete.success'));
                    });
                }, function (btn) {
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

    .controller('spaceCreationModalCtrl', function ($scope, checkLogin, $modalInstance, spacesAPI, $translatePartialLoader,$log, $filter) {
        'use strict';
        $translatePartialLoader.addPart('dialogs');
        $scope.newSpace = {};
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.update = function () {
            spacesAPI.add($scope.newSpace).success(function (data) {
                $modalInstance.close(data);
            });
        };
    })

    .controller('SpaceDetailCtrl', function ($scope, $translatePartialLoader, checkLogin, eventbus, spacesAPI, $log, $filter, $routeParams) {
        'use strict';
        $translatePartialLoader.addPart('dialogs');
        eventbus.prepForBroadcast("page", "private");
        $scope.space = {};
        spacesAPI.getDetail($routeParams.id).success(function(data) {
           $scope.space = data;
            $log.debug(data);
        });
        $scope.update = function () {
            spacesAPI.add($scope.space).success(function (data) {
                toastr.success($filter('translate')('spaces.insertSuccess'));
            });
        };
    })
//
;