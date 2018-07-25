const Content = require('../../../models/Content');

/**
 * Get all ratings
 * @param req
 * @param res
 * @returns void
 */
function getContents(req, res) {
  Content.find().exec((err, contents) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ contents });
  });
}

function getContent(req, res) {
  Content.findOne({ _id: req.params.id }).exec((err, content) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ content });
  });
}


module.exports = { getContents, getContent };