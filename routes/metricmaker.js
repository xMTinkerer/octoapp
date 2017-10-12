// Stacktracer
const winston = require( 'winston' );
const express = require( 'express' );
const router  = express.Router();





router.post('/metricmaker', function( req, res ) {
  
	var someMetric = req.app.locals.someMetric;
  var someMetricValue = req.app.locals.someMetricValue;

  var value = req.body.value;

  someMetric.set( value );
  someMetricValue = value;

  winston.loggers.get( 'main').info( 'Metric: ' + someMetricValue );
  res.status( 200 ).send( 'Done' );

});

module.exports = router;