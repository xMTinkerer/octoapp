angular.module( 'xm-service', [ ] ).service( 'XMService', function ($q, $http ) {


  this.searchGroups = function( query ) {

  	var deferred = $q.defer();

   $http.get( '/recipients?search=' + encodeURIComponent( query ) ).then( resp => {
      deferred.resolve( resp.data );

   },
	err => {
		console.log( "error getting recipient data" );
	});

  	 return deferred.promise;
  }


});
