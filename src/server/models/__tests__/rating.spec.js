const test = require('ava');
const request = require('supertest');
const { app } = require('../../index');
const Content = require('../Content');
const Rating = require('../Rating');
const User = require('../User');

const apiEndPoint = '/api/v1/rating';

const contents = [
  {
    _id: '5b534353da555265a84742a2',
    title: 'Terminator 2',
    poster: 'http://www.image1.png',
    rateCount: 16,
    rateValue: 115,
    average: 4,
    dateAdded: '2018-07-21T09:09:41.968Z',
    description: 'bla bla bla',
    dateUpdated: '2018-07-21T06:46:16.875Z',
    releaseDate: '2018-07-20T16:13:54.149Z'
  },
  {
    _id: '5b534353da555265a84742a3',
    title: 'Die Hard',
    poster: 'http://www.image2.png',
    rateCount: 61,
    rateValue: 240,
    average: 4.0,
    dateAdded: '2018-07-20T16:40:31.241Z',
    description: 'bla bla bla',
    dateUpdated: '2018-07-21T10:06:49.759Z',
    releaseDate: '2018-07-21T02:57:55.426Z'
  },
  {
    _id: '5b534353da555265a84742a4',
    title: 'Inception',
    poster: 'http://www.image3.png',
    rateCount: 10,
    rateValue: 45,
    average: 4.5,
    dateAdded: '2018-07-20T23:19:29.698Z',
    description: 'bla bla bla',
    dateUpdated: '2018-07-20T16:48:09.413Z',
    releaseDate: '2018-07-20T18:35:14.096Z'
  }
];

const users = [
  {
    _id: '5b5348302cfd836b8f98d138',
    username: 'Dywane Johnson',
    dateAdded: '2018-07-21T12:37:21.910Z',
    dateUpdated: '2018-07-21T19:12:05.214Z'
  },
  {
    _id: '5b5348302cfd836b8f98d444',
    username: 'Boon Hui',
    dateAdded: '2018-08-21T12:37:21.910Z',
    dateUpdated: '2018-08-21T19:12:05.214Z'
  },
  {
    _id: '5b5348302cfd836b8f934344',
    username: 'Lionel Messi',
    dateAdded: '2018-09-21T12:37:21.910Z',
    dateUpdated: '2018-09-21T19:12:05.214Z'
  },
];

const ratings = [{
  _id: '5b53df4e8332af0aad759f75',
  rating: 5,
  userId: '5b5348302cfd836b8f98d138', // rock
  contentId: '5b534353da555265a84742a2', // terminator2
  dateAdded: '2018-07-21T08:09:59.455Z',
  dateUpdated: '2018-07-21T07:08:03.439Z'
},
{
  _id: '5b53df4e8332af0aad759f78',
  rating: 2,
  userId: '5b5348302cfd836b8f98d138', // rock
  contentId: '5b534353da555265a84742a4', // inception
  dateAdded: '2018-07-21T21:17:18.582Z',
  dateUpdated: '2018-07-21T20:56:11.687Z'
},
{
  _id: '5b53df4e8332af0aad759f7b',
  rating: 3,
  userId: '5b5348302cfd836b8f98d444', // boon
  contentId: '5b534353da555265a84742a3', // die hard
  dateAdded: '2018-07-21T10:25:17.709Z',
  dateUpdated: '2018-07-21T18:54:32.872Z'
},
];

test.before(async (t) => {
  // This runs before all tests
  const appStarted = await new Promise((resolve, reject) => {
    app.on('app started', () => {
      resolve(true);
    });
  });

  const dataSeeded = await new Promise((resolve, reject) => {
    const userModels = users.map(user => new User(user));
    const contentModels = contents.map(content => new Content(content));
    const ratingModels = ratings.map(rating => new Rating(rating));

    const userPromise = new Promise((userResolve) => {
      User.create(userModels, (err) => {
        if (err) t.fail('Unable to create user seed data for tests');
        // console.log('created user data!');
        return userResolve(true);
      });
    });

    const contentPromise = new Promise((contentResolve) => {
      Content.create(contentModels, (err) => {
        if (err) t.fail('Unable to create content seed data for tests');
        // console.log('created content data!');
        return contentResolve(true);
      });
    });

    const ratingPromise = new Promise((ratingResolve) => {
      Rating.create(ratingModels, (err) => {
        if (err) t.fail('Unable to create rating seed data for tests');
        // console.log('created rating data!');
        return ratingResolve(true);
      });
    });

    Promise.all([userPromise, contentPromise, ratingPromise]).then((ratings) => {
      resolve(true);
    }).catch(error => t.fail('Unable to create seed data for tests'));
  });
});

test.after((t) => {
  User.remove([]);
  Content.remove([]);
  Rating.remove([]);
});

test.serial('Should correctly give found rating in an array with status 200 when there is matching content and user id', async (t) => {
  t.plan(1);

  const res = await request(app)
    .get(`${apiEndPoint}?userId=5b5348302cfd836b8f98d444&contentId=5b534353da555265a84742a3`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
});


test.serial('Should correctly give empty array with status 200 when no matching content and user id', async (t) => {
  t.plan(1);

  const res = await request(app)
    .get(apiEndPoint)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
});

test.serial('Should send correct content with status 200 when queried against an id', async (t) => {
  t.plan(3);

  const id = '5b534353da555265a84742a3';

  const res = await request(app)
    .get(`${apiEndPoint}/${id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.content.average, 4);
  t.is(res.body.content.contentId, '5b534353da555265a84742a3');
});

test.serial('Should fail with status 500 when queried against an invalid or non existent id', async (t) => {
  t.plan(1);

  const id = '5b53df4e8332af0aad759f79';

  const res = await request(app)
    .get(`${apiEndPoint}/${id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 500);
});

test.serial('Should fail with status of 500 if user posts a rating if already rated before', async (t) => {
  t.plan(2);

  const contentId = '5b534353da555265a84742a3'; // diehard
  const userId = '5b5348302cfd836b8f98d138'; // rock

  const inceptionContentId = '5b534353da555265a84742a4'; // inception

  const res = await request(app)
    .post(apiEndPoint)
    .send({ rating: { contentId: inceptionContentId, userId, rating: 3 } })
    .set('Accept', 'application/json');


  const rating = await Rating.find({ contentId: inceptionContentId, userId });
  t.is(rating[0].rating, 2); // 2 which is diff from new..(old post)
  t.is(res.status, 500);
});

test.serial('Should post and create a new rating with status of 200 if user has not rated the content before', async (t) => {
  t.plan(3);

  const contentId = '5b534353da555265a84742a3'; // diehard
  const userId = '5b5348302cfd836b8f98d138'; // rock

  const res = await request(app)
    .post(apiEndPoint)
    .send({ rating: { contentId, userId, rating: 3 } })
    .set('Accept', 'application/json');

  const rating = await Rating.find({ contentId, userId });

  t.is(res.status, 200);
  t.is(rating.length, 1);
  t.is(rating[0].rating, 3);
});

test.serial('Should increase rate count on content if new user posts a rating', async (t) => {
  t.plan(3);

  const contentId = '5b534353da555265a84742a4'; // diehard
  const userId = '5b5348302cfd836b8f934344'; // messi

  const res = await request(app)
    .post(apiEndPoint)
    .send({ rating: { contentId, userId, rating: 3 } })
    .set('Accept', 'application/json');

  const content = await Content.find({ _id: contentId });

  t.is(res.status, 200);
  t.is(content[0].rateCount, 11);
  t.is(content[0].rateValue, 48);
});
