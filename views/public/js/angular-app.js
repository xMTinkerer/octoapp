// Angular App
var octoapp = angular.module( 'octoapp', [ "ngMessages" ] );

octoapp.controller( 'octoController', function( $scope, $http, $timeout ){
	/*
	$scope.stacktrace.tripStacktrace.$error = { 
		submitted: false,
		error: false
	};

	$scope.cpuspike.cpuspikebutton.$error = {
		submitted: false,
		finished: false
	};
	*/


	$scope.makeerror = function( direction ) {

		var postData = {};

		
		$http.post( '/error/', postData )
		.then( function() { 
			
			$scope.errorform.errorbutton.$error = { 
				submitted: true,
				error: false
			}
			console.log( 'Success!' );

			$timeout( resetMessages( $scope.errorform.errorbutton ), 10*1000 );

		}, function() {

			$scope.errorform.errorbutton.$error = { 
				submitted: false,
				error: true
			}
		}); // error

	}



	$scope.makeMetrics = function( value ) {

		var postData = { "value": value };

		$scope.value = value;

		console.log( "Inside $scope.makeMetrics ..." );
		$http.post( '/metricmaker/', postData )
		.then( function() { 
			
			$scope.makemetricsform.makemetricsbutton.$error = { 
				submitted: true,
				error: false
			}

			$timeout( resetMessages( $scope.makemetricsform.makemetricsbutton ), 10*1000 );

		}, function() {

			$scope.makemetricsform.makemetricsbutton.$error = { 
				submitted: false,
				error: true
			}
		}); // error

	}

	$scope.tripStacktrace = function() {
	

		var postData = {
			name: "value"
		};

		$http.post( '/stacktracer/', postData )
		.then( function() { 
			console.log( 'Successful post!' );
			$scope.stacktrace.tripStacktrace.$error = { 
				submitted: true,
				error: false
			}

			$timeout( resetMessages( $scope.stacktrace.tripStacktrace ), 10*1000 );

		}, function() {
			console.log( 'Error posting!' );

			$scope.stacktrace.tripStacktrace.$error = { 
				submitted: false,
				error: true
			}
		}); // error

	};

	$scope.spikeCPU = function() {

		
		$scope.cpuspike.cpuspikebutton.$error = {
			submitted: true,
			finished: false
		};

		// Spike for 10 seconds
		var postData = {
			seconds: 10
		};

		//var deferred = $q.defer();

		$http.post( '/spikecpu', postData )
		.then( function() {  // success
			console.log( 'Successful post!' );
			$scope.cpuspike.cpuspikebutton.$error = {
				submitted: false,
				finished: true
			};

			$timeout( resetMessages( $scope.cpuspike.cpuspikebutton ), 10*1000 );



		}, function() {  // error
			console.log( 'Error posting!' );
		});

	};

    resetMessages = function( form ) {
    	form.$error = {
    		submitted: false,
    		error: false,
    		finished: false
    	}
    };

} );