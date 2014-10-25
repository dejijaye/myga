'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var mygas = require('../../app/controllers/mygas');

	// Mygas Routes
	app.route('/mygas')
		.get(mygas.list)
		.post(users.requiresLogin, mygas.create);

	app.route('/mygas/:mygaId')
		.get(mygas.read)
		.put(users.requiresLogin, mygas.hasAuthorization, mygas.update)
		.delete(users.requiresLogin, mygas.hasAuthorization, mygas.delete);

	// Finish by binding the Myga middleware
	app.param('mygaId', mygas.mygaByID);
};