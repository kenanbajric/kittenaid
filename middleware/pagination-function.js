

module.exports = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const sortBy = req.query.sortby;
        let orderBy = req.query.orderby; // could be 'asc' or 'desc'
        let results = {};

        try {
            // sorting
            if (orderBy === 'asc') {
                orderBy = +1;
            } else if (orderBy === 'desc') {
                orderBy = -1;
            } else {
                console.log('No sorting');
            }

            // pagination
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

            // query
            if (sortBy) {
                // query for sorting by given params
                results.products = await model.find().sort({[sortBy]: orderBy}).skip(startIndex).limit(limit);
            } else {
                // query with default sorting
                results.products = await model.find().skip(startIndex).limit(limit);
            }
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