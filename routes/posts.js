const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// create post
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);

	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (e) {
		res.status(500).json(e);
	}
});

// update post
router.put("/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (post.userId === req.body.userId) {
		try {
			const updatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedPost);
		} catch (e) {
			res.status(500).json(e);
		}
	} else {
		res.status(403).json("You can update only your post!");
	}
});

// delete post
router.delete("/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (post.userId === req.body.userId) {
		try {
			await post.deleteOne();

			res.status(200).json("Post has been deleted");
		} catch (e) {
			res.status(500).json(e);
		}
	} else {
		res.status(403).json("You can delete only your post!");
	}
});

// like post
router.put("/:id/like", async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (!post.likes.includes(req.body.userId)) {
		try {
			await post.updateOne({ $push: { likes: req.body.userId } });

			res.status(200).json("The post has been liked");
		} catch (e) {
			res.status(500).json(e);
		}
	} else {
		try {
			await post.updateOne({ $pull: { likes: req.body.userId } });

			res.status(200).json("The post has been disliked");
		} catch (e) {
			res.status(500).json(e);
		}
	}
});

// get post
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		res.status(200).json(post);
	} catch (e) {
		res.status(500).json(e);
	}
});

// get timeline posts
router.get("/timeline/all", async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);

		res.status(200).json(userPosts.concat(...friendPosts));
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = router;
