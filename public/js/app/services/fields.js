angular.module('contentfuel.fieldsAPI', []).value('fieldsUrl', '/api/fields/')

    .factory('fieldsAPI', function($http, fieldsUrl) {
        return {
            getList : function() {
                return $http({
                    url : fieldsUrl,
                    method : "GET"
                });
            },
            add : function(space) {
                return $http({
                    url : fieldsUrl,
                    method : "PUT",
                    data : space
                });
            },
            getDetail : function(id) {
                return $http({
                    url : fieldsUrl + 'get/' + id,
                    method : "GET"
                });
            },
            del : function(id) {
                return $http({
                    url : fieldsUrl + id,
                    method : "DELETE"
                });
            }
        };
    });