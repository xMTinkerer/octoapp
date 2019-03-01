// Stacktracer
const express = require( 'express' );
const router  = express.Router();

const request = require( 'request' );

const CLOUDWATCH_API_KEY = process.env.CLOUDWATCH_API_KEY;
const CLOUDWATCH_ENDPOINT = process.env.CLOUDWATCH_ENDPOINT;

router.post('/cloudwatch', function( req, res ) {
    
    var body = req.body;
      
      createAlert( body );
    
      res.status( 200 ).send( 'Done' );
    
    });
    
var createAlert = function( payload ) {
       
    const options = {
        'uri': CLOUDWATCH_ENDPOINT,
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json",
            "x-api-key": CLOUDWATCH_API_KEY   
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
    