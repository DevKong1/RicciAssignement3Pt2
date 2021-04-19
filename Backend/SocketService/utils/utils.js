// TODO IN SOCKET
// Retruns a Random color different from the ones already in the database
exports.randomColor = async function() {
    try {
        let data = await Player.find().lean()
        do {
            var randomColor = Math.floor(Math.random()*16777215).toString(16)
        } while (data.filter(el => el.color == randomColor).length > 0)
        return randomColor
    } catch {
        console.log("Random color generation error")
    }
}