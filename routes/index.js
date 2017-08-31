var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var data = req.app.get('appData');

  var someMetricValue = req.app.locals.someMetricValue;

  res.render('index', {
    'title': 'OctoApp',
    'someMetricValue': someMetricValue
  });

});

router.get( '/metrics', function( req, res ) {
  var register = req.app.locals.register;

  res.set( 'Content-Type', register.contentType );
  res.end( register.metrics() );
});


module.exports = router;
