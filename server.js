var express = require('express');
var winston = require( 'winston' );
var bodyParser = require('body-parser');

const promClient = require( 'prom-client' );
const register = promClient.register;

const Gauge = promClient.Gauge;
const someMetric = new Gauge({
     name: 'some_gauge',
     help: 'A gauge that has data', 
     labelNames: ['code']
});

// Set to some initial value
someMetric.set( 10 );

promClient.collectDefaultMetrics();


var app = express();
var dataFile = require( './data/data.json' );

app.set( 'port', process.env.PORT || 9988 );
app.set( 'appData', dataFile );
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views' );


app.use( bodyParser.json() );

app.use( require( './routes/index'       ) );
app.use( require( './routes/stacktracer' ) );
app.use( require( './routes/spikecpu'    ) );
app.use( require( './routes/metricmaker' ) );

app.use( '/public', express.static( __dirname + '/views/public' ) );

// Expose the register to the routes
app.locals.register   = register;
app.locals.someMetric = someMetric;

app.locals.logger = new (winston.Logger)({
	"transports": [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: __dirname + '/logs/main.log' })
	]
});

app.locals.stacktraceLogger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: __dirname + '/logs/stacktraces.log' })
	]
});

app.locals.spikecpuLogger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: __dirname + '/logs/spikecpu.log' })
	]
});


var server = app.listen( app.get('port'), function() {
  console.log( 'Listening on port ' + app.get('port') );
  app.locals.logger.info( 'Listening on port ' + app.get('port') );
});


