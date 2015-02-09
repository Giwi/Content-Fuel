angular.module('contentfuel.dashboardAPI', []).value('dashboardUrl', '/api/dashboard/')

    .factory('dashboardAPI', function($http, dashboardUrl) {
        return {
            getList : function() {
                return $http({
                    url : dashboardUrl,
                    method : "GET"
                });
            }
        };
    });