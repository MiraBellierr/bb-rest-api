const router = require("express").Router();
const Argon2 = require("argon2");
const User = require("../models/User");

// update user
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				req.body.password = await Argon2.hash(req.body.password);
			} catch (e) {
				return res.status(500).json(e);
			}
		}

		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});

			res.status(200).json("Account has been updated");
		} catch (e) {
			return res.status(500).json(e);
		}
	} else {
		return res.status(403).json("You can update only your account!");
	}
});

// delete user
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);

			res.status(200).json("Account has been deleted");
		} catch (e) {
			return res.status(500).json(e);
		}
	} else {
		return res.status(403).json("You can delete only your account!");
	}
});

// get a user
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		const { password, updatedAt, ...other } = user._doc;

		res.status(200).json(other);
	} catch (e) {
		res.status(500).json(e);
	}
});

// follow a user
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId === req.params.id)
		return res.status(403).json("You can't follow yourself");

	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.userId);

		if (!user.followers.includes(req.body.userId)) {
			await user.updateOne({ $push: { followers: req.body.userId } });
			await currentUser.updateOne({ $push: { followings: req.params.id } });

			res.status(200).json("User has been followed");
		} else {
			res.status(403).json("You already follow this user");
		}
	} catch (e) {
		res.status(500).json(e);
	}
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
	if (req.body.userId === req.params.id)
		return res.status(403).json("You can't unfollow yourself");

	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.userId);

		if (user.followers.includes(req.body.userId)) {
			await user.updateOne({ $pull: { followers: req.body.userId } });
			await currentUser.updateOne({ $pull: { followings: req.params.id } });

			res.status(200).json("User has been unfollowed");
		} else {
			res.status(403).json("You don't follow this user");
		}
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = router;
