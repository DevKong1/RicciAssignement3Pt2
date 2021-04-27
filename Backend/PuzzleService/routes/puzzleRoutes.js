const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")

router
	.get("/puzzle/getPuzzle", controller.getPuzzle)
	.delete("/puzzle/deletePuzzle", controller.deletePuzzle)
	.put("/puzzle/selectTile", controller.selectTile)
	.put("/puzzle/deselectTile", controller.deselectTile)
	.put("/puzzle/swapTiles", controller.swapTiles);

module.exports = router