var express = require('express');
var winston = require( 'winston' );

var app = express();
var dataFile = require( './data/data.json' );

app.set( 'port', process.env.PORT || 9988 );
app.set( 'appData', dataFile );
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views' );



app.use( require( './routes/index' ) );
app.use( require( './routes/stacktracer' ) );
app.use( '/public', express.static( __dirname + '/views/public' ) );


app.locals.logger = new (winston.Logger)({
	"transports": [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: __dirname + '/logs/main.log' })
	]
});

app.locals.stacktracer = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: __dirname + '/logs/stacktraces.log' })
	]
});


var server = app.listen( app.get('port'), function() {
  console.log( 'Listening on port ' + app.get('port') );
  app.locals.logger.info( 'Listening on port ' + app.get('port') );
});


