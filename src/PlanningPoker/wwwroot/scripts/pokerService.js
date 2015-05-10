///import "../lib/angular/angular.js"

(function() {
    'use strict';

    angular
        .module('pokerApp')
        .factory('pokerService', ['$rootScope', 'Hub', '$timeout', function($rootScope, Hub, $timeout) {

            //declaring the hub connection
            var hub = new Hub('pokerHub', {


                //client side methods
                listeners: {
                    'updateUserConnections': function(users) {
                        console.log('updateUserConnections:');
                        console.log(users);
                        $rootScope.activeUsers = users;
                        $rootScope.$apply();
                    },
                    'updateRoomUsers': function(roomUsers) {
                        $rootScope.activeRoomUsers = roomUsers;
                        $rootScope.$apply();
                    },
                    'userConnect': function (username) {
                        //TODO: toast message about user connecting
                        console.log('userConnect: ' + username);
                    },
                    'listRooms': function(rooms) {
                        $rootScope.activeRooms = rooms;
                        $rootScope.$apply();
                    },
                    'descriptionUpdated': function(description) {
                        $rootScope.description = description;
                        $rootScope.$apply();
                    },
                    'voteRequested': function() {
                        console.log('Vote requested');
                    }
                },

                //server side methods
                methods: ['login', 'connectToRoom', 'disconnectFromRoom', 'listRooms', 'updateDescription', 'getUsername'],

                //query params sent on initial connection
                //queryParams: {
                //    'token': 'exampletoken'
                //},

                //handle connection error
                errorHandler: function(error) {
                    console.error(error);
                },

                hubDisconnected: function() {
                    if (hub.connection.lastError) {
                        hub.connection.start();
                    }
                }
                , logging: true
                , useSharedConnection: false
            });

            hub.promise.done(function(hubConnection) {
                hub.getUsername().done(function(username) {
                    if (username === 'TBD') {
                        $rootScope.username = prompt('What is your name?');
                        hub.login($rootScope.username);
                    } else {
                        $rootScope.username = username;
                    }
                    $rootScope.$apply();
                });
            });

            var connectToRoom = function(roomName) {
                hub.connectToRoom(roomName);
            };
            var disconnectFromRoom = function(roomName) {
                hub.disconnectFromRoom(roomName);
            };
            var listRooms = function() {
                hub.listRooms();
            };
            var updateDescription = function(roomName, description) {
                hub.updateDescription(roomName, description);
            };
            var requestVotes = function (roomName) {
                hub.requestVotes(roomName);
            };

            return {
                connectToRoom: connectToRoom,
                disconnectFromRoom: disconnectFromRoom,
                listRooms: listRooms,
                updateDescription: updateDescription,
                requestVotes: requestVotes
            };
        }]);
})();