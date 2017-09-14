// use "nodemon server.js" instead of "node server.js"
// using nodemon will automatically restart the server when any changes are saved

var express 	= require('express');			// web application framework that provides a set of features
var app 		= express();
var port 		= process.env.PORT || 8000;		// assign port to 8000 or another port specific to the app
var morgan 		= require('morgan');			// HTTP request logger middleware, will log all requests made to server on terminal
var mongoose 	= require('mongoose');			// handler for mongo database
var bodyParser 	= require('body-parser');		// for parsing data
var router		= express.Router();						// Router object
var appRoutes	= require('./app/routes/api')(router);	// getting all the routes for the app from api.js as a Router object
var path 		= require('path');						// used for creating file paths

app.use(morgan('dev'));									// request logger
app.use(bodyParser.json());								// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));		// for parsing application/x-www-form-urlenconded
app.use(express.static(__dirname + '/public'));			// this makes all the front end directory files available to use from the public folder
app.use('/api', appRoutes);								// all routes will start with a '/api' in the backend

// connection to database
mongoose.connect('mongodb://localhost/mean', function(err) {
	if (err) {
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Successfully connected to MongoDB');
	}
});

// Asterik -> no matter what the user types, feed them a specific page, index.html
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));	// __dirname = current directory
});

app.listen(port, function() {
	console.log('Running the server on port ' + port);
});
