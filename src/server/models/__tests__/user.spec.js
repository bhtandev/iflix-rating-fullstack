const test = require('ava');
const request = require('supertest');
const { app } = require('../../index');
const User = require('../User');

const apiEndPoint = '/api/v1/users';

const users = [
  {
    _id: '5b5348302cfd836b8f98d138',
    username: 'Adrain66',
    dateAdded: '2018-07-21T12:37:21.910Z',
    dateUpdated: '2018-07-21T19:12:05.214Z'
  },
  {
    _id: '5b5348302cfd836b8f98d444',
    username: 'Boon',
    dateAdded: '2018-08-21T12:37:21.910Z',
    dateUpdated: '2018-08-21T19:12:05.214Z'
  },
  {
    _id: '5b5348302cfd836b8f934344',
    username: 'Na',
    dateAdded: '2018-09-21T12:37:21.910Z',
    dateUpdated: '2018-09-21T19:12:05.214Z'
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

    User.create(userModels, (err) => {
      if (err) t.fail('Unable to create contents for test');
      return resolve(true);
    });
  });
});

test.after((t) => {
  User.remove([]);
});

test.serial('Should correctly give number of Users', async (t) => {
  t.plan(2);

  const res = await request(app)
    .get(apiEndPoint)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(users.length, res.body.users.length);
});

test.serial('Should send correct User when queried against an id', async (t) => {
  t.plan(2);

  const res = await request(app)
    .get(`${apiEndPoint}/5b5348302cfd836b8f934344`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.user.username, 'Na');
});

test.serial('Should give return null with status 200 when queried against an invalid or non existent id', async (t) => {
  t.plan(2);

  const res = await request(app)
    .get(`${apiEndPoint}/5b5348302cfd836b8f93434a`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.user, null);
});