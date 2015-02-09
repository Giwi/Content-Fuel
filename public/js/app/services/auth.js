angular.module('contentfuel.authAPI', []).value('authUrl', '/api')

    .factory('authAPI', function($http, authUrl) {
    return {
        login : function(email, password) {
            return $http({
                url : authUrl + '/login',
                method : "POST",
                data : '{"email" : "' + email + '", "password" : "' + password + '"}'
            });
        },
        signup : function(signup) {
            return $http({
                url : authUrl + '/signup',
                method : "POST",
                data : signup
            });
        },
        check : function() {
            return $http({
                url : authUrl + '/loggedin',
                method : "GET"
            });
        },
        logout : function() {
            return $http({
                url : authUrl + '/logout',
                method : "GET"
            });
        }
    };
});