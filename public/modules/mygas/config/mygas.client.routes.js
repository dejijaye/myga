'use strict';

//Setting up route
angular.module('mygas').config(['$stateProvider',
	function($stateProvider) {
		// Mygas state routing
		$stateProvider.
		state('listMygas', {
			url: '/mygas',
			templateUrl: 'modules/mygas/views/list-mygas.client.view.html'
		}).
		state('createMyga', {
			url: '/mygas/create',
			templateUrl: 'modules/mygas/views/create-myga.client.view.html'
		}).
		state('viewMyga', {
			url: '/mygas/:mygaId',
			templateUrl: 'modules/mygas/views/view-myga.client.view.html'
		}).
		state('editMyga', {
			url: '/mygas/:mygaId/edit',
			templateUrl: 'modules/mygas/views/edit-myga.client.view.html'
		});
	}
]);