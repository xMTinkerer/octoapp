// Angular App
var octoapp = angular.module( 'octoapp', [ "ngMessages", "ngTagsInput", "xm-service" ] );

octoapp.controller( 'octoSimController', function( $scope, $http, $timeout, $q, $filter, XMService ){


   	$scope.allApps = [];
	$scope.oncallData = {};

   	$http.get( '/applications' ).then( resp => {
      	$scope.allApps = resp.data;
   	});

   	$scope.getRecipients = function( query ) {
	  	return XMService.searchGroups( query );
   	}

  	$scope.selectedRecipients = [];
  	$scope.selectedApp; // = "-- Select --"; 
  	$scope.is_finished = false;

 

   	$scope.getApplications = function( query ) {
      	var deferred = $q.defer();
      	deferred.resolve( $filter('filter')($scope.allApps, query) );
      	return deferred.promise;
   	}

   	$scope.selectApp = ( app ) => {
      	$scope.selectedApp = app;
   	}

	$scope.getOnCall = function( tag ) {
		$http.get( '/simulator/' + tag.targetName + '/on-call' ).then( resp => {
			$scope.oncallData[ tag.targetName ] = resp.data;
		});
	}

	$scope.removeOnCall = function( tag ) {
		delete $scope.oncallData[ tag.targetName ];
	}

	$scope.runSimulation = () => {

		if( !$scope.selectedApp ) {
			console.log( 'Select an application!' );
			$scope.simulatorForm.$invalid = true;
			return;
		}

		if( $scope.simulatorForm.$invalid ) {
			console.log( "Form is invaild. Check entries and try again" );
			return;
		}


		var recipients = $scope.selectedRecipients.map( item => { return item.targetName } );

		var postData = { 
			"recipients": recipients, 
			"application": $scope.selectedApp
		};

		$http.post( '/simulator/', postData )
		.then( function() { 
			console.log( 'Successful post!' );
			$scope.is_finished = true;
			$scope.theMessageHeader = "Success!";
			$scope.theMessage = "Successfully sent simulation";
			$timeout( function() { $scope.is_finished = false; }, 10*1000 );

		}, function() {
			console.log( 'Error posting!' );
			$scope.is_finished = true;
			$scope.theMessageHeader = "Error!";
			$scope.theMessage = "Errors happened. Check console and logs!";
			$timeout( function() { $scope.is_finished = false; }, 10*1000 );

		}); // error

	};




});

