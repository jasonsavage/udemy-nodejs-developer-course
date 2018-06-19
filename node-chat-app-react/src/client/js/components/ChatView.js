import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ChatMessage from './ChatMessage';
import {socketCreateNewMessageAction, socketCreateNewLocationMessageAction} from "../actions/actions";


class ChatView extends PureComponent {
    static propTypes = {
        room: PropTypes.string,
        onMessageFormSubmit: PropTypes.func,
        onSendLocation: PropTypes.func,
        users: PropTypes.array,
        messages: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            messageText: '',
            isSendingLocation: false
        };
    }

    handleMessageFormSubmit (evt) {
        evt.preventDefault();
        this.props.onMessageFormSubmit(this.state.messageText);
        this.setState({ messageText: '' });
    }

    handleLocationMessageFormSubmit (evt) {
        evt.preventDefault();

        if(!navigator.geolocation) {
            return alert('Geolocation not supported by your brower.');
        }

        this.setState({ isSendingLocation: true });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ isSendingLocation: false });
                this.props.onSendLocation(position.coords.latitude, position.coords.longitude);
            },
            () => {
                alert('Unable to fetch location');
                this.setState({ isSendingLocation: false });
            });
    }

    render () {
        const {
            room,
            users,
            messages
        } = this.props;

        return (
            <div className="chat">
                <div className="chat__sidebar">
                    <h3>People</h3>
                    <div>
                        <ol>
                            { users.map((username) => <li>{username}</li>) }
                        </ol>
                    </div>
                    <p>{room}</p>
                </div>

                <div className="chat__main">
                    <ol className="chat__messages">
                        { messages.map((message) => <ChatMessage {...message} />) }
                    </ol>

                    <div className="chat__footer">
                        <form onSubmit={ this.handleMessageFormSubmit.bind(this) }>
                            <input
                                type="text"
                                placeholder="Message"
                                autoFocus
                                autoComplete="off"
                                value={this.state.messageText}
                                onChange={ (evt) => this.setState({messageText: evt.target.value}) } />

                            <button type="submit">Send</button>
                        </form>

                        <button
                            disabled={ this.state.isSendingLocation }
                            onClick={ this.handleLocationMessageFormSubmit.bind(this) }>Send Location</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    room: state.chat.room,
    users: state.chat.users,
    messages: state.chat.messages
});

const mapDispatchToProps = dispatch => ({
    onMessageFormSubmit: (text) => dispatch(socketCreateNewMessageAction(text)),
    onSendLocation: (latitude, longitude) => dispatch(socketCreateNewLocationMessageAction(latitude, longitude))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
