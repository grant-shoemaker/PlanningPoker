(function () {
    'use strict';

    angular.module('pokerApp')
        .controller('pokerLoginController', pokerLoginController)
        .controller('pokerHomeController', pokerHomeController)
        .controller('pokerRoomController', pokerRoomController);



    pokerLoginController.$inject = [ '$scope', '$location' ];
    pokerHomeController.$inject = [ '$scope', '$location', 'pokerService' ];
    pokerRoomController.$inject = [ '$scope', '$location', 'pokerService' ];

    function pokerLoginController ($scope, $location) {
        $scope.loginUser = function () {
            $location.path('/rooms/' + $scope.username);
        };
    }

    function pokerHomeController($scope, $location, pokerService) {
        //TODO: get username from prompt or from cookie / store to cookie? browser-session cookie?
        $scope.username = prompt('What is your name?', 'Anonymous');
        $scope.pokerService = pokerService;

        setTimeout(function () {
            pokerService.login($scope.username);
            pokerService.listRooms();
        }, 200);

        $scope.connectToRoom = function (roomName) {
            pokerService.connectToRoom(roomName);
            $location.path('/rooms/' + roomName);
        }
    }

    function pokerRoomController($scope, $location, pokerService) {
    }
})();
