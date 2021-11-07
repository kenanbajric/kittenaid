// my imports 
const Product = require('../models/product');
const Post = require("../models/blog-post");

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

exports.updateProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    // photo

    try {
        const product = await Product.findById(productId);
        product.name = name;
        product.description = description;
        product.price = price;

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
        await Product.findByIdAndRemove(productId);
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