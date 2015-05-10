(function() {
    'use strict';

    angular.module('pokerApp')
        .controller('pokerHomeController', pokerHomeController)
        .controller('pokerRoomController', pokerRoomController);



    pokerHomeController.$inject = ['$scope', '$location', '$timeout', 'pokerService'];
    pokerRoomController.$inject = ['$scope', '$location', '$routeParams', 'pokerService'];

    function pokerHomeController($scope, $location, $timeout, pokerService) {
        $scope.pokerService = pokerService;

        $scope.connectToRoom = function(roomName) {
            pokerService.connectToRoom(roomName);
            $location.path('/rooms/' + roomName);
        }
    }

    function pokerRoomController($scope, $location, $routeParams, pokerService) {
        var roomName = $routeParams.roomName;
        $scope.roomName = roomName;
        $scope.description = '';

        $scope.pokerService = pokerService;

        $scope.updateDescription = function() {
            pokerService.updateDescription(roomName, $scope.description);
        }

        $scope.requestVotes = function() {
            console.log('request votes...');
            pokerService.requestVotes(roomName);
        }

        $scope.$on('$destroy', function() {
            console.log('disconnecting from room: ' + roomName)
            pokerService.disconnectFromRoom(roomName);
        });
    }
})();
