(function () {
    'use strict';

    angular
        .module('pokerApp', [ 'SignalR' ])
        .factory('pokerFactory', ['$rootScope', 'Hub', '$timeout', function ($rootScope, Hub, $timeout) {

            //declaring the hub connection
            var hub = new Hub('poker', {

                //client side methods
                listeners: {
                    'updateUserConnections': function (users) {
                    },
                    'userConnect': function(username) {
                    },
                    'listRooms': function(rooms) {
                    },
                    'descriptionUpdated': function(description) {
                    }//,
                    
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
                        hub.connection.start()
                            .done(function () {
                                if (hub.connection.state === 0) {
                                    $timeout(function () {
                                        //your code here 
                                        //TODO: call the login here?
                                    }, 2000);
                                } else {
                                    //your code here
                                }
                            })
                            .fail(function (reason) {
                                console.log(reason);
                            });
                    }
                }
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