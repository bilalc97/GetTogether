var User 		= require('../models/user');	// importing schemas from given path
var Event 	 	= require('../models/event');
var jwt			= require('jsonwebtoken');
var secret 		= 'dwyanewade'

module.exports = function(router) {				// need to export to server.js
	// http://localhost:8000/api/users
	// USER REGISTRATION
	router.post('/users', function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		console.log(req.body.creator);
		if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
			res.json({ success: false, message: 'Ensure username, password and email were all provided.' });
		} else {
			user.save(function(err) {
				if (err) {
					res.json({ success: false, message: 'Username or Email already exists.' });
				} else {
					res.json({ success: true, message: 'User created.' });
				}
			});
		}
	});

	// http://localhost:8000:/api/authentication
	// USER LOGIN
	router.post('/authenticate', function(req, res) {
		User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Could not authenticate user' });
			} else if (user) {
				if (req.body.password) {
					var validPassword = user.comparePassword(req.body.password);
				} else {
					res.json({ success: false, message: 'No password provided' });
				}
				if (!validPassword) {
					res.json({ success: false, message: 'Could not authenticate password' });
				} else {
					var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });
					res.json({ success: true, message: 'User Authenticated!', token: token });
				}
			}
		});
	});

	// EVENT CREATION
	router.post('/events', function(req, res) {
		var event = new Event();
		event.name = req.body.name;
		event.creator = req.body.creator;
		event.earliest = new Date(req.body.earliest);
		event.latest = new Date(req.body.latest);
		event.duration = parseInt(req.body.duration);
		event.participants = [{
			name: req.body.creator,
			availability: []
		}];
		if (req.body.name == null || req.body.name == '' || req.body.creator == null || req.body.creator == '' || req.body.earliest == null || req.body.earliest == '' || req.body.latest == null || req.body.latest == '' || req.body.duration == null || req.body.duration == '') {
			res.json({ success: false, message: 'Ensure all information was provided.' });
		} else {
			if (event.latest < event.earliest) {
				res.json({ success: false, message: 'Ensure the latest date occurs after earliest.' });
			} else {
				event.save(function(err) {
					if (err) {
						res.json({ success: false, message: 'Event name already exists.' });
					} else {
						res.json({ success: true, message: 'Event created.' });
					}
				});
			}
		}
	});

	// EVENT CREATION
	router.get('/allEvents', function(req, res) {
		Event.find(function (err, docs) {
        	res.send(docs);
    	});
	});

	// This will be done for every request to check for JSON web tokens
	router.use(function(req, res, next) {
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, secret, function(err, decoded) {
				if (err) {
					res.json({ success: false, message: 'Token Invalid' });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.json({ success: false, message: 'No token provided' });
		}
	});

	router.post('/me', function(req, res) {
		res.send(req.decoded);
	});

	return router;
	// this router object along with all of its routes will be returned for server.js
}