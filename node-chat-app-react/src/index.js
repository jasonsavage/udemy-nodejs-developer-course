import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import './index.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';
import socketSagas from './js/sagas/socketSagas';

const store = createStore(
    todoApp,
    applyMiddleware(sagaMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
