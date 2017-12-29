var express  = require( 'express' ); 
var passport = require( 'passport' );
var router   = express.Router();

const winston = require( 'winston' );

router.get( '/', 
  function(req, res) {
    var data = req.app.get( 'appData' );

    var someMetricValue = req.app.locals.someMetricValue;

    res.render('index', {
      'title': 'OctoApp',
      'someMetricValue': someMetricValue,
      'user': req.user
    });

});
 
 
router.get( '/login',
  function(req, res){
    res.render('login', {
       'title': 'OctoApp',
       'message': req.flash( 'loginMessage' )
    });
});

router.post('/login', 
    passport.authenticate('local', { 
       failureRedirect: '/login',
       failureFlash: true
    }),
    (req, res) => {

      //winston.loggers.get('main').info( 'Path? ' + req.path + ' redirectTo: ' + req.session.redirectTo );
      var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
      delete req.session.redirectTo;


      
       res.redirect( redirectTo );
    }
);

router.get( '/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});
 
   


// Not authenticated...
router.get( '/metrics', function( req, res ) {
  var register = req.app.locals.register;

  res.set( 'Content-Type', register.contentType );
  res.end( register.metrics() );
});


// This can be used to ensure other endpoints are secured
const isLoggedIn = function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}


module.exports = router;
