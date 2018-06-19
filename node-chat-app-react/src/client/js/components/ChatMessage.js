import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


export default class ChatMessage extends PureComponent {
    static propTypes = {
        from: PropTypes.string,
        text: PropTypes.string,
        url: PropTypes.string,
        createdAt: PropTypes.string
    };

    render () {
        const {
            from,
            text,
            url,
            createdAt
        } = this.props;

        const formattedTime = moment(createdAt).format('h:mm a');

        return (
            <li className="message">
                <div className="message__title">
                    <h4>{from}</h4>
                    <span>{formattedTime}</span>
                </div>
                <div className="message__body">
                    { url ? (<a href={url} target="_blank">My current location</a>) : (<p>{text}</p>) }
                </div>
            </li>
        );
    }
}
