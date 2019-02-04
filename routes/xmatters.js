
const express   = require( 'express' );
const router    = express.Router();

const request   = require( 'request' );
const winston   = require( 'winston' );

const XM_USERNAME  = process.env.XM_USERNAME;
const XM_PASSWORD  = process.env.XM_PASSWORD;
const XM_HOST   = process.env.XM_HOST;


const { targetMap } = require( '../data/data' );

router.get( '/recipients', function( req, res ) {
  

   const query = req.query.search;

   const groups = getGroups( query, groups => {

      res.status( 200 ).send( groups );

   } );

  
});


router.get( '/on-call', function( req, res ) {
  
    //console.log( 'Data: ' + JSON.stringify( targetMap ) );

   const groups = targetMap.map( item => { return item.group } );

   const respData = {};

   const onCallData = getShiftData( groups, onCallData => {

      for( i in targetMap ){
         respData[ targetMap[i].product ] = getShift( targetMap[i].group, onCallData );
      };
      

      
      res.status( 200 ).send( respData );

   } );

  
});


getShiftData = function( groupsArr, cb ) {
  if( !XM_HOST || !XM_USERNAME || !XM_PASSWORD ) {

    winston.loggers.get( 'main' ).info( 'No xMatters details provided, skipping On call schedule retrieval' );
    cb( [] );
  }


	const options = {
		'uri': 'https://' + XM_HOST + '/api/xm/1/on-call?groups=' + groupsArr.map( item => { return encodeURIComponent( item ) }).join( ',' ),
		'method': 'GET',
		'json': true,
		'auth': {
			'username': XM_USERNAME,
			'password': XM_PASSWORD
		}
	};

	var data;

    request( options, (err, res, body ) => {
    	data = body.data;
    	cb( data );
    });

   
    
}


getShift = function( groupName, data ) {


  	for( i in data ) {
  		if( data[i].group.targetName == groupName )
  			return data[i];
  	}


};


getGroups = function( query, cb ) {


   if( !XM_HOST || !XM_USERNAME || !XM_PASSWORD ) {

      winston.loggers.get( 'main' ).info( 'No xMatters details provided, skipping group search' );
      cb( [] );
   }


   const options = {
      'uri': 'https://' + XM_HOST + '/api/xm/1/groups?search=' + encodeURIComponent( query ),
      'method': 'GET',
      'json': true,
      'auth': {
         'username': XM_USERNAME,
         'password': XM_PASSWORD
      }
   };

   var data;

   request( options, (err, res, body ) => {
      data = body.data;
      cb( data );
   });




}



module.exports = router;