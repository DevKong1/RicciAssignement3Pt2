const utils = require("../utils/utils")

// Create a new puzzle
exports.newPuzzle = async function(req, res) {
    // Static value but potentially could be a new image uploaded by user
    const puzzlePath = "./assets/puzzle.jpg"

    try {
        //await this.deletePuzzle()   
        let data = await utils.sliceAndSaveTiles(puzzlePath, 3, 5)
        console.log(data)
        res.json(data)
    } catch {
        res.status(400).json({error: "err"})
    }
}

//
exports.getPuzzle = async function(req, res) {
    try {
    } catch {
        res.status(400).json({error: ""})
    }
}

//
exports.deletePuzzle = async function(req, res) {
    try {
    } catch {
        res.status(400).json({error: ""})
    }
}

//
exports.selectTile = async function(req, res) {
    try {
    } catch {
        res.status(400).json({error: ""})
    }
}

//
exports.deselectTile = async function(req, res) {
    try {
    } catch {
        res.status(400).json({error: ""})
    }
}

//
exports.swapTiles = async function(req, res) {
    try {
    } catch {
        res.status(400).json({error: ""})
    }
}

