// Stacktracer
const express = require( 'express' );
const router  = express.Router();

const request = require( 'request' );

const MOOG_USERNAME = process.env.MOOG_USERNAME;
const MOOG_PASSWORD = process.env.MOOG_PASSWORD;

router.post('/cowtipper', function( req, res ) {
    
    var payload = { 
        signature: "octoapp:Alert1",
        source: "octoapp.xmatters.com",
        source_id: "octoapp",
        external_id: "12345",
        agent_location: "California", 
        severity: 5,
        type: "type",
        manager: "octoapp",
        class: "class",
        description: "moooooooo",
        agent_time: "1530544543" 
    }
      
      createAlert( payload );
    
      res.status( 200 ).send( 'Done' );
    
    });
    
    
    createAlert = function( payload ) {
    
        var APP = 'octoapp';
        
        const options = {
            'uri': 'https://rabidwilderness.moogsoft.io/events/webhook_webhook1',
            'method': 'POST',
            'auth': {
                'username': MOOG_USERNAME,
                'password': MOOG_PASSWORD
            },
            'headers': {
                "Content-Type": "application/json",
	            "Authorization": "Basic <base64 encoded credentials>"
            },
            'json': true,
            'body': payload
        };
        console.log( options );
        var data;

        request( options, ( err, res, body ) => {
            if ( err )
                console.log( err );
            data = res;
        });
        console.log ( data );

    }
    
    
    
    module.exports = router;
    