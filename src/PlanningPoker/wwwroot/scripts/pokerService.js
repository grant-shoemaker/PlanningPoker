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
                    'updateRoomUsers': function (roomUsers) {
                        console.log('updateRoomUsers:');
                        console.log(roomUsers);
                        $rootScope.activeRoomUsers = roomUsers;
                        $rootScope.$apply();
                    },
                    'userConnect': function(username) {
                        //TODO: toast message about user connecting
                        console.log('userConnect: ' + username);
                    },
                    'listRooms': function(rooms) {
                        $rootScope.activeRooms = rooms;
                        $rootScope.$apply();
                    },
                    'descriptionUpdated': function(descr) {
                        $rootScope.descr = descr;
                        $rootScope.$apply();
                    },
                    'voteRequested': function() {
                        $rootScope.voteNow = true;
                        $rootScope.$apply();
                    },
                    'votesReset': function () {
                        $rootScope.voteNow = false;
                        $rootScope.$apply();
                    }
                },

                //server side methods
                methods: ['login', 'getUsername', 'connectToRoom', 'disconnectFromRoom', 'listRooms', 'updateDescription', 'requestVotes', 'submitVote', 'resetVotes' ],

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
                //, logging: true
                //, useSharedConnection: false
            });

            hub.promise.done(function(hubConnection) {
                hub.getUsername().done(function(username) {
                    if (username === 'TBD') {
                        $rootScope.username = prompt('What is your name?');
                        hub.login($rootScope.username);
                    } else {
                        $rootScope.username = username;
                    }
                    listRooms();
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
            var submitVote = function(roomName, cardValue) {
                hub.submitVote(roomName, cardValue);
            };
            var resetVotes = function(roomName) {
                hub.resetVotes(roomName);
            };

            return {
                connectToRoom: connectToRoom,
                disconnectFromRoom: disconnectFromRoom,
                listRooms: listRooms,
                updateDescription: updateDescription,
                requestVotes: requestVotes,
                submitVote: submitVote,
                resetVotes: resetVotes
            };
        }]);
})();