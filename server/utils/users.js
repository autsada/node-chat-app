// [{
//     id: '/#12posoaboairba',
//     name: 'Auddy', // Display name
//     room: 'The Office Fans'
// }]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        const user = {id, name, room}
        this.users.push(user)
        //this.users = [...this.users, user]
        return user
    }

    removeUser(id) {
        const user = this.users.find(user => user.id === id)

        if (user) {
            this.users = this.users.filter(user => user.id !== id)
        }
        
        return user
    }

    getUser(id) {
        return this.users.find(user => user.id === id)
    }

    getUserList(room) {
        const users = this.users.filter(user => user.room === room)
        const usersName = users.map(user => user.name)

        return usersName
    }
}

module.exports = {Users}

// class Person {
//     constructor (name, age) {
//         this.name = name
//         this.age = age
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`
//     }
// }

// const me = new Person('Aut', 44)
// const description = me.getUserDescription()
// console.log(description)