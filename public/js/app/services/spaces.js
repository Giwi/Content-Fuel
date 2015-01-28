angular.module('spacesAPI', []).value('spacesUrl', '/api/space/')

    .factory('spacesAPI', function($http, spacesUrl) {
        return {
            getList : function() {
                return $http({
                    url : spacesUrl,
                    method : "GET"
                });
            },
            add : function(space) {
                return $http({
                    url : spacesUrl,
                    method : "PUT",
                    data : space
                });
            },
            getDetail : function(id) {
                return $http({
                    url : spacesUrl + id,
                    method : "GET"
                });
            },
            del : function(id) {
                return $http({
                    url : spacesUrl + id,
                    method : "DELETE"
                });
            }
        };
    });