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

//Criando o molde de uma tabela do banco
const Agendamentos = sequelize.define("agendamentos", {
    //Campos da tabela
    nome:{
        //Tipo de dado do campo
        type: Sequelize.STRING
    },
    telefone:{
        type: Sequelize.STRING
    },
    origem:{
        type: Sequelize.STRING
    },
    data:{
        type: Sequelize.STRING
    },
    observacao:{
        type: Sequelize.TEXT
    }
    
})

Agendamentos.sync({force: true})

// Agendamentos.create({
//     nome: "Jackeline Paula",
//     endereco: "Avenida Maria Luiza Americano",
//     bairro: "Cidade Líder",
//     cep: 12345000,
//     cidade: "São Paulo",
//     estado: "São Paulo",
//     observacao: "Tudo na vida passa, até a uva passa"
// })