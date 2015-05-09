(function () {
    'use strict';

    angular.module('pokerApp')
        .controller('pokerLoginController', pokerLoginController)
        .controller('pokerRoomsController', pokerRoomsController);



    pokerLoginController.$inject = ['$scope', '$location'];

    function pokerLoginController($scope, $location) {
        $scope.loginUser = function () {
            $location.path('/rooms/' + $scope.username);
        };
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
    }
})();
