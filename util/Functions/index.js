// -| Clases |- //

(async function handleCommands(dir = "classes") {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) {
            handleCommands(path.join(dir, file));
        } else {
            if (file.endsWith(".js")) {
                require(path.join(__dirname, dir, file));
            }
        }
  
    }
  })();