const express = require("express");

// models for database interaction
const User = require("./models/user");

const auth = require("./auth");

const router = express.Router();

const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req,res) => {
	if (!req.user) {
		// not logged in
		return res.send({});
	}
	res.send(req.user);
});

router.get("/user", (req, res) => {
	User.findById(req.query.userid).then((user) => {
		res.send(user);
	});
});

router.post("/initsocket", (req, res) => {
	// no nothing if user not logged in
	res.send({});
});

router.all("*", (req,res) => {
	console.log(`API route not found: ${req.method} ${req.url}`);
	res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
