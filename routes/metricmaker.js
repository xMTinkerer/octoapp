// Stacktracer
var express = require('express');
var router = express.Router();






router.post('/metricmaker', function( req, res ) {
  
	var someMetric = req.app.locals.someMetric;
  var someMetricValue = req.app.locals.someMetricValue;
  //console.log( JSON.stringify( req, null, 1 ) );


  var value = req.body.value;

  someMetric.set( value );
  someMetricValue = value;

  // Old direction code
  if( direction == 'up' ) {

    someMetricValue += 2;
    someMetric.inc( 2 );
  }
  else {
    someMetricValue -= 2;
    someMetric.dec( 2 );
  }

  console.log( 'Metric: ' + someMetricValue );
  res.status( 200 ).send( 'Done' );

});

module.exports = router;