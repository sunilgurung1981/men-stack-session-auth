const express = require('express')
const router = express.Router()

// full endpoint
// /auth/signup GET
router.get('/signup', function(req, res){

	// render looks inside of the views folder
	res.render('auth/signup.ejs')
})

// full endpoint
// /auth/signup POST
router.post('/signup', function(req, res){
	res.send('response from post router')
})

// router will have all the http endpoints setup up on it for a particular resource, and we'll use the router in the server
module.exports = router