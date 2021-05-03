const sharp = require("sharp")
const path = require("path")

// Retrieve query parameters from request (only $in)
exports.retrieveQueryParamsIn = function(req, ...args) {
    let query = {}
    for (let i = 0; i < args.length; i++) {
        if(req.query[args[i]] != null) {
            query[args[i]] = { 
                $in: req.query[args[i]]
            }
        }
    }
    return query
}

// Slice an image into tiles and returns URIs
exports.sliceAndSaveTiles = async function(image, rows, cols) {
    if(rows <= 1 || cols <=1) throw "Wrong parameters exception"

    let dimensions = await sharp(image).metadata()
    let tileWidth = Math.floor(dimensions.width/cols)
    let tileheight = Math.floor(dimensions.height/rows)

    let result = []
    let i = 0
    for (let x = 0; x < rows; x++) {      
        for (let y = 0; y < cols; y++) {
            //TODO File name is spoiler
            let file = path.join(process.env.SLICES_PATH, i + ".jpg")
            await sharp(image)
                  .extract({ width: tileWidth, height: tileheight, left: tileWidth*y, top: tileheight*x })
                  .toFile(file)
            result.push([i++, file])
        }
    }
    return result
}

// Generates an array of n elements, each represents a random position generated for a tile
exports.randomTilePositions = function(n) {
    const numbers = Array(n).fill().map((_, index) => index)
    return numbers.sort(() => Math.random() - 0.5)
}

// Hides the final positions for each tile
exports.hideFinalPositions = function(tiles) {
    if(!Array.isArray(tiles))
        tiles = [tiles]
    return tiles.map(({finalPosition, ...attributes}) => attributes)
}