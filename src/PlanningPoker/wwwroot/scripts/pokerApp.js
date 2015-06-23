(function() {
    'use strict';

    angular.module('pokerApp', [
        // Angular modules 
        'ngRoute',
        'ngMaterial',

        // Custom modules 

        // 3rd Party Modules
        'SignalR'
    ]).config(['$routeProvider', "$locationProvider", "$httpProvider",
        function($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $routeProvider.
                when('/', {
                    templateUrl: 'views/poker/poker-home.html?nd=' + Date.now(),
                    controller: 'pokerHomeController'
                }).when('/rooms/:roomName', {
                    redirectTo: '/rooms/:roomName/player?nd=' + Date.now()
                }).when('/rooms/:roomName/:role', {
                    templateUrl: 'views/poker/poker-room.html?nd=' + Date.now(),
                    controller: 'pokerRoomController'
                }).otherwise({
                    redirectTo: '/'
                });
        }]);
})();
