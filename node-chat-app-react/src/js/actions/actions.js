import { 
    SOCKET_CONNECT, 
    SOCKET_DISCONNECT,
    SOCKET_JOIN_SUCCESS,
    SOCKET_JOIN_FAILED,
    SOCKET_UPDATE_USER_LIST,
    SOCKET_NEW_MESSAGE,
    SOCKET_NEW_LOCATION_MESSAGE } from "../constants/constants";
    

export function socketInitializeAction (name, room) {
    return {
        type: SOCKET_INITIALIZE,
        payload: { name, room }
    }
}

export function socketConnectAction () {
    return {
        type: SOCKET_CONNECT
    }
}

export function socketDisconnectAction (socketId) {
    return {
        type: SOCKET_DISCONNECT,
        socketId
    }
}

export function socketJoinSuccessAction (room) {
    return {
        type: SOCKET_JOIN_SUCCESS,
        room
    }
}

export function socketJoinFailedAction (error) {
    return {
        type: SOCKET_JOIN_FAILED,
        error
    }
}

export function socketUpdateUserListAction (users) {
    return {
        type: SOCKET_UPDATE_USER_LIST,
        users
    }
}

export function socketNewMessageAction (message) {
    return {
        type: SOCKET_NEW_MESSAGE,
        message
    }
}

export function socketNewLocationMessageAction (message) {
    return {
        type: SOCKET_NEW_LOCATION_MESSAGE,
        message
    }
}