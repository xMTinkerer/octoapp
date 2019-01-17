// Stacktracer
const winston = require( 'winston' );
const express = require( 'express' );
const router  = express.Router();
const exec = require( 'child_process' ).exec;


router.post('/triggerFlood', function( req, res ) {
  
  var logger = winston.loggers.get( 'main' );

  var body = req.body;

  logger.info( 'Initating event flood' );



  res.status( 200 ).send( 'Done' );
  return;

});



triggerAlert = function( payload ) {

	

    var payload = { 
    	"properties": {
          "Number": "MI90897685",
          "Short Description": "This is a test of the flood control system",
          "Priority": "High"
      },
      "recipients": [{ "id": "tdepuy" }]
   };


    
    const options = {
        'uri': 'https://api.bigpanda.io/data/v2/alerts',
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json",
           "Authorization": "Bearer " + BIGPANDA_TOKEN
        },
        'json': true,
        'body': payload
    };
    
    var data;

    request( options, ( err, res, body ) => {
        if ( err )
            console.log( err );
    });
    

}




module.exports = router;