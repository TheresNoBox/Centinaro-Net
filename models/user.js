var mongoose = require('mongoose')
	, db = mongoose.createConnection('localhost', 'centinaroNet');

var userSchema = new mongoose.Schema({
	name: String,
	email: String
});


