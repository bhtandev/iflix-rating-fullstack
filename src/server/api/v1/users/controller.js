const User = require('../../../models/User');

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
function getUsers(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

function getUser(req, res) {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}


module.exports = { getUsers, getUser };
