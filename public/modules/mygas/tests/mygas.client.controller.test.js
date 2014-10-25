'use strict';

(function() {
	// Mygas Controller Spec
	describe('Mygas Controller Tests', function() {
		// Initialize global variables
		var MygasController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Mygas controller.
			MygasController = $controller('MygasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Myga object fetched from XHR', inject(function(Mygas) {
			// Create sample Myga using the Mygas service
			var sampleMyga = new Mygas({
				name: 'New Myga'
			});

			// Create a sample Mygas array that includes the new Myga
			var sampleMygas = [sampleMyga];

			// Set GET response
			$httpBackend.expectGET('mygas').respond(sampleMygas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mygas).toEqualData(sampleMygas);
		}));

		it('$scope.findOne() should create an array with one Myga object fetched from XHR using a mygaId URL parameter', inject(function(Mygas) {
			// Define a sample Myga object
			var sampleMyga = new Mygas({
				name: 'New Myga'
			});

			// Set the URL parameter
			$stateParams.mygaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mygas\/([0-9a-fA-F]{24})$/).respond(sampleMyga);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.myga).toEqualData(sampleMyga);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mygas) {
			// Create a sample Myga object
			var sampleMygaPostData = new Mygas({
				name: 'New Myga'
			});

			// Create a sample Myga response
			var sampleMygaResponse = new Mygas({
				_id: '525cf20451979dea2c000001',
				name: 'New Myga'
			});

			// Fixture mock form input values
			scope.name = 'New Myga';

			// Set POST response
			$httpBackend.expectPOST('mygas', sampleMygaPostData).respond(sampleMygaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Myga was created
			expect($location.path()).toBe('/mygas/' + sampleMygaResponse._id);
		}));

		it('$scope.update() should update a valid Myga', inject(function(Mygas) {
			// Define a sample Myga put data
			var sampleMygaPutData = new Mygas({
				_id: '525cf20451979dea2c000001',
				name: 'New Myga'
			});

			// Mock Myga in scope
			scope.myga = sampleMygaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/mygas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mygas/' + sampleMygaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid mygaId and remove the Myga from the scope', inject(function(Mygas) {
			// Create new Myga object
			var sampleMyga = new Mygas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mygas array and include the Myga
			scope.mygas = [sampleMyga];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mygas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMyga);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mygas.length).toBe(0);
		}));
	});
}());