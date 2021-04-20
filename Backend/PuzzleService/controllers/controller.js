// Create a new puzzle
exports.newPuzzle = async function(req, res) {
    let puzzlePath = "../assets/puzzle.jpg"

    try {
        await this.deletePuzzle()
    } catch {
        res.status(400).json({error: ""})
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

