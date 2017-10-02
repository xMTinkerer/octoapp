// Stacktracer
var express = require('express');
var router = express.Router();

 




router.post('/error', function( req, res ) {
  
  var newrelic = req.app.locals.newrelic;

  newrelic.noticeError( new Error( 'Ink happens' ) );
  console.log( 'Wrote New Relic error' );
	
  //console.log( JSON.stringify( req, null, 1 ) );

  res.status( 200 ).send( 'Done' );

});

module.exports = router;