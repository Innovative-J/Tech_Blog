const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/login'); // Added return statement
  }
  next();
};

module.exports = withAuth;