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

const seedComments = async () => {
  try {
    await Comment.bulkCreate(commentData);
    console.log('Comments seeded successfully!');
  } catch (error) {
    console.error('Error seeding comments:', error);
  }
};
module.exports = seedComments;
