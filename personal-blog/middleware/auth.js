export default (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  res.redirect("/login");
};
