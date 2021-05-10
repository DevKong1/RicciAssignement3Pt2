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
        objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
        return utils.hideFinalPositions(JSON.parse(JSON.stringify(data)))      
    } catch {
        console.log("Error creating puzzle")
        return []
    }
}

// Gets all the Puzzle Tiles
exports.getPuzzle = async function(req, res) {
    try {
        let data = await PuzzleTile.find().sort("position").lean()
        // If the puzzle hasn't been initialized
        if(data.length <= 0) {
            data = await newPuzzle()
            data.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
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
        let selectedTile = await PuzzleTile.find({selectedPlayer: req.body.playerID}).lean()
        if(selectedTile.length > 0) throw "Player already selected a tile. Deselect it first or try swapTiles"

        let tile = await PuzzleTile.findById(req.body.tileID)
        if(tile == null) throw "Tile doesn't exist"
        if(tile.selectedPlayer != null) throw "Tile already selected by another player"

        tile.selectedPlayer = req.body.playerID
        await tile.save()
        res.json(utils.hideFinalPositions(JSON.parse(JSON.stringify(tile))))
    } catch(e) {
        res.status(400).json({error: e})
    }
}

// Removes the player for a tile
exports.deselectTile = async function(req, res) {
    try {
        let tile 
        // Deselect by tile ID
        if(req.body.tileID != null) {
            tile = await PuzzleTile.findById(req.body.tileID)
            if(tile == null) throw "Tile doesn't exist"
            if(tile.selectedPlayer == null) throw "Tile is not selected"

            tile.selectedPlayer = undefined
            await tile.save()
            res.json(utils.hideFinalPositions(JSON.parse(JSON.stringify(tile))))
        } 
        // Deselect by player ID
        else if(req.body.playerID != null) {
            tile = await PuzzleTile.find( { selectedPlayer: req.body.playerID } ).lean()     
            if (tile.length > 0) {
                tile[0].selectedPlayer = undefined
                await tile[0].save()
                res.json(utils.hideFinalPositions(JSON.parse(JSON.stringify(tile))))
            } else {
                res.json()
            }
        } else throw "No ID specified"
    } catch(e) {
        res.status(400).json({error: e})
    }
}

// Swaps two tiles
exports.swapTiles = async function(req, res) {
    try {
        if(req.body.playerID == null || req.body.tileID == null) throw "Wrong query parameters error"

        // First tile to swap
        let selectedTile = await PuzzleTile.find( { selectedPlayer: req.body.playerID } )
        if(selectedTile.length <= 0) throw "No tile has been selected by the player"
        if(selectedTile.length > 1) throw "Internal error: multiple tiles selected by player"

        // Second tile to swap
        let tile = await PuzzleTile.findById(req.body.tileID)
        if(tile == null) throw "Tile doesn't exist"
        if(tile.selectedPlayer != undefined && tile.selectedPlayer != req.body.playerID) throw "Tile is already selected by another player"
        if(tile._id.equals(selectedTile[0]._id)) throw "Selected the same tile twice"

        await PuzzleTile.findByIdAndUpdate(selectedTile[0]._id, { position: tile.position })
        await PuzzleTile.findByIdAndUpdate(tile._id, { position: selectedTile[0].position })

        // Check if puzzle is correct
        let data = await PuzzleTile.find().sort("position").lean()
        let done = data.map(el => el.finalPosition == el.position)
                       .reduce((el1, el2) => el1 && el2)
        
        // If it is delete it
        if(done) {    
            await PuzzleTile.deleteMany({})
            // Delete * from slices folder
            await fse.emptyDir(process.env.SLICES_PATH)
        }

        res.json({  data: data,
                    done: done })

    } catch(e) {
        res.status(400).json({error: e})
    }
}

