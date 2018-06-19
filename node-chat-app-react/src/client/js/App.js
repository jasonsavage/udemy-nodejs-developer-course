import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import JoinView from './components/JoinView';
import ChatView from './components/ChatView';
import '../css/styles.css';


class App extends Component {

    static propTypes = {
        didJoinRoom: PropTypes.bool
    };

    render() {
        return this.props.didJoinRoom
            ? <ChatView />
            : <JoinView />;
    }
}

const mapStateToProps = state => ({
    didJoinRoom: state.chat.didJoinRoom
});

export default connect(mapStateToProps)(App);
