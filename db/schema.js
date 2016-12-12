const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
   name:      { type: String },
   createdAt: { type: Date, default: Date.now }

})

const favSchema = new mongoose.Schema({
	'user_id': {type: String, required: true},
	'title': {type: String, required: true },
	'Images': Array,
	'MainImage': {
		'listing_id': {type: Number, required: true},
		'listing_image_id': Number,
		'url_75x75': String,
		'url_170x135': String,
		'url_570xN': String,
		'url_fullxfull': String
	},
	'Shop': {
		'currency_code': String,
		'shop_id': {type: String, required: true},
		'shop_name': {type: String, required: true},
		'title': String,
		'url': {type: String, required: true}
	},
	'description': String,
	'listing_id': {type: String, required: true, unique: true},
	'price': {type: String, required: true},
	'title': {type: String, required: true},
	'url': {type: String, required: true},
	'fav': {type: Boolean, default: true},
	'createdAt': { type: Date, default: Date.now }
})


module.exports = {
	User: mongoose.model('User', usersSchema),
	Fav: mongoose.model('Fav', favSchema)
}
