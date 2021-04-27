const socket = require("socket.io")
const axios = require("axios")
const utils = require("./utils/utils")

// Load .env variables
const playerService = process.env.PLAYER_SERVICE
const puzzleService = process.env.PUZZLE_SERVICE

exports.socket = async function(server) {
    const io = socket(server)

    // Run when client connects
    io.on('connection', async client => {
        try {
            // Generate a random color for the new player
            let players = await axios.get(playerService + "/players/getPlayers")
            var playerColor = utils.randomColor(players.map(el => el.color))

            // Add the new player
            let self = await axios.post(playerService + "/players/addOne", { playerID: client.id, color: playerColor })
            client.emit("self", self)

            // Send updated player list to all
            players = await axios.get(playerService + "/players/getPlayers")
            io.emit("players", players)

            // Send puzzle to player
            let puzzle = await axios.get(puzzleService + "/puzzle/getPuzzle")
            client.emit("puzzle", puzzle)

            console.log(`New player connected: %c${client.id}` ,`color:${playerColor}`)
        } catch {
            console.log(client.id + ": Error adding player")
            client.emit("error")
        }

        
        client.on('selectTile', async tile => {
            try {            
                let data = await axios.put(puzzleService + "/puzzle/selectTile", { tileID: tile, playerID: client.id })
                io.emit("selectedTile", data)

                console.log(`%c${client.id} selected tile ${tile._id}` ,`color:${playerColor}`)
            } catch {
                console.log(client.id + ": Error selecting tile")
                client.emit("error")
            }
        })

        client.on('deselectTile', async tile => {
            try {            
                if(tile.selectedPlayer !== client.id) throw "Invalid player"

                let data = await axios.put(puzzleService + "/puzzle/deselectTile", { tileID: tile })
                io.emit("deselectedTile", data)

                console.log(`%c${client.id} deselected tile ${tile._id}` ,`color:${playerColor}`)
            } catch(e) {
                console.log(client.id + ": " + e)
                client.emit("error", e)
            }
        })

        client.on('swapTile;', async tile => {
            try {            
                let data = await axios.put(puzzleService + "/puzzle/swapTiles", { tileID: tile, playerID: client.id  })
                io.emit("puzzle", data.data)

                console.log(`%c${client.id} swapped selected tile with ${tile._id}` ,`color:${playerColor}`)

                // Check if puzzle is complete
                if(data.done){
                    io.emit("complete", client.id)

                    // Make a new puzzle
                    await axios.delete(puzzleService + "/puzzle/deletePuzzle")
                    let puzzle = await axios.get(puzzleService + "/puzzle/getPuzzle")
                    io.emit("puzzle", puzzle)

                    console.log(`%c${client.id} has completed the puzzle thus a new puzzle has been generated!` ,`color:${playerColor}`)
                }
            } catch(e) {
                console.log(client.id + ": " + e)
                client.emit("error", e)
            }
        })
    })
}