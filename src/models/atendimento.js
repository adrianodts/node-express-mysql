const moment = require('moment')
const repositorio = require('../repositorios/atendimento')
class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (tamanho) => tamanho > 5
    
        this.valida = (parametros) => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]
            return !campo.valido(parametro)
        })
        this.validacoes = [
            { 
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: `Data deve ser maior ou igual a data atual`
            },
            { 
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve conter mais que 5 caracteres'
            }
        ]
    }
    lista() {
        return repositorio.lista()
            .then(result => {
                return result
            })
    }
    buscaPorId(id) {
        return repositorio.buscaPorId(id)
            .then(result => {
                return result
            })
    }
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const parametros = {
            data: { data, dataCriacao },
            cliente: atendimento.cliente.length
        }
        const error = this.valida(parametros)
        const existemErros = error.length

        if (existemErros) {
            return new Promise((reject) => reject(error))
        } else {
            return repositorio.adiciona({ ...atendimento, data, dataCriacao})
                .then(result => {
                    const id = result.insertId
                    return { id, ...atendimento}
                })
        }
    }
    altera(atendimento, id){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const parametros = {
            data: { data, dataCriacao },
            cliente: atendimento.cliente.length
        }
        const error = this.valida(parametros)
        const existemErros = error.length

        if (existemErros > 0) {
            return new Promise((reject) => reject(error))
        } else {
            return repositorio.atualiza({ ...atendimento, data }, id)
                .then(result => {
                    return { id, ...atendimento }
                })
        }
    }
    exclui(id) {
        return repositorio.exclui(id)
            .then(result => {
                return result.affectedRows > 0
            })
    }
}

module.exports = new Atendimento