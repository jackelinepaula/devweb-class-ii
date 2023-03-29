const db = require('./banco')

//Criando o molde de uma tabela do banco
const Agendamentos = db.sequelize.define("agendamentos", {
    //Campos da tabela
    nome:{
        //Tipo de dado do campo
        type: db.Sequelize.STRING
    },
    telefone:{
        type: db.Sequelize.STRING
    },
    origem:{
        type: db.Sequelize.STRING
    },
    data:{
        type: db.Sequelize.STRING
    },
    observacao:{
        type: db.Sequelize.TEXT
    }
    
})

// //Criação de tabela
// Agendamentos.sync({force: true})

//INSERTs
// Agendamentos.create({
//     nome: "Jackeline Paula",
//     endereco: "Avenida Maria Luiza Americano",
//     bairro: "Cidade Líder",
//     cep: 12345000,
//     cidade: "São Paulo",
//     estado: "São Paulo",
//     observacao: "Tudo na vida passa, até a uva passa"
// })

module.exports = Agendamentos