import test from 'ava';
import { reducerTest } from 'redux-ava';
import userReducer, { getUser, getUsers } from '../UserReducer';
import { setCurrentUser, addUsers } from '../UserActions';

test('action for SET_CURRENT_USER is working', reducerTest(
  userReducer,
  {
    currentUser: { id: 1, username: 'boon' },
    data: [
      {
        username: 'boon',
        dateAdded: '2018',
        dateUpdated: '2019',
        _id: 1,
      },
      {
        username: 'hui',
        dateAdded: '2019',
        dateUpdated: '2019',
        _id: 2,
      },
    ]
  },
  setCurrentUser(2),
  {
    currentUser: {
      username: 'hui',
      dateAdded: '2019',
      dateUpdated: '2019',
      _id: 2,
    },
    data: [
      {
        username: 'boon',
        dateAdded: '2018',
        dateUpdated: '2019',
        _id: 1,
      },
      {
        username: 'hui',
        dateAdded: '2019',
        dateUpdated: '2019',
        _id: 2,
      },
    ]
  },
));

test('action for ADD_USERS is working', reducerTest(
  userReducer,
  { data: [] },
  addUsers([
    {
      username: 'boon',
      dateAdded: '2018',
      dateUpdated: '2019',
      _id: 1,
    },
    {
      username: 'hui',
      dateAdded: '2019',
      dateUpdated: '2019',
      _id: 2,
    },
  ]),
  {
    currentUser: {
      username: 'boon',
      dateAdded: '2018',
      dateUpdated: '2019',
      _id: 1,
    },
    data: [{
      username: 'boon',
      dateAdded: '2018',
      dateUpdated: '2019',
      _id: 1,
    },
    {
      username: 'hui',
      dateAdded: '2019',
      dateUpdated: '2019',
      _id: 2,
    }]
  },
));

test('getUsers selector', (t) => {
  t.deepEqual(
    getUsers({
      users: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getUser selector', (t) => {
  t.deepEqual(
    getUser({ users: { data: [{ _id: '123' }] } }, '123'),
    { _id: '123' }
  );
});
