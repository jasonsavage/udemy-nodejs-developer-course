import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import App from './client/js/App';
import chat from './client/js/reducers/chat';
import socketConnection from './client/js/middleware/socketConnection';
import registerServiceWorker from './registerServiceWorker';

import './client/css/styles.css';


/**
 *
 * Combine Reducers
 *
 */
const rootReducer = combineReducers({
    chat
});

/**
 *
 * Setup Redux Store
 *
 */
const store = createStore(
    rootReducer,
    applyMiddleware(
        socketConnection
    )
);

/**
 *
 * Render to DOM
 *
 */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
