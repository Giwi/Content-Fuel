angular.module('authAPI', []).value('authUrl', '/api')

    .factory('authAPI', function($http, authUrl) {
    return {
        login : function(email, password) {
            return $http({
                url : authUrl + '/login',
                method : "POST",
                data : '{"email" : "' + email + '", "password" : "' + password + '"}'
            });
        }
    };
});