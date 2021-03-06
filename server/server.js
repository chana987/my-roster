const express = require('express')
const app = express()
const path = require('path')
const api = require( './routes/api' )
const port = process.env.SERVER_PORT || 3000
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/nbaIDsDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use( '/', api )

app.listen(port, () => console.log(`Running server on port ${ port }`))