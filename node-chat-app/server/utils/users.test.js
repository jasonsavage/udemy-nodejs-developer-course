const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {id: 1, name: 'Mike', room: 'Node Course'},
            {id: 2, name: 'Jen', room: 'React Course'},
            {id: 3, name: 'Julie', room: 'Node Course'}
        ]
    })

    it('should add new user', () => {
        // given
        const users = new Users();
        const user = {
            id: 123,
            name: 'jason',
            room: 'office'
        }
        // when
        const res = users.addUser(user.id, user.name, user.room);
        // then
        expect(users.users).toEqual([user]);

    });

    it('should remove user', () => {
        // given
        // when
        const res = users.removeUser(1);
        // then
        expect(res.name).toEqual('Mike');
        expect(users.users.length).toEqual(2);

    });

    it('should not remove user', () => {
        // given
        // when
        const res = users.removeUser(4);
        // then
        expect(res).toEqual(undefined);
        expect(users.users.length).toEqual(3);
    });

    it('should find user', () => {
        // given
        // when
        const res = users.getUser(1);
        // then
        expect(res.name).toEqual('Mike');
    });

    it('should NOT find user', () => {
        // given
        // when
        const res = users.getUser(4);
        // then
        expect(res).toEqual(undefined);
    });

    it('should return names for Node Course', () => {
        // given
        // when
        const res = users.getUserList('Node Course');
        // then
        expect(res).toEqual(['Mike', 'Julie']);

    });

    it('should return names for Node Course', () => {
        // given
        // when
        const res = users.getUserList('Node Course');
        // then
        expect(res).toEqual([users.users[0].name, users.users[2].name]);

    });
});