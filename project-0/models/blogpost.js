const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogPost = new Schema({
    title:{
        type: String,
        required: [true, 'Please enter a title']
    },
    body:{
        type: String,
        required: [true, 'Please fill out the body']  
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogPost);

module.exports = Blog;