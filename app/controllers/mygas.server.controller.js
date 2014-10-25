'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Myga = mongoose.model('Myga'),
	_ = require('lodash');

/**
 * Create a Myga
 */
exports.create = function(req, res) {
	var myga = new Myga(req.body);
	myga.user = req.user;

	myga.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(myga);
		}
	});
};

/**
 * Show the current Myga
 */
exports.read = function(req, res) {
	res.jsonp(req.myga);
};

/**
 * Update a Myga
 */
exports.update = function(req, res) {
	var myga = req.myga ;

	myga = _.extend(myga , req.body);

	myga.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(myga);
		}
	});
};

/**
 * Delete an Myga
 */
exports.delete = function(req, res) {
	var myga = req.myga ;

	myga.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(myga);
		}
	});
};

/**
 * List of Mygas
 */
exports.list = function(req, res) { Myga.find().sort('-created').populate('user', 'displayName').exec(function(err, mygas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mygas);
		}
	});
};

/**
 * Myga middleware
 */
exports.mygaByID = function(req, res, next, id) { Myga.findById(id).populate('user', 'displayName').exec(function(err, myga) {
		if (err) return next(err);
		if (! myga) return next(new Error('Failed to load Myga ' + id));
		req.myga = myga ;
		next();
	});
};

/**
 * Myga authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.myga.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};