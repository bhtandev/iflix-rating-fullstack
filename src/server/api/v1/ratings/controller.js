const Rating = require('../../../models/Rating');
const Content = require('../../../models/Content');

/**
 * Get all ratings
 * @param req
 * @param res
 * @returns void
 */
function getRatings(req, res) {
  Rating.find().exec((err, ratings) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ ratings });
  });
}

/**
 * Finds a content based on content id
 * @param contentId
 * @returns {Promise<any>}
 */
async function findContent(contentId) {
  let content = null;
  let error = null;

  try {
    content = await Content.findById(contentId);
  } catch (err) {
    error = err;
  }

  return new Promise((resolve, reject) => {
    if (content) {
      resolve(content);
    } else {
      reject(error);
    }
  });
}

/**
 * Get indidivual rating by id
 * @param req
 * @param res
 */
async function getContent(req, res) {
  try {
    const content = await findContent(req.params.id);
    const { average, _id } = content;
    res.json({ content: { average, contentId: _id } });
  } catch (err) {
    res.status(500).send(err);
  }
//
  // Rating.findOne({ _id: req.params.id }).exec((err, rating) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   res.json({ rating });
  // });
}

/**
 * Finds and gets a rating by user id and content id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const findRatingByContentAndUser = async (req, res) => {
  let rating;

  const { userId, contentId } = req.query;

  try {
    rating = await Rating.find({ contentId, userId });

    console.log('ok', rating);

    res.json({ rating });
  } catch (err) {
    console.log('err', err);


    res.status(500).send(err);
  }
};


/**
 * Function to create a new rating within database. Only if not created yet.
 * @param contentId
 * @param userId
 * @param rating
 * @returns {Promise<never>}
 */
async function createRatingIfNotRatedYet({ contentId, userId, rating }) {
  const ratedBefore = await Rating.find({ contentId, userId }).count();
  if (!ratedBefore) {
    const newRating = new Rating({ contentId, userId, rating });

    return newRating.save().then(async (saved) => {
      saved.populate('contentId').execPopulate();

      const content = await findContent(contentId);
      content.rateValue += rating;
      content.rateCount += 1;
      content.average = content.rateValue / content.rateCount;

      await content.save();

      return Promise.resolve({ rating: saved });
    }, (err) => {
      if (err) {
        console.log('error', err);
        return Promise.reject(err);
      }
    });
  }
  return Promise.reject(new Error('Already rated!'));
}

function addRating(req, res) {
  const { contentId, userId, rating } = req.body.rating;

  if (!contentId || !userId || !rating) {
    res.status(403).end();
  }

  createRatingIfNotRatedYet(req.body.rating).then((newRating) => {
    res.json(newRating);
  }).catch((error) => {
    res.status(500).send(error);
  });
}

module.exports = {
  getRatings, getContent, addRating, findRatingByContentAndUser
};
