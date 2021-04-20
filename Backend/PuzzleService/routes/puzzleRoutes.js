const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")

router
	.post("/puzzle/newPuzzle", controller.newPuzzle)
	.get("/puzzle/getPuzzle", controller.getPuzzle)
	.delete("/puzzle/deletePuzzle", controller.deletePuzzle)
	.put("/puzzle/selectTile", controller.selectTile)
	.put("/puzzle/deselectTile", controller.deselectTile)
	.put("/puzzle/swapTiles", controller.swapTiles);

module.exports = router