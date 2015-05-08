$(function () {
    var poker = $.connection.pokerHub;

    poker.server.connectToRoom($('#roomId').val());

    poker.client.updateUserConnections = function (users) {
        $('#userList').empty();
        for (var i = 0; i < users.length; i++) {
            $('#userList').append('<li data-username="' + htmlEncode(users[i]) + '">' + htmlEncode(users[i]) + '</li>');
        }
    }
    poker.client.userConnect = function (username) {
        console.log(username + ' has joined the room.');
    }
    poker.client.userDisconnect = function (username) {
        console.log(username + ' has left the room.');
    }
    poker.client.userReconnect = function (username) {
        console.log(username + ' has rejoined the room.');
    }
    poker.client.descriptionUpdated = function (descr) {
        $('#descrDisplay').text(descr);
    }

    var htmlEncode = function (value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    };
});