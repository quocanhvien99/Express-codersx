require('dotenv').config();
const express = require('express');

var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var testRoute = require('./routes/test.route');

var apiRoute = require('./api/api.route');
var indexRoute = require('./routes/index.route');
var userRoute = require('./routes/user.route'); 
var bookRoute = require('./routes/book.route.js');
var transactionRoute = require('./routes/transaction.route');
var loginRoute = require('./routes/login.route');
var requireAuth = require('./validate/auth.validate');
var profileRoute = require('./routes/profile.route');
var session = require('./validate/session.validate');
var cartRoute = require('./routes/cart.route');
var cartTotal = require('./middlewares/cartTotal.middleware');

const app = express();
const port = 3000
app.set('views', './views') // specify the views directory
app.set('view engine', 'pug') // register the template engine
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.use('/api', apiRoute);

app.use(session);
app.use(cartTotal);
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', requireAuth.auth, transactionRoute);
app.use('/login', loginRoute);
app.use('/profile', requireAuth.auth, profileRoute);
app.use('/cart', cartRoute);

app.use('/test', testRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));