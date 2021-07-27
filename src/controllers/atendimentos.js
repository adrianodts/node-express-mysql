const Atendimento = require('../models/atendimento') 

module.exports = (app) => {
    app.get('/atendimentos', (req, res) => {
        res.send('Tudo ok com a rota.')
    })

    app.post('/atendimentos', (req, res) => {
        let atendimento = req.body
        Atendimento.adiciona(atendimento)

        res.json(atendimento)
    })
}