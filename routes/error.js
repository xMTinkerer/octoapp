// Error
const winston = require( 'winston' );
const express = require( 'express' );
const router  = express.Router();


router.post('/error', function( req, res ) {
  
  var newrelic = req.app.locals.newrelic;

  newrelic.noticeError( new Error( 'Ink happens' ) );
  winston.loggers.get('main').info( 'Wrote New Relic error' );

  res.status( 200 ).send( 'Done' );

});

module.exports = router;