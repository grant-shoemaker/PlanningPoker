/// <reference path="chat-demo/chat.js" />
(function () {
    'use strict';

    //var hub = $.connection.pokerHub;

    //$.connection.hub.start().done(function () {
    //});

    angular.module('pokerApp')
        .controller('pokerLoginController', pokerLoginController)
        .controller('pokerRoomsController', pokerRoomsController);



    pokerLoginController.$inject = ['$scope', '$location'];

    function pokerLoginController($scope, $location) {
        $scope.loginUser = function () {
            //hub.server.login($scope.username);
            //hub.server.listRooms();
            $location.path('/rooms/' + $scope.username);
        };

        //$scope.listRooms = function (rooms) {
        //    console.log(rooms);
        //    debugger;
        //};

        //hub.client.listRooms = $scope.listRooms;
    }

    pokerRoomsController.$inject = ['$scope', '$location', '$routeParams', 'pokerService' ]; 

    function pokerRoomsController($scope, $location, $routeParams, pokerService) {
        if (!$routeParams.username || $routeParams.username.length === 0)
            $location.path('/');

        $scope.username = $routeParams.username;
        $scope.pokerService = pokerService;

        setTimeout(function () {
            pokerService.login($routeParams.username);
            pokerService.listRooms();
        }, 500);

        //activate();

        //function activate() { }
    }
})();
