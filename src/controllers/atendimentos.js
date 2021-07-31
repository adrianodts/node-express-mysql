const Atendimento = require('../models/atendimento') 

module.exports = (app) => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const atendimento = req.body
        Atendimento.altera(atendimento, id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.exclui(id)
            .then(result => {
                if (result) {
                    res.status(204).json()
                }  else {
                    res.status(404).json({mensagem: "Cliente não encontrado"})
                }
            })
            .catch(error => {
                res.status(400).json(error)
            })
    })
}