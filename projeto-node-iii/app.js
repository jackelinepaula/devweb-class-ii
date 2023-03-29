const express = require('express')
const app = express()

const handlebars = require('express-handlebars').engine

const bodyParser = require('body-parser')
const post = require('./models/post')

//Configurando o template engine 
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

//Configurando o body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("first_page")
})

//Os dados do form serão enviados via POST
app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.date,
        observacao: req.body.obs
    }).then(function(){
        res.send("Dados recebidos")
    }).catch(function(erro){
        res.send("Falha ao cadastrar: "+erro)
    })
})

app.get("/sec", function(req, res){
    res.render("second_page")
})

app.listen(8081, function(){
    console.log("Servidor funfante")
})