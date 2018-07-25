const test = require('ava');
const request = require('supertest');
const { app } = require('../../index');
const Content = require('../Content');

const apiEndPoint = '/api/v1/contents';

const contents = [
  {
    _id: '5b534353da555265a84742a2',
    title: 'Terminator 2',
    poster: 'Norval_Braun11',
    rateCount: 16,
    rateValue: 3.5,
    dateAdded: '2018-07-21T09:09:41.968Z',
    description: 'bla bla bla',
    dateUpdated: '2018-07-21T06:46:16.875Z',
    releaseDate: '2018-07-20T16:13:54.149Z'
  },
  {
    _id: '5b534353da555265a84742a3',
    title: 'Die Hard',
    poster: 'Xzavier.Muller25',
    rateCount: 61,
    rateValue: 4.5,
    dateAdded: '2018-07-20T16:40:31.241Z',
    description: 'bla bla bla',
    dateUpdated: '2018-07-21T10:06:49.759Z',
    releaseDate: '2018-07-21T02:57:55.426Z'
  },
  {
    _id: '5b534353da555265a84742a4',
    title: 'Inception',
    poster: 'http://www.image.png',
    rateCount: 10,
    rateValue: 3,
    dateAdded: '2018-07-20T23:19:29.698Z',
    description: 'bla bla bla',
    dateUpdated: '2018-07-20T16:48:09.413Z',
    releaseDate: '2018-07-20T18:35:14.096Z'
  }
];

test.before(async (t) => {
  // This runs before all tests
  const appStarted = await new Promise((resolve, reject) => {
    app.on('app started', () => {
      resolve(true);
    });
  });

  const dataSeeded = await new Promise((resolve, reject) => {
    const contentModels = contents.map(content => new Content(content));

    Content.create(contentModels, (err) => {
      if (err) t.fail('Unable to create contents for test');
      return resolve(true);
    });
  });
});

test.after((t) => {
  Content.remove([]);
});

test.serial('Should correctly give number of contents', async (t) => {
  t.plan(2);

  const res = await request(app)
    .get(apiEndPoint)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(contents.length, res.body.contents.length);
});

test.serial('Should send correct content when queried against an id', async (t) => {
  t.plan(6);

  const id = '5b534353da555265a84742a4';

  const res = await request(app)
    .get(`${apiEndPoint}/${id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.content.title, 'Inception');
  t.is(res.body.content.poster, 'http://www.image.png');
  t.is(res.body.content.rateCount, 10);
  t.is(res.body.content.rateValue, 3);
  t.is(res.body.content.releaseDate, '2018-07-20T18:35:14.096Z');
});

test.serial('Should give return null with status 200 when queried against an invalid or non existent id', async (t) => {
  t.plan(2);

  const id = '5b534353da555265a84742aa';

  const res = await request(app)
    .get(`${apiEndPoint}/${id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.content, null);


});