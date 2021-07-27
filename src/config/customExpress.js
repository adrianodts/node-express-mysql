const express = require('express')
const consign = require('consign')
const app = express()

module.exports = () => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    consign()
      .include('./src/controllers')
      .into(app)

    return app
}