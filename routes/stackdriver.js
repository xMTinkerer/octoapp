// Stacktracer
const winston = require( 'winston' );
const express = require( 'express' );
const Logging = require( '@google-cloud/logging' );
const router  = express.Router();


router.post('/stackdriver', function( req, res ) {

    const logging = new Logging();

    const logName = 'octoapp-log';
    
    const log = logging.log( logName );
    
    // Modify this resource to match a resource in your project
    // See https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
    const resource = {
      // This example targets the "global" resource for simplicity
      "type": 'gce_instance',
      "labels": {
        "projectId": "octo-159506"
      }
    };
    
    
    // A structured log entry
    const logEntry = log.entry(
      { "resource": resource },
      {
        "entryType": 'Octopi Error',
        "message": 'Error predicting World Cup finals'
      }
    );
    
    // Save the two log entries. You can write entries one at a time, but it is
    // best to write multiple entires together in a batch.
    log.write( [ logEntry ] ).then(() => {
        console.log(`Wrote to ${logName}`);
      }).catch(err => {
        console.error('ERROR:', err);
      });

    winston.loggers.get( 'main' ).info( 'Wrote log to ' + logName );
    res.status( 200 ).send( 'Done' );
});

module.exports = router;