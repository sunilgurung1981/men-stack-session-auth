const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')


// import this module to hash our passwords
const bcrypt = require('bcrypt')


// full endpoint
// /auth/signup GET
router.get('/signup', function(req, res){

	// render looks inside of the views folder
	res.render('auth/signup.ejs')
})

// Full endpoint
// /auth/signin
router.get('/signin', function(req, res){
	res.render('auth/signin.ejs')
})

router.post('/sign-in', async function(req, res){

	// Check if the user exists in the db
	const userInTheDatabase = await UserModel.findOne({username: req.body.username})
	// ^ if UserModel.findOne doesn't find a user with that username
	// userInTheDatabase value will be undefined, otherwise it will be the object
	if(!userInTheDatabase){
		// you may have to log userInTheDatabase if things aren't working
		// like you think they are
		return res.send('Login Failed, Please Try again')
	}

	// use bcrypt to determine if the users password hash is mathmatically equilavant
	// to the plain text password from the form submission
	const validPassword = bcrypt.compareSync(req.body.password, userInTheDatabase.password)
	// validPassword will either be true or false
	if(!validPassword){
		res.send('Login Failed, Please Try again (PW match)')
	}
	


	
})


// full endpoint
// /auth/signup POST
router.post('/signup', async function(req, res){
	// Create a User!

	// Validation checks
	// Check to make sure there is no user with the same username
	// unique usernames
	const userInTheDatabase = await UserModel.findOne({username: req.body.username});
	if(userInTheDatabase){
		// return stops the function
		return res.send("Username already Taken!")
	}

	// check to make sure the passwords match
	if(req.body.password !== req.body.confirmPassword){
		return res.send('Passwords must match')
	}

	// Hash the Password
	const hashedPassword = bcrypt.hashSync(req.body.password, 10)
	// update the password value on our form object (req.body)
	req.body.password = hashedPassword;

	// create the user with the properties from req.body (our form)
	const userDoc = await UserModel.create(req.body)


	res.send(`Thanks for signingup ${userDoc.username}`)
})

// router will have all the http endpoints setup up on it for a particular resource, and we'll use the router in the server
module.exports = router