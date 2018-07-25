const contents = [{
  _id: '5b534353da555265a84742a2',
  title: 'Terminator 2',
  poster: 'terminator2',
  rateCount: 16,
  rateValue: 38,
  average: 2.375,
  dateAdded: '2018-07-21T09:09:41.968Z',
  description: 'Darrion.Tremblay26',
  dateUpdated: '2018-07-21T06:46:16.875Z',
  releaseDate: '1991-07-20T16:13:54.149Z'
},
{
  _id: '5b534353da555265a84742a3',
  title: 'Die Hard',
  poster: 'diehard',
  rateCount: 61,
  rateValue: 234,
  average: 3.83,
  dateAdded: '2018-07-20T16:40:31.241Z',
  description: 'Stanley_Bahringer',
  dateUpdated: '2018-07-21T10:06:49.759Z',
  releaseDate: '1988-07-21T02:57:55.426Z'
},
{
  _id: '5b534353da555265a84742a4',
  title: 'The Departed',
  poster: 'thedeparted',
  rateCount: 30,
  rateValue: 120,
  average: 4,
  dateAdded: '2018-07-20T23:19:29.698Z',
  description: 'Domingo.Pagac',
  dateUpdated: '2018-07-20T16:48:09.413Z',
  releaseDate: '2006-07-20T18:35:14.096Z'
},
{
  _id: '5b534353da555265a84742a5',
  title: 'Crazy Stupid Love',
  poster: 'crazystupidlove',
  rateCount: 80,
  rateValue: 73,
  average: 0.9125,
  dateAdded: '2018-07-21T08:16:24.858Z',
  description: 'Janet_McLaughlin',
  dateUpdated: '2018-07-21T02:14:55.601Z',
  releaseDate: '2018-07-21T08:08:03.417Z'
},
{
  _id: '5b534353da555265a84742a6',
  title: 'Shutter',
  poster: 'shutter',
  rateCount: 100,
  rateValue: 230,
  average: 2.3,
  dateAdded: '2018-07-21T08:20:23.735Z',
  description: 'Rogelio.Lubowitz42',
  dateUpdated: '2018-07-21T13:13:44.250Z',
  releaseDate: '2011-07-20T14:37:00.102Z'
},
{
  _id: '5b534353da555265a84742a7',
  title: 'Inception',
  poster: 'inception',
  rateCount: 72,
  rateValue: 200,
  average: 2.77,
  dateAdded: '2018-07-20T23:52:33.770Z',
  description: 'Pete_Doyle',
  dateUpdated: '2018-07-21T04:50:15.147Z',
  releaseDate: '2010-07-20T19:25:16.267Z'
},
{
  _id: '5b534353da555265a84742a8',
  title: 'Shutter Island',
  poster: 'shutterisland',
  rateCount: 48,
  rateValue: 150,
  average: 3.125,
  dateAdded: '2018-07-20T16:06:27.223Z',
  description: 'Marcelina77',
  dateUpdated: '2018-07-21T04:06:25.135Z',
  releaseDate: '2010-07-21T09:38:37.270Z'
},
{
  _id: '5b534353da555265a84742a9',
  title: 'The Grand Budapest',
  poster: 'grandbudapest',
  rateCount: 76,
  rateValue: 153,
  average: 2.01,
  dateAdded: '2018-07-21T07:51:05.568Z',
  description: 'Reyna78',
  dateUpdated: '2018-07-21T07:23:34.333Z',
  releaseDate: '2014-07-21T02:35:07.463Z'
},
{
  _id: '5b534353da555265a84742aa',
  title: 'The Dark Knight',
  poster: 'darkknight',
  rateCount: 90,
  rateValue: 159,
  average: 1.77,
  dateAdded: '2018-07-20T20:08:38.145Z',
  description: 'Eileen_Bergnaum11',
  dateUpdated: '2018-07-20T18:19:44.440Z',
  releaseDate: '2008-07-20T15:11:12.434Z'
},
{
  _id: '5b534353da555265a84742ab',
  title: 'Dark Knight Rises',
  poster: 'darkknightrises',
  rateCount: 70,
  rateValue: 130,
  average: 1.85,
  dateAdded: '2018-07-20T23:33:40.228Z',
  description: 'Tom.Schaden28',
  dateUpdated: '2018-07-21T11:55:18.420Z',
  releaseDate: '2012-07-21T11:41:21.350Z'
},
{
  _id: '5b534353da555265a84742a1',
  title: 'Gone Baby Gone',
  poster: 'gonebabygone',
  rateCount: 70,
  rateValue: 155,
  average: 2.21,
  dateAdded: '2018-07-20T23:33:40.228Z',
  description: 'Tom.Schaden28',
  dateUpdated: '2018-07-21T11:55:18.420Z',
  releaseDate: '2007-07-21T11:41:21.350Z'
}

];

const users = [{
  _id: '5b5348302cfd836b8f98d138',
  username: 'Lionel Messi',
  dateAdded: '2018-07-21T04:39:31.018Z',
  dateUpdated: '2018-07-21T04:24:26.888Z'
},
{
  _id: '5b5348302cfd836b8f98d139',
  username: 'Boon Hui Tan',
  dateAdded: '2018-07-21T08:52:48.799Z',
  dateUpdated: '2018-07-20T20:10:04.769Z'
},
{
  _id: '5b53e0e3f4d7770c088a36ae',
  username: 'The Rock',
  dateAdded: '2018-07-21T12:37:21.910Z',
  dateUpdated: '2018-07-21T19:12:05.214Z'
}];

