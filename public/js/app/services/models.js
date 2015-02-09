angular.module('contentfuel.modelsAPI', []).value('modelsUrl', '/api/model/')

    .factory('modelsAPI', function($http, modelsUrl) {
        return {
            getList : function() {
                return $http({
                    url : modelsUrl,
                    method : "GET"
                });
            },
            add : function(space) {
                return $http({
                    url : modelsUrl,
                    method : "PUT",
                    data : space
                });
            },
            getDetail : function(id) {
                return $http({
                    url : modelsUrl + 'get/' + id,
                    method : "GET"
                });
            },
            del : function(id) {
                return $http({
                    url : modelsUrl + id,
                    method : "DELETE"
                });
            }
        };
    });