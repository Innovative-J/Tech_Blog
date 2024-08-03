// importing modules that are required
const router = require('express').Router();
const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes');

// define proper routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;