const ratings = [{
  _id: '5b53df4e8332af0aad759f75',
  rating: 5,
  userId: '5b5348302cfd836b8f98d138',
  contentId: '5b534353da555265a84742a2',
  dateAdded: '2018-07-21T08:09:59.455Z',
  dateUpdated: '2018-07-21T07:08:03.439Z'
},
{
  _id: '5b53df4e8332af0aad759f78',
  rating: 2,
  userId: '5b5348302cfd836b8f98d138',
  contentId: '5b534353da555265a84742a3',
  dateAdded: '2018-07-21T21:17:18.582Z',
  dateUpdated: '2018-07-21T20:56:11.687Z'
},
{
  _id: '5b53df4e8332af0aad759f7b',
  rating: 3,
  userId: '5b5348302cfd836b8f98d138',
  contentId: '5b534353da555265a84742a4',
  dateAdded: '2018-07-21T10:25:17.709Z',
  dateUpdated: '2018-07-21T18:54:32.872Z'
},
{
  _id: '5b53df4e8332af0aad759f7e',
  rating: 4,
  userId: '5b5348302cfd836b8f98d138',
  contentId: '5b53df4e8332af0aad759f7c',
  dateAdded: '2018-07-21T20:24:00.815Z',
  dateUpdated: '2018-07-21T19:20:02.397Z'
},
{
  _id: '5b53df4e8332af0aad759f81',
  rating: 3,
  userId: '5b5348302cfd836b8f98d139',
  contentId: '5b534353da555265a84742a2',
  dateAdded: '2018-07-21T16:46:52.298Z',
  dateUpdated: '2018-07-21T08:17:05.699Z'
},
{
  _id: '5b53df4e8332af0aad759f84',
  rating: 3,
  userId: '5b5348302cfd836b8f98d139',
  contentId: '5b534353da555265a84742a6',
  dateAdded: '2018-07-21T10:05:46.463Z',
  dateUpdated: '2018-07-21T03:54:34.423Z'
},
{
  _id: '5b53df4e8332af0aad759f87',
  rating: 2,
  userId: '5b5348302cfd836b8f98d139',
  contentId: '5b534353da555265a84742ab', //dkr
  dateAdded: '2018-07-21T10:55:00.229Z',
  dateUpdated: '2018-07-21T14:37:00.166Z'
},
{
  _id: '5b53df4e8332af0aad759f8a',
  rating: 1,
  userId: '5b53df4e8332af0aad759f89',
  contentId: '5b53df4e8332af0aad759f88',
  dateAdded: '2018-07-21T04:35:27.532Z',
  dateUpdated: '2018-07-21T21:17:43.052Z'
},
{
  _id: '5b53df4e8332af0aad759f8d',
  rating: 2,
  userId: '5b53df4e8332af0aad759f8c',
  contentId: '5b53df4e8332af0aad759f8b',
  dateAdded: '2018-07-21T19:36:19.717Z',
  dateUpdated: '2018-07-21T10:50:51.182Z'
},
{
  _id: '5b53df4e8332af0aad759f90',
  rating: 4,
  userId: '5b53df4e8332af0aad759f8f',
  contentId: '5b53df4e8332af0aad759f8e',
  dateAdded: '2018-07-21T22:04:24.143Z',
  dateUpdated: '2018-07-21T17:26:06.857Z'
},
{
  _id: '5b53df4e8332af0aad759f93',
  rating: 5,
  userId: '5b53e0e3f4d7770c088a36ae',
  contentId: '5b534353da555265a84742a9',
  dateAdded: '2018-07-21T05:43:54.314Z',
  dateUpdated: '2018-07-21T09:14:05.155Z'
},
{
  _id: '5b53df4e8332af0aad759f96',
  rating: 4,
  userId: '5b53df4e8332af0aad759f95',
  contentId: '5b534353da555265a84742a9', //gb
  dateAdded: '2018-07-21T03:35:11.137Z',
  dateUpdated: '2018-07-21T13:07:29.215Z'
},
{
  _id: '5b53df4e8332af0aad759f99',
  rating: 1,
  userId: '5b53df4e8332af0aad759f98',
  contentId: '5b53df4e8332af0aad759f97',
  dateAdded: '2018-07-21T21:49:37.471Z',
  dateUpdated: '2018-07-21T09:51:19.734Z'
},
{
  _id: '5b53df4e8332af0aad759f9c',
  rating: 2,
  userId: '5b53df4e8332af0aad759f9b',
  contentId: '5b53df4e8332af0aad759f9a',
  dateAdded: '2018-07-22T00:30:11.592Z',
  dateUpdated: '2018-07-21T22:08:47.541Z'
},
{
  _id: '5b53df4e8332af0aad759f9f',
  rating: 4,
  userId: '5b53df4e8332af0aad759f9e',
  contentId: '5b53df4e8332af0aad759f9d',
  dateAdded: '2018-07-21T14:32:15.265Z',
  dateUpdated: '2018-07-21T02:07:54.450Z'
}];

module.exports = [
  {
    type: 'User',
    documents: users
  },
  {
    type: 'Content',
    documents: contents,
  },
  {
    type: 'Rating',
    documents: ratings
  }
];
