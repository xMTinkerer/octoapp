// Stacktracer
var express = require('express');
var router = express.Router();






router.post('/metricmaker', function( req, res ) {
  
	var someMetric = req.app.locals.someMetric;
  //console.log( JSON.stringify( req, null, 1 ) );

  var direction = req.body.direction;
  //console.log( 'metricmaker: direction: ' + direction );

  if( direction == 'up' )
    // Increment by 2
    someMetric.inc( 2 );
  else
    someMetric.dec( 2 );

  res.status( 200 ).send( 'Done' );

});

module.exports = router;