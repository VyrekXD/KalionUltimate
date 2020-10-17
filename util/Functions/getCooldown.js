function getCooldown(aminutos, valor_db) {
    valor_db = parseInt(valor_db);
    if ([valor_db, aminutos].some(x => typeof x !== "number")) return console.log("Type Error: No has ingresado un numero");
    let tiempo = (aminutos * 60000) - (Date.now() - valor_db);
    let segundos = (tiempo / 1000) % 60
    let minutos = (tiempo / (1000 * 60)) % 60
    return { minutos, segundos, milisegundos: tiempo };
}

module.exports = { getCooldown }