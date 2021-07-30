const fs = require('fs')
const path = require('path')
require('dotenv/config')

const {
    FILE_PATH_STORAGE
} = process.env

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposArquivosValido = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const ehValido = tiposArquivosValido.indexOf(tipo.substring(1)) === -1
    if(ehValido) {
        const erro = {erro: `Tipo de arquivo: ['${tipo}'] não é válido.`}
        callbackImagemCriada(erro)
    } else {
        console.log(`Caminho: ${caminho}`)
        if (!fs.existsSync(caminho)) {
            const erro = {erro: `Arquivo: ['${caminho}'] não existe.`}
            callbackImagemCriada(erro)
        } else {
            const destino = path.join(`${FILE_PATH_STORAGE}${nomeDoArquivo}${tipo}`)
            fs.createReadStream(caminho)
                .pipe(fs.createWriteStream(destino))
                .on('finish', () => callbackImagemCriada(false, destino))
        }
    }
}