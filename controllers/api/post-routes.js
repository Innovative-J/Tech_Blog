const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for creating a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Send a response with the new post data
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for deleting a post by its ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a post with proper id
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no post was deleted, send a 404 status with a message
    if (!postData) {
      res.status(404).json({ message: 'No post was found with this id' });
      return;
    }

    // Send a response stating the post was successfully deleted
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
