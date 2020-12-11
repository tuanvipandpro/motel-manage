const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000
// const routes = require('./routes')
require('dotenv').config() 

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// routes(app)

const db = require('./db')
app.get('/', (req, res) => {
    db.connect()

    db.query('SELECT * FROM account', (err, res) => {
        console.log(res.rows)
    })

    res.send(`<h2>App is running at: ${port}</h2>`)
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})