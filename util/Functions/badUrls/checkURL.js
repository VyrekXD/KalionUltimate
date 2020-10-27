const sites = require('./badassets/nosites.json')
const doYouThinkIsPorn = require('is-porn')
const { promisify } = require('util')
const watIsPorn = promisify(doYouThinkIsPorn)
const data = require('./badassets/nosites.json')

module.exports = async function checkSingleCleanURL(urlFromReq) {
    let parsedUrl = new URL(urlFromReq);
    let host = parsedUrl.host || parsedUrl.pathname.trim().split("/")[0];
    if (host in data) return true;
    let thing = host.split(".");
    let check1 = thing.slice(thing.length - 2).join(".");
    let check2 = "www." + check1;
    if (check2 in data) return true;
    if (!host.startsWith('www.')) host = `www.${host}`;
    if (host in data) return true;
    const cosas = await watIsPorn(check1);
    if (cosas) return true;
    return false;
}