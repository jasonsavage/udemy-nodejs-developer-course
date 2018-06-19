import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { socketInitializeAction } from '../actions/actions';


class JoinView extends PureComponent {
    static propTypes = {
        onFormSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = { name: '', room: '' };
    }

    handleFormSubmit (evt) {
        evt.preventDefault();

        const {name, room} = this.state;
        this.props.onFormSubmit(name, room);
    }

    render () {
        const {
            name,
            room
        } = this.state;

        return (
            <div className="centered-form">
                <div className="centered-form__form">
                    <form onSubmit={ this.handleFormSubmit.bind(this) }>
                        <div className="form-field">
                            <h3>Join a Chat</h3>
                        </div>
                        <div className="form-field">
                            <label>Display name</label>
                            <input
                                type="text"
                                autoFocus
                                value={ name }
                                onChange={ (evt) => this.setState({name: evt.target.value}) }  />
                        </div>
                        <div className="form-field">
                            <label>Room name</label>
                            <input
                                type="text"
                                value={ room }
                                onChange={ (evt) => this.setState({room: evt.target.value}) } />
                        </div>
                        <div className="form-field">
                            <button type="submit">Join</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onFormSubmit: (name, room) => dispatch(socketInitializeAction(name, room))
});

export default connect(null, mapDispatchToProps)(JoinView);
