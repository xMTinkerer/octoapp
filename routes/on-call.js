
const express   = require( 'express' );
const router    = express.Router();

const request   = require( 'request' );

const XM_USERNAME  = process.env.XM_USERNAME;
const XM_PASSWORD  = process.env.XM_PASSWORD;
const XM_HOST   = process.env.XM_HOST;

const { targetMap, tempOnCall } = require( '../data/data' );


router.get( '/on-call', function( req, res ) {
  
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





module.exports = router;