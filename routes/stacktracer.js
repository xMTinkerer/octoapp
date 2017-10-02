// Stacktracer
var express = require('express');
var router = express.Router();
 


router.get('/error', function(req, res, next) {
	var logger = req.app.locals.stacktraceLogger;


    // here we cause an error in the pipeline so we see express-winston in action.
    logger.error( new Error("This is an error and it should be logged to the console") );

    res.status( 200 ).send( 'Done' );
});



router.post('/stacktracer', function( req, res ) {
  
	var logger = req.app.locals.stacktraceLogger;

	console.log( 'Req: ' + JSON.stringify( req.body, null, 1 ) );

  // res.render('index', {
  //   'title': 'OctoApp'
  // });

  logger.error( new Error( "java.net.SocketException: Connection reset" ) );

  res.status( 200 ).send( 'Done' );

});

module.exports = router;
