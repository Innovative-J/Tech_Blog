const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced!');

  await seedUsers();
  console.log('Users seeded!');

  await seedPosts();
  console.log('Posts seeded!');

  await seedComments();
  console.log('Comments seeded!');

  process.exit(0);
};

seedAll();
