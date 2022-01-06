const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database
// A API de Promises do mongoose(mongoose.Promise) está depreciada, por isso iremos sobrescrever
// a API de Promises do mongoose(mongoose.Promise) pela API no NodeJS(global.Promise) 
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Teste
// server.get('/', (req, res, next) => res.send('backend'))

// Middlewares
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidators: true })

// Routes
Client.register(server, '/clients')

// Start Server
server.listen(3000)