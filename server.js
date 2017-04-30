var express 	= require('express');
var app 		= express();
var port 		= process.env.PORT || 8080;
var morgan 		= require('morgan'); // https://www.npmjs.com/package/morgan
var mongoose 	= require('mongoose'); //https://www.npmjs.com/package/mongoose
var User 		= require('./app/models/user'); 
var bodyParser 	= require('body-parser'); //https://www.npmjs.com/package/body-parser
var multer 		= require('multer'); // 
/**
 * MIDDLEWARE: It basically means that the app is running somehting before the app. 
 * Morgan: It's a shell logger.
 * Body-parser: Converts the data, since req.doby contains key-value pairs of data submitted. 
 */
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * MONGO DATABASE: Setting up the connection with the database
 * It's necessary to create the database previously. 
 * The following code calls a function to log the status of the connection!
 */
mongoose.connect('mongodb://localhost:27017/tutorial', function(err){
	if (err){
		console.log('[ERROR] Not connected to the database\n' + err);
	} else {
		console.log('Successfully connected to MongoDB');
	}
});


/**
 * ROUTES: Setting up a HELLO WORLD route for tests pourpose. 
 * It calls a funcion that takes a request and send a response.
 */ 


/**
 * USERS: Route to register a User - http://localhost:8080/users
 * The following POST route receives a request (req) and sends a response (res).
 * In our case, we take the request body (and their field names/ids) to instantiate 
 * a new user.
 * The request has some attributes such as req.body, req.app and so on. Check out here:
 * http://expressjs.com/en/api.html
 * To parse a JSON from a req.body it'll be needed the body-parser middleware. (As shown above in
 * the code).
 */
app.post('/users', function(req, res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	user.save;
	res.send('User created successfully!');
});


/**
 * PORT: Seeting the port to listen, which calls a function to log server status.
 */
app.listen(port, function() {
	console.log('Running the server on port ' + port);
});
/**
 * Aditional way to setup app.listen:
 * app.listen(process.env.PORT || 8080, function() {
 *     console.log('Running the server');
 * });
 * 
 * Both ways check for environment config in the server.
 */







/**
 * TIP: To avoid stoping and starting the server:
 * Usually the command to start the server is:	  
 * 
 * 	  > npm start server.js
 * 
 * But it requires to stopt it and start it again after a change.
 * To solve that problem, install globally 'nodemon'.
 * 
 * 	  npm install -g nodemon
 * 	  > nodemon server.js
 */

