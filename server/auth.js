const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socket = require("./server-socket");

const CLIENT_ID = "21463356845-mhut4f51s3veef6b80pfaqkp8iuu6ogg.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accept login token from frontend, verifies it's legit
function verify(token){
	return client
		.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID,
		})
		.then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes an account if doesn't exist
function getOrCreateUser(user) {
	// sub => "subject", unique for each user
	return User.findOne({ googleid: user.sub }).then((existingUser) => {
		if(existingUser) return existingUser;

		const newUser = new User({
			name: user.name,
			googleid: user.sub,
		});
		return newUser.save();
	});
}

function login(req,res){
	verify(req.body.token)
		.then((user) => getOrCreateUser(user))
		.then((user) => {
			// persist user in session
			req.session.user = user;
			res.send(user);
		})
		.catch((err) => {
			console.log(`Failed to log in: ${err}`);
			res.status(401).send({err});
		});
}

function logout(req,res){
	const userSocket = socket.getSocketFromUserID(req.user._id);
	if (userSocket){
		// delete socket if logged out
		socket.removeUser(req.user, userSocket);
	}

	req.session.user = null;
	res.send({});
}

function populateCurrentUser(req, res, next) {
	//simply populate req.user
	req.user = req.session.user;
	next();
}

function ensureLoggedIn(req, res, next){
	if (!req.user){
		return res.status(401).send({ err: "not logged in"});
	}
}

module.exports = {
	login,
	logout,
	populateCurrentUser,
	ensureLoggedIn,
}
