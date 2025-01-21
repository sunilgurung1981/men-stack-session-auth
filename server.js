const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session')
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// Require the router objects (we call them Controllers, Ctrl for short)
// Mount them at the end of the middleware chain
const authCtrl = require('./controllers/auth')


// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// setup the session
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true
}))

// The mounting of your controllers is ALWAYS at the end of the middleware chaiin,
// because our routers handle the responses to the client,
// and our middleware just does things to the request before the endpoint is reached
// mount our router objects onto the server
app.use('/auth', authCtrl)


// Landing Page
app.get('/', function(req, res){

	console.log(req.session, " <- req.sesssion")
	res.render('index.ejs', {user: req.session.user})
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
