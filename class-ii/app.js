const express = require("express")
const app = express()

app.get('/', function(req, res){
    res.sendFile(__dirname + '/layouts/index.html')
})

app.listen(8081, function(){
    console.log("Servidor funcionando.")
})