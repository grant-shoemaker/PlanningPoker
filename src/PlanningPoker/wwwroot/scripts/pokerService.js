(function () {
    'use strict';

    angular
        .module('pokerApp')
        .factory('pokerService', ['$rootScope', 'Hub', '$timeout', function ($rootScope, Hub, $timeout) {

            var Chats = this;

            // ViewModel
            var Chat = function (chat) {
                if (!chat) chat = {};

                var Chat = {
                    UserName: chat.UserName || 'TBD',
                    ChatMessage: chat.chatMessage || 'MessageTBD'
                }

                return Chat;
            }






            //declaring the hub connection
            var hub = new Hub('pokerHub', {

                //client side methods
                listeners: {
                    'updateUserConnections': function (users) {
                        console.log('updateUserConnections:');
                        console.log(users);
                        $rootScope.planningPokerUsers = users;
                    },
                    'userConnect': function (username) {
                        console.log('userConnect: ' + username);
                    },
                    'listRooms': function (rooms) {
                        console.log('listRooms:');
                        console.log(rooms);
                    },
                    'descriptionUpdated': function (description) {
                        console.log('descriptionUpdated: ' + description);
                    }
                    
                    //'lockEmployee': function (id) {
                    //    var employee = find(id);
                    //    employee.Locked = true;
                    //    $rootScope.$apply();
                    //},
                    //'unlockEmployee': function (id) {
                    //    var employee = find(id);
                    //    employee.Locked = false;
                    //    $rootScope.$apply();
                    //}
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

                //specify a non default root
                //rootPath: '/api

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

            //var edit = function (employee) {
            //    hub.lock(employee.Id); //Calling a server method
            //};
            //var done = function (employee) {
            //    hub.unlock(employee.Id); //Calling a server method
            //}

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