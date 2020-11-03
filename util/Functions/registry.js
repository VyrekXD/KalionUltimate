const fs = require("fs");
const path = require("path");
const getAll = (d, a = []) => {fs.readdirSync(path.join(__dirname, d)).filter(e => fs.lstatSync(path.join(__dirname, d, e)).isDirectory() || (e.endsWith(".js") || e.endsWith(".cjs"))).forEach(f => fs.lstatSync(path.join(__dirname, d, f)).isDirectory() ? (a = getAll(`${d}/${f}`, a)) : a.push(path.join(__dirname, d, "/", f)));return a;};

function registerStructures(Discord, dir) {
    for (const uwu of getAll(dir)) {
      const p = path.basename(uwu, ".js");
      try {
        let run = require(uwu);
        Discord.Structures.extend(p, run);
      } catch (err) {
        console.error(`La estructura: ${p} no funciona, error: ${err}`);
      }
    }
  }

module.exports = registerStructures;