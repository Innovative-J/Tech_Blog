const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Route for fetching all posts and rendering the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route for rendering the dashboard with user-specific posts
router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard posts' });
  }
});

// Route for fetching a single post by ID and rendering its details
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!postData) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post details' });
  }
});

// Route for rendering the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }

  res.render('login');
});

// Route for rendering the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }

  res.render('signup');
});

module.exports = router;