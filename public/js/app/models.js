angular.module('contentfuel.models', ['ngRoute', 'contentfuel.modelsAPI'])

    .config(function ($routeProvider, metaDatasProvider) {
        $routeProvider.when('/models', {
            controller: 'ModelsCtrl',
            resolve: {
                user: metaDatasProvider.checkUser
            },
            templateUrl: '../../templates/private/models.html'
        }).when('/models/:id', {
            controller: 'ModelDetailCtrl',
            resolve: {
                user: metaDatasProvider.checkUser
            },
            templateUrl: '../../templates/private/modelDetail.html'
        });
    })

    .controller('ModelsCtrl', function ($scope, $log, $translatePartialLoader, user, eventbus, modelsAPI, $q, $filter, dialogs) {
        'use strict';
        eventbus.prepForBroadcast("page", "private");
        $translatePartialLoader.addPart('dialogs');
        $translatePartialLoader.addPart('models');
        $scope.modelsCache = [];
        function retrieveData() {
            var deferred = $q.defer();
            modelsAPI.getList().then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        $scope.addModel = function () {
            dialogs.create('../../templates/modals/modelCreation.html', 'ModelCreationModalCtrl', {
                size: 'lg',
                keyboard: true,
                backdrop: false,
                windowClass: 'my-class'
            }).result.then(function (newModel) {
                    modelsAPI.add(newModel).success(function (data) {
                        $scope.modelsCache.push(data);
                        toastr.success($filter('translate')('models.insertSuccess'));
                    });
                }, function () {
                    //nothing
                });
        };

        $scope.del = function (model) {
            dialogs.confirm($filter('translate')('common.delete'), $filter('translate')('models.delete.ask', {
                name: model.name
            })).result.then(function () {
                    modelsAPI.del(model._id).success(function (data) {
                        $scope.modelsCache = data;
                        toastr.success($filter('translate')('models.delete.success'));
                    });
                }, function () {
                    // nothing
                }
            );
        };

        retrieveData().then(function (data) {
            if (data !== null) {
                $scope.modelsCache = data;
            }
        });
    })

    .controller('ModelCreationModalCtrl', function ($scope, $modalInstance, modelsAPI, $translatePartialLoader) {
        'use strict';
        $translatePartialLoader.addPart('dialogs');
        $translatePartialLoader.addPart('models');
        $scope.newModel = {};
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.update = function () {
            $modalInstance.close($scope.newModel);
        };
    })

    .controller('ModelDetailCtrl', function ($scope, $translatePartialLoader, user, eventbus, modelsAPI, $log, $filter, $routeParams) {
        'use strict';
        $translatePartialLoader.addPart('dialogs');
        $translatePartialLoader.addPart('models');
        eventbus.prepForBroadcast("page", "private");
        $scope.model = {};
        modelsAPI.getDetail($routeParams.id).success(function (data) {
            $scope.model = data;
            $log.debug(data);
        });
        $scope.update = function () {
            modelsAPI.add($scope.model).success(function () {
                toastr.success($filter('translate')('models.insertSuccess'));
            });
        };
    })

    //
;