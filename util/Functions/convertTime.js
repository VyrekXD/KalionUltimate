function milisegFromSeconds(asegundos){
    let milisec = asegundos * 1000
    return milisec
}

function milisegFromMinutes(aminutos){
    let milisec = aminutos * 60000
    return milisec
}

function milisegFromHours(ahoras){
    let milisec = ahoras * 3600000
    return milisec
}

function milisegFromDays(adias){
    let milisec = adias * 86400000
    return milisec
}

module.exports = {
    milisegFromSeconds,
    milisegFromMinutes,
    milisegFromHours,
    milisegFromDays
  };
