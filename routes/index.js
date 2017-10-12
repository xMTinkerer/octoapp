var express  = require( 'express' ); 
var passport = require( 'passport' );
var router   = express.Router();

 
router.get( '/', 
  function(req, res) {
    var data = req.app.get( 'appData' );

    var someMetricValue = req.app.locals.someMetricValue;

    res.render('index', {
      'title': 'OctoApp',
      'someMetricValue': someMetricValue,
      'user': req.user,
      'pageEnabled': req.app.locals.pageEnabled
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
       successRedirect: '/',
       failureFlash: true
    }),
    function(req, res) {
       res.redirect( '/' );
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


router.get( '/thepage', function( req, res ) {

   if( req.app.locals.pageEnabled ) {
 
     res.render( 'thepage', { stuff: "value" }, (err, html) => {
        res.send( 'Hello?' );
     });
 
 
   }
   else {

    res.status(404).send( 'Not found!' );
   }
   
   //req.app.locals.pageEnabled = !req.app.locals.pageEnabled;

});

router.get( '/serverdata', function( req, res ) {
  console.log( "getting server data..." );
  
  res.status( 200 ).send( { 
    pageEnabled: req.app.locals.pageEnabled 
  } );

})


// This can be used to ensure other endpoints are secured
const isLoggedIn = function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}


module.exports = router;
