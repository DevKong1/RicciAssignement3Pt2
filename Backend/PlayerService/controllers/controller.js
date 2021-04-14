const Player = require("../models/playerModel");

// GET all players
exports.getAll = async function(req, res) {
    try {
        let data = await Player.find().lean()
        res.json(data);
    } catch {
        res.status(400)
    }
};

// GET a player given an ID
exports.getAll = async function(req, res) {
    try {
        let data = await Player.findById(req.params.playerID).lean()
        res.json(data);
    } catch {
        res.status(400)
    }
};

// Adds a player
exports.getAll = async function(req, res) {
    try {
        let data = await Player.findById(req.params.playerID).lean()
        res.json(data);
    } catch {
        res.status(400)
    }
};