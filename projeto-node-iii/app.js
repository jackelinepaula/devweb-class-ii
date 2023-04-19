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
        res.redirect("/consulta")
    }).catch(function(erro){
        res.send("Falha ao cadastrar: "+erro)
    })
})

//Pegando dados pra apresentar
app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("second_page", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados"+erro)
    })
})

//Rota para exclusão
app.get("/excluir/:id", function(req, res){
    post.destroy({
        where:{
            'id': req.params.id
        }
    }).then(() => {
        res.redirect("/consulta")
    }).catch((erro) => {
        console.log("Erro ao carregar dados"+erro);
    })
  
})

//Rota para a segunda página
app.get("/sec", function(req, res){
    res.render("second_page")
})

app.listen(8081, function(){
    console.log("Servidor funfante")
})