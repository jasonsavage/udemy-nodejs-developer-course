import React, { Component } from 'react';

import '../css/styles.css';
import LoginView from './js/components/LoginView';
import ChatView from './components/ChatView';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isUserConnected: false
        };
    }

    handleLogin () {
        console.log('login');
    }

    render() {
        const {
            name,
            room,
            isUserConnected
        } = this.state;

        return !isUserConnected ? (
            <LoginView />
        ) : (
            <ChatView />
        );
    }
}

export default App;
