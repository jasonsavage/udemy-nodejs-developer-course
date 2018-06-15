import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


export default class ChatLocationMessage extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        url: PropTypes.string,
        createdAt: PropTypes.string
    }

    render () {
        const {
            name,
            url,
            createdAt
        } = this.props;

        return (
            <li className="message">
                <div className="message__title">
                    <h4>{name}</h4>
                    <span>{createdAt}</span>
                </div>
                <div className="message__body">
                    <p>
                        <a href={url} target="_blank">My current location</a>
                    </p>
                </div>
            </li>
        );
    }
}