const Sequelize = require("sequelize")
//'Nome' - 'Usuário' - 'Senha'
const sequelize = new Sequelize("test", "root", "",{
    //Local do banco
    host: "localhost",
    //Dialet é pra avisar com qual banco ele vai se comunicar
    dialect: "mysql"
})

//Autenticando a conexão com o banco
sequelize.authenticate().then(function(){
    console.log("Conectado ao banco")
}).catch(function(erro){
    console.log("Falha ao conectar: " + erro)
})

//Exportando a conexão com o banco
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}