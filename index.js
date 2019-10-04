const port = 3000
const host = "localhost"
const express = require("express")
const consign = require("consign")
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const app = express()
require('dotenv').config();

app.set("jwt", jwt);
app.set("mongoose", mongoose)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads')); // Liberar acesso a pasta uploads

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}`, { 
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
})
.then(() => console.log("conexão realizada com o MongoDB"))
.catch((err) => console.log("Erro ao realizar conexão com MongoDB: " + err))

consign({ cwd: 'src' })
    .include("models")
    .then("middlewares")
    .then("utils")
    .then("controllers")
    .then("routes")
    .into(app)


app.listen(port, host, function() {
    console.log(`Aplicação rodando no endereço ${host}:${port}`)
})
