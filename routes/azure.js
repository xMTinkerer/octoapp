// Stacktracer
const express = require( 'express' );
const router  = express.Router();

const request = require( 'request' );

const AZURE_API_KEY = process.env.AZURE_API_KEY;
const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT;

router.post('/azure', function( req, res ) {
    
    var body = req.body;
      
      createAlert( body );
    
      res.status( 200 ).send( 'Done' );
    
    });
    
var createAlert = function( payload ) {
       
    const options = {
        'uri': AZURE_ENDPOINT + AZURE_API_KEY,
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
    
