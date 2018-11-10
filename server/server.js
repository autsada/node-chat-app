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

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(port, () => {
    console.log(`Start up at port ${port}`)
})