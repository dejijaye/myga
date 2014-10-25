'use strict';

// Configuring the Articles module
angular.module('mygas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Mygas', 'mygas', 'dropdown', '/mygas(/create)?');
		Menus.addSubMenuItem('topbar', 'mygas', 'List Mygas', 'mygas');
		Menus.addSubMenuItem('topbar', 'mygas', 'New Myga', 'mygas/create');
	}
]);