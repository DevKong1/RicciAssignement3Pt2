const socket = require("socket.io")
const axios = require("axios")
const utils = require("./utils/utils")
const chalk = require("chalk")

exports.socket = async function(server) {
    const io = socket(server, {
        cors: {
          origin: '*',
        }
      })

      // Load .env variables
      const playerService = process.env.PLAYER_SERVICE
      const puzzleService = process.env.PUZZLE_SERVICE

    // Run when client connects
    io.on("connection", async client => {
        try {
            // Generate a random color for the new player
            let {data: oldPlayers} = await axios.get(playerService + "/players/getPlayers")
            var playerColor = utils.randomColor(oldPlayers.map(el => el.color)) 

            // Add the new player
            let {data: self} = await axios.post(playerService + "/players/addOne", { playerID: client.id, color: playerColor })
            client.emit("self", self)

            // Send updated player list to all
            let {data: players} = await axios.get(playerService + "/players/getPlayers")
            io.emit("players", players)

            // Send puzzle to player
            let {data: puzzle} = await axios.get(puzzleService + "/puzzle/getPuzzle")
            client.emit("puzzle", puzzle)

            console.log(chalk.hex(playerColor)(`New player connected: ${client.id}`))
        } catch {
            console.log(client.id + ": Error adding player")
            client.emit("error")
        }

        client.on("disconnect", async () => {
            try {            
                let {data: tile} = await axios.put(puzzleService + "/puzzle/deselectTile", { playerID: client.id })

                if(tile.length > 0){
                    io.emit("deselectedTile", tile)
                }

                let {data: players} = await axios.delete(playerService + "/players/removePlayers", { params: { playerID: client.id } })
                io.emit("players", players)

                console.log(chalk.hex(playerColor)(`${client.id} disconnected`))
            } catch {
                console.log(client.id + ": Error disconnecting client")
                client.emit("error")
            }
        })
        
        client.on("selectTile", async tile => {
            try {        
                let {data: data} = await axios.put(puzzleService + "/puzzle/selectTile", { tileID: tile, playerID: client.id })
                io.emit("selectedTile", data)

                console.log(chalk.hex(playerColor)(`${client.id} selected tile ${tile}`))
            } catch {
                console.log(client.id + ": Error selecting tile")
                client.emit("error")
            }
        })

        client.on("deselectTile", async tile => {
            try {            
                let {data: data} = await axios.put(puzzleService + "/puzzle/deselectTile", { tileID: tile })
                io.emit("deselectedTile", data)

                console.log(chalk.hex(playerColor)(`${client.id} deselected tile ${tile}`))
            } catch(e) {
                console.log(client.id + ": " + e)
                client.emit("error", e)
            }
        })

        client.on("swapTile", async tile => {
            try {            
                let {data: data} = await axios.put(puzzleService + "/puzzle/swapTiles", { tileID: tile, playerID: client.id  })
                io.emit("puzzle", data.data)

                console.log(chalk.hex(playerColor)(`${client.id} swapped selected tile with ${tile}`))

                // Check if puzzle is complete
                if(data.done){
                    io.emit("complete", client.id)

                    // Make a new puzzle
                    await axios.delete(puzzleService + "/puzzle/deletePuzzle")
                    let {data: puzzle} = await axios.get(puzzleService + "/puzzle/getPuzzle")
                    io.emit("puzzle", puzzle)

                    console.log(chalk.hex(playerColor)(`${client.id} has completed the puzzle thus a new puzzle has been generated!`))
                }
            } catch(e) {
                console.log(client.id + ": " + e)
                client.emit("error", e)
            }
        })
    })
}