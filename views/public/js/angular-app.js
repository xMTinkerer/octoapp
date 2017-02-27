// Angular App
var octoapp = angular.module( 'octoapp', [ "ngMessages" ] );

octoapp.controller( 'octoController', function( $scope, $http ){
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

			setTimeout( function() { 
				console.log( 'Hello?' );
				$scope.stacktrace.tripStacktrace.$error = { 
					submitted: false,
					error: false
				}
			}, 5*1000 );
		}, function() {
			console.log( 'Error posting!' );

			$scope.stacktrace.tripStacktrace.$error = { 
				submitted: false,
				error: true
			}
		}); // error

	};

	$scope.spikeCPU = function() {

		console.log( 'SpikeCPU: ' + $scope.spikeCPUseconds );


			$scope.cpuspike.cpuspikebutton.$error = {
				submitted: true,
				finished: false
			};


		var postData = {
			seconds: $scope.spikeCPUseconds
		};

		//var deferred = $q.defer();

		$http.post( '/spikecpu', postData )
		.then( function() {  // success
			console.log( 'Successful post!' );
			$scope.cpuspike.cpuspikebutton.$error = {
				submitted: false,
				finished: true
			};

			setTimeout( function() { 
    			$scope.cpuspike.cpuspikebutton.$error = {
					submitted: false,
					finished: false
				};
  			}, 10*1000);


		}, function() {  // error
			console.log( 'Error posting!' );
		});

	};


} );