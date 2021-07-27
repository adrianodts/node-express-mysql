const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')
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
        Tabelas.init(conexao)
        app.listen(APP_PORT, () => console.log(`Servidor rodando: ${APP_URL}:${APP_PORT}`))
    }
})