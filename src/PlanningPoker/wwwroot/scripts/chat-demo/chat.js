$(function () {
    var chat = $.connection.chatHub;
    chat.client.addNewMessageToPage = function (name, message) {
        $('#discussion').append('<li><strong>' + htmlEncode(name) + '</strong>: ' + htmlEncode(message) + "</li>");
    };
    $('#displayName').val(prompt('Enter your name:', ''));
    $('#message').focus();
    $.connection.hub.start().done(function () {
        $('#sendMessage').click(function () {
            chat.server.send($('#displayName').val(), $('#message').val());
            $('#message').val('').focus();
        });
    });
    var htmlEncode = function (value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    };
});
//# sourceMappingURL=chat.js.map