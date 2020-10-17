const mongoose = require("mongoose");
module.exports = mongoose.connect('mongodb+srv://vyrekUser:tomas1254@clustervyrek.5xtzz.mongodb.net/database?retryWrites=true&w=majority', { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
    })