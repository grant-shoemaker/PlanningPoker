/// <reference path="chat-demo/chat.js" />
(function () {
    'use strict';

    var hub = $.connection.pokerHub;

    $.connection.hub.start().done(function () {
    });

    //hub.client.listRooms = function (rooms) {
    //};

    angular.module('pokerApp')
        .controller('pokerLoginController', pokerLoginController);
    pokerLoginController.$inject = ['$scope', '$location'];
    function pokerLoginController($scope, $location) {
        $scope.loginUser = function () {
            hub.server.login($scope.username);
            hub.server.listRooms();
            $location.path('/rooms/' + $scope.username);
        };

        $scope.listRooms = function (rooms) {
            console.log(rooms);
            debugger;
        };

        hub.client.listRooms = $scope.listRooms;
    }

    angular
        .module('pokerApp')
        .controller('pokerRoomsController', pokerController);

    pokerController.$inject = [ '$scope', '$location', '$routeParams'];//, 'pokerFactory' ]; 

    function pokerController($scope, $location, $routeParams) {
        if (!$routeParams.username || $routeParams.username.length === 0)
            $location.path('/');

        $scope.username = $routeParams.username;
        //$scope.pokerFactory = pokerFactory;

        //activate();

        //function activate() { }
    }
})();
