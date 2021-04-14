const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    playerID: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("players", playerSchema)
