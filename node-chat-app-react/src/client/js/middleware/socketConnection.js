import ChatSocketApi from "../api/ChatSocketApi";
import {
    SOCKET_INITIALIZE,
    SOCKET_CREATE_NEW_MESSAGE,
    SOCKET_CREATE_NEW_LOCATION_MESSAGE} from "../constants/constants";


const api = new ChatSocketApi();

const socketConnection = store => next => action => {

    if(action.type !== SOCKET_INITIALIZE
        && action.type !== SOCKET_CREATE_NEW_MESSAGE
        && action.type !== SOCKET_CREATE_NEW_LOCATION_MESSAGE) {
        return next(action);
    }

    if(action.type === SOCKET_INITIALIZE) {
        // setup socket connection
        api.initialize(store.dispatch);

        // join room
        api.joinRoom(action.payload);
    }

    if(action.type === SOCKET_CREATE_NEW_MESSAGE) {
        const username = store.getState().chat.name;
        api.sendMessage(username, action.message);
    }

    if(action.type === SOCKET_CREATE_NEW_LOCATION_MESSAGE) {
        const username = store.getState().chat.name;
        api.sendLocationMessage(username, action.latitude, action.longitude);
    }

    next(action);
};

export default socketConnection;
