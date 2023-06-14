const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('../projeto-web-5ea4d-firebase-adminsdk-pljt2-dccd9cd04c.json')


initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("index")
})

app.get("/consulta", function(req, res){
    const arr = []
    let obj = {}

    db.collection('agendamentos').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                obj = {
                    id: doc.id,
                    dataValues: doc.data()
                }
                arr.push(obj)
            });
            console.log(arr);
            res.render("consultar", {
                arr: arr
            })
    }).catch((error) => {
        console.error('Erro ao ler documentos: ', error);
    });
    
    
})

app.get("/editar/:id", (req, res) => {
    const {id} = req.params
    const arr = []
    let obj = {}

    db.collection('agendamentos').get(id)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                obj = {
                    id: doc.id,
                    dataValues: doc.data()
                }
                arr.push(obj)
            });
            res.render("atualizar", {
                data: arr
            })
    }).catch((error) => {
        console.error('Erro ao ler documentos: ', error);
    });
    
    
})

app.post("/atualizar/:id", function(req, res){
    const {id} = req.params
    console.log(id);
    db.collection('agendamentos').doc(id).update({
        nome_agendamento: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.date,
        observacao: req.body.obs
    })
    .then(() => {
        console.log('Documento atualizado com sucesso!');
        res.redirect("/consulta")
    })
      .catch((error) => {
        console.error('Erro ao atualizar documento: ', error);
    });
})

app.get("/excluir/:id", function(req, res){
    const {id} = req.params

    db.collection('agendamentos').doc(id).delete()
        .then(() => {
            console.log('Documento excluído com sucesso!');
            res.redirect("/")
        })
})

app.post("/cadastrar", function(req, res){
    db.collection('agendamentos').add({
        nome_agendamento: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.date,
        observacao: req.body.obs
    }).then(function(){
        console.log('Added document');
        res.redirect('/consulta')
    })
})

app.listen(8081, function(){
    console.log("Server funfante")
})