require('./config/config')
const http = require('http')
const path = require('path') // path is a node build-in module
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
//const publicPath = path.join(__dirname, '../public/index.html')
const port = process.env.PORT
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))
// app.get('/', (req, res) => {
//     res.sendFile(publicPath)
// })

io.on('connection', socket => {
    console.log('New user connected')

    // Welcome message -> socket.emit -> emit event to single connection
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', message => {
        console.log('createMessage', message)

        // io.emit -> emit event to all connections
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        // socket.broadcast.emit -> send message to everyone except creator
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(port, () => {
    console.log(`Start up at port ${port}`)
})