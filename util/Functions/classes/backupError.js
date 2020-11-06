class backupError extends Error {
    constructor(error){
        super()

        this.name = "BackupsError";

        /**
         * @param {string} - El error que quieres que salga
         * @private
         */
        this.message = error
    }
}

module.exports = backupError