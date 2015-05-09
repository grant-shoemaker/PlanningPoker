(function () {
    'use strict';

    angular.module('pokerApp', [
        // Angular modules 
        'ngRoute',

        // Custom modules 

        // 3rd Party Modules
        'SignalR'
    ]).config(['$routeProvider', "$locationProvider",
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'views/poker/poker-login.html',
                    controller: 'pokerLoginController'
                }).when('/rooms/:username', {
                    templateUrl: 'views/poker/poker-home.html',
                    controller: 'pokerRoomsController'
                }).otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        }]);
})();