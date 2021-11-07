// my imports 
const Product = require('../models/product');
const Post = require("../models/blog-post");
const fs = require('fs').promises;

exports.createPost = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        next(error);
        return;
    }
    const title = req.body.title;
    const text = req.body.text;
    const imageUrl = req.file.path;

    const post = new Post({
        title: title,
        text: text,
        imageUrl: imageUrl
    })

    try {
        await post.save();
        res.status(201).json({
            message: 'Blog post created successufully',
            post: post,
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.createProduct = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        next(error);
        return;
    }
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.file.path;

    const product = new Product({
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl
    });
    try {
        await product.save();
        res.status(201).json({
            message: 'Product created successufully',
            product: product,
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.updatePost = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        next(error);
        return;
    }

    const postId = req.params.postId;
    const updatedTitle = req.body.title;
    const updatedText = req.body.text;
    const updatedImageUrl = req.file.path;

    try {
        const post = await Post.findById(postId);

        await fs.unlink(post.imageUrl);
        
        post.title = updatedTitle;
        post.text = updatedText;
        post.imageUrl = updatedImageUrl;

        await post.save();
        res.status(201).json({
            message: 'Post updated successufully',
            post: post
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }

}

exports.updateProduct = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        next(error);
        return;
    }
    
    const productId = req.params.productId;
    const updatedName = req.body.name;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.file.path;
    
    try {
        const product = await Product.findById(productId);
        
        await fs.unlink(product.imageUrl);

        product.name = updatedName;
        product.description = updatedDescription;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;

        await product.save();
        res.status(201).json({
            message: 'Product updated successufully',
            product: product
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        await Product.findByIdAndRemove(productId);
        await fs.unlink(product.imageUrl);
        res.status(200).json({
            message: 'Product deleted successufully',
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    
    try {
        const post = await Post.findById(postId);
        console.log(post.imageUrl);
        await Post.findByIdAndRemove(postId);
        await fs.unlink(post.imageUrl);
        res.status(200).json({
            message: 'Post deleted successufully',
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}