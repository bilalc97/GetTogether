var User 		= require('../models/user');	// importing user schema from given path

module.exports = function(router) {				// need to export to server.js
	// http://localhost:8000/api/users
	// USER REGISTRATION
	router.post('/users', function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
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
					res.json({ success: true, message: 'User Authenticated!' });
				}
			}
		});
	});

	return router;
	// this router object along with all of its routes will be returned for server.js
}