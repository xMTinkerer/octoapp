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

octoapp.directive( 'buttonValidator', function (){ 
	return {
	   require: 'ngModel',
	   link: function(scope, elem, attr, ngModel) {
		   ngModel.$parsers.push( function() {
			  ngModel.$setValidity( 'submitted', false );
			  ngModel.$setValidity( 'error', false );
			  ngModel.$setValidity( 'finished', false );
		   });
	   }
	};
 });
 
octoapp.controller( 'octoController', function( $scope, $http, $timeout ){


	$scope.oncallData = {};

	$scope.num_events = 5;

	$http.get( '/on-call' ).then( resp => {
		$scope.oncallData = resp.data;

	},
	err => {
		console.log( "error getting on-call data" );
	});

	$scope.triggers = {
		"tripLog": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"tripAppD": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"tripBigPanda": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"tripDynatrace": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"tripStacktrace": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"tripMoogsoft": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"spikeCPU": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"makeError": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"makeMetrics": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"triggerFlood": {
			"submitted": false,
			"error": false,
			"finished": false
		},
		"tripCloudwatch": {
			"submitted": false,
			"error": false,
			"finished": false
		},
	}


	$scope.tripCloudwatch = function() {

		var postData = { };

		$http.post( '/cloudwatch/', postData )
		.then( function() { 
			$scope.triggers.tripCloudwatch = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.tripCloudwatch ) }, 10*1000 );

		}, function() {
			$scope.triggers.tripCloudwatch = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error

	}
	

	$scope.tripLog = function() {

		var postData = { };

		$http.post( '/stackdriver/', postData )
		.then( function() {
			$scope.triggers.tripLog = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.tripLog ) }, 10*1000 );

		}, function() {
			$scope.triggers.tripLog = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error
	};

	$scope.tripAppD = function() {

		var postData = { };

		$http.post( '/appdyn/', postData )
		.then( function() { 
			$scope.triggers.tripAppD = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.tripAppD ) }, 10*1000 );

		}, function() {
			$scope.triggers.tripAppD = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error

	};

	$scope.tripBigPanda = function() {
		var postData = { };

		$http.post( '/bigpanda/', postData )
		.then( function() {
			$scope.triggers.tripBigPanda.submitted = true;

			$timeout( function() { resetMessages( $scope.triggers.tripBigPanda ) }, 10*1000 );

		}, function() {
			$scope.triggers.tripBigPanda.error = true;
		});
	};

	$scope.tripDynatrace = function() {

		var postData = { };

		$http.post( '/dynatracer/', postData )
		.then( function() { 
			$scope.triggers.tripDynatrace = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.tripDynatrace ) }, 10*1000 );

		}, function() {
			$scope.triggers.tripDynatrace = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error
	};

	$scope.tripStacktrace = function() {

		var postData = {
			name: "value"
		};

		$http.post( '/stacktracer/', postData )
		.then( function() { 
			$scope.triggers.tripStacktrace = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.tripStacktrace ) }, 10*1000 );

		}, function() {
			$scope.triggers.tripStacktrace = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error

	};

	$scope.tripMoogsoft = function() {

		var postData = {
 			"signature":"my_test_box:application:Network",
 			"source_id":"198.51.100",
 			"external_id":"id-1234",
 			"manager":"my_manager",
 			"source":"my_test_box",
 			"class":"application",
 			"agent_location":"my_agent_location",
 			"type":"Network",
 			"severity":3,
 			"description":"high network utilization in application A",
 			"agent_time":Date.now().toString()
 		};

		$http.post( '/cowtipper/', postData )
		.then( function() { 
			$scope.triggers.tripMoogsoft = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.tripMoogsoft ) }, 10*1000 );

		}, function() {
			$scope.triggers.tripMoogsoft = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error

	};

	$scope.spikeCPU = function() {

		
		$scope.triggers.spikeCPU = {
			submitted: true,
			error: false,
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
			$timeout( function() { 
				$scope.triggers.spikeCPU = {
					submitted: false, 
					error: false, 
					finished: true 
				}
			}, postData.seconds*1000);

			$timeout( function() { resetMessages( $scope.triggers.spikeCPU ) }, (postData.seconds+10)*1000 );



		}, function() {  // error
			$timeout( function() { 
				$scope.triggers.spikeCPU = {
					submitted: false, 
					error: true, 
					finished: false 
				}
			}, postData.seconds*1000);

			$timeout( function() { resetMessages( $scope.triggers.spikeCPU ) }, (postData.seconds+10)*1000 );
		});

	};

	$scope.makeerror = function( direction ) {

		var postData = {};

		
		$http.post( '/error/', postData )
		.then( function() { 
			$scope.triggers.makeError = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.makeError ) }, 10*1000 );

		}, function() {
			$scope.triggers.makeError = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error

	}

	$scope.makeMetrics = function( value ) {

		var postData = { "value": value };

		$scope.value = value;

		$http.post( '/metricmaker/', postData )

		.then( function() { 
			$scope.triggers.makeMetrics = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.makeMetrics ) }, 10*1000 );

		}, function() {
			$scope.triggers.makeMetrics = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error

	}

	$scope.triggerFlood = function( ) {

		console.log( '$scope.num_events: ' + $scope.num_events );
		var postData = { 
			"payload": {
   	 		"properties": {
   	   	    "Alert Condition": "CPU > 80% for 5 minutes",
   	   	    "Severity": "High",
   	   	    "Impacted Application": "Steelbrick",
   	   	    "Details": "Agent on host app-host-central-1 had sustained CPU usage of 80% for more than 5 minutes."
   	   	},
   	   	"recipients": [{ "id": $scope.oncallData['TriggerFlood'].group.targetName }]
   	   },
   	   "num_events": $scope.num_events
   	};


		$http.post( '/triggerflood/', postData )

		.then( function() { 
			$scope.triggers.triggerFlood = { 
				submitted: true,
				error: false,
				finished: false
			}

			$timeout( function() { resetMessages( $scope.triggers.triggerFlood ) }, 10*1000 );

		}, function() {
			$scope.triggers.triggerFlood = { 
				submitted: false,
				error: true,
				finished: false
			}
		}); // error

	}

    resetMessages = function( form ) {
		form.submitted = false;
		form.error = false;
		form.finished = false;
    };

} );