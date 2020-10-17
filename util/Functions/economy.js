async function getMoney(usuario, server) {
    const moneyModel = require('../../database/models/dinero')
    let consulta = await moneyModel.findOne({servidor: server.id, usuario: usuario})

    return {dinero: consulta.dinero, banco: consulta.banco, dinerotot: consulta.dinerotot} || {}
}

module.exports = { getMoney }