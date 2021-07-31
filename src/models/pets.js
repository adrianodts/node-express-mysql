const conexao = require('../infraestrutura/database/conexao')
const uploadDeArquivo = require('../utils/uploadDeArquivos')

class Pet {

    listar(res) {
        const sql = "SELECT * FROM pets"
        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400)
            } else {
                if(result == undefined || result.length == 0) {
                    res.status(404).json({mensagem: "Pet não encontrado"})
                } else {
                    res.status(200).json(result)
                }
            }
        })
    }
    buscaPorId(id, res) {
        const sql = "SELECT * FROM pets where id=?"
        conexao.query(sql, id, (erro, result) => {
            if (erro) {
                res.status(400)
            } else {
                if(result == undefined || result.length == 0) {
                    res.status(404).json({mensagem: "Pet não encontrado"})
                } else {
                    res.status(200).json(result[0])
                }
            }
        })
    }
    adiciona(pet, res) {
        const sql = `INSERT INTO pets SET ?`
        // this.clienteEhValido = pet.cliente.length > 5
        // const erros = this.validacoes.filter(campo => !campo.valido)
        
        const existemErros = false; //erros.length
        
        if (existemErros) {
            res.status(400).json(erros) 
        } else {
            uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    pet.imagem = novoCaminho
                    conexao.query(sql, pet, (erro, result) => {
                        if (erro) {
                            res.status(400).json({erro})
                        } else {
                            this.buscaPorId(result.insertId, res)
                        }
                    })
                }
            })
        }
    }
}

module.exports = new Pet()