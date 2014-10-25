'use strict';

//Mygas service used to communicate Mygas REST endpoints
angular.module('mygas').factory('Mygas', ['$resource',
	function($resource) {
		return $resource('mygas/:mygaId', { mygaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);