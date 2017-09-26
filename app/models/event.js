// Schema for Users
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	name: { type: String, required: true, unique: true },
	creator: { type: String, required: true },
	earliest: { type: Date, required: true },
	latest: {type: Date, required: true},
	duration: {type: Number, min: 0, required: true},
});

// export this schema to be used elsewhere
module.exports = mongoose.model('Event', EventSchema);