/// <reference path="../lib/angular/angular.js" />
/// <reference path="../lib/lodash/lodash.js" />

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
                        $rootScope.activeUsers = users;
                        $rootScope.$apply();
                    },
                    'updateRoomUsers': function(updatedUsers) {
                        //TODO: get the current active room users, then update the current value instead of replacing it
                        //var users = $rootScope.activeRoomUsers;
                        $rootScope.activeRoomUsers = updatedUsers;
                        //var xxx = [];
                        //if (!$rootScope.activeRoomUsers) {
                        //    $rootScope.activeRoomUsers = updatedUsers;
                        //} else {
                        //    angular.forEach($rootScope.activeRoomUsers, function(user) {
                        //        if (!user) {
                        //            user = 
                        //        }
                        //        var match = _.find(updatedUsers, function(u) { return u.ConnectionId === user.ConnectionId; });
                        //        if (match) {
                        //            // update user info
                        //            user.Username = match.Username;
                        //            user.Vote = match.Vote;
                        //        } else {
                        //            // remove missing rows
                        //            _.remove($rootScope.activeUsers, function(u) { return u.ConnectionId === user.ConnectionId; });
                        //        }
                        //    });
                        //    angular.forEach(updatedUsers, function(user) {
                        //        var match = _.find($rootScope.activeRoomUsers, function(u) { return u.ConnectionId === user.ConnectionId; });
                        //        if (!match) {
                        //            // add empty rows
                        //            $rootScope.activeRoomUsers.push(match);
                        //        }
                        //    });
                        //}
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
                        $rootScope.revealVotes = false;
                        $rootScope.$apply();
                    },
                    'votesReveal': function() {
                        $rootScope.revealVotes = true;
                        $rootScope.voteNow = false;
                        $rootScope.$apply();
                    },
                    'votesReset': function () {
                        $rootScope.voteNow = false;
                        $rootScope.$apply();
                    }
                },

                //server side methods
                methods: ['login', 'getUsername', 'connectToRoom', 'disconnectFromRoom', 'listRooms', 'updateDescription', 'requestVotes', 'submitVote', 'displayVotes', 'resetVotes' ],

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
                $rootScope.voteNow = false;
                //$rootScope.$apply(); // apply will be called on the subsequent call to the client back from the server
            };
            var displayVotes = function(roomName) {
                hub.displayVotes(roomName);
            }
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
                displayVotes: displayVotes,
                resetVotes: resetVotes
            };
        }]);
})();