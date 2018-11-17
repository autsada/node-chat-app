require('./config/config')
const http = require('http')
const path = require('path') // path is a node build-in module
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
    console.log('New user connected')

    // Welcome message -> socket.emit -> emit event to single connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))

    // socket.broadcast.emit -> send message to everyone except creator
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)

        // io.emit -> emit event to all connections
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server')
    })

    socket.on('createLocationMessage', coords => {
        console.log(coords)
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longiture))
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(port, () => {
    console.log(`Start up at port ${port}`)
})