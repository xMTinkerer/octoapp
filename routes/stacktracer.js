// Stacktracer
var express = require('express');
var router = express.Router();



router.get('/error', function(req, res, next) {
	var logger      = req.app.locals.logger;
	var stacktracer = req.app.logger.stacktracer;


    // here we cause an error in the pipeline so we see express-winston in action.
    stacktracer.error( new Error("This is an error and it should be logged to the console") );

    res.status( 200 ).send( 'Done' );
});



router.post('/stacktracer', function(req, res) {
  

  res.render('index', {
    'title': 'OctoApp'
  });



});

module.exports = router;