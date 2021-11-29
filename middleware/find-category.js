module.exports = (model) => {
    return async (req, res, next) => {
        const categoryId = req.params.categoryId;
        let results = {};
        try {
            results.products = await model.find({ category: categoryId })
            req.categoryItems = results;
            next();
        } catch (err) {
            if(!err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        }
    }
}