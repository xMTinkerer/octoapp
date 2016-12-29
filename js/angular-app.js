// Angular App
var octoapp = angular.module( 'octoapp', [] );

octoapp.controller( 'octoController', ['$scope', function( $scope ){
	$scope.tripStacktrace = function() {
		console.log( 'Tripped!' );
	};


} ] );