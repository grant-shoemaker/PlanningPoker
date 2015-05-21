﻿/// <reference path="../lib/angular/angular.js" />
/// <reference path="../lib/lodash/lodash.js" />

(function() {
    'use strict';

    angular
        .module('pokerApp')
        .factory('pokerService', ['$rootScope', 'Hub', '$timeout', '$mdToast', function($rootScope, Hub, $timeout, $mdToast) {

            //declaring the hub connection
            var hub = new Hub('pokerHub', {

                //client side methods
                listeners: {
                    'updateUserConnections': function(users) {
                        $rootScope.activeUsers = users;
                        $rootScope.$apply();
                    },
                    'updateRoomUsers': function(updatedUsers) {
                        var oldUsers = _.map($rootScope.activeRoomUsers, function(u) { return u.Username; });
                        var newUsers = _.map(updatedUsers, function(u) { return u.Username; });

                        var removedUsers = _.difference(oldUsers, newUsers);
                        _.forEach(removedUsers, function(user) {
                            toastMessage(user + ' has left the room.');
                        });

                        var addedUsers = _.difference(newUsers, oldUsers);
                        _.forEach(addedUsers, function(user) {
                            toastMessage(user + ' has joined the room.');
                        });

                        $rootScope.activeRoomUsers = updatedUsers;
                        $rootScope.$apply();
                    },
                    'userConnect': function(username) {
                        toastMessage(username + ' has joined.');
                        console.log('userConnect: ' + username);
                    },
                    'userDisconnect': function(username) {
                        toastMessage(username + ' has left.');
                        console.log('userConnect: ' +username);
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
                methods: ['login', 'getUsername', 'connectToRoom', 'disconnectFromRoom', 'listRooms', 'updateDescription', 'requestVotes', 'submitVote', 'displayVotes', 'resetVotes'],

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
                    if (!username || username === 'TBD') {
                        $rootScope.username = prompt('What is your name?');
                        hub.login($rootScope.username);
                    } else {
                        $rootScope.username = username;
                    }
                    listRooms();
                    $rootScope.$apply();
                });
            });

            var toastMessage = function(msg) {
                $mdToast.show($mdToast.simple().content(msg));
            }

            var connectToRoom = function(roomName) {
                $rootScope.activeRoomUsers = null;
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
                if (cardValue === 'PASS')
                    cardValue = '-2';
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