const express = require('express')
const app = express()

const handlebars = require("express-handlebars").engine

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.get("/", function(req, res){
    res.render("first_page")
})

app.post("/cadastrar", function(req, res){
    res.send("Formulário recebido")
})

app.get("/sec", function(req, res){
    res.render("second_page")
})

app.listen(8081, function(){
    console.log("Servidor funfante")
})