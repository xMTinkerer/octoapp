var express = require('express');
var winston = require( 'winston' );

var app = express();
var dataFile = require( './data/data.json' );

app.set( 'port', process.env.PORT || 9988 );
app.set( 'appData', dataFile );
app.set( 'view engine', 'ejs' );
app.set( 'views', 'views' );


app.use( require( './routes/index' ) );
app.use( '/public', express.static( __dirname + '/views/public' ) );

var server = app.listen( app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});


