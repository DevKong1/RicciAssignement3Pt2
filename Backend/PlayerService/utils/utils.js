// Retruns a Random color different fron existing ones
exports.getAll = function(existingColors) {
    try {
        let data = await Player.find().lean()
        res.json(data);
    } catch {
        res.status(400)
    }
};