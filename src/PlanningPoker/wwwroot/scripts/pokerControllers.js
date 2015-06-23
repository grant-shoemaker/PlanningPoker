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
            $location.path('/rooms/' + roomName + '/' + role);
        }
        
        $scope.changeUsername = function() {
            pokerService.changeUsername();
            return false;
        }
    }

    function pokerRoomController($scope, $location, $routeParams, pokerService) {
        var roomName = $routeParams.roomName;
        $scope.roomName = roomName;

        var actorRole = $routeParams.role;
        if (actorRole.length === 0)
            actorRole = 'player';
        $scope.actorRole = actorRole;

        pokerService.hubPromise.done(function(username) {
            pokerService.connectToRoom(roomName, actorRole);
        });

        $scope.description = '';

        $scope.cardValues = ['PASS', '1', '2', '3', '5', '8', '13', '20', '40', '100'];

        $scope.pokerService = pokerService;

        $scope.updateDescription = function() {
            pokerService.updateDescription(roomName, $scope.description);
        }

        $scope.requestVotes = function() {
            pokerService.requestVotes(roomName);
        }

        $scope.submitVote = function(cardValue) {
            pokerService.submitVote(roomName, cardValue);
        }
        $scope.resetVotes = function() {
            pokerService.resetVotes(roomName);
        }
        $scope.displayVotes = function() {
            pokerService.displayVotes(roomName);
        };

        $scope.leaveRoom = function() {
            $location.path('/');
        }

        $scope.$on('$destroy', function() {
            pokerService.disconnectFromRoom(roomName);
        });
    }
})();
