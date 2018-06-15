
import {
    socketConnectAction,
    socketDisconnectAction,
    socketJoinFailedAction,
    socketJoinSuccessAction,
    socketUpdateUserListAction,
    socketNewMessageAction,
    socketNewLocationMessageAction
} from './actions/actions.js';

const io = window.io;

// events
const events = {
    connect: 'connect',
    disconnect: 'disconnect',
    updateUserList: 'updateUserList',
    newMessage: 'newMessage',
    newLocationMessage: 'newLocationMessage',
}

export function initializeSocket (dispatch, getState) {
    // create socket object
    socket = io();

    /**
     * 
     * Add Listeners
     * 
     */
    socket.on(events.connect, () =>  dispatch( socketConnectAction() ));
    socket.on(events.disconnect, () => dispatch( socketDisconnectAction(socket.id) ));
    socket.on(events.updateUserList, (users) => dispatch( socketUpdateUserListAction(users) ));
    socket.on(events.newMessage, (message) => dispatch( socketNewMessageAction(message) ));
    socket.on(events.newLocationMessage, (message) => dispatch( socketNewLocationMessageAction(message) ));

    return socket;
}

export function joinRoom (socket, params) {
    socket.emit('join', params, function (err, room) {
        if(err) {
            dispatch( socketJoinFailedAction(err) );
        } else {
            // server sends update room name
            dispatch( socketJoinSuccessAction(room) );
        }
    });
}