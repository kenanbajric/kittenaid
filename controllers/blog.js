// my imports
const Post = require("../models/blog-post");

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(201).json({
            message: "Posts fetched successufully",
            posts: posts,
          });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
          }
    }
}