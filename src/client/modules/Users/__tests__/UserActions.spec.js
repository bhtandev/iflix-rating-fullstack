import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  SET_CURRENT_USER,
  ADD_USERS,
  setCurrentUser,
  addUsers,
} from '../UserActions';

const user = {
  username: 'Boon', dateAdded: '20180201', dateUpdated: '20180201', _id: 3
};


test('should return the correct type for addUsers', actionTest(
  addUsers,
  [user],
  { type: ADD_USERS, users: [user] },
));


test('should return the correct type for setCurrentUser', actionTest(
  setCurrentUser,
  user._id,
  { type: SET_CURRENT_USER, id: user._id },
));
