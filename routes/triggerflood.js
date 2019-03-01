// Stacktracer
const winston = require( 'winston' );
const express = require( 'express' );
const router  = express.Router();
const request = require( 'request' );


const FLOOD_ENDPOINT = process.env.FLOOD_ENDPOINT;

var logger = winston.loggers.get( 'main' );

router.post('/triggerFlood', function( req, res ) {
  
  var body = req.body;

  logger.info( 'Initating event flood' );

  triggerFlood( body )

  res.status( 200 ).send( 'Done' );
  return;

});



var triggerFlood = function( postData ) {

	if( !FLOOD_ENDPOINT ){
    logger.error( 'Error: FLOOD_ENDPOINT not set, cannot initiate flood' );
  }

  console.log( 'triggerFlood; num_events: ' + postData.num_events )

  num_events = ( postData.num_events ? postData.num_events : 5 );

  for( var e=0; e<=num_events; e++ ){

    const options = {
        'uri': FLOOD_ENDPOINT,
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json"
        },
        'json': true,
        'body': postData.payload
    };
    


    request( options, ( err, res, body ) => {
        if ( err )
            logger.error( err );
        logger.info( 'TriggerFlood trigger response: ' + JSON.stringify( body ) );

    });
    
  }

}




module.exports = router;