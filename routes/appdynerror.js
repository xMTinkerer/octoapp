// Error
const winston = require( 'winston' );
const express = require( 'express' );
const router  = express.Router();

const qs = require( 'querystring' );
const request   = require( 'request' );

const APPD_USERNAME = process.env.APPD_USERNAME;
const APPD_ACCOUNT  = process.env.APPD_ACCOUNT;
const APPD_PASSWORD = process.env.APPD_PASSWORD;

router.post('/appdyn', function( req, res ) {
  
  var payload = { 
    severity: 'ERROR',
    summary: 'Octoapp Error!',
    eventtype: 'CUSTOM',
    customeventtype: 'Manually Triggered',
    propertynames: [ 'key1', 'key2' ],
    propertyvalues: [ 'value1', 'value' ] 
  }
  
  postAppDError( payload );

  res.status( 200 ).send( 'Done' );

});


var postAppDError = function( payload ) {

	var APP = 'octoapp';

	if( !APPD_USERNAME || !APPD_ACCOUNT || !APPD_PASSWORD ) {
		winston.loggers.get( 'main' ).info( 'No AppDynamics details provided, skipping error post' );
	    return;
	}

	const options = {
		'uri': 'https://' + APPD_ACCOUNT + '.saas.appdynamics.com/controller/rest/applications/' + APP + '/events?' + qs.stringify( payload ),
		'method': 'POST',
		'auth': {
			'username': APPD_USERNAME + "@" + APPD_ACCOUNT,
			'password': APPD_PASSWORD
		}
	};

	var data;

    request( options, ( err, res, body ) => {
    	if( err ){
    		winston.loggers.get( 'main' ).info( 'Error posting to APPD: ' + err );
    		return;
    	}

    });

   
    
}



module.exports = router;


