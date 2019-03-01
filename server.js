// APM libraries
//require( './appdynamics_config' );
const newrelic   = require( 'newrelic'    );
const promClient = require( 'prom-client' );


// Assorted libraries 
const express    = require( 'express'       );
const bodyParser = require( 'body-parser'   );
const flash      = require( 'connect-flash' );

const { createLogger, format, transports, loggers } = require( 'winston' );
const { combine, timestamp, label, printf } = format;


// For authentication
const passport      = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const session       = require( 'express-session' );
//const RedisStore = require('connect-redis')(session)
var db = require( './data/users' );



// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use( 'local', new LocalStrategy({
   passReqToCallback : true  
   },
   function( req, username, password, done ) {

      db.findByUsername( username, function( err, user ) {

         if ( err )                       { return done( err ); }
         if ( !user )                     { return done( null, false, req.flash('loginMessage', 'User not found.') ); }
         if ( user.password != password ) { return done( null, false, req.flash('loginMessage', 'Oops! Wrong password.') ); }
         return done( null, user );
      });
  })
);


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {

   cb( null, user.id );
});

passport.deserializeUser(function(id, cb) {

   db.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
   });
});



const register = promClient.register;

const Gauge = promClient.Gauge;
const someMetric = new Gauge({
     name: 'some_gauge',
     help: 'A gauge that has data', 
     labelNames: ['code']
});

let someMetricValue = 20;
// Set to some initial value
someMetric.set( someMetricValue );

promClient.collectDefaultMetrics();


var app = express();
var dataFile = require( './data/data.json' );

app.set( 'port', process.env.PORT || 9988 );
app.set( 'appData', dataFile );
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views' );

app.use( flash() );
app.use( require('cookie-parser')() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use( session( { secret: 'get off my lawn!', resave: false, saveUninitialized: false } ) );

app.use( passport.initialize() );
app.use( passport.session() );


app.use( require( './routes/index'        ) );
app.use( require( './routes/cowtipper'    ) );
app.use( require( './routes/bigpanda'     ) );
app.use( require( './routes/stackdriver'  ) );
app.use( require( './routes/stacktracer'  ) );
app.use( require( './routes/spikecpu'     ) );
app.use( require( './routes/metricmaker'  ) );
app.use( require( './routes/error'        ) );
app.use( require( './routes/appdynerror'  ) );
app.use( require( './routes/xmatters'     ) );
app.use( require( './routes/simulator'    ) );
app.use( require( './routes/triggerflood' ) );
app.use( require( './routes/cloudwatch'   ) );

app.use( '/public', express.static( __dirname + '/views/public' ) );

 

// Expose the register to the routes
app.locals.register        = register;
app.locals.someMetric      = someMetric;
app.locals.someMetricValue = someMetricValue;

app.locals.newrelic        = newrelic;


loggers.add( 'main', {
  "format": combine(
    timestamp(),
    format.json()
  ),
	"transports": [
		new transports.Console(),
		new transports.File({ filename: __dirname + '/logs/main.log' })
	]
});

loggers.add( 'stacktracer', {
  "format": combine( 
     timestamp(),
     format.json()
  ),
	"transports": [
		new transports.File({ filename: __dirname + '/logs/stacktraces.log' })
	]
});

loggers.add( 'spikecputracer', {
	"transports": [
		new transports.File({ filename: __dirname + '/logs/spikecpu.log' })
	]
});


loggers.add( 'dynatracer', {
  "format": combine( 
     format.timestamp(),
     printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
     })
  ),

  "transports": [
     new transports.File({ filename: __dirname + '/logs/dynatracer.log', colorize: false })
  ]
});

var server = app.listen( app.get('port'), function() {
  loggers.get('main').info( 'Listening on port ' + app.get('port') );
});


