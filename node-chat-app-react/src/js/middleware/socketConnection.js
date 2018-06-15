import { SOCKET_CONNECT } from "../constants/constants";
import { initializeSocket, joinRoom } from "../chatSocket";

export default socketConnection = store => next => action => {

    if(action.type === SOCKET_INITIALIZE) {
        // setup socket connection
        const socket = initializeSocket(store.dispatch, store.getState);
        // join room
        joinRoom(socket, action.payload);
        // add socket to action event
        action.socket = socket;
        // continue
    }
    return next(action);
}