const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, index: true },
  dateAdded: { type: Date, default: Date.now, required: true },
  dateUpdated: { type: Date, default: Date.now, required: true },
});


mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
