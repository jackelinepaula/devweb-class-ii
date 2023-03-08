const Sequelize = require("sequilize")
//'Nome' - 'Usuário' - 'Senha'
const sequelize = new Sequelize("banco", "root", "",{
    //Local do banco
    host: "localhost",
    //Dialet é pra avisar com qual banco ele vai se comunicar
    dialet: "mysql"
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
    endereco:{
        type: Sequelize.STRING
    },
    bairro:{
        type: Sequelize.STRING
    },
    cep:{
        type: Sequelize.INTEGER
    },
    cidade:{
        type: Sequelize.STRING
    },
    estado:{
        type: Sequelize.STRING
    },
    observacao:{
        type: Sequelize.STRING
    }
    
})

//Agendamento.sync({force: true})

Agendamentos.create({
    nome: "Jackeline Paula",
    endereco: "Avenida Maria Luiza Americano",
    bairro: "Cidade Líder",
    cep: 12345000,
    cidade: "São Paulo",
    estado: "São Paulo",
    observacao: "Tudo na vida passa, até a uva passa"
})