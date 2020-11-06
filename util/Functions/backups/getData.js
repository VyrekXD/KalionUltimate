const backupError = require("../classes/backupError");

async function getChannels(guild){
    if(!guild)throw new backupError('Necesitas poner una guild')
    if(!guild.id)throw new backupError('No incluiste un servidor correcto')

    
}