// Stacktracer
const winston = require( 'winston' );
const Promise = require( 'promise' );
const express = require( 'express' );
const router  = express.Router();




var shouldRun = true;

router.post('/spikeCPU', function( req, res ) {
  
  var spikecpuLogger = winston.loggers.get( 'spikecputracer' );
  var body = req.body;

  spikecpuLogger.info( 'Spiking for ' + body.seconds + ' seconds' );

  //setTimeout( stopCPUSpike, req.seconds*1000 );
  //blockCpu();

  var promise = blockCpuFor( body.seconds*1000, spikecpuLogger );

  promise.then( function( str ) { /*console.log( "Finished! str: " + str ); */} );

  res.status( 200 ).send( 'OK' );
  return;

});


function blockCpuFor( ms, logger ) {



  return new Promise( function( fulfill, reject ) {
    var start = new Date().getTime();
    var result = 0;

    while( new Date().getTime() < start + ms ) {
      result += Math.random() * Math.random();
    }
    var now = new Date().getTime();

    fulfill( 'Woo! Str here' );
  });
}







module.exports = router;