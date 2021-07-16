const exp = require('express');

const controllers = require('../controllers/controller');

const routes = exp.Router();

routes.get('/signup', controllers.signupGet);
routes.post('/signup', controllers.signupPost);
routes.get('/login', controllers.loginGet);
routes.post('/login', controllers.loginPost);
routes.get('/blogs', controllers.blogsGet);
routes.post('/blogs', controllers.createBlogPost);
routes.get('/blogs/create', controllers.createBlogGet);

module.exports = routes;