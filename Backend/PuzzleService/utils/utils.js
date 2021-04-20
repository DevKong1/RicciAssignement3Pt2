// Retrieve query parameters from request (only $in)
exports.retrieveQueryParamsIn = function(req, ...args) {
    let query = {}
    for (var i = 0; i < args.length; i++) {
        if(req.query[args[i]] != null) {
            query[args[i]] = { 
                $in: req.query[args[i]]
            };
        }
    }
    return query
}