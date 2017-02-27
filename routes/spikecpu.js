// Stacktracer
var express = require('express');
var router = express.Router();
var Promise = require('promise');

var shouldRun = true;

router.post('/spikeCPU', function( req, res ) {
  
  var spikecpuLogger = req.app.locals.spikecpuLogger;
  var body = req.body;

  console.log( 'Req: ' + JSON.stringify( body, null, 1 ) );

  // res.render('index', {
  //   'title': 'OctoApp'
  // });
	

    //stacktracer.error( new Error( "This is my stack trace here" ) );
    
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