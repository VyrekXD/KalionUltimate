const deepai = require('deepai')
const config = require('../../../config')
deepai.setApiKey(config.deepai)

module.exports = async function (image) {
    const resp = await deepai.callStandardApi("nsfw-detector", { image });
    if(resp.output.nsfw_score > 0.5) return true;
    else return false;
}
