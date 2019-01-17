// Stacktracer
const winston = require( 'winston' );
const express = require( 'express' );
const router  = express.Router();
const exec = require( 'child_process' ).exec;


router.post('/spikeCPU', function( req, res ) {
  
  var spikecpuLogger = winston.loggers.get( 'spikecputracer' );

  var body = req.body;

  // Shell execution concerns. 
  if( (typeof body.seconds) != 'number' ) {
     spikecpuLogger.error( '"' + body.seconds + '" is not a number! Exiting' );
     res.status( 500 ).send( 'Error' );
     return;
  }


  spikecpuLogger.info( 'Spiking for ' + body.seconds + ' seconds' );

  exec('./routes/spikecpu.sh ' + body.seconds,
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log(error);
      } else {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      }
  });

  res.status( 200 ).send( 'Done' );
  return;

});


module.exports = router;