'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Myga Schema
 */
var MygaSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Myga name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Myga', MygaSchema);