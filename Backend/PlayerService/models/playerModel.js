const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    playerID: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        unique: true,
        dropDups: true 
    }
});

module.exports = mongoose.model("players", playerSchema)
