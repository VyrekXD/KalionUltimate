async function dateInt(str){
        let result = "";
    for (let i = 0; i < str.length; i += 2) {
    (str.length - i < 2) ? 
    result += str.substring(i) 
    : result += str.substring(i, i + 2) + ":";
    }
return result;
}

module.exports = dateInt;