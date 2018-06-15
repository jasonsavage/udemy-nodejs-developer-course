import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export default class ChatMessage extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        text: PropTypes.string,
        createdAt: PropTypes.string
    }

    render () {
        const {
            name,
            text,
            createdAt
        } = this.props;

        return (
            <li className="message">
                <div className="message__title">
                    <h4>{name}</h4>
                    <span>{createdAt}</span>
                </div>
                <div className="message__body">
                    <p>{text}</p>
                </div>
            </li>
        );
    }
}