const mongoose = require('mongoose');

const { Schema } = mongoose;

const RatingSchema = new Schema({
  contentId: {
    type: Schema.Types.ObjectId, ref: 'Content', required: true, index: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: {
    type: Number, min: 1, max: 5, required: true
  },
  dateAdded: { type: Date, default: Date.now, required: true },
  dateUpdated: { type: Date, default: Date.now, required: true },
});

mongoose.model('Rating', RatingSchema);

const Rating = mongoose.model('Rating');

// Rating.ensureIndex({ userId: 1, contentId: 1 });

module.exports = Rating;
