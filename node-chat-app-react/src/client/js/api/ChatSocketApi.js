import openSocket from 'socket.io-client';
import {
    socketConnectAction,
    socketDisconnectAction,
    socketJoinFailedAction,
    socketJoinSuccessAction,
    socketUpdateUserListAction,
    socketNewMessageAction
} from '../actions/actions.js';


// events
const events = {
    // server -> client
    connect: 'connect',
    disconnect: 'disconnect',
    updateUserList: 'updateUserList',
    newMessage: 'newMessage',
    newLocationMessage: 'newLocationMessage',

    // client -> server
    join: 'join',
    createMessage: 'createMessage',
    createLocationMessage: 'createLocationMessage'
};

class ChatSocketApi {

    initialize (dispatch) {
        // create socket object
        this.socket = openSocket('http://localhost:3001');

        /**
         *
         * Add Listeners
         *
         */
        this.socket.on(events.connect, () =>  dispatch( socketConnectAction() ));
        this.socket.on(events.disconnect, () => dispatch( socketDisconnectAction(this.socket.id) ));
        this.socket.on(events.updateUserList, (users) => dispatch( socketUpdateUserListAction(users) ));
        this.socket.on(events.newMessage, (message) => dispatch( socketNewMessageAction(message) ));
        this.socket.on(events.newLocationMessage, (message) => dispatch( socketNewMessageAction(message) ));

        // handlers for join callbacks
        this.handleOnRoomJoinSuccess = (room) => dispatch( socketJoinSuccessAction(room) );
        this.handleOnRoomJoinFailed = (err) => dispatch( socketJoinFailedAction(err) );
    }

    joinRoom (params) {
        this.socket.emit(events.join, params, (err, room) => {
            if(err) {
                this.handleOnRoomJoinFailed(err);
            } else {
                this.handleOnRoomJoinSuccess(room)
            }
        });
    }

    sendMessage (from, text) {
        this.socket.emit(events.createMessage, {from, text});
    }

    sendLocationMessage (from, latitude, longitude) {
        this.socket.emit(events.createLocationMessage, {from, latitude, longitude});
    }
}

export default ChatSocketApi;
