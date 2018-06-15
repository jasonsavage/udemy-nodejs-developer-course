import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { eventNames } from 'cluster';


export default class ChatView extends PureComponent {
    static propTypes = {
        room: PropTypes.string,
        onMessageFormSubmit: PropTypes.func,
        onSendLocation: PropTypes.func,
        users: PropTypes.array,
        messages: PropTypes.array
    }

    constructor(props) {
        super(props);

        this.state = {
            messageText: '',
        };
    }

    handleMessageFormSubmit (evt) {
        evt.preventDefault();
    }

    render () {
        const {
            room,
            users,
            messages,
            messageText
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
                                autofocus
                                autocomplete="off"
                                value={messageText}
                                onChange={ (evt) => this.setState({messageText: evt.target.value}) } />

                            <button type="submit">Send</button>
                        </form>

                        <button onClick={ onSendLocation }>Send Location</button>
                    </div>
                </div>
            </div>
        );
    }
}