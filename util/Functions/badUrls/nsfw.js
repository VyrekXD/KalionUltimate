const deepai = require('deepai')
deepai.setApiKey('3a5e59c1-2157-4c76-ac0c-42a4b865db7e')

/**
 * Function that detects if the image has any NSFW content.
 *
 * @param {Buffer} image - The image to check.
 * @returns {Promise<boolean>} If it is NSFW it will give true, otherwise false.
 */
module.exports = async function (image) {
    const resp = await deepai.callStandardApi("nsfw-detector", { image });
    if(resp.output.nsfw_score > 0.5) return true;
    else return false;
}
