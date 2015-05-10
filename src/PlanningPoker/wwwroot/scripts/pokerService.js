///import "../lib/angular/angular.js"

(function () {
    'use strict';

    angular
        .module('pokerApp')
        .factory('pokerService', ['$rootScope', 'Hub', '$timeout', function ($rootScope, Hub, $timeout) {

            //declaring the hub connection
            var hub = new Hub('pokerHub', {

                //client side methods
                listeners: {
                    'updateUserConnections': function (users) {
                        console.log('updateUserConnections:');
                        console.log(users);
                        $rootScope.activeUsers = users;
                        $rootScope.$apply();
                    },
                    'userConnect': function (username) {
                        console.log('userConnect: ' + username);
                    },
                    'listRooms': function (rooms) {
                        console.log('listRooms:');
                        console.log(rooms);
                        $rootScope.activeRooms = rooms;
                        $rootScope.$apply();
                    },
                    'descriptionUpdated': function (description) {
                        console.log('descriptionUpdated: ' + description);
                    }
                },

                //server side methods
                methods: [ 'login', 'connectToRoom', 'listRooms', 'updateDescription' ],

                //query params sent on initial connection
                //queryParams: {
                //    'token': 'exampletoken'
                //},

                //handle connection error
                errorHandler: function (error) {
                    console.error(error);
                },

                hubDisconnected: function () {
                    if (hub.connection.lastError) {
                        hub.connection.start();
                            //.done(function () {
                            //    hub.login($rootScope.username);
                            //});
                    }
                    //if (hub.connection.lastError) {
                    //    hub.connection.start()
                    //        .done(function () {
                    //            if (hub.connection.state === 0) {
                    //                $timeout(function () {
                    //                    //your code here 
                    //                    //TODO: call the login here?
                    //                }, 2000);
                    //            } else {
                    //                //your code here
                    //            }
                    //        })
                    //        .fail(function (reason) {
                    //            console.log(reason);
                    //        });
                    //}
                }
                //, logging: true
            });

            var login = function (username) {
                hub.login(username);
            };
            var connectToRoom = function (roomName) {
                hub.connectToRoom(roomName);
            };
            var listRooms = function () {
                hub.listRooms();
            };
            var updateDescription = function (description) {
                hub.updateDescription(description);
            };

            return {
                login: login,
                connectToRoom: connectToRoom,
                listRooms: listRooms,
                updateDescription: updateDescription
            };
        }]);
})();