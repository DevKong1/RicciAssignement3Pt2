const mongoose = require("mongoose")

const puzzleTileSchema = new mongoose.Schema({
    tileID: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    selectedPlayer: {
        type: String
    },
    position: {
        type: Number
    },
    finalPosition: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("puzzleTile", puzzleTileSchema)
