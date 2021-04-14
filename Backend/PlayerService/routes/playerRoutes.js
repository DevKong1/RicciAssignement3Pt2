const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router
	.get("/players/getAll", controller.getPlayers) // GET all players
    .get("/players/getOne/:playerID") // GET a player given an ID
    .post("/players/addOne") // Adds a player
    .delete("/players/removeAll") // Removes all players
    .delete("/players/removeOne/:playerID") // Removes a player given an ID

module.exports = router;