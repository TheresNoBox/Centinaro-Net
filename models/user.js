var mongoose = require('mongoose')
	, db = mongoose.connect('localhost', 'centinaroNet');


module.exports = new mongoose.Schema({
	name: String,
	email: String
});