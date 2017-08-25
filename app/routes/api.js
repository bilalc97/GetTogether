var User 		= require('../models/user');	// importing user schema from given path

module.exports = function(router) {				// need to export to server.js
	http://localhost:8000/api/users
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
	return router;		// this router object along with all of its routes will be returned for server.js
}