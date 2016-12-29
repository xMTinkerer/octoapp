// Angular App
var octoapp = angular.module( 'octoapp', [] );

octoapp.controller( 'octoController', function( $scope ){
	console.log( "hello?" );
	
	$scope.tripStacktrace = function() {
		console.log( 'Tripped!' );
	};


} );