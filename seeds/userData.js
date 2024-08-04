const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',
  },
];


const seedUsers = async () => {
  try {
    await User.bulkCreate(userData, {
      individualHooks: true, 
    });
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
module.export = seedUsers;