const PuzzleTile = require("../models/puzzleTileModel")
const utils = require("../utils/utils")
const fse = require("fs-extra")

// Static value but potentially could be a new image uploaded by user
const puzzlePath = "./assets/puzzle.jpg"
const cols = 5
const rows = 3

// Create a new puzzle
async function newPuzzle() {
    try {
        await PuzzleTile.deleteMany({})
        // Delete * from slices folder
        await fse.emptyDir(process.env.SLICES_PATH)
        
        let data = []
        let tiles = await utils.sliceAndSaveTiles(puzzlePath, rows, cols)
        let randomPositions = utils.randomTilePositions(cols*rows)
        for (let i = 0; i < (cols*rows); i++) {
            data.push(await PuzzleTile.create({source: tiles[i][1], position: randomPositions[i], finalPosition: tiles[i][0]}))
        }

        return utils.hideFinalPositions(JSON.parse(JSON.stringify(data)))      
    } catch {
        console.log("Error creating puzzle")
        return []
    }
}

// Gets all the Puzzle Tiles
exports.getPuzzle = async function(req, res) {
    try {
        let data = await PuzzleTile.find().lean()
        // If the puzzle hasn't been initialized
        if(data.length <= 0) {
            data = await newPuzzle()
        }

        res.json(utils.hideFinalPositions(data))
    } catch {
        res.status(500).json({error: "Error retrieving data from DB"})
    }
}

// Removes puzzle from DB and deletes all Tiles
exports.deletePuzzle = async function(req, res) {
    try {
        await PuzzleTile.deleteMany({})
        // Delete * from slices folder
        await fse.emptyDir(process.env.SLICES_PATH)

        res.json({result: "Success"})
    } catch {
        res.status(500).json({error: "Error removing data from DB"})
    }
}

// Sets the player for a tile
exports.selectTile = async function(req, res) {
    try {
        let selectedTile = await PuzzleTile.find({selectedPlayer: req.query.playerID}).lean()
        if(selectedTile.length > 0) throw "Player already selected a tile. Deselect it first or try swapTiles"

        let tile = await PuzzleTile.findById(req.query.tileID)
        if(tile == null) throw "Tile doesn't exist"
        if(tile.selectedPlayer != null) throw "Tile already selected by another player"

        tile.selectedPlayer = req.query.playerID
        await tile.save()
        res.json(utils.hideFinalPositions(JSON.parse(JSON.stringify(tile))))
    } catch(e) {
        res.status(400).json({error: e})
    }
}

// Removes the player for a tile
exports.deselectTile = async function(req, res) {
    try {
        let tile = await PuzzleTile.findById(req.query.tileID)
        if(tile == null) throw "Tile doesn't exist"
        if(tile.selectedPlayer == null) throw "Tile is not selected"

        tile.selectedPlayer = undefined
        await tile.save()
        res.json(utils.hideFinalPositions(JSON.parse(JSON.stringify(tile))))
    } catch(e) {
        res.status(400).json({error: e})
    }
}

// Swaps two tiles
exports.swapTiles = async function(req, res) {
    try {
        if(req.query.playerID == null || req.query.tileID == null) throw "Wrong query parameters error"

        // First tile to swap
        let selectedTile = await PuzzleTile.find({selectedPlayer: req.query.playerID})
        if(selectedTile.length <= 0) throw "No tile has been selected by the player"
        if(selectedTile.length > 1) throw "Internal error: multiple tiles selected by player"

        // Second tile to swap
        let tile = await PuzzleTile.findById(req.query.tileID)
        if(tile == null) throw "Tile doesn't exist"
        if(tile.selectedPlayer != undefined && tile.selectedPlayer != req.query.playerID) throw "Tile is already selected by another player"
        if(tile._id.equals(selectedTile[0]._id)) throw "Selected the same tile twice"

        await PuzzleTile.findByIdAndUpdate(selectedTile[0]._id, { position: tile.position })
        await PuzzleTile.findByIdAndUpdate(tile._id, { position: selectedTile[0].position })

        // Check if puzzle is correct
        let data = await PuzzleTile.find().lean()

        res.json({  data: data,
                    done: data.map(el => el.finalPosition == el.position)
                              .reduce((el1, el2) => el1 && el2) })

    } catch(e) {
        res.status(400).json({error: e})
    }
}

