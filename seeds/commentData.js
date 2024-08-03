const { Comment } = require('../models');

const commentData = [
  {
    content: 'This is a comment.',
    user_id: 1,
    post_id: 1,
  },
  {
    content: 'This is another comment.',
    user_id: 2,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
