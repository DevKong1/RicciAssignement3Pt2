const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")

router
	.get("/players/getPlayers", controller.getPlayers) // GET players
    .post("/players/addOne", controller.addOne) // Adds a player
    .delete("/players/removePlayers", controller.removePlayers); // Removes defined players

module.exports = router