const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Martin',
            room: 'Node Course'
        }]
    })

    it('should add new user', () => {
        const roomOneUsers = new Users()
        const user = roomOneUsers.addUser('1', 'Aut', 'Room1')

        expect(roomOneUsers.users.length).toBe(1)
        expect(roomOneUsers.users).toEqual([user])
    })

    it('should remove a user', () => {
        const removedUser = users.removeUser('2')

        expect(removedUser).toEqual({
            id: '2',
            name: 'Jen',
            room: 'React Course'
        })
        expect(users.users.length).toBe(2)
    })

    it('should not remove user', () => {
        const removedUser = users.removeUser('4')

        expect(removedUser).toBe(undefined)
        expect(users.users.length).toBe(3)
    })

    it('should find a user', () => {
        const user = users.getUser('2')

        expect(user).toEqual({
            id: '2',
            name: 'Jen',
            room: 'React Course'
        })
        expect(users.users.length).toBe(3)
    })

    it('should not find user', () => {
        const user = users.getUser('4')

        expect(user).toBe(undefined)
    })

    it('should return names for Node Course', () => {
        const nodeUsers = users.getUserList('Node Course')

        expect(nodeUsers).toEqual(['Mike', 'Martin'])
    })

    it('should return names for React Course', () => {
        const reactUsers = users.getUserList('React Course')

        expect(reactUsers).toEqual(['Jen'])
    })
})