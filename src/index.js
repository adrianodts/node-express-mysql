const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/database/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
require('dotenv/config')

const {
    APP_URL,
    APP_PORT
} = process.env

const app = customExpress()

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado ao bd')
        let tabelas = new Tabelas(conexao)
        tabelas.criarAtendimentos()
        tabelas.criarPets()
        app.listen(APP_PORT, () => console.log(`Servidor rodando: ${APP_URL}:${APP_PORT}`))
    }
})