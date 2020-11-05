const fs = require('fs')
let totL = 0

function getLines(ruta){
    const files = fs.readdirSync(ruta, { withFileTypes: true})

    for(const file of files){
        let rutaArchivo = `./${ruta}/${file.name}`

        if(file.name.endsWith('.js')){
            let cantidad = fs.readFileSync(rutaArchivo).toString().split('\n').lenght

            totL += cantidad
        }else if(file.isDirectory()){
            if(file.name === 'node_modules') continue;

            getLines(rutaArchivo)
        }
    }
}

module.exports = {getLines, totL}