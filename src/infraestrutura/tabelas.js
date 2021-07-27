class Tabelas {
    init(conexao) {
        // this.conexao = conexao
        this.criarAtendimentos(conexao)
        //console.log('Tabelas foram criadas')
    }

    criarAtendimentos(conexao) {
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (
            id int NOT NULL AUTO_INCREMENT, 
            cliente varchar(50) NOT NULL,
            pet  varchar(20) NOT NULL, 
            servico varchar(20) NOT NULL, 
            status varchar(20) NOT NULL, 
            observacoes text, 
            PRIMARY KEY(id))`
        
        conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas()