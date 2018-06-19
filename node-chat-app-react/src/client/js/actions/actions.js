import {
    SOCKET_INITIALIZE,
    SOCKET_CONNECT, 
    SOCKET_DISCONNECT,
    SOCKET_JOIN_SUCCESS,
    SOCKET_JOIN_FAILED,
    SOCKET_UPDATE_USER_LIST,
    SOCKET_NEW_MESSAGE,
    SOCKET_CREATE_NEW_MESSAGE,
    SOCKET_CREATE_NEW_LOCATION_MESSAGE} from "../constants/constants";


/**
 *
 * actions: client -> server
 *
 */

export const socketInitializeAction = (name, room) =>
    ({ type: SOCKET_INITIALIZE, payload: { name, room }});

export const socketCreateNewMessageAction = (message) =>
    ({ type: SOCKET_CREATE_NEW_MESSAGE, message });

export const socketCreateNewLocationMessageAction = (latitude, longitude) =>
    ({ type: SOCKET_CREATE_NEW_LOCATION_MESSAGE, latitude, longitude });


/**
 *
 * actions server -> client
 *
 */
export const socketConnectAction = () =>
    ({ type: SOCKET_CONNECT });

export const socketDisconnectAction = (socketId) =>
    ({ type: SOCKET_DISCONNECT, socketId });

export const socketJoinSuccessAction = (room) =>
    ({ type: SOCKET_JOIN_SUCCESS, room });

export const socketJoinFailedAction = (error) =>
    ({ type: SOCKET_JOIN_FAILED, error });

export const socketUpdateUserListAction = (users) =>
    ({ type: SOCKET_UPDATE_USER_LIST, users });

export const socketNewMessageAction = (message) =>
    ({ type: SOCKET_NEW_MESSAGE, message });
