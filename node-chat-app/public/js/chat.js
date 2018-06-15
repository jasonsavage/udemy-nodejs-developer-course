var socket = io();
var $ = window.$;

var CREATE_MESSAGE = 'createMessage';
var NEW_MESSAGE = 'newMessage';
var CREATE_LOCATION_MESSAGE = 'createLocationMessage';
var NEW_LOCATION_MESSAGE = 'newLocationMessage';
var JOIN_ROOM = 'join';

var username = 'User';

/**
 *
 * Socket Listeners
 *
 */
socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit(JOIN_ROOM, params, function (err, room) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            $('#room-name').text(room);
            console.log('No Errors')
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server', socket.id);
});

socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');
    users.forEach(function (username) {
        ol.append($('<li></li>').text(username));
    });
    $('#users').html(ol);
});

socket.on(NEW_MESSAGE, function (message) {
    console.log('Got new message', message);
    renderTemplate("#message-template", message);
    scrollToBottom();
});

socket.on(NEW_LOCATION_MESSAGE, function (message) {
    renderTemplate("#location-message-template", message);
    scrollToBottom();
});

/**
 *
 * Handlers
 *
 */
var $messageForm = $('#message-form');
var $locationButton = $('#send-location');
var $messageTextbox = $('[name=message]');

$messageForm.on('submit', function (e) {
    e.preventDefault();

    socket.emit(CREATE_MESSAGE, {
        from: username,
        text: $messageTextbox.val()
    }, function () {
        $messageTextbox.val('');
    });
});

$locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your brower.');
    }

    $locationButton
        .attr('disabled', 'disabled')
        .text('Sending location...');

    navigator.geolocation.getCurrentPosition(
        function (position) {
            enableLocationButton();
            socket.emit(CREATE_LOCATION_MESSAGE, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        function () {
            alert('Unable to fetch location');
            enableLocationButton();
        });
});

/**
 *
 * Utils
 *
 */
function enableLocationButton () {
    $locationButton
        .removeAttr('disabled')
        .text('Send Location');
}

function renderTemplate (selector, message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $(selector).html();
    var li = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    $('#messages').append(li);
}

function scrollToBottom () {
    // selectors
    var $messages = $('#messages');
    var $newMessage = $messages.children('li:last-child');
    // heights
    var clientHeight = $messages.prop('clientHeight');
    var scrollTop = $messages.prop('scrollTop');
    var scrollHeight = $messages.prop('scrollHeight');
    var newMessageHeight = $newMessage.innerHeight();
    var lastMessageHeight = $newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        $messages.scrollTop(scrollHeight);
    }
}
