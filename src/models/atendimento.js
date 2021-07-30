const moment = require('moment')
const conexao = require('../infraestrutura/conexao')
class Atendimento {
    dataEhValida = true;
    clienteEhValido = true;
    data;
    validacoes = [
        { 
            nome: 'data',
            valido: this.dataEhValida,
            mensagem: `Data [${this.data}] deve ser maior ou igual a data atual`
        },
        { 
            nome: 'cliente',
            valido: this.clienteEhValido,
            mensagem: 'Cliente deve conter mais que 5 caracteres'
        }
    ]
    lista(res) {
        const sql = "SELECT * FROM atendimentos"
        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json({erro})
            } else {
                res.status(200).json(result)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`
        conexao.query(sql, {id}, (erro, result) => {
            const atendimento = result[0]
            if (erro) {
                res.status(400).json({erro})
            } else {
                if(atendimento == undefined || atendimento.length == 0) {
                    res.status(404).json({mensagem: "Cliente não encontrado"})
                } else {
                    res.status(200).json(atendimento)
                }
            }
        })
    }
    adiciona(atendimento, res) {
        const sql = `INSERT INTO atendimentos SET ?`
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        
        atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        this.data = atendimento.data
        this.dataEhValida = moment(this.data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = atendimento.cliente.length > 5

        const erros = this.validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros) 
        } else {
            conexao.query(sql, { ...atendimento, dataCriacao}, (erro, result) => {
                if (erro) {
                    res.status(400).json({erro})
                } else {
                    res.status(201).json({id: result.insertId})
                }
            })
        }
    }
    altera(id, atendimento, res){
        const sql = `UPDATE atendimentos SET ? WHERE id=?`
        if(atendimento.data) {
            atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
            this.data = atendimento.data
            this.dataEhValida = moment(this.data).isSameOrAfter(moment().format('YYYY-MM-DD HH:mm:ss'))
        }
        this.clienteEhValido = atendimento.cliente.length > 5

        const erros = this.validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros) 
        } else {
            conexao.query(sql, [{ ...atendimento }, id], (erro, result) => {
                if (erro) {
                    res.status(400).json({erro})
                } else {
                    this.buscaPorId(id, res)
                }
            })
        }
    }
    exclui(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id=?`
        conexao.query(sql, id, (erro, result) => {
            const atendimento = result[0]
            if (erro) {
                res.status(400).json({erro})
            } else {
                console.log(result)
                if(result.affectedRows > 0) {
                    res.status(204).json()
                } else {
                    res.status(404).json({mensagem: "Cliente não encontrado"})
                }
            }
        })
    }
}

module.exports = new Atendimento