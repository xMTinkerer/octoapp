// Angular App
var octoapp = angular.module( 'octoapp', [ "ngMessages" ] );


octoapp.directive( 'onCall', function() {
	return {
		restrict: 'E',
		scope: {
        	product: '@',
        	oncalldata: '=oncalldata'
        },
		templateUrl: '/public/js/on-call-template.html'
	}
});

octoapp.controller( 'octoController', function( $scope, $http, $timeout ){


	$scope.oncallData = {};

	$http.get( '/on-call' ).then( resp => {
		$scope.oncallData = resp.data;

	},
	err => {
		console.log( "error getting on-call data" );
	});


	$scope.tripAppD = function() {

		var postData = { };

		$http.post( '/appdyn/', postData )
		.then( function() { 
			console.log( 'Successful post!' );
			$scope.appdynamics.tripAppDButton.$error = { 
				submitted: true,
				error: false
			}

			$timeout( resetMessages( $scope.appdynamics.tripAppDButton ), 10*1000 );

		}, function() {
			console.log( 'Error posting!' );

			$scope.appdynamics.tripAppDButton.$error = { 
				submitted: false,
				error: true
			}
		}); // error

	};

	$scope.tripDynatrace = function() {
		
	

		var postData = { };

		$http.post( '/dynatracer/', postData )
		.then( function() { 
			console.log( 'Successful post!' );
			$scope.dynatrace.tripDynatraceButton.$error = { 
				submitted: true,
				error: false
			}

			$timeout( resetMessages( $scope.dynatrace.tripDynatraceButton ), 10*1000 );

		}, function() {
			console.log( 'Error posting!' );

			$scope.dynatrace.tripDynatraceButton.$error = { 
				submitted: false,
				error: true
			}
		}); // error
	};



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
			$scope.stacktrace.tripStacktraceButton.$error = { 
				submitted: true,
				error: false
			}

			$timeout( resetMessages( $scope.stacktrace.tripStacktraceButton ), 10*1000 );

		}, function() {
			console.log( 'Error posting!' );

			$scope.stacktrace.tripStacktraceButton.$error = { 
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

		$scope.spikeCPUseconds = postData.seconds;

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