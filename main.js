const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const jwt = require('./src/utils/JwtUtils')
require('dotenv').config() 

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // res.header("Access-Control-Allow-Origin", '*');
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

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