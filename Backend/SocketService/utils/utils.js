// Generates a random HEX color, different from others
exports.randomColor = function(colors) {
    let result
    do {
        result = "#" + Math.floor(Math.random()*16777215).toString(16)
    } while (colors.includes(result))
    return result
}