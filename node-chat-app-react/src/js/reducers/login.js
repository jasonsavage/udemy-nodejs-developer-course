import {Record} from 'immutable';

const State = Record({
    name: null,
    room: null
})

export default function login (state=new State(), action) {
    switch(action.type) {
        case AUTH_LOGIN:
            return state
                .set('name', action.name)
                .set('room', action.room);

        case AUTH_LOGOUT:
            return new State();
    }
}
