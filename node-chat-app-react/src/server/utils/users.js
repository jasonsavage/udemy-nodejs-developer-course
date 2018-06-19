

class Users {

    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser (id) {
        const user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((u) => u.id !== id);
        }
        return user;
    }
    
    getUser (id) {
        return this.users.filter((u) => u.id === id)[0];
    }

    getUserByName (name) {
        const username = (name || '').toLowerCase()
        return this.users.filter((u) => u.name.toLowerCase() === username)[0];
    }
    
    getUserList (room) {
        const users = this.users.filter((u) => u.room === room);
        return users.map((u) => u.name);
    }
}


module.exports = {Users};