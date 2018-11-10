require('./config/config')
const express = require('express')
const path = require('path') // path is a node build-in module

const publicPath = path.join(__dirname, '../public')
//const publicPath = path.join(__dirname, '../public/index.html')
const app = express()
const port = process.env.PORT

app.use(express.static(publicPath))
// app.get('/', (req, res) => {
//     res.sendFile(publicPath)
// })

app.listen(port, () => {
    console.log(`Start up at port ${port}`)
})