// Stacktracer
const express = require( 'express' );
const router  = express.Router();

const request = require( 'request' );

const DATADOG_API_KEY = process.env.DATADOG_API_KEY;
const DATADOG_ENDPOINT = process.env.DATADOG_ENDPOINT;

router.post('/datadog', function( req, res ) {
    
    var body = req.body;
      
      createAlert( body );
    
      res.status( 200 ).send( 'Done' );
    
    });
    
var createAlert = function( payload ) {
       
    const options = {
        'uri': DATADOG_ENDPOINT + DATADOG_API_KEY,
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json",
        },
        'json': true,
        'body': payload
    };

    var data;

    request( options, ( err, res, body ) => {
        if ( err )
            console.log( err );
        data = res;
    });

}
    
    
    
    module.exports = router;
    
