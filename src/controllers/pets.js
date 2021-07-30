const Pet = require('../models/pets')

module.exports = (app) => {
    app.get('/pets', (req, res) => {
        Pet.listar(res)
    })

    app.post('/pets', (req, res) => {
        Pet.adiciona(req.body, res)
    })
}