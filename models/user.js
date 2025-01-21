const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String, // mongoose schema parameters (this would be what you would google for more options)
		required: true
	}, 
	password: {
		type: String, 
		required: true
	}
})

// create the model
const User = mongoose.model("User", userSchema)

// export it!
module.exports = User;