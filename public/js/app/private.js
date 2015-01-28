angular.module('private', ['ngRoute', 'privateMenu', 'spacesAPI'])

    .config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            controller: 'DashBoardCtrl',
            templateUrl: '../../templates/private/dashboard.html'
        }).when('/spaces', {
            controller: 'SpacesCtrl',
            templateUrl: '../../templates/private/spaces.html'
        });
    })

    .controller('DashBoardCtrl', function ($scope, $translatePartialLoader, checkLogin, eventbus) {
        'use strict';
        eventbus.prepForBroadcast("page", "private");
        checkLogin.check().then(function (user) {
            $scope.user = user;
        });
    })

    .controller('SpacesCtrl', ['$scope', '$translatePartialLoader', 'checkLogin', 'eventbus', 'spacesAPI', '$q', 'ngTableParams', 'dialogs', function ($scope, $translatePartialLoader, checkLogin, eventbus, spacesAPI, $q, NgTableParams, dialogs) {
        'use strict';
        eventbus.prepForBroadcast("page", "private");
        $translatePartialLoader.addPart('dialogs');
        var deferred = $q.defer();
        var spacesProm = deferred.promise;
        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: 0,           // length of data
            getData: function ($defer, params) {
                // ajax request to api
                spacesProm.then(function (data) {
                    params.total(data.total);
                    // set new data
                    $defer.resolve(data.result);
                });
            }
        });
        checkLogin.check().then(function (user) {
            $scope.user = user;
            retrieveData();
        });
        function retrieveData() {
            spacesAPI.getList().then(function (data) {
                deferred.resolve(data);
            });
        }

        $scope.addSpace = function() {
            dialogs.create('../../templates/modals/spaceCreation.html', 'spaceCreationModalCtrl', {
                size: 'lg',
                keyboard: true,
                backdrop: false,
                windowClass: 'my-class'
            }).result.then(function () {
                    // nothing
                }, function () {
                    // nothing
                });
        };

        $scope.del = function (space) {
            dialogs.confirm($filter('translate')('common.delete'), $filter('translate')('spaces.delete.ask', {
                name: space.name
            })).result.then(function (btn) {
                    spacesAPI.del(space._id).success(function (data) {
                        if (data.success) {
                            retrieveData();
                            toastr.success($filter('translate')('spaces.delete.success'));
                        }
                    });
                }, function (btn) {
                    // nothing
                }
            );
        };
    }])

    .controller('spaceCreationModalCtrl', function ($scope, $modalInstance) {
        'use strict';
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
//
;