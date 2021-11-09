// core imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// my imports 
const User = require('../models/user.js');

exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    // dodati mogucnost uploada avatara 
    try {
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        });
        const result = await user.save();
        res.status(200).json({ message: 'User created.', userId: result._id })
    } catch {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({email: email});
        if (!user) {
            //error handler
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            const error = new Error('Wrong password.');
            error.statusCode = 401;
            throw next(error);
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        },
        'secret0secret1secret2secret3',
        { expiresIn: '5h' });
        res.status(200).json({ message: 'Login succeded', token: token });
    } catch {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.resetPw = async (req, res, next) => {
    // send auth token to mail, and then approve it to change password
}

exports.updatePw = async (req, res, next) => {
    const userId = req.userId;
    const oldPw = req.body.oldPw;
    const newPw = req.body.newPw;
    try {
        const user = await User.findOne({ _id: userId });
        const newHashedPw = await bcrypt.hash(newPw, 12);
        const isEqual = await bcrypt.compare(oldPw, user.password); //ovdje smo zapeli 
        if (!isEqual) {
            // error handler
        }        
        user.password = newHashedPw;
        await user.save();
        res.status(201).json({ message: 'Password updated!' })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}