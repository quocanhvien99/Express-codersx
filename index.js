const express = require('express');

var indexRoute = require('./routes/index.route');
var userRoute = require('./routes/user.route'); 
var bookRoute = require('./routes/book.route.js');
var transactionRoute = require('./routes/transaction.route');
const app = express();
const port = 3000
app.set('views', './views') // specify the views directory
app.set('view engine', 'pug') // register the template engine
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/', indexRoute)
app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))