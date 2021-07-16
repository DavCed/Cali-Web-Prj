const exp = require('express');
const mg = require('mongoose');
const routes = require('./routes/routes');

const app = exp();

app.set('view engine', 'ejs');

app.use(exp.static('pub'));
app.use(exp.json());

const db = 'mongodb+srv://chezzy:<password>@cluster0.if5wm.mongodb.net/calis?retryWrites=true&w=majority';
mg.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(data => app.listen(3000))
    .catch(err => console.log(err));

app.use(exp.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.render('home', {title: 'Home'});
});

app.get('/about', (request, response) => {
    response.render('about', {title: 'About'});
});

app.use(routes);

app.use((request, response) => {
    response.status(404).render('404', {title: 'Page Not Found'});
});