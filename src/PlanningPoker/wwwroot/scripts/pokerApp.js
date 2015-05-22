(function() {
    'use strict';

    angular.module('pokerApp', [
        // Angular modules 
        'ngRoute',
        'ngMaterial',

        // Custom modules 

        // 3rd Party Modules
        'SignalR'
    ]).config(['$routeProvider', "$locationProvider",
        function($routeProvider, $locationProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'views/poker/poker-home.html',
                    controller: 'pokerHomeController'
                }).when('/rooms/:roomName', {
                    redirectTo: '/rooms/:roomName/player'
                }).when('/rooms/:roomName/:role', {
                    templateUrl: 'views/poker/poker-room.html',
                    controller: 'pokerRoomController'
                }).otherwise({
                    redirectTo: '/'
                });

            //$locationProvider.html5Mode(true);
        }]);
})();