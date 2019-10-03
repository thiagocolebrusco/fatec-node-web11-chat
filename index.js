const port = 3000
const host = "localhost"
const express = require("express")
const consign = require("consign")
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const app = express()

app.set("jwt", jwt);
app.set("mongoose", mongoose)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/nodejs-web11", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("conexão realizada com o MongoDB"))
    .catch((err) => console.log("Erro ao realizar conexão com MongoDB: " + err))

consign({ cwd: 'src' })
    .include("models")
    .then("middlewares")
    .then("controllers")
    .then("routes")
    .into(app)


app.listen(port, host, function() {
    console.log(`Aplicação rodando no endereço ${host}:${port}`)
})
