// Stacktracer
const winston = require( 'winston' );
const express = require( 'express' );
const router  = express.Router();


/*
router.get('/error', function(req, res, next) {
  const stackTracer = winston.loggers.get( 'stacktracer' );


    // here we cause an error in the pipeline so we see express-winston in action.
    stackTracer.error( new Error("This is an error and it should be logged to the console") );

    res.status( 200 ).send( 'Done' );
});
*/

router.post('/stacktracer', function( req, res ) {
  
  const stackTracer = winston.loggers.get( 'stacktracer' );

  const errorMessage = "java.net.SocketException: Connection reset";
  stackTracer.error( { message:  errorMessage });

  res.status( 200 ).send( 'Done' );

});



router.post('/dynatracer', function( req, res ) {
  
  const dynatracer   = winston.loggers.get( 'dynatracer' );

  const errorMessage = "java.lang.NullPointerException";

  for( var i=0; i<10; i++ )
     dynatracer.error(   { message: errorMessage} );
  
  res.status( 200 ).send( 'Done' );

});

module.exports = router;
