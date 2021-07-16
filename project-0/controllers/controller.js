const {request, response} = require('express');
const Account = require('../models/accounts');
const Blog = require('../models/blogpost');

const errorCheck = error => {
    let errors = {
        username: '',
        password: ''
    }

    if(error.message == 'Incorrect username'){
        return errors.username = 'That username is not registered';
    }

    if(error.message == 'Incorrect password'){
        return errors.password = 'That password does not match';
    }

    if(error.code == 11000){
        return errors.username = 'That username is already registered';
    }
}

module.exports.signupPost = async (request, response) => {
    const credentials = {
        name: request.body.name,
        username: request.body.username,
        password: request.body.password
    }

    try {
        const acc = await Account.create(credentials);
        response.status(200).json({acc});
    } catch(err) {
        const e = errorCheck(err);
        response.status(400).json({e});
    }
}

module.exports.signupGet = (request, response) => {
    response.render('signup', {title: 'Sign Up'});
}

module.exports.loginPost = async (request, response) => {
    const credentials = Account.validate({
        username: request.body.username,
        password: request.body.password
    })

    try {
        const acc = await Account.login(credentials);
        response.status(200).json({acc});
    } catch(err) {
        const e = errorCheck(err);
        response.status(400).json({e});
    }
}

module.exports.loginGet = (request, response) => {
    response.render('login', {title: 'Login'});
}

module.exports.blogsGet = (request, response) => {
    Blog.find()
        .then(result => {
            response.render('blogs', {title:'Blogs', blogs: result});
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.createBlogPost = (request, response) => {
    const post = new Blog(request.body);
    post.save()
        .then(result => {
            response.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.createBlogGet = (request, response) => {
    response.render('create', {title: 'Post Blog'});
}