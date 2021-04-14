const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const jwt = require('./src/utils/JwtUtils')
require('dotenv').config() 
const path = require('path')

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:8080', 'https://tuanvipandpro.github.io'],
    credentials: true
}))

app.use(jwt.verifyToken)

const routes = require('./routes')
routes(app)

// Home
app.get('/', (req, res) => {
    // res.send(`<h2>App is running at: ${port}</h2>`) 
    res.sendFile(path.join(__dirname, 'public','index.html'))
})

// Start Server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})