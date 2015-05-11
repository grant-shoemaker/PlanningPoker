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

        $scope.cardValues = [1, 2, 3, 5, 8, 13, 21, 34];

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
            $scope.voteNow = false;
        }
        $scope.resetVotes = function() {
            console.log('resetting votes');
            pokerService.resetVotes(roomName);
        }
        $scope.displayVotes = function() {
            alert('TODO: votes will be hidden from players until this button is clicked.')
        };

        $scope.$on('$destroy', function() {
            console.log('disconnecting from room: ' + roomName)
            pokerService.disconnectFromRoom(roomName);
        });
    }
})();
