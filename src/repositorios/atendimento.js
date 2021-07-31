const query = require('../infraestrutura/database/queries')

class Atendimento {
    lista() {
        const sql = 'SELECT * FROM atendimentos'
        return query(sql)
    }
    
    buscaPorId(id) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`
        return query(sql)
    }

    adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?'
        return query(sql, atendimento)
    }

    atualiza(atendimento, id) {
        const sql = `UPDATE atendimentos SET ? WHERE id=${id}`
        return query(sql, atendimento)
    }

    exclui(id) {
        const sql = `DELETE FROM atendimentos WHERE id=${id}`
        return query(sql)
    }
}

module.exports = new Atendimento()