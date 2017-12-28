// Angular App
var octoapp = angular.module( 'octoapp', [ "ngMessages", "ngTagsInput", "xm-service" ] );

octoapp.controller( 'octoSimController', function( $scope, $http, $timeout, XMService ){


   $scope.allApps = [];

   $http.get('/applications').then( resp => {
      $scope.allApps = resp.data;

   });


   $scope.getRecipients = function( query ) {

      return XMService.searchGroups( query );
   }


  $scope.selectedRecipients = [];
  $scope.selectedApp;




	$scope.runSimulation = () => {

		var recipients = $scope.selectedRecipients.map( item => { return item.targetName } );
		
		var postData = { 
			"recipients": recipients, 
			"application": $scope.selectedApp 
		};

		$http.post( '/simulator/', postData )
		.then( function() { 
			console.log( 'Successful post!' );

		}, function() {
			console.log( 'Error posting!' );

		}); // error

	};




});

