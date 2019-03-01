// Stacktracer
const express = require( 'express' );
const router  = express.Router();

const request = require( 'request' );

const BIGPANDA_TOKEN = process.env.BIGPANDA_TOKEN;
const BIGPANDA_KEY = process.env.BIGPANDA_KEY;
//const BIGPANDA_INCIDENT = process.env.BIGPANDA_INCIDENT;

router.post('/bigpanda', function( req, res ) {
    
    var payload = { 
        "app_key": BIGPANDA_KEY, 
        "status": "critical", 
        "host": "OctoApp - " + Math.floor( Math.random() * 1000 + 1), 
        "check": "CPU overloaded"
    }
    
    createAlert( payload );

    res.status( 200 ).send( 'Done' );
    
    });
    
    
var createAlert = function( payload ) {

    var APP = 'octoapp';
    
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
    