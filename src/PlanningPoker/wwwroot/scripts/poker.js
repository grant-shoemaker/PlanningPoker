$(function () {
    $('#userName').text(prompt('What is your name?'));

    var poker = $.connection.pokerHub;

    poker.client.updateUserConnections = function (users) {
        $('#userList').empty();
        for (var i = 0; i < users.length; i++) {
            $('#userList').append('<li data-username="' + htmlEncode(users[i]) + '">' + htmlEncode(users[i]) + '</li>');
        }
    };

    poker.client.listRooms = function (rooms) {
        $('#roomList').empty();
        for (var i = 0; i < rooms.length; i++) {
            $('#roomList').append('<li data-roomName="' + htmlEncode(rooms[i]) + '">' + htmlEncode(rooms[i]) + '</li>');
        }
    };

    $.connection.hub.start().done(function () {
        poker.server.login($('#userName').text());

        poker.server.listRooms();

        $('#newRoomLink').click(function () {
            location = 'Poker/Room/' + $('#roomName').val();
            return false;
        });

        //$('#description').keyup(function () {
        //    poker.server.updateDescription($('#description').val());
        //});
    });

    var htmlEncode = function (value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    };
});