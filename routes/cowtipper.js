// Stacktracer
const express = require( 'express' );
const router  = express.Router();

const request = require( 'request' );

const MOOG_USERNAME = process.env.MOOG_USERNAME;
const MOOG_PASSWORD = process.env.MOOG_PASSWORD;
const MOOG_ENDPOINT = process.env.MOOG_ENDPOINT;

router.post('/cowtipper', function( req, res ) {

    var payload = req.body;

    createAlert( payload );

    res.status( 200 ).send( 'Done' );

});


var createAlert = function( payload ) {

    var APP = 'octoapp';

    const options = {
        'uri': MOOG_ENDPOINT,
        'method': 'POST',
        'auth': {
            'username': MOOG_USERNAME,
            'password': MOOG_PASSWORD
        },
        'headers': {
            "Content-Type": "application/json"
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

