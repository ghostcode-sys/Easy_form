// for data validation and password validation
const validadateData = (req, res, next) => {
  const { user } = req.body;
  if (user) {
    // email in lower case
    user.fname = user.fname.toLowerCase();
    user.lname = user.lname.toLowerCase();
    if (user.email.match(/\w+@\w+/)) {
      user.email = user.email.toLowerCase();
    } else {
      res.status(401).send("Wrong email");
    }
    if (user.password.match(/(@|#|&)/)) {
      req.user = user;
      next();
    } else {
      res.status(401).send("Wrong password");
    }
  }
};
module.exports = validadateData;
