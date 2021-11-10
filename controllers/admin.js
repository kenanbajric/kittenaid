// core imports
const fs = require('fs').promises;

// my imports 
const Product = require('../models/product');
const Post = require("../models/blog-post");
const Category = require("../models/category");

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
    const categories = req.body.categories;
    const product = new Product({
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        categories: categories
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

exports.createCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;
    const category = new Category({
        name: categoryName
    })
    try {
        await category.save();
        const categories = await Category.find();
        res.status(200).json({
            message: 'Category created successufully',
            categories: categories
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.deleteCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        await Category.findByIdAndRemove(categoryId);
        const categories = await Category.find();
        res.status(200).json({
            message: 'Category deleted successufully',
            categories: categories
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.updateCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const updatedCategoryName = req.body.categoryName;
    try {
        const category = await Category.findById(categoryId);
        category.name = updatedCategoryName;
        await category.save();
        const categories = await Category.find();
        res.status(200).json({
            message: 'Category updated successufully',
            categories: categories
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}