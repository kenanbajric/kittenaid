// my imports
const Post = require("../models/blog-post");

exports.getPosts = async (req, res, next) => {
    try {
        res.status(201).json({
          message: "Posts fetched successufully",
          paginationResults: req.paginationResult,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.getPost = async (req, res, next) => {
    const productId = req.params.productId;
    
    try {
        const post = await Post.findById(productId);
        res.status(201).json({
            message: "Post fetched successufully",
            post: post,
          });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.upvotePost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        post.votes += 1;
        await post.save();
        res.status(201).json({
            message: "Vote registered successufully",
            post: post,
          });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}