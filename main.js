const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000
const jwt = require('./src/utils/JwtUtils')
require('dotenv').config() 

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(jwt.verifyToken)

const routes = require('./routes')
routes(app)

// Home
app.get('/', (req, res) => {
    res.send(`<h2>App is running at: ${port}</h2>`)
})

// Start Server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})