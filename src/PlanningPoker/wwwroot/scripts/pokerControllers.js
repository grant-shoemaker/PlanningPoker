/// <reference path="../lib/angular/angular.js" />
/// <reference path="../lib/lodash/lodash.js" />

(function() {
    'use strict';

    angular.module('pokerApp')
        .controller('pokerHomeController', pokerHomeController)
        .controller('pokerRoomController', pokerRoomController);

    pokerHomeController.$inject = ['$scope', '$location', '$timeout', 'pokerService'];
    pokerRoomController.$inject = ['$scope', '$location', '$routeParams', 'pokerService'];

    function pokerHomeController($scope, $location, $timeout, pokerService) {
        $scope.pokerService = pokerService;

        $scope.connectToRoom = function (roomName, role) {
            if (!roomName)
                return;
            if (!role)
                role = 'player';
            pokerService.connectToRoom(roomName);
            $location.path('/rooms/' + roomName + '/' + role);
        }
    }

    function pokerRoomController($scope, $location, $routeParams, pokerService) {
        var roomName = $routeParams.roomName;
        $scope.roomName = roomName;

        var actorRole = $routeParams.role;
        if (actorRole.length === 0)
            actorRole = 'player';
        $scope.actorRole = actorRole;

        $scope.description = '';

        $scope.cardValues = ['PASS', '1', '2', '3', '5', '8', '13', '21', '34'];

        $scope.pokerService = pokerService;

        $scope.updateDescription = function() {
            pokerService.updateDescription(roomName, $scope.description);
        }

        $scope.requestVotes = function() {
            console.log('request votes...');
            pokerService.requestVotes(roomName);
        }

        $scope.submitVote = function(cardValue) {
            console.log('submitting vote: ' + cardValue);
            pokerService.submitVote(roomName, cardValue);
        }
        $scope.resetVotes = function() {
            console.log('resetting votes');
            pokerService.resetVotes(roomName);
        }
        $scope.displayVotes = function() {
            pokerService.displayVotes(roomName);
        };

        $scope.leaveRoom = function() {
            $location.path('/');
        }

        $scope.$on('$destroy', function() {
            console.log('disconnecting from room: ' + roomName)
            pokerService.disconnectFromRoom(roomName);
        });
    }
})();
