"use strict";

var uri = '//localhost:8080';
var ssapi = new SSAPI(uri, connection_status);
var group = "56a9da969a0bf84c09c316be";
var client = 'testClientId';

function connection_status(err, isAuthorized){
    console.info("Connection status changed: \n error = ", err, " \n isAuthorized = ", isAuthorized);
}

angular.module('app.auth').directive('ssapiSignin', function ($rootScope, GooglePlus) {
    return {
        restrict: 'E',
        template: '<a class="g-signin btn btn-block btn-social btn-google-plus"><i class="fa fa-google-plus"></i> Sign in with Google</a>',
        replace: true,
        link: function (scope, element) {
            element.on('click', function(){
                GooglePlus.login().then(function (authResult) {
                    $rootScope.$broadcast('event:google-plus-signin-success', authResult);

                }, function (err) {
                    $rootScope.$broadcast('event:google-plus-signin-failure', err);

                });
            })
        }
    };
});
