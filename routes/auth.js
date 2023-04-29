const router = require("express").Router();
const User = require("../models/User");
const argon2 = require("argon2");

// register
router.post("/register", async (req, res) => {
	try {
		const hashedPassword = await argon2.hash(req.body.password);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		res.status(200).json(user);
	} catch (e) {
		res.status(500).json(e);
	}
});

// login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});

		!user && res.status(404).json("User not found");

		const validPassword = await argon2.verify(user.password, req.body.password);

		!validPassword && res.status(400).json("Wrong credentials");

		res.status(200).json(user);
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = router;
