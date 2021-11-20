

module.exports = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let results = {};

        try {
            if (endIndex < await model.count()) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.products = await model.find().skip(startIndex).limit(limit);
            req.paginationResult = results;
            next();
        } catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        }
    }
}