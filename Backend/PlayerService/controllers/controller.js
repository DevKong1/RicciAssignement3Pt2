const Player = require("../models/playerModel")

// GET players
// If query contains IDs, only those
exports.getPlayers = async function(req, res) {
    // Retrieve desired playerIDs from request query
    let query = {};

    if(req.query.playerID != null) {
        query["playerID"] = { 
            $in: req.query.playerID
        };
    }

    try {
        let data = await Player.find(query).lean()
        res.json(data)
    } catch {
        res.status(500).json({error: "Cannot retrieve data from DB"})
    }
}


// Adds a player
exports.addOne = async function(req, res) {
    try {
        let data = await Player.create(req.body)
        res.json(data)
    } catch {
        res.status(400).json({error: "Invalid duplicate playerID or color"})
    }
}

// Removes specified players
exports.removePlayers = async function(req, res) {
    // Retrieve playerIDs from request query, if unset removes all
    let query = {};
    if(req.query.playerID != null) {
        query["playerID"] = { 
            $in: req.query.playerID
        };
    }

    try {
        await Player.deleteMany(query)
        res.json({result: "Success"})
    } catch {
        res.status(500).json({error: "Error removing data from DB"})
    }
}