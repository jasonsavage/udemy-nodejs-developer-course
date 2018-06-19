import {Record, List} from 'immutable';
import {
    SOCKET_DISCONNECT,
    SOCKET_INITIALIZE,
    SOCKET_JOIN_SUCCESS, SOCKET_NEW_LOCATION_MESSAGE,
    SOCKET_NEW_MESSAGE,
    SOCKET_UPDATE_USER_LIST
} from "../constants/constants";


const State = Record({
    didJoinRoom: false,
    name: null,
    room: null,
    users: new List(),
    messages: new List()
});

export default function chat (state=new State(), action) {
    switch(action.type) {
        case SOCKET_INITIALIZE:
            return state
                .set('name', action.name)
                .set('room', action.room);

        case SOCKET_JOIN_SUCCESS:
            return state
                .set('didJoinRoom', true)
                .set('room', action.room);

        case SOCKET_UPDATE_USER_LIST:
            return state
                .set('users', new List(action.users));

        case SOCKET_NEW_MESSAGE:
        case SOCKET_NEW_LOCATION_MESSAGE:
            return state
                .set('messages', state.messages.push(action.message));

        case SOCKET_DISCONNECT:
            return new State();

        default:
            return state;
    }
}
