'use strict';

// Mygas controller
angular.module('mygas').controller('MygasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mygas',
	function($scope, $stateParams, $location, Authentication, Mygas ) {
		$scope.authentication = Authentication;

		// Create new Myga
		$scope.create = function() {
			// Create new Myga object
			var myga = new Mygas ({
				name: this.name
			});

			// Redirect after save
			myga.$save(function(response) {
				$location.path('mygas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Myga
		$scope.remove = function( myga ) {
			if ( myga ) { myga.$remove();

				for (var i in $scope.mygas ) {
					if ($scope.mygas [i] === myga ) {
						$scope.mygas.splice(i, 1);
					}
				}
			} else {
				$scope.myga.$remove(function() {
					$location.path('mygas');
				});
			}
		};

		// Update existing Myga
		$scope.update = function() {
			var myga = $scope.myga ;

			myga.$update(function() {
				$location.path('mygas/' + myga._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mygas
		$scope.find = function() {
			$scope.mygas = Mygas.query();
		};

		// Find existing Myga
		$scope.findOne = function() {
			$scope.myga = Mygas.get({ 
				mygaId: $stateParams.mygaId
			});
		};
	}
]);