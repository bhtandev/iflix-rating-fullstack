const seedData = require('./seed');
const User = require('../models/User');
const Content = require('../models/Content');
const Rating = require('../models/Rating');


const modelFactory = (modelType, modelData) => {
  if (modelType === 'User') {
    return new User(modelData);
  }

  if (modelType === 'Content') {
    return new Content(modelData);
  }

  if (modelType === 'Rating') {
    return new Rating(modelData);
  }
};

const modelSelect = (modelType) => {
  if (modelType === 'User') {
    return User;
  }

  if (modelType === 'Content') {
    return Content;
  }

  if (modelType === 'Rating') {
    return Rating;
  }
};

const seedTheData = () => {
  console.log('Seeding data...');

  const seedPromises = seedData.map(model => new Promise((resolve, reject) => {
    const { type, documents } = model;

    console.log(`Seeding ${type} data... (async)`);

    const modelMDBDocuments = documents.map(document => modelFactory(type, document));

    const mdbModel = modelSelect(type);

    if (mdbModel) {
      mdbModel.create(modelMDBDocuments, (error) => {
        if (error) {
          reject(error);
        }

        resolve(type);
      });
    }
  }));

  return Promise.all(seedPromises);
};

module.exports = { seedTheData };
