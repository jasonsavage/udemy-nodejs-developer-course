import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { socketConnectAction } from '../actions';


class LoginView extends PureComponent {
    static propTypes = {
        onFormSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            room: '',
        };
    }

    handleFormSubmit (evt) {
        evt.preventDefault();

        const {name, room, onFormSubmit} = this.props;
        onFormSubmit(name, room);
    }

    render () {
        const {
            name,
            room
        } = this.state;

        return (
            <form onSubmit={ onFormSubmit }>
                <div className="form-field">
                    <h3>Join a Chat</h3>
                </div>
                <div className="form-field">
                    <label>Display name</label>
                    <input 
                        type="text" 
                        autofocus 
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
        );
    }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {
    onFormSubmit: (name, room) => dispatch(socketConnectAction(name, room))
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);