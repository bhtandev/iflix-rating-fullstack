const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContentSchema = new Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  poster: { type: String },
  dateAdded: { type: Date, default: Date.now, required: true },
  dateUpdated: { type: Date, default: Date.now, required: true },
  rateCount: { type: Number, default: 0, required: true },
  rateValue: { type: Number, default: 0, required: true },
  average: { type: Number, default: 0, required: true },
});

mongoose.model('Content', ContentSchema);

module.exports = mongoose.model('Content');
