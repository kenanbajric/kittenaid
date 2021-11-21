// .env imports
const { db_uri, port } = require('./env/config');

// core imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// my imports
const authRoutes = require('./routes/auth');
const aidReqFeed = require('./routes/aid-request');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const blogRoutes = require('./routes/blog');

const app = express();

// parsing requests
app.use(express.json()); 

// serve static files - for fetching
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// routes
app.use('/auth', authRoutes);
app.use('/feed', aidReqFeed);
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/blog', blogRoutes);

//error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error;
    res.status(status).json({ message: message, data: data })
})

// spinning up a server with database connection
mongoose
    .connect(db_uri)
    .then(result => {
        app.listen(port);
    })
    .catch(err => console.log(err));