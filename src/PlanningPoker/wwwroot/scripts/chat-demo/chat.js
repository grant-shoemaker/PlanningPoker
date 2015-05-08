$(function () {
    var chat = $.connection.chatHub;
    chat.client.addNewMessageToPage = function (name, message) {
        $('#discussion').append('<li><strong>' + htmlEncode(name) + '</strong>: ' + htmlEncode(message) + "</li>");
    };
    chat.client.userConnect = function (username) {
        $('#userList').append('<li data-username="' + htmlEncode(username) + '">' + htmlEncode(username) + '</li>');
        console.log(username + ' joined the room.');
    }
    chat.client.userDisconnect = function (username) {
        console.log(username + ' has left the room.');
        //try this...
        //$('#userList li[data-username=' + htmlEncode(username) + ']').remove();
    }
    chat.client.userReconnect = function (username) {
        console.log(username + ' has rejoined the room.');
    }

    $('#message').focus();

    $.connection.hub.start().done(function () {
        $('#sendMessage').click(function () {
            chat.server.send($('#message').val());
            $('#message').val('').focus();
        });
    });

    var htmlEncode = function (value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    };
});