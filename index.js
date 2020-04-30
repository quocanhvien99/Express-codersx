require('dotenv').config();
const express = require('express');
var cookieParser = require('cookie-parser');
var indexRoute = require('./routes/index.route');
var userRoute = require('./routes/user.route'); 
var bookRoute = require('./routes/book.route.js');
var transactionRoute = require('./routes/transaction.route');
var loginRoute = require('./routes/login.route');
var requireAuth = require('./validate/auth.validate');

const app = express();
const port = 3000
app.set('views', './views') // specify the views directory
app.set('view engine', 'pug') // register the template engine
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use('/', indexRoute)
app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', requireAuth.auth, transactionRoute);
app.use('/login', loginRoute);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